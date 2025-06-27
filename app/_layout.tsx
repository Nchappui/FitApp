import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="exercise/[id]"
        options={{
          headerShown: true,
          presentation: "card",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
