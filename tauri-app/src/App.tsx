import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./shadcn/components/ui/button";
import { Input } from "./shadcn/components/ui/input";
import { Card } from "./shadcn/components/ui/card";
import { ThemeToggle } from "./features/theme/ThemeToggle";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-2">
      <Card className="w-full max-w-md p-6">
        <Input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <Button onClick={greet}>Click me</Button>
        <p className="mt-4 text-center text-card-foreground">{greetMsg}</p>
      </Card>
      <ThemeToggle />
    </div>
  );
}

export default App;
