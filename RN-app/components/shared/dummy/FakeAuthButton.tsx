import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import { useAuthStore } from "@/store/authStore";
import { Heading } from "../gluestack-ui/heading";
import { Text } from "../gluestack-ui/text";
import { Toast, useToast } from "../gluestack-ui/toast";

export default function FakeAuthButton() {
  // AuthGlobalState
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const toast = useToast();

  async function handleAuthToggle() {
    setIsAuthenticated(!isAuthenticated);
    toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast
            nativeID={toastId}
            className="p-4 gap-3 flex-col mx-2 bg-slate-300"
          >
            <Heading size="sm">
              {isAuthenticated ? "Logged in" : "Logged out"}
            </Heading>
            <Text>FAKE LOGIN : ONLY CHANGES `isAuthenticated` STATE</Text>
          </Toast>
        );
      },
    });
  }

  return (
    <Button onPress={handleAuthToggle}>
      <ButtonText>{isAuthenticated ? "Fake Logout" : "Fake Login"}</ButtonText>
    </Button>
  );
}
