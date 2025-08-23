import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import { useAuthStore } from "@/store/authStore";
import { Text } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuthStore();
  async function handleSignOut() {
    await signOut();
  }
  return (
    <Screen>
      <Text className="text-xl font-bold text-primary-500">Home Screen</Text>
      <Button onPress={handleSignOut}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </Screen>
  );
}
