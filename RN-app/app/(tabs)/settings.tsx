import ThemeSwitchButton from "@/components/settings/ThemeSelectButton";
import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import { useUserStore } from "@/store/userStore";
import { Text } from "react-native";

export default function SettingsScreen() {
  const { signOut } = useUserStore();
  async function handleSignOut() {
    await signOut();
  }

  return (
    <Screen>
      <Text className="text-xl font-bold text-primary-500">
        Settings Screen
      </Text>
      <ThemeSwitchButton />
      <Button onPress={handleSignOut} className="mt-4">
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </Screen>
  );
}
