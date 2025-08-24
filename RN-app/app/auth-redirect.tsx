import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import { Spinner } from "@/components/shared/gluestack-ui/spinner";
import { Text } from "@/components/shared/gluestack-ui/text";
import Screen from "@/components/shared/layouts/Screen";
import { useUserStore } from "@/store/userStore";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

type AuthState = "loading" | "authenticated" | "error";

export default function AuthRedirect() {
  const [state, setState] = useState<AuthState>("loading");
  const { signInWith42, authError } = useUserStore();
  const router = useRouter();

  // Get the URL from deep linking
  const url = Linking.useLinkingURL();

  useEffect(() => {
    console.log("Deep link URL:", url);

    // Async function to handle sign-in
    const handleSignIn = async () => {
      const result = await signInWith42(url);
      if (result) {
        setState("authenticated");
        router.replace("/(tabs)");
      } else {
        setState("error");
      }
    };
    handleSignIn();
  }, [url, signInWith42, router]);

  // use effect to monitor auth state and navigate accordingly

  const handleGoToAuth = () => {
    router.dismissTo("/auth");
  };

  if (state === "error") {
    return (
      <Screen className="space-y-4 px-4">
        <View className="flex flex-1 items-center justify-center">
          <Image
            source={require("@/assets/images/sad-pizza-maskable.png")}
            resizeMode="contain"
            className="w-2/3"
          />
        </View>
        <View className="mt-8 items-center">
          <Text className="text-center mb-2">
            Oops! Something went wrong during authentication.
          </Text>
          <Text className="text-center text-sm opacity-70">
            {authError?.message}
          </Text>
        </View>
        <Button
          action="primary"
          onPress={handleGoToAuth}
          className="w-full rounded-2xl"
          size="xl"
        >
          <ButtonText>Go back to auth screen</ButtonText>
        </Button>
      </Screen>
    );
  }

  return (
    <Screen className="flex items-center justify-center">
      <Spinner size="large" />
    </Screen>
  );
}
