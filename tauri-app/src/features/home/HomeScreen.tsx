import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/shadcn/components/ui/button";
import { useState } from "react";

interface AppGlobalState {
  user_id: string;
  theme: string;
  language: string;
}

export default function HomeScreen() {
  const [userId, setUserId] = useState<string>("");
  async function handleSync() {
    const appState = {
      user_id: "12345", // Example user ID
      theme: "dark", // Example theme
      language: "en", // Example language
    };

    const response = await invoke<AppGlobalState>("sync_app_state", {
      state: appState,
    });
    setUserId(response.user_id);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={handleSync}>Sync App State</Button>
      <p>User ID: {userId}</p>
    </div>
  );
}
