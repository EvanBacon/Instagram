import { Link, useNavigation, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const navigation = useNavigation();
  const router = useRouter();

  const dismiss = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace("/");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.main} pointerEvents="auto">
        <Text style={styles.title}>High-level Post</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Text onPress={dismiss} style={styles.subtitle}>
          Dismiss
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  main: {
    backgroundColor: "white",
    borderRadius: 4,
    height: 450,
    maxHeight: 450,
    flex: 1,
    justifyContent: "center",
    width: "90%",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
