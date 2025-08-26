import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/shared/gluestack-ui/avatar";
import { Heading } from "@/components/shared/gluestack-ui/heading";
import { UserProfile } from "@/types";
import DisplayCard from "../shared/DisplayCard";
import { Badge, BadgeText } from "../shared/gluestack-ui/badge";
import { HStack } from "../shared/gluestack-ui/hstack";
import { Text } from "../shared/gluestack-ui/text";
import { VStack } from "../shared/gluestack-ui/vstack";

interface BasicProfileCardProps {
  userProfile: UserProfile;
}

export default function BasicProfileCard({
  userProfile,
}: BasicProfileCardProps) {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <DisplayCard>
      <VStack className="items-center gap-4">
        {/* Avatar and Name Section */}
        <VStack className="items-center gap-2">
          <Avatar size="xl">
            <AvatarFallbackText>
              {userProfile.displayname.charAt(0).toUpperCase()}
            </AvatarFallbackText>
            <AvatarImage
              source={{ uri: userProfile.image.versions.large }}
              alt={userProfile.displayname}
            />
            {userProfile.location && <AvatarBadge />}
          </Avatar>
          <VStack className="items-center gap-1">
            <Heading size="xl" className="text-typography-900 text-center">
              {userProfile.displayname}
            </Heading>
            <Text className="text-highlight-700 font-medium">
              @{userProfile.login}
            </Text>
            <Text className="text-typography-600 text-center">
              {userProfile.email}
            </Text>
          </VStack>
        </VStack>

        {/* Recent Activity */}
        <VStack className="items-center gap-1">
          <Text className="text-info-600 font-medium text-sm">
            ⚡ Last activity: {formatTimeAgo(userProfile.updated_at)}
          </Text>
          <Text className="text-typography-500 text-xs">
            Recent activity on platform
          </Text>
        </VStack>

        {/* Divider */}
        <VStack className="w-full items-center">
          <Text className="text-typography-400">───────────────</Text>
        </VStack>

        {/* Stats Section */}
        <HStack className="gap-6 justify-center flex-wrap">
          <VStack className="items-center gap-1">
            <Text className="text-sm">💰</Text>
            <Text className="font-semibold text-typography-900">
              {userProfile.wallet}
            </Text>
            <Text className="text-xs text-typography-500">Wallet</Text>
          </VStack>
          {userProfile.location && (
            <VStack className="items-center gap-1">
              <Text className="text-sm">📍</Text>
              <Text className="font-semibold text-typography-900">
                {userProfile.location}
              </Text>
              <Text className="text-xs text-typography-500">Location</Text>
            </VStack>
          )}
          <VStack className="items-center gap-1">
            <Text className="text-sm">📊</Text>
            <Text className="font-semibold text-typography-900">
              {userProfile.correction_point}
            </Text>
            <Text className="text-xs text-typography-500">Points</Text>
          </VStack>
        </HStack>

        {/* Join Date */}
        <Text className="text-typography-600 text-sm">
          📅 Joined {formatJoinDate(userProfile.created_at)}
        </Text>

        {/* Status Badges */}
        <HStack className="flex-wrap gap-2 justify-center">
          {userProfile["staff?"] && (
            <Badge action="info" variant="solid" size="sm">
              <BadgeText>Staff</BadgeText>
            </Badge>
          )}
          {userProfile["alumni?"] && (
            <Badge action="success" variant="solid" size="sm">
              <BadgeText>Alumni</BadgeText>
            </Badge>
          )}
          {userProfile["active?"] && (
            <Badge action="success" variant="outline" size="sm">
              <BadgeText>Active</BadgeText>
            </Badge>
          )}
          <Badge action="muted" variant="solid" size="sm">
            <BadgeText>{userProfile.kind}</BadgeText>
          </Badge>
        </HStack>
      </VStack>
    </DisplayCard>
  );
}
