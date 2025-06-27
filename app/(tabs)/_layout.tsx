import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Fitness" }} />
      <Tabs.Screen name="cardio" options={{ title: "Cardio" }} />;
    </Tabs>
  );
}
