import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-col flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-primary-500">
        Hello world!
      </Text>
        <Spinner />
        <Button className="bg-highlight-500">
          <ButtonText className="text-white">
            Click me
          </ButtonText>
        </Button>
    </View>
  );
}
