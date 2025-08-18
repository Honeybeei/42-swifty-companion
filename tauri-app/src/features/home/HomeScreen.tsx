import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Card } from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";

export default function HomeScreen() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Card className="w-full max-w-md p-6">
      <Input
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter a name..."
      />
      <Button onClick={greet}>Click me</Button>
      <p className="mt-4 text-center text-card-foreground">{greetMsg}</p>
    </Card>
  );
}
