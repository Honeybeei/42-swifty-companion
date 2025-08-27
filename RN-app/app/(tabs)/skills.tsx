import { Heading } from "@/components/shared/gluestack-ui/heading";
import { ScrollView } from "@/components/shared/gluestack-ui/scroll-view";
import { Text } from "@/components/shared/gluestack-ui/text";
import { VStack } from "@/components/shared/gluestack-ui/vstack";
import Screen from "@/components/shared/layouts/Screen";
import CursusSkillsCard from "@/components/skills/CursusSkillsCard";
import { useUserStore } from "@/store/userStore";

export default function SkillsScreen() {
  const { userProfile } = useUserStore();

  // userProfile is guaranteed to exist due to TabsLayout guard
  if (!userProfile) {
    return null; // This should never happen due to TabsLayout guard
  }

  if (userProfile.cursus_users.length === 0) {
    return (
      <Screen isSafeArea={false}>
        <VStack className="flex-1 justify-center items-center gap-4">
          <Text className="text-xl font-bold text-typography-900">
            No Skills Data
          </Text>
          <Text className="text-center text-typography-600">
            No cursus or skills information available for this user.
          </Text>
        </VStack>
      </Screen>
    );
  }

  // Sort cursus by most recent (highest level or most recent begin_at)
  const sortedCursus = [...userProfile.cursus_users].sort((a, b) => {
    // First sort by level (descending), then by begin_at (most recent first)
    if (b.level !== a.level) {
      return b.level - a.level;
    }
    return new Date(b.begin_at).getTime() - new Date(a.begin_at).getTime();
  });

  return (
    <Screen isSafeArea={false}>
      <ScrollView className="flex-1 w-full pt-safe px-4">
        <VStack className="gap-4 p-2">
          <Heading size="2xl" className="text-highlight-700">
            Skills Overview
          </Heading>

          {/* Cursus Skills Cards */}
          <VStack className="gap-1">
            {sortedCursus.map((cursusUser) => (
              <CursusSkillsCard
                key={cursusUser.cursus_id}
                cursusUser={cursusUser}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
}
