import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useThemeStore } from "@/stores/themeStore";

export default function RootLayout() {
  const { theme } = useThemeStore();
  return (
    <GluestackUIProvider mode={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
