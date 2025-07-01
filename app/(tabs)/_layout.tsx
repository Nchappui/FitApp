import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f1f5f9",
          height: 50,
          paddingBottom: 0,
          paddingTop: 10,
          paddingHorizontal: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          marginTop: 0,
        },
        tabBarIconStyle: {
          display: "none",
        },
        headerStyle: {
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "700",
          color: "#1f2937",
        },
        headerTintColor: "#1976d2",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Fitness",
          headerTitle: "💪 Fitness Tracker",
        }}
      />
      <Tabs.Screen
        name="cardio"
        options={{
          title: "Cardio",
          headerTitle: "❤️ Cardio Training",
        }}
      />
    </Tabs>
  );
}
