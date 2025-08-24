import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  isSafeArea?: boolean;
  className?: string;
}

export default function Screen({
  children,
  isSafeArea = true,
  className,
}: ScreenProps) {
  if (isSafeArea) {
    return (
      <SafeAreaView
        className={`flex flex-1 w-full bg-highlight-50 ${className}`}
      >
        {children}
      </SafeAreaView>
    );
  }
  return (
    <View className={`flex flex-1 w-full bg-highlight-50 ${className}`}>
      {children}
    </View>
  );
}
