import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import FeedList from "@/components/FeedList";
import SplashScreen from "@/components/SplashScreen";
import Posts from "@/constants/Posts";
import useLayout from "@/useLayout";
import { Stack } from "expo-router";

export default function HomeScreen() {
  const { onLayout, width } = useLayout();
  const [isShowingSplashScreen, setShowingSplash] = React.useState(true);
  let lastWidth = NaN;
  React.useEffect(() => {
    if (width != null && width !== lastWidth) {
      lastWidth = width;
      setShowingSplash(false);
    }
  }, [width]);

  const isLarge = width >= 600;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Instagram",
        }}
      />
      <View onLayout={onLayout} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: isLarge ? "center" : "stretch",
          }}
          style={{
            backgroundColor: "rgb(250,250,250)",
            flex: 1,
          }}
        >
          <FeedList isLarge={isLarge} style={styles.container} data={Posts} />
        </ScrollView>
      </View>
      {isShowingSplashScreen && <SplashScreen />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 600,

    backgroundColor: "transparent",
  },
});
