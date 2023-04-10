import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const FeedFooter: React.FC<Props> = ({ onPress }) => {
  const height = 36;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonContainer, { height, borderRadius: height / 2 }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Load More...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default FeedFooter;
