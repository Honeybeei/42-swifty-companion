use serde::{Deserialize, Serialize};
use tauri::App;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
pub fn greet(name: String) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, Default, Deserialize, Serialize)]
pub struct AppGlobalState {
    user_id: String,
    theme: String,
    language: String,
}

// for app global state
impl AppGlobalState {
    pub fn new(user_id: String, theme: String, language: String) -> Self {
        Self {
            user_id,
            theme,
            language,
        }
    }

    pub fn new_dummy() -> Self {
        Self {
            user_id: chrono::Utc::now().to_rfc3339(),
            theme: "light".to_string(),
            language: "en".to_string(),
        }
    }
}

#[tauri::command]
pub fn sync_app_state(state: AppGlobalState) -> AppGlobalState {
    println!("Syncing app state from frontend: {:?}", state);
    // Here you would typically save the state to a database or file
    // For demonstration, we just return the state back
    AppGlobalState::new_dummy() // Returning a dummy state for now
}
