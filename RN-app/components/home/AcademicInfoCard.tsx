import { UserProfile } from "@/types";
import { Text, View } from "react-native";

interface AcademicInfoCardProps {
  userProfile: UserProfile;
}

export default function AcademicInfoCard({ userProfile }: AcademicInfoCardProps) {
  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Academic Information
      </Text>

      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Correction Points</Text>
          <Text className="font-medium text-gray-800">
            {userProfile.correction_point}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Wallet</Text>
          <Text className="font-medium text-gray-800">
            ₳{userProfile.wallet}
          </Text>
        </View>

        {userProfile.pool_month && userProfile.pool_year && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Pool</Text>
            <Text className="font-medium text-gray-800">
              {userProfile.pool_month} {userProfile.pool_year}
            </Text>
          </View>
        )}

        {userProfile.location && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Location</Text>
            <Text className="font-medium text-gray-800">
              {userProfile.location}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}