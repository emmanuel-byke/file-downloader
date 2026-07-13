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
use file_manager::json_file_manager::load_json_file;
use file_manager::json_file_manager::save_json_file;
use file_manager::download_file_details::get_file_info;
use file_manager::download_progress::download_video;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet, button_clicked, simple_command,
            load_json_file, save_json_file,
            get_file_info, download_video
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
