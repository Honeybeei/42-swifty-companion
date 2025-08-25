import { UserProfile } from "@/types";
import { Text, View } from "react-native";

interface CursusProgressCardProps {
  userProfile: UserProfile;
}

export default function CursusProgressCard({ userProfile }: CursusProgressCardProps) {
  if (userProfile.cursus_users.length === 0) {
    return null;
  }

  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Cursus Progress
      </Text>
      {userProfile.cursus_users.map((cursusUser) => (
        <View key={cursusUser.id} className="mb-4 last:mb-0">
          <Text className="font-medium text-gray-800">
            {cursusUser.cursus.name}
          </Text>
          <Text className="text-gray-600">
            Level: {cursusUser.level.toFixed(2)}
          </Text>
          {cursusUser.grade && (
            <Text className="text-gray-600">
              Grade: {cursusUser.grade}
            </Text>
          )}
          {cursusUser.has_coalition && (
            <View className="bg-yellow-100 px-2 py-1 rounded mt-2 self-start">
              <Text className="text-yellow-800 text-xs">
                Has Coalition
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}