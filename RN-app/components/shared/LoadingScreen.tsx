import { Text } from "@/components/shared/gluestack-ui/text";
import Screen from "@/components/shared/layouts/Screen";
import { Image, View } from "react-native";
import { Spinner } from "./gluestack-ui/spinner";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <Screen className="space-y-4 px-4">
      <View className="flex flex-1 flex-col">
        <View className="flex flex-1"></View>
        <View className="flex flex-1 items-center justify-center">
          <Image
            source={require("@/assets/images/cheerful-pizza-maskable.png")}
            resizeMode="contain"
            className="w-2/3"
          />
        </View>
        <View className="pt-8 flex flex-1 flex-col items-center justify-start gap-4">
          <Spinner size="large" />
          <Text className="text-center text-2xl font-bold text-highlight-900">
            {message || "Loading..."}
          </Text>
        </View>
      </View>
    </Screen>
  );
}
