import ThemeSwitchButton from "@/components/settings/ThemeSelectButton";
import Screen from "@/components/shared/layouts/Screen";
import { Text } from "react-native";

export default function SettingsScreen() {
  return (
    <Screen>
      <Text className="text-xl font-bold text-primary-500">
        Settings Screen
      </Text>
      <ThemeSwitchButton />
    </Screen>
  );
}
