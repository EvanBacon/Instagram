import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "camera",
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        // backBehavior: 'order',
        // headerMode: 'screen',
        // headerTransitionPreset: 'fade-in-place',
      }}
    />
  );
}
