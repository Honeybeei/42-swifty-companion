import { useFrontendStore } from "./stores/frontendStore";
import HomeScreen from "./features/home/HomeScreen";
import SearchScreen from "./features/search/SearchScreen";
import SettingsScreen from "./features/settings/SettingsScreen";
import Footer from "./features/layouts/Footer";

function App() {
  const { currentScreen } = useFrontendStore();

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        paddingTop: `max(env(safe-area-inset-top))`,
        paddingLeft: `max(env(safe-area-inset-left))`,
        paddingRight: `max(env(safe-area-inset-right))`,
      }}
    >
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
