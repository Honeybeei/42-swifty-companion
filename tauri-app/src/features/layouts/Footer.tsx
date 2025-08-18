import { Button } from "@/shadcn/components/ui/button";
import { ScreenType, useFrontendStore } from "@/stores/frontendStore";
import { Home, Search, Settings } from "lucide-react";

export default function Footer() {
  const { setCurrentScreen, currentScreen } = useFrontendStore();

  const FooterButton = ({
    screen,
    icon: Icon,
    label,
  }: {
    screen: ScreenType;
    icon: any;
    label: string;
  }) => {
    const isActive = currentScreen === screen;

    return (
      <div className="flex-1 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentScreen(screen)}
          className={`flex flex-col items-center transition-all duration-200 h-auto py-3 px-4 rounded-xl ${
            isActive
              ? "bg-primary/10 text-primary scale-150"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          }`}
        >
          <Icon
            size={isActive ? 28 : 22}
            className="transition-all duration-200"
          />
          {!isActive && (
            <span className="text-xs mt-1 font-medium">{label}</span>
          )}
        </Button>
      </div>
    );
  };

  return (
    <footer
      className="flex w-full items-center justify-around bg-background/80 backdrop-blur-md border-t border-border/50 px-2 py-1 shadow-lg"
      style={{
        paddingBottom: `max(calc(0.25rem + env(safe-area-inset-bottom)), 0.25rem)`,
      }}
    >
      <FooterButton screen="home" icon={Home} label="Home" />
      <FooterButton screen="search" icon={Search} label="Search" />
      <FooterButton screen="settings" icon={Settings} label="Settings" />
    </footer>
  );
}
