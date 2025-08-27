import AchievementsCard from "@/components/home/AchievementsCard";
import BasicProfileCard from "@/components/home/BasicProfileCard";
import CampusInfoCard from "@/components/home/CampusInfoCard";
import CursusStatusCard from "@/components/home/CursusStatusCard";
import Screen from "@/components/shared/layouts/Screen";
import { useUserStore } from "@/store/userStore";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const { userProfile } = useUserStore();

  // userProfile is guaranteed to exist due to TabsLayout guard
  if (!userProfile) {
    return null; // This should never happen due to TabsLayout guard
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
