use std::process::Stdio;
use once_cell::sync::Lazy;
use regex::Regex;
use serde::Serialize;
use tauri::{Emitter, Window};
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::Command;

#[derive(Clone, Serialize)]
struct DownloadProgress {
    percent: f32,
    downloaded: String,
    total: String,
    speed: String,
    eta: String,
}

#[derive(Clone, Serialize)]
struct DownloadLog {
    line: String,
    stream: String, // "stdout" | "stderr"
}

static PROGRESS_RE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(
        r"(?x)
         (?P<dl>[\d.]+\w+)/(?P<total>[\d.]+\w+)
         \((?P<pct>\d+)%\)
         .*?DL:\s*(?P<speed>[\d.]+\w+/?s?)
         .*?ETA:\s*(?P<eta>\w+)
        ",
    )
    .expect("invalid regex")
});

/// Resolves an executable's full path so it works even when the app
/// inherits a minimal PATH (common for GUI-launched Tauri apps).
fn resolve_executable(name: &str) -> Result<String, String> {
    if let Ok(path) = which::which(name) {
        return Ok(path.to_string_lossy().to_string());
    }
    let candidates = [
        format!("/opt/homebrew/bin/{name}"),
        format!("/usr/local/bin/{name}"),
        format!("/usr/bin/{name}"),
    ];
    for c in candidates {
        if std::path::Path::new(&c).exists() {
            return Ok(c);
        }
    }
    Err(format!(
        "'{name}' not found. Make sure it's installed and on PATH (checked `which`, /opt/homebrew/bin, /usr/local/bin, /usr/bin)."
    ))
}

#[tauri::command]
pub async fn download_video(
    window: Window,
    url: String,
    output_path: String,
) -> Result<(), String> {
    let yt_dlp_path = resolve_executable("yt-dlp")?;
    let aria2c_path = resolve_executable("aria2c")?;

    let args = [
        "--newline",
        "--downloader",
        &aria2c_path,
        "--downloader-args",
        "aria2c:-x 16 -s 16 -k 1M --summary-interval=1",
        "-o",
        &output_path,
        &url,
    ];

    // This is how you see exactly what's being run — copy/paste it into
    // a terminal yourself if you want to debug outside the app.
    println!(
        "[download_video] Running: {} {}",
        yt_dlp_path,
        args.join(" ")
    );

    let mut child = Command::new(&yt_dlp_path)
        .args(args)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| format!("Failed to start yt-dlp at '{yt_dlp_path}': {e}"))?;

    let stdout = child
        .stdout
        .take()
        .ok_or_else(|| "Failed to capture stdout".to_string())?;
    let stderr = child
        .stderr
        .take()
        .ok_or_else(|| "Failed to capture stderr".to_string())?;

    // Stream stdout: parse progress
    let win_out = window.clone();
    tokio::spawn(async move {
        let mut lines = BufReader::new(stdout).lines();
        while let Ok(Some(line)) = lines.next_line().await {
            println!("[yt-dlp stdout] {line}");
            if let Some(caps) = PROGRESS_RE.captures(&line) {
                let percent = caps["pct"].parse::<f32>().unwrap_or(0.0).clamp(0.0, 100.0);
                let _ = win_out.emit(
                    "download-progress",
                    DownloadProgress {
                        percent,
                        downloaded: caps["dl"].to_string(),
                        total: caps["total"].to_string(),
                        speed: caps["speed"].to_string(),
                        eta: caps["eta"].to_string(),
                    },
                );
            }
            let _ = win_out.emit("download-log", DownloadLog { line, stream: "stdout".into() });
        }
    });

    // Stream stderr LIVE so you actually see failures as they happen,
    // not only after the whole process exits.
    let win_err = window.clone();
    tokio::spawn(async move {
        let mut lines = BufReader::new(stderr).lines();
        while let Ok(Some(line)) = lines.next_line().await {
            eprintln!("[yt-dlp stderr] {line}");
            let _ = win_err.emit("download-log", DownloadLog { line, stream: "stderr".into() });
        }
    });

    let status = child
        .wait()
        .await
        .map_err(|e| format!("Failed to wait for yt-dlp: {e}"))?;

    if !status.success() {
        return Err(format!(
            "yt-dlp exited with code {}. Check the terminal / download-log events for details.",
            status.code().unwrap_or(-1)
        ));
    }

    let _ = window.emit("download-complete", ());
    Ok(())
}