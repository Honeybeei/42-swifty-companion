import { CursusUser } from "@/types";
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
import { Progress, ProgressFilledTrack } from "../shared/gluestack-ui/progress";
import { Text } from "../shared/gluestack-ui/text";
import { VStack } from "../shared/gluestack-ui/vstack";

interface CursusSkillsCardProps {
  cursusUser: CursusUser;
}

export default function CursusSkillsCard({ cursusUser }: CursusSkillsCardProps) {
  const getSkillIcon = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes("unix")) return "💻";
    if (name.includes("algorithm") || name.includes("ai")) return "🧠";
    if (name.includes("rigor")) return "🎯";
    if (name.includes("web")) return "🌐";
    if (name.includes("network") || name.includes("system")) return "🔧";
    if (name.includes("programming") || name.includes("imperative")) return "⚡";
    if (name.includes("object")) return "🔗";
    if (name.includes("graphic")) return "🎨";
    if (name.includes("group") || name.includes("interpersonal")) return "👥";
    if (name.includes("adaptation") || name.includes("creativity")) return "🌟";
    if (name.includes("db") || name.includes("data")) return "📊";
    return "🔥";
  };

  const getSkillColor = (level: number) => {
    if (level >= 10) return "success";
    if (level >= 7) return "info";
    if (level >= 5) return "warning";
    if (level >= 3) return "muted";
    return "error";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const averageSkillLevel = cursusUser.skills.length > 0 
    ? cursusUser.skills.reduce((sum, skill) => sum + skill.level, 0) / cursusUser.skills.length
    : 0;

  const topSkills = [...cursusUser.skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  return (
    <Accordion variant="unfilled" className="w-full">
      <AccordionItem
        value={`cursus-${cursusUser.cursus_id}`}
        className="mb-3 bg-highlight-0 rounded-2xl"
      >
        <AccordionHeader>
          <AccordionTrigger className="py-4">
            <VStack className="flex-1 gap-1">
              <HStack className="gap-2 w-full items-center">
                <Text className="text-lg font-bold text-typography-900 flex-1">
                  🎓 {cursusUser.cursus.name}
                </Text>
                <Badge action="info" variant="solid" size="sm">
                  <BadgeText>Level {cursusUser.level.toFixed(1)}</BadgeText>
                </Badge>
              </HStack>
              
              {/* Summary Stats */}
              <HStack className="gap-4 w-full flex-wrap">
                <Text className="text-sm text-typography-600">
                  📊 {cursusUser.skills.length} skills
                </Text>
                <Text className="text-sm text-typography-600">
                  ⭐ Avg {averageSkillLevel.toFixed(1)}
                </Text>
                <Text className="text-sm text-typography-600">
                  📅 {formatDate(cursusUser.begin_at)} - {formatDate(cursusUser.end_at)}
                </Text>
              </HStack>

              {/* Top 3 Skills Preview */}
              <HStack className="gap-2 w-full flex-wrap">
                {topSkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    action={getSkillColor(skill.level)}
                    variant="outline"
                    size="sm"
                  >
                    <BadgeText>
                      {getSkillIcon(skill.name)} {skill.name} {skill.level.toFixed(1)}
                    </BadgeText>
                  </Badge>
                ))}
              </HStack>
            </VStack>
            <AccordionIcon as={ChevronDownIcon} className="ml-2" />
          </AccordionTrigger>
        </AccordionHeader>
        
        <AccordionContent>
          <VStack className="gap-4 px-4 py-2">
            {/* Cursus Info */}
            <VStack className="bg-highlight-50 p-3 rounded-xl gap-3">
              <Text className="text-typography-800 font-bold text-sm">
                📚 Cursus Information
              </Text>
              <HStack className="justify-between flex-wrap gap-3">
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">🎯</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {cursusUser.level.toFixed(1)}
                  </Text>
                  <Text className="text-xs text-typography-500">Level</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">🏆</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {cursusUser.grade || "N/A"}
                  </Text>
                  <Text className="text-xs text-typography-500">Grade</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">📊</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {cursusUser.skills.length}
                  </Text>
                  <Text className="text-xs text-typography-500">Skills</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-20">
                  <Text className="text-lg">⭐</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {averageSkillLevel.toFixed(1)}
                  </Text>
                  <Text className="text-xs text-typography-500">Avg Level</Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Skills List */}
            {cursusUser.skills.length > 0 ? (
              <VStack className="bg-highlight-50 p-3 rounded-xl gap-3">
                <Text className="text-typography-800 font-bold text-sm">
                  🛠️ Skills Breakdown
                </Text>
                <VStack className="gap-3">
                  {cursusUser.skills
                    .sort((a, b) => b.level - a.level)
                    .map((skill) => (
                      <VStack key={skill.id} className="gap-2">
                        <HStack className="justify-between items-center">
                          <HStack className="items-center gap-2 flex-1">
                            <Text className="text-sm">
                              {getSkillIcon(skill.name)}
                            </Text>
                            <Text className="text-sm font-medium text-typography-700 flex-1">
                              {skill.name}
                            </Text>
                          </HStack>
                          <Badge
                            action={getSkillColor(skill.level)}
                            variant="solid"
                            size="sm"
                          >
                            <BadgeText>{skill.level.toFixed(1)}</BadgeText>
                          </Badge>
                        </HStack>
                        <Progress
                          value={Math.min((skill.level / 15) * 100, 100)}
                          className="w-full h-2"
                        >
                          <ProgressFilledTrack
                            className={`h-full rounded-full ${
                              getSkillColor(skill.level) === "success"
                                ? "bg-success-400"
                                : getSkillColor(skill.level) === "info"
                                ? "bg-info-400"
                                : getSkillColor(skill.level) === "warning"
                                ? "bg-warning-400"
                                : getSkillColor(skill.level) === "error"
                                ? "bg-error-400"
                                : "bg-background-400"
                            }`}
                          />
                        </Progress>
                      </VStack>
                    ))}
                </VStack>
              </VStack>
            ) : (
              <VStack className="bg-highlight-50 p-4 rounded-xl items-center gap-2">
                <Text className="text-lg">🤷‍♂️</Text>
                <Text className="text-typography-600 text-center">
                  No skills data available for this cursus
                </Text>
              </VStack>
            )}
          </VStack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}