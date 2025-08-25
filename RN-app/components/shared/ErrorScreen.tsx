import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import { Text } from "@/components/shared/gluestack-ui/text";
import Screen from "@/components/shared/layouts/Screen";
import { useState } from "react";
import { Image, View } from "react-native";
import { Card } from "./gluestack-ui/card";
import { Heading } from "./gluestack-ui/heading";

interface NextActionButtonProps {
  buttonText: string;
  handleRedirect: () => void;
}

interface ErrorScreenProps {
  message: string;
  errorDetails?: string;
  showNextActionButton?: boolean;
  nextActionButtonProps?: NextActionButtonProps;
}

export default function ErrorScreen({
  message,
  errorDetails,
  showNextActionButton,
  nextActionButtonProps,
}: ErrorScreenProps) {
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  return (
    <Screen className="space-y-4 px-4">
      <View className="flex flex-1 flex-col">
        <View className="flex flex-1"></View>
        <View className="flex flex-1 items-center justify-center">
          <Image
            source={require("@/assets/images/sad-pizza-maskable.png")}
            resizeMode="contain"
            className="w-2/3"
          />
        </View>
        <View className="pt-8 flex flex-1 items-center justify-start gap-4">
          <Text className="text-center text-2xl font-bold text-highlight-900">
            Oops! Something went wrong ...
          </Text>
          <Button
            variant="link"
            size="lg"
            action="secondary"
            onPress={() => {
              setShowErrorDetails(!showErrorDetails);
            }}
          >
            <ButtonText>See Error Details</ButtonText>
          </Button>
          {showErrorDetails && (
            <Card size="sm" variant="outline" className="items-center">
              <Heading size="md" className="mb-1">
                {message}
              </Heading>
              <Text size="sm">{errorDetails}</Text>
            </Card>
          )}
        </View>
      </View>
      {showNextActionButton && nextActionButtonProps && (
        <Button
          action="primary"
          onPress={nextActionButtonProps.handleRedirect}
          className="w-full rounded-2xl"
          size="xl"
        >
          <ButtonText>{nextActionButtonProps.buttonText}</ButtonText>
        </Button>
      )}
    </Screen>
  );
}
