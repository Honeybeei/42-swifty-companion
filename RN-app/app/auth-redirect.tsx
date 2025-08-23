import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import { useAuthStore } from "@/store/authStore";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

// This screen will be rendered when the app is opened via a deep link(com.honeybeei.RNapp://auth-redirect).
export default function AuthRedirect() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error for displaying authentication errors
  const { authError, signInWith42 } = useAuthStore();
  const router = useRouter();

  // Get the URL that opened the app
  const url = Linking.useLinkingURL();

  useEffect(() => {
    console.log("AuthRedirect opened with URL:", url);
    try {
      if (!url) {
        throw new Error("No URL provided for authentication redirect");
      }

      setTimeout(() => {
        signInWith42(url).then(() => {
          console.log("User signed in successfully");
          console.log("Closing WebBrowser");
          // WebBrowser.dismissBrowser(); // Close the WebBrowser if it's still open
          router.replace("/(tabs)"); // Navigate to home or main screen after successful auth
        });
      }, 3000);
    } catch (error) {
      console.error("Error in AuthRedirect useEffect:", error);
      setError("Failed to process authentication. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after processing the URL
    }
  }, [url]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      console.error("Authentication error:", authError);
    }
  }, [authError]);

  if (isLoading) {
    return (
      <Screen>
        <Text className="text-xl font-bold text-primary-500">Loading...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Text className="text-xl font-bold text-red-500">{error}</Text>
        <Button onPress={() => router.replace("/auth")}>
          <ButtonText>Go to auth screen</ButtonText>
        </Button>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text className="text-xl font-bold text-primary-500">Auth Redirect</Text>
    </Screen>
  );
}
