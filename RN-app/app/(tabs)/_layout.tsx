import ErrorScreen from "@/components/shared/ErrorScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useUserStore } from "@/store/userStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const { loadUserProfile, userProfile, userProfileError } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    const initializeProfile = async () => {
      if (userProfile) {
        setLoading(false);
        return;
      }
      await loadUserProfile();
      setLoading(false);
    };

    initializeProfile();
  }, [loadUserProfile, userProfile]);

  if (loading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  const handleGoToAuth = () => {
    router.dismissTo("/auth");
  };

  // Error case handling
  if (userProfileError || !userProfile) {
    return (
      <ErrorScreen
        message={
          userProfileError
            ? userProfileError.message
            : "No user profile available."
        }
        errorDetails={userProfileError ? userProfileError.details : undefined}
        showNextActionButton
        nextActionButtonProps={{
          buttonText: "Go back to auth screen",
          handleRedirect: handleGoToAuth,
        }}
      />
    );
  }

  const getHighlightColor = () => {
    return colorScheme === "dark" ? "#f5ad66" : "#e08121"; // highlight-600
  };

  const getTypographyColor = () => {
    return colorScheme === "dark" ? "rgb(140, 140, 140)" : "rgb(140, 140, 140)"; // typography-500
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => {
          return <View className="bg-highlight-100 flex flex-1" />;
        },
        tabBarStyle: {
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: getHighlightColor(),
        tabBarInactiveTintColor: getTypographyColor(),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          tabBarLabel: "Projects",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          tabBarLabel: "Skills",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="stars" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
