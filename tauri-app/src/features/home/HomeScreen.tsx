import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Card } from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";

export default function HomeScreen() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [appState, setAppState] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  async function syncState() {
    const state = { user_id: "user123" };
    const result = await invoke<{ user_id: string }>("sync_state", state);
    setAppState(result.user_id);
  }

  return (
    <>
      <Card className="w-full max-w-md p-6">
        <Input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <Button onClick={greet}>Click me</Button>
        <p className="mt-4 text-center text-card-foreground">{greetMsg}</p>
      </Card>
      <Card>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.currentTarget.value)}
          placeholder="Enter a user ID..."
        />
        <Button onClick={syncState} className="mt-2">
          Sync State
        </Button>
        <p className="mt-4 text-center text-card-foreground">
          Current User ID: {appState || "No user ID synced yet."}
        </p>
      </Card>
    </>
  );
}
