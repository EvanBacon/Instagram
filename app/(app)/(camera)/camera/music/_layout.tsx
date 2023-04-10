import SearchBar from "@/components/SearchBar/SearchBar";
import { MaterialTopTabs } from "@/navigators/MaterialTopTabs";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const musicBackgroundColor = "rgba(0,0,0,0.0)";

export default function MusicScreen() {
  return (
    <Animatable.View
      style={StyleSheet.absoluteFill}
      animation="fadeIn"
      duration={300}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <BlurView tint={"dark"} intensity={100} style={{ flex: 1 }}>
        <SearchBar
          round
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: "white",
            outlineWidth: 0,
            outlineStyle: "none",
          }}
          placeholder="Search music"
        />
        <MaterialLayout />
      </BlurView>
    </Animatable.View>
  );
}

function MaterialLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        transparentCard: true,
        mode: "card",
        headerMode: "float",
        headerLayoutPreset: "center",

        cardStyle: {
          backgroundColor: musicBackgroundColor,
        },
        headerTransitionPreset: "uikit",
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: musicBackgroundColor,
            borderBottomColor: "white",
            borderBottomWidth: 1,
          },
          headerTintColor: "white",
          headerBackImage: () => (
            <EvilIcons name="chevron-left" color={"white"} size={56} />
          ),
        },
      }}
    />
  );
}
