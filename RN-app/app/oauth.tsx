import Screen from "@/components/shared/layouts/Screen";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function OauthWebViewModal() {
  const { url } = useLocalSearchParams() as { url: string };

  return (
    <Screen>
      <View className="flex-1 w-full">
        <WebView source={{ uri: url }} />
      </View>
    </Screen>
  );
}
