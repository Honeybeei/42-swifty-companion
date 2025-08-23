import { View } from "react-native";
import { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  return (
    <View className="flex flex-col flex-1 items-center justify-center bg-white">
      {children}
    </View>
  );
}