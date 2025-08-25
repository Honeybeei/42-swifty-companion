import { UserProfile } from "@/types";
import { Image, Text, View } from "react-native";

interface UserCardProps {
  userProfile: UserProfile;
}

export default function UserCard({ userProfile }: UserCardProps) {
  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: userProfile.image.versions.medium }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-800">
            {userProfile.displayname}
          </Text>
          <Text className="text-gray-600">{userProfile.email}</Text>
          <Text className="text-gray-500">@{userProfile.login}</Text>
        </View>
      </View>

      {/* Status indicators */}
      <View className="flex-row flex-wrap gap-2">
        {userProfile["staff?"] && (
          <View className="bg-purple-100 px-3 py-1 rounded-full">
            <Text className="text-purple-800 text-sm font-medium">Staff</Text>
          </View>
        )}
        {userProfile["alumni?"] && (
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-blue-800 text-sm font-medium">Alumni</Text>
          </View>
        )}
        {userProfile["active?"] && (
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-800 text-sm font-medium">Active</Text>
          </View>
        )}
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-gray-800 text-sm font-medium">
            {userProfile.kind}
          </Text>
        </View>
      </View>
    </View>
  );
}
