import CursusSkillsCard from "@/components/skills/CursusSkillsCard";
import ErrorScreen from "@/components/shared/ErrorScreen";
import { Heading } from "@/components/shared/gluestack-ui/heading";
import { HStack } from "@/components/shared/gluestack-ui/hstack";
import { ScrollView } from "@/components/shared/gluestack-ui/scroll-view";
import { Text } from "@/components/shared/gluestack-ui/text";
import { VStack } from "@/components/shared/gluestack-ui/vstack";
import Screen from "@/components/shared/layouts/Screen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function SkillsScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loadUserProfile, userProfile } = useUserStore();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      // Check if user profile is already loaded
      if (userProfile) {
        setLoading(false);
        return;
      }
      const success = await loadUserProfile();
      if (!success) {
        setError("Failed to load user profile.");
      }
      setLoading(false);
    };
    loadProfile();
  }, [loadUserProfile, userProfile]);

  if (loading) {
    return <LoadingScreen message="Loading skills..." />;
  }

  if (error || !userProfile) {
    return <ErrorScreen message={error || "No user profile available."} />;
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

  // Calculate total stats
  const totalSkills = sortedCursus.reduce((sum, cursus) => sum + cursus.skills.length, 0);
  const averageLevel = sortedCursus.reduce((sum, cursus) => {
    if (cursus.skills.length === 0) return sum;
    const cursusAvg = cursus.skills.reduce((skillSum, skill) => skillSum + skill.level, 0) / cursus.skills.length;
    return sum + cursusAvg;
  }, 0) / sortedCursus.filter(cursus => cursus.skills.length > 0).length;

  return (
    <Screen isSafeArea={false}>
      <ScrollView className="flex-1 w-full pt-safe px-4">
        <VStack className="gap-4 p-2">
          <VStack className="gap-2">
            <Heading size="2xl" className="text-highlight-700">
              Skills Overview
            </Heading>
            
            {/* Summary Stats */}
            <VStack className="bg-highlight-50 p-3 rounded-xl gap-2 mb-2">
              <Text className="text-typography-800 font-bold text-sm">
                📈 Skills Summary
              </Text>
              <HStack className="justify-between flex-wrap gap-3">
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">🎓</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {sortedCursus.length}
                  </Text>
                  <Text className="text-xs text-typography-500">Cursus</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">🛠️</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {totalSkills}
                  </Text>
                  <Text className="text-xs text-typography-500">Total Skills</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">⭐</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {averageLevel ? averageLevel.toFixed(1) : "N/A"}
                  </Text>
                  <Text className="text-xs text-typography-500">Avg Level</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">🏆</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {Math.max(...sortedCursus.map(c => c.level)).toFixed(1)}
                  </Text>
                  <Text className="text-xs text-typography-500">Max Level</Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>

          {/* Cursus Skills Cards */}
          <VStack className="gap-1">
            {sortedCursus.map((cursusUser) => (
              <CursusSkillsCard key={cursusUser.cursus_id} cursusUser={cursusUser} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
}
