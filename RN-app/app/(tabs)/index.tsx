import AcademicInfoCard from "@/components/home/AcademicInfoCard";
import CampusInfoCard from "@/components/home/CampusInfoCard";
import CursusProgressCard from "@/components/home/CursusProgressCard";
import LanguagesCard from "@/components/home/LanguagesCard";
import UserCard from "@/components/home/UserCard";
import ErrorScreen from "@/components/shared/ErrorScreen";
import { Button, ButtonText } from "@/components/shared/gluestack-ui/button";
import Screen from "@/components/shared/layouts/Screen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

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
    return <LoadingScreen message="Loading profile..." />;
  }

  if (error || !userProfile) {
    return <ErrorScreen message={error || "No user profile available."} />;
  }

  return (
    <Screen isSafeArea={false}>
      <ScrollView className="flex-1 w-full pt-safe px-4">
        <UserCard userProfile={userProfile} />
        <AcademicInfoCard userProfile={userProfile} />
        <CampusInfoCard userProfile={userProfile} />
        <CursusProgressCard userProfile={userProfile} />
        <LanguagesCard userProfile={userProfile} />

        <Button onPress={handleSignOut} className="mt-4">
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </ScrollView>
    </Screen>
  );
}
