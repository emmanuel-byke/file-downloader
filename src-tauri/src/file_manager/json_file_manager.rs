
use serde_json::Value;
use std::fs;
use tauri::{AppHandle, Manager};

fn json_path(app: &AppHandle, name: String) -> std::path::PathBuf {
    let mut path = app.path().app_config_dir().unwrap();

    fs::create_dir_all(&path).unwrap();

    path.push(format!("{}.json", name));

    path
}

#[tauri::command]
pub fn save_json_file(app: AppHandle, input: Value, name: String) -> Result<(), String> {
    // println!("{:?}", input);
    let path = json_path(&app, name);

    let json = serde_json::to_string_pretty(&input)
        .map_err(|e| e.to_string())?;

    fs::write(path, json)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn load_json_file(app: AppHandle, name: String) -> Result<Value, String> {
    let path = json_path(&app, name);

    if !path.exists() {
        return Ok(serde_json::json!({}));
    }

    let text = fs::read_to_string(path)
        .map_err(|e| e.to_string())?;

    let json_file: Value =
        serde_json::from_str(&text).map_err(|e| e.to_string())?;

    Ok(json_file)
}