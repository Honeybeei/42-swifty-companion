import { UserProfile } from "@/types";
import DisplayCard from "../shared/DisplayCard";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from "../shared/gluestack-ui/accordion";
import { Badge, BadgeText } from "../shared/gluestack-ui/badge";
import { HStack } from "../shared/gluestack-ui/hstack";
import { ChevronDownIcon } from "../shared/gluestack-ui/icon";
import { Text } from "../shared/gluestack-ui/text";
import { VStack } from "../shared/gluestack-ui/vstack";

interface AchievementsCardProps {
  userProfile: UserProfile;
}

export default function AchievementsCard({
  userProfile,
}: AchievementsCardProps) {
  if (userProfile.achievements.length === 0) {
    return null;
  }

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "info";
      case "hard":
        return "warning";
      case "challenge":
        return "error";
      default:
        return "muted";
    }
  };

  // Calculate achievement stats
  const totalAchievements = userProfile.achievements.length;
  const tieredAchievements = userProfile.achievements.filter(
    (a) => a.tier !== "none"
  ).length;
  const achievementsByKind = userProfile.achievements.reduce(
    (acc, achievement) => {
      acc[achievement.kind] = (acc[achievement.kind] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <DisplayCard title="Achievements">
      <Accordion variant="unfilled" className="w-full">
        <AccordionItem
          value="achievements"
          className="bg-highlight-50 rounded-2xl"
        >
          <AccordionHeader>
            <AccordionTrigger className="py-4">
              <VStack className="flex-1 gap-1">
                <HStack className="gap-2 w-full items-center">
                  <Text className="text-lg font-bold text-typography-900 flex-1">
                    🏆 All Achievements
                  </Text>
                  <Badge action="info" variant="solid" size="sm">
                    <BadgeText>{totalAchievements}</BadgeText>
                  </Badge>
                </HStack>
                <HStack className="gap-4 w-full flex-wrap">
                  <Text className="text-sm text-typography-600">
                    💎 {tieredAchievements} tiered
                  </Text>
                  {Object.entries(achievementsByKind).map(([kind, count]) => (
                    <Text key={kind} className="text-sm text-typography-600">
                      📂 {count} {kind}
                    </Text>
                  ))}
                </HStack>
              </VStack>
              <AccordionIcon as={ChevronDownIcon} className="ml-2" />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <VStack className="gap-3 px-1 py-2">
              {userProfile.achievements.map((achievement) => (
                <VStack
                  key={achievement.id}
                  className="bg-highlight-100 p-3 rounded-xl gap-2"
                >
                  {/* Achievement Header */}
                  <HStack className="gap-2 items-center w-full">
                    <Text className="text-base font-bold text-typography-900 flex-1">
                      🏆 {achievement.name}
                    </Text>
                    {achievement.tier !== "none" && (
                      <Badge
                        action={getTierColor(achievement.tier) as any}
                        variant="solid"
                        size="sm"
                      >
                        <BadgeText>{achievement.tier.toUpperCase()}</BadgeText>
                      </Badge>
                    )}
                  </HStack>

                  {/* Achievement Description */}
                  <Text className="text-sm text-typography-600">
                    {achievement.description}
                  </Text>

                  {/* Achievement Info */}
                  <HStack className="gap-4 flex-wrap">
                    <Text className="text-xs text-typography-500">
                      📂 {achievement.kind}
                    </Text>
                    {achievement.nbr_of_success && (
                      <Text className="text-xs text-typography-500">
                        🎯 {achievement.nbr_of_success}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              ))}
            </VStack>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DisplayCard>
  );
}
