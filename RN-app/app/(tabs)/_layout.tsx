import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useColorScheme } from "nativewind";

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  
  // Extract color values from your config based on theme
  const getHighlightColor = () => {
    return colorScheme === 'dark' ? '#f5ad66' : '#e08121'; // highlight-600
  };
  
  const getTypographyColor = () => {
    return colorScheme === 'dark' ? 'rgb(140, 140, 140)' : 'rgb(140, 140, 140)'; // typography-500
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
