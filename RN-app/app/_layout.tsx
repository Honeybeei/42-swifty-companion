import { GluestackUIProvider } from "@/components/shared/gluestack-ui/gluestack-ui-provider";
import "@/global.css";
import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="auth-redirect" options={{ headerShown: false }} />
          <Stack.Screen
            name="oauth"
            options={{ presentation: "modal", headerTitle: "Sign In" }}
          />
        </Stack.Protected>
      </Stack>
    </GluestackUIProvider>
  );
}
