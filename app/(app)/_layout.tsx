import { MaterialTopTabs } from "@/navigators/MaterialTopTabs";
import * as React from "react";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function Layout() {
  return (
    <MaterialTopTabs
      screenOptions={{
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
