import { Text } from "@/components/shared/gluestack-ui/text";
import { VStack } from "@/components/shared/gluestack-ui/vstack";
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

interface CampusInfoCardProps {
  userProfile: UserProfile;
}

export default function CampusInfoCard({ userProfile }: CampusInfoCardProps) {
  if (userProfile.campus.length === 0) {
    return null;
  }
  const isPrimaryCampus = (campus_id: number) => {
    for (const campusUser of userProfile.campus_users) {
      if (campusUser.campus_id === campus_id && campusUser.is_primary) {
        return true;
      }
    }
    return false;
  };

  return (
    <DisplayCard title="Campus">
      <Accordion variant="unfilled" className="w-full" type="multiple">
        {userProfile.campus.map((campus, index) => (
          <AccordionItem
            key={campus.id}
            value={`campus-${index}`}
            className="mb-3 bg-highlight-50 rounded-2xl"
          >
            <AccordionHeader>
              <AccordionTrigger className="py-4">
                <VStack className="flex-1 gap-1">
                  <HStack className="gap-2 w-full items-center">
                    <Text className="text-lg font-bold text-typography-900 flex-1">
                      🏢 {campus.name}
                    </Text>
                    {isPrimaryCampus(campus.id) ? (
                      <Badge action="success" variant="solid" size="sm">
                        <BadgeText>Current</BadgeText>
                      </Badge>
                    ) : (
                      <Badge variant="outline" action="muted" size="sm">
                        <BadgeText>Previous</BadgeText>
                      </Badge>
                    )}
                  </HStack>
                  <HStack className="gap-4 w-full">
                    <Text className="text-sm text-typography-600">
                      📍 {campus.city}, {campus.country}
                    </Text>
                    <Text className="text-sm text-typography-600">
                      👥 {campus.users_count.toLocaleString()} students
                    </Text>
                  </HStack>
                </VStack>
                <AccordionIcon as={ChevronDownIcon} className="ml-2" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <VStack className="gap-4 px-4 py-2">
                {/* Location Card */}
                <VStack className="bg-highlight-100 p-3 rounded-xl gap-2">
                  <Text className="text-typography-800 font-bold text-sm flex-row items-center">
                    🗺️ Location Details
                  </Text>
                  <VStack className="gap-1">
                    <Text className="text-typography-700 font-medium">
                      {campus.address}
                    </Text>
                    <HStack className="gap-2">
                      <Text className="text-typography-600">{campus.city}</Text>
                      <Text className="text-typography-500">•</Text>
                      <Text className="text-typography-600">{campus.zip}</Text>
                      <Text className="text-typography-500">•</Text>
                      <Text className="text-typography-600">
                        {campus.country}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>

                {/* Info Stats Grid */}
                <VStack className="bg-highlight-100 p-3 rounded-xl gap-3">
                  <Text className="text-typography-800 font-bold text-sm">
                    ℹ️ Campus Information
                  </Text>
                  <HStack className="justify-between flex-wrap gap-3">
                    <VStack className="items-center gap-1 flex-1 min-w-20">
                      <Text className="text-lg">🕒</Text>
                      <Text className="text-xs font-medium text-typography-900 text-center">
                        {campus.time_zone}
                      </Text>
                      <Text className="text-xs text-typography-500">
                        Time Zone
                      </Text>
                    </VStack>
                    <VStack className="items-center gap-1 flex-1 min-w-20">
                      <Text className="text-lg">🗣️</Text>
                      <Text className="text-xs font-medium text-typography-900 text-center">
                        {campus.language.name}
                      </Text>
                      <Text className="text-xs text-typography-500">
                        Language
                      </Text>
                    </VStack>
                    <VStack className="items-center gap-1 flex-1 min-w-20">
                      <Text className="text-lg">👥</Text>
                      <Text className="text-xs font-medium text-typography-900 text-center">
                        {campus.users_count.toLocaleString()}
                      </Text>
                      <Text className="text-xs text-typography-500">
                        Students
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>

                {/* Contact & Social */}
                {(campus.website ||
                  campus.facebook ||
                  campus.twitter ||
                  campus.email_extension) && (
                  <VStack className="bg-highlight-100 p-3 rounded-xl gap-2">
                    <Text className="text-typography-800 font-bold text-sm">
                      📞 Contact & Social
                    </Text>
                    <VStack className="gap-2">
                      {campus.email_extension && (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">📧</Text>
                          <Text className="text-typography-600 text-sm">
                            {campus.email_extension}
                          </Text>
                        </HStack>
                      )}
                      {campus.website && (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">🌐</Text>
                          <Text className="text-typography-600 text-sm">
                            {campus.website}
                          </Text>
                        </HStack>
                      )}
                      {campus.facebook && (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">📘</Text>
                          <Text className="text-typography-600 text-sm">
                            {campus.facebook}
                          </Text>
                        </HStack>
                      )}
                      {campus.twitter && (
                        <HStack className="gap-2 items-center">
                          <Text className="text-sm">🐦</Text>
                          <Text className="text-typography-600 text-sm">
                            {campus.twitter}
                          </Text>
                        </HStack>
                      )}
                    </VStack>
                  </VStack>
                )}
              </VStack>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </DisplayCard>
  );
}
