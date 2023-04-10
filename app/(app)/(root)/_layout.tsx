import { ResponsiveNavigator } from "@/navigators/ResponsiveNavigator";
import { Slot, Tabs } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  return (
    <ResponsiveNavigator />
    // <Tabs>
    //   <Tabs.Screen name="index" />
    //   <Tabs.Screen
    //     name="[user]"
    //     options={{
    //       href: "/baconbrix",
    //     }}
    //   />
    // </Tabs>
  );
}
