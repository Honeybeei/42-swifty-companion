import { useThemeStore } from "@/stores/themeStore";
import { Switch } from "../ui/switch";

interface ThemeToggleButtonProps {
  size?: "sm" | "md" | "lg";
}

export default function ThemeToggleButton({
  size = "md",
}: ThemeToggleButtonProps) {
  const { theme, setTheme } = useThemeStore();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <Switch size={size} onChange={toggleTheme} />;
}
