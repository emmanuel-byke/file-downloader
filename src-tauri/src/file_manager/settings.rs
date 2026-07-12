
use serde_json::Value;
use std::fs;
use tauri::{AppHandle, Manager};

fn settings_path(app: &AppHandle) -> std::path::PathBuf {
    let mut path = app.path().app_config_dir().unwrap();

    fs::create_dir_all(&path).unwrap();

    path.push("settings.json");

    path
}

#[tauri::command]
pub fn save_settings(app: AppHandle, settings: Value) -> Result<(), String> {
    println!("{:?}", settings);

    let path = settings_path(&app);

    let json = serde_json::to_string_pretty(&settings)
        .map_err(|e| e.to_string())?;

    fs::write(path, json)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn load_settings(app: AppHandle) -> Result<Value, String> {
    print!("Loading...");
    let path = settings_path(&app);

    if !path.exists() {
        return Ok(serde_json::json!({}));
    }

    let text = fs::read_to_string(path)
        .map_err(|e| e.to_string())?;

    let settings: Value =
        serde_json::from_str(&text).map_err(|e| e.to_string())?;

    Ok(settings)
}