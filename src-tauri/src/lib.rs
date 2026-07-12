// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod commands;
use commands::greet::button_clicked;
// use commands::terminal::run_terminal_command;
use commands::terminal_intro::simple_command;

mod file_manager;
use file_manager::settings::load_settings;
use file_manager::settings::save_settings;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet, button_clicked, simple_command,
            load_settings, save_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
