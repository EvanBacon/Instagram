import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as React from "react";
import Gate from "@/rematch/Gate";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(app)",
};

export default function Layout() {
  return (
    <ActionSheetProvider>
      <Gate>
        <Stack
          screenOptions={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="(app)" />
          <Stack.Screen
            name="(post-modal)/p/[post-id]"
            options={{
              presentation: "transparentModal",
              animation: "none",
            }}
          />
        </Stack>
      </Gate>
    </ActionSheetProvider>
  );
}
