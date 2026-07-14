

#[tauri::command]
pub async fn get_file_info(url: String) -> Result<serde_json::Value, String> {
    println!("Let's observe the details together");
    let output = std::process::Command::new("yt-dlp")
        .args(["-j", "--no-warnings", &url])
        .output()
        .map_err(|e| e.to_string())?;

    println!("{:?}", &output);
    
    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    serde_json::from_slice(&output.stdout).map_err(|e| e.to_string())
}