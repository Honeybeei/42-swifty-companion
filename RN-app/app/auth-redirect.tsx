import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import { Spinner } from "@/components/shared/gluestack-ui/spinner";
import Screen from "@/components/shared/layouts/Screen";
import { useAuthStore } from "@/store/authStore";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

// This screen will be rendered when the app is opened via a deep link(com.honeybeei.RNapp://auth-redirect).
export default function AuthRedirect() {
  const [error, setError] = useState<string | null>(null); // Error for displaying
  const { signInWith42, loadUserProfile } = useAuthStore();
  const router = useRouter();

  // Get the URL that opened the app
  const url = Linking.useLinkingURL();

  useEffect(() => {
    const handleAuthentication = async () => {
      setError(null);

      if (!url) {
        setError("No URL provided for authentication redirect");
        return;
      }

      console.log("AuthRedirect opened with URL:", url);

      try {
        await signInWith42(url);
        console.log("User signed in successfully");
        await loadUserProfile();
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Error in signInWith42:", error);
        setError(error instanceof Error ? error.message : String(error));
      }
    };

    handleAuthentication();
  }, [url, router, signInWith42, loadUserProfile]);

  const handleGoToAuth = () => {
    router.dismissAll();
    router.push("/auth");
  };

  if (error) {
    return (
      <Screen>
        <Text className="text-xl font-bold text-red-500">{error}</Text>
        <Button onPress={handleGoToAuth}>
          <ButtonText>Go to auth screen</ButtonText>
        </Button>
      </Screen>
    );
  }

  return (
    <Screen>
      <Spinner size="large" />
    </Screen>
  );
}
