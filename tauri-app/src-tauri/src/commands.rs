use serde::{Deserialize, Serialize};
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
pub fn greet(name: String) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, Default, Deserialize, Serialize)]
pub struct AppState {
    user_id: String,
}

#[tauri::command]
pub fn sync_state(state: AppState) -> AppState {
    println!("Syncing state from frontend: {}", state.user_id);
    state
}
