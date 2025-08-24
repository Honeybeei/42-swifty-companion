import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import Env from "@/utils/env";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

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
    <Screen className="px-4 py-2">
      <View className="flex flex-1 items-center justify-center">
        <Image
          source={require("@/assets/images/app-icon-maskable.png")}
          resizeMode="contain"
          className="w-2/3"
        />
      </View>
      <Button
        className="bg-highlight-500 data-[active=true]:bg-highlight-600 w-full rounded-2xl "
        size="xl"
        onPress={handleOpenURL}
      >
        <ButtonText>Sign in with 42</ButtonText>
      </Button>
    </Screen>
  );
}
