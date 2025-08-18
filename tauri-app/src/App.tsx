import { Button } from "./shadcn/components/ui/button";
import { ThemeToggle } from "./features/theme/ThemeToggle";
import { useFrontendStore } from "./stores/frontendStore";
import HomeScreen from "./features/home/HomeScreen";
import SearchScreen from "./features/search/SearchScreen";
import SettingsScreen from "./features/settings/SettingsScreen";
import Footer from "./features/layouts/Footer";

function App() {
  const { currentScreen } = useFrontendStore();

  return (
    <div className="flex flex-col items-center justify-center p-2 h-screen">
      <div className="flex-grow">
        {currentScreen === "home" && <HomeScreen />}
        {currentScreen === "search" && <SearchScreen />}
        {currentScreen === "settings" && <SettingsScreen />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
