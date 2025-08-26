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

interface CursusStatusCardProps {
  userProfile: UserProfile;
}

export default function CursusStatusCard({
  userProfile,
}: CursusStatusCardProps) {
  if (userProfile.cursus_users.length === 0) {
    return null;
  }

  const getCursusStatus = (cursusUser: any) => {
    if (cursusUser.end_at) {
      return { status: "Completed", action: "success" as const };
    } else if (cursusUser.begin_at) {
      return { status: "In Progress", action: "info" as const };
    }
    return { status: "Not Started", action: "muted" as const };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatLevel = (level: number) => {
    return level.toFixed(2);
  };

  return (
    <DisplayCard title="Cursus Status">
      <Accordion variant="unfilled" className="w-full" type="multiple">
        {userProfile.cursus_users.map((cursusUser, index) => {
          const { status, action } = getCursusStatus(cursusUser);

          return (
            <AccordionItem
              key={cursusUser.id}
              value={`cursus-${index}`}
              className="mb-3 bg-highlight-50 rounded-2xl"
            >
              <AccordionHeader>
                <AccordionTrigger className="py-4">
                  <VStack className="flex-1 gap-1">
                    <HStack className="gap-2 w-full items-center">
                      <Text className="text-lg font-bold text-typography-900 flex-1">
                        🎓 {cursusUser.cursus.name}
                      </Text>
                      <Badge action={action} variant="solid" size="sm">
                        <BadgeText>{status}</BadgeText>
                      </Badge>
                    </HStack>
                    <HStack className="gap-4 w-full">
                      <Text className="text-sm text-typography-600">
                        📊 Level {formatLevel(cursusUser.level)}
                      </Text>
                      {cursusUser.grade && (
                        <Text className="text-sm text-typography-600">
                          🏆 {cursusUser.grade}
                        </Text>
                      )}
                      <Text className="text-sm text-typography-600">
                        🔧 {cursusUser.skills.length} skills
                      </Text>
                    </HStack>
                  </VStack>
                  <AccordionIcon as={ChevronDownIcon} className="ml-2" />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <VStack className="gap-4 px-4 py-2">
                  {/* Timeline Card */}
                  <VStack className="bg-highlight-100  p-3 rounded-xl gap-2">
                    <Text className="text-typography-800 font-bold text-sm">
                      📅 Timeline
                    </Text>
                    <VStack className="gap-2">
                      <HStack className="gap-2 items-center">
                        <Text className="text-sm">🚀</Text>
                        <Text className="text-typography-700 text-sm font-medium">
                          Started: {formatDate(cursusUser.begin_at)}
                        </Text>
                      </HStack>
                      {cursusUser.end_at ? (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">✅</Text>
                          <Text className="text-success-600 text-sm font-medium">
                            Completed: {formatDate(cursusUser.end_at)}
                          </Text>
                        </HStack>
                      ) : (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">⚡</Text>
                          <Text className="text-info-600 text-sm font-medium">
                            Status: Currently Active
                          </Text>
                        </HStack>
                      )}
                      {cursusUser.blackholed_at && (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">🕳️</Text>
                          <Text className="text-error-600 text-sm font-medium">
                            Blackholed: {formatDate(cursusUser.blackholed_at)}
                          </Text>
                        </HStack>
                      )}
                    </VStack>
                  </VStack>

                  {/* Skills */}
                  {cursusUser.skills.length > 0 && (
                    <VStack className="bg-highlight-100 p-3 rounded-xl gap-3">
                      <Text className="text-typography-800 font-bold text-sm">
                        🛠️ Skills Acquired ({cursusUser.skills.length})
                      </Text>
                      <HStack className="gap-2 flex-wrap">
                        {cursusUser.skills.map((skill) => (
                          <Badge
                            key={skill.id}
                            action="info"
                            variant="outline"
                            size="sm"
                          >
                            <BadgeText>{skill.name}</BadgeText>
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>
                  )}
                </VStack>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </DisplayCard>
  );
}
