import { GluestackUIProvider } from "@/components/shared/gluestack-ui/gluestack-ui-provider";
import LoadingScreen from "@/components/shared/LoadingScreen";
import "@/global.css";
import { useSettingsStore } from "@/store/settingsStore";
import { useUserStore } from "@/store/userStore";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const { checkAuthentication, restoreTokensFromStorage, authToken } =
    useUserStore();
  const { theme } = useSettingsStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication on app startup
  // Triggers: once on component mount
  // Purpose: restore tokens from storage, validate them, and set initial auth state
  useEffect(() => {
    const initializeAuth = async () => {
      await restoreTokensFromStorage();
      const authenticated = await checkAuthentication();
      setIsAuthenticated(authenticated);
      setIsInitializing(false);
    };

    initializeAuth();
  }, [restoreTokensFromStorage, checkAuthentication]);

  // Update authentication state when token changes
  // Triggers: when authToken changes (login/logout/refresh) or app finishes initializing
  // Purpose: re-validate authentication when token state changes
  useEffect(() => {
    const updateAuthState = async () => {
      if (!isInitializing) {
        const authenticated = await checkAuthentication();
        setIsAuthenticated(authenticated);
      }
    };

    updateAuthState();
  }, [authToken, checkAuthentication, isInitializing]);

  if (isInitializing) {
    return <LoadingScreen message="Initializing app..." />;
  }

  return (
    <GluestackUIProvider mode={theme}>
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
