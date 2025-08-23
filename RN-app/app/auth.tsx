import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import Env from "@/utils/env";
import { useRouter } from "expo-router";

import { Text } from "react-native";

export default function AuthScreen() {
  const CLIENT_ID = Env.clientId;
  const REDIRECT_URI = "com.honeybeei.pizza://auth-redirect";
  const BASE_URL = "https://api.intra.42.fr/oauth/authorize";
  const RESPONSE_TYPE = "code";

  const AUTH_URL = `${BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}`;

  const router = useRouter();

  async function handleOpenURL() {
    router.push({ pathname: "/oauth", params: { url: AUTH_URL } });
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
