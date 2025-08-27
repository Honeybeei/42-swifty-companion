import ThemeSwitchButton from "@/components/settings/ThemeSelectButton";
import DisplayCard from "@/components/shared/DisplayCard";
import { Heading } from "@/components/shared/gluestack-ui/heading";
import { HStack } from "@/components/shared/gluestack-ui/hstack";
import { Pressable } from "@/components/shared/gluestack-ui/pressable";
import { ScrollView } from "@/components/shared/gluestack-ui/scroll-view";
import { Text } from "@/components/shared/gluestack-ui/text";
import { VStack } from "@/components/shared/gluestack-ui/vstack";
import Screen from "@/components/shared/layouts/Screen";
import { useUserStore } from "@/store/userStore";

export default function SettingsScreen() {
  const { signOut, loadUserProfile, userProfile } = useUserStore();

  // userProfile is guaranteed to exist due to TabsLayout guard
  if (!userProfile) {
    return null; // This should never happen due to TabsLayout guard
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Screen isSafeArea={false}>
      <ScrollView className="flex-1 w-full pt-safe px-4">
        <VStack className="gap-4 p-2">
          <Heading size="2xl" className="text-highlight-700">
            Settings
          </Heading>

          {/* App Preferences */}
          <DisplayCard>
            <VStack className="gap-4">
              <Text className="text-typography-800 font-bold text-sm">
                🎨 App Preferences
              </Text>
              <VStack className="gap-3">
                <HStack className="justify-between items-center">
                  <VStack className="flex-1 gap-1">
                    <Text className="text-typography-900 font-medium">
                      🌗 Theme
                    </Text>
                    <Text className="text-typography-600 text-sm">
                      Switch between light and dark mode
                    </Text>
                  </VStack>
                  <ThemeSwitchButton />
                </HStack>
              </VStack>
            </VStack>
          </DisplayCard>

          {/* App Information */}
          <DisplayCard>
            <VStack className="gap-4">
              <Text className="text-typography-800 font-bold text-sm">
                ℹ️ App Information
              </Text>
              <VStack className="gap-3">
                <HStack className="justify-between items-center">
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-medium">
                      📱 App Name
                    </Text>
                    <Text className="text-typography-600 text-sm">
                      Swifty Companion
                    </Text>
                  </VStack>
                </HStack>
                <HStack className="justify-between items-center">
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-medium">
                      📊 Version
                    </Text>
                    <Text className="text-typography-600 text-sm">1.0.0</Text>
                  </VStack>
                </HStack>
                <HStack className="justify-between items-center">
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-medium">
                      🔗 API
                    </Text>
                    <Text className="text-typography-600 text-sm">
                      42 Intranet API
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </DisplayCard>

          {/* Account Actions */}
          <DisplayCard>
            <VStack className="gap-4">
              <Text className="text-typography-800 font-bold text-sm">
                ⚙️ Account Actions
              </Text>
              <VStack className="gap-3">
                <Pressable
                  className="p-3 rounded-xl bg-info-50 border border-info-200"
                  onPress={() => {
                    // Refresh profile data
                    loadUserProfile();
                  }}
                >
                  <HStack className="items-center gap-3">
                    <Text className="text-lg">🔄</Text>
                    <VStack className="flex-1">
                      <Text className="text-info-700 font-medium">
                        Refresh Profile
                      </Text>
                      <Text className="text-info-600 text-sm">
                        Update your profile data from 42 API
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>

                <Pressable
                  className="p-3 rounded-xl bg-error-50 border border-error-200"
                  onPress={handleSignOut}
                >
                  <HStack className="items-center gap-3">
                    <Text className="text-lg">🚪</Text>
                    <VStack className="flex-1">
                      <Text className="text-error-700 font-medium">
                        Sign Out
                      </Text>
                      <Text className="text-error-600 text-sm">
                        Sign out from your 42 account
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
              </VStack>
            </VStack>
          </DisplayCard>

          {/* Footer */}
          <VStack className="items-center gap-2 py-4">
            <Text className="text-typography-500 text-sm">
              Built with ❤️ for 42 students
            </Text>
            <Text className="text-typography-400 text-xs">
              © 2025 Swifty Companion
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
}
