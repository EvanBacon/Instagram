import { MaterialTopTabs } from "@/navigators/MaterialTopTabs";
import { Slot } from "expo-router";
import * as React from "react";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function Layout() {
  return <Slot />;
  return (
    <MaterialTopTabs
      screenOptions={{
        lazy: true,
        swipeEnabled: true,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <MaterialTopTabs.Screen name="(camera)" />
      <MaterialTopTabs.Screen name="(root)" />
    </MaterialTopTabs>
  );
}
