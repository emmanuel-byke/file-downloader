


#[tauri::command]
pub fn button_clicked() -> String{
    println!("Button Clicked...");
    "Button Clicked".to_string()
}