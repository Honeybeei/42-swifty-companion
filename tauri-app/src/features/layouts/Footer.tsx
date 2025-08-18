import { Button } from "@/shadcn/components/ui/button";
import { useFrontendStore } from "@/stores/frontendStore";

export default function Footer() {
  const { setCurrentScreen } = useFrontendStore();

  return (
    <footer className="mt-4 flex w-full max-w-2xl items-center justify-between">
      <Button onClick={() => setCurrentScreen("home")}>Home</Button>
      <Button onClick={() => setCurrentScreen("search")}>Search</Button>
      <Button onClick={() => setCurrentScreen("settings")}>Settings</Button>
    </footer>
  );
}
