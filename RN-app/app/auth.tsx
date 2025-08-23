import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import { useRouter } from "expo-router";

import { Text } from "react-native";

export default function AuthScreen() {
  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = "com.honeybeei.pizza://auth-redirect";
  const BASE_URL = "https://api.intra.42.fr/oauth/authorize";
  const RESPONSE_TYPE = "code";
  const AUTH_URL = `${BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}`;

  const router = useRouter();

  // Open the OAuth URL in Expo's WebBrowser
  async function handleOpenURL() {
    router.push({ pathname: "/oauth", params: { url: AUTH_URL } });

    // Previous implementation
    // console.log("Opening WebBrowser with URL:", AUTH_URL);
    // const result = await WebBrowser.openBrowserAsync(AUTH_URL);

    //using expo WebBrowser.openAuthSessionAsync(
    // const result = await WebBrowser.openAuthSessionAsync(AUTH_URL);
    // console.log("WebBrowser result:", result);
  }

  return (
    <Screen>
      <Text className="text-xl font-bold text-primary-500">Auth Screen</Text>
      <Button onPress={handleOpenURL}>
        <ButtonText>Sign-in with 42</ButtonText>
      </Button>
    </Screen>
  );
}
