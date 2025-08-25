import ErrorScreen from "@/components/shared/ErrorScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useUserStore } from "@/store/userStore";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type AuthState = "loading" | "authenticated" | "error";

export default function AuthRedirect() {
  const [state, setState] = useState<AuthState>("loading");
  const { signInWith42, authError } = useUserStore();
  const router = useRouter();

  // Get the URL from deep linking
  const url = Linking.useLinkingURL();

  useEffect(() => {
    console.log("Deep link URL:", url);

    // Async function to handle sign-in
    const handleSignIn = async () => {
      const result = await signInWith42(url);
      if (result) {
        setState("authenticated");
        router.replace("/(tabs)");
      } else {
        setState("error");
      }
    };
    handleSignIn();
  }, [url, signInWith42, router]);

  // use effect to monitor auth state and navigate accordingly

  const handleGoToAuth = () => {
    router.dismissTo("/auth");
  };

  if (state === "error") {
    return (
      <ErrorScreen
        message="Authentication failed"
        errorDetails={authError?.message}
        showNextActionButton
        nextActionButtonProps={{
          buttonText: "Go back to auth screen",
          handleRedirect: handleGoToAuth,
        }}
      />
    );
  }

  return <LoadingScreen message="Signing you in..." />;
}
