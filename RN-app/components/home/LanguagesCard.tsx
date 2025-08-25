import { UserProfile } from "@/types";
import { Text, View } from "react-native";

interface LanguagesCardProps {
  userProfile: UserProfile;
}

export default function LanguagesCard({ userProfile }: LanguagesCardProps) {
  if (userProfile.languages_users.length === 0) {
    return null;
  }

  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Languages
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {userProfile.languages_users.map((langUser) => (
          <View
            key={langUser.id}
            className="bg-blue-100 px-3 py-1 rounded-full"
          >
            <Text className="text-blue-800 text-sm">
              Position {langUser.position}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}