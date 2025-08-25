import { UserProfile } from "@/types";
import { Text, View } from "react-native";

interface CampusInfoCardProps {
  userProfile: UserProfile;
}

export default function CampusInfoCard({ userProfile }: CampusInfoCardProps) {
  if (userProfile.campus.length === 0) {
    return null;
  }

  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-4">Campus</Text>
      {userProfile.campus.map((campus) => (
        <View key={campus.id} className="mb-3 last:mb-0">
          <Text className="font-medium text-gray-800">{campus.name}</Text>
          <Text className="text-gray-600">{campus.time_zone}</Text>
          <Text className="text-gray-500">{campus.language.name}</Text>
        </View>
      ))}
    </View>
  );
}