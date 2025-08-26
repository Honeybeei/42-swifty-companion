import AchievementsCard from "@/components/home/AchievementsCard";
import BasicProfileCard from "@/components/home/BasicProfileCard";
import CampusInfoCard from "@/components/home/CampusInfoCard";
import CursusStatusCard from "@/components/home/CursusStatusCard";
import ErrorScreen from "@/components/shared/ErrorScreen";
import Screen from "@/components/shared/layouts/Screen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useUserStore } from "@/store/userStore";
import { logObject } from "@/utils/log";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loadUserProfile, userProfile } = useUserStore();

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

  logObject(userProfile);

  if (loading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  if (error || !userProfile) {
    return <ErrorScreen message={error || "No user profile available."} />;
  }

  return (
    <Screen isSafeArea={false}>
      <ScrollView className="flex-1 w-full pt-safe px-4">
        <BasicProfileCard userProfile={userProfile} />
        <CursusStatusCard userProfile={userProfile} />
        <CampusInfoCard userProfile={userProfile} />
        <AchievementsCard userProfile={userProfile} />
      </ScrollView>
    </Screen>
  );
}
