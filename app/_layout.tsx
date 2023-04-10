import { Slot } from "expo-router";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
// import { Audio } from "expo-av";
import * as React from "react";
// import { StyleSheet, View } from "react-native";
// import { connect } from "react-redux";

// import Stories from "./components/Stories/StoriesExperimental";
// import MainNavigation from "./navigation/MainNavigation";
// import NavigationService from "./navigation/NavigationService";
import Gate from "@/rematch/Gate";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function Layout() {
  return (
    <ActionSheetProvider>
      <Gate>
        <Slot />
      </Gate>
    </ActionSheetProvider>
  );
}
