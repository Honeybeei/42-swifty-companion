import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import { Spinner } from "@/components/shared/gluestack-ui/spinner";
import Screen from "@/components/shared/layouts/Screen";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signOut, loadUserProfile, userProfile } = useUserStore();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      // Check if user profile is already loaded
      if (userProfile) {
        setLoading(false);
        return;
      }
      const success = await loadUserProfile();
      if (!success) {
        setError("Failed to load user profile.");
      }
      setLoading(false);
    };
    loadProfile();
  }, [loadUserProfile, userProfile]);

  async function handleSignOut() {
    await signOut();
  }

  if (loading) {
    return (
      <Screen>
        <Spinner size="large" />
      </Screen>
    );
  }

  if (error || !userProfile) {
    return (
      <Screen>
        <Text className="text-xl font-bold text-red-500 mb-4">
          {error || "No user profile available."}
        </Text>
        <Button onPress={handleSignOut}>
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <ScrollView className="flex-1 w-full p-4">
        <Text className="text-2xl font-bold text-primary-500 mb-4">
          42 Profile
        </Text>

        <View className="mb-4 items-center">
          <Image
            source={{ uri: userProfile.image.versions.medium }}
            className="w-24 h-24 rounded-full mb-2"
          />
          <Text className="text-xl font-semibold">
            {userProfile.displayname}
          </Text>
          <Text className="text-lg text-gray-600">@{userProfile.login}</Text>
        </View>

        <View className="space-y-2 mb-4">
          <Text className="text-lg font-semibold">Basic Info</Text>
          <Text>Email: {userProfile.email}</Text>
          <Text>Kind: {userProfile.kind}</Text>
          <Text>Correction Points: {userProfile.correction_point}</Text>
          <Text>Wallet: {userProfile.wallet}</Text>
          <Text>
            Pool: {userProfile.pool_month} {userProfile.pool_year}
          </Text>
          <Text>Location: {userProfile.location || "Not available"}</Text>
        </View>

        {userProfile.campus.length > 0 && (
          <View className="space-y-2 mb-4">
            <Text className="text-lg font-semibold">Campus</Text>
            {userProfile.campus.map((campus) => (
              <Text key={campus.id}>
                {campus.name} ({campus.time_zone})
              </Text>
            ))}
          </View>
        )}

        {userProfile.cursus_users.length > 0 && (
          <View className="space-y-2 mb-4">
            <Text className="text-lg font-semibold">Cursus</Text>
            {userProfile.cursus_users.map((cursus) => (
              <View key={cursus.id} className="mb-2">
                <Text>Course: {cursus.cursus.name}</Text>
                <Text>Level: {cursus.level.toFixed(2)}</Text>
                <Text>
                  Started: {new Date(cursus.begin_at).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Button onPress={handleSignOut} className="mt-4">
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </ScrollView>
    </Screen>
  );
}
