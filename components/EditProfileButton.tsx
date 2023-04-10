import { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

type EditProfileButtonProps = {};

export const EditProfileButton: FunctionComponent<
  EditProfileButtonProps
> = () => {
  return (
    <TouchableHighlight>
      <View style={styles.container}>
        <Text style={styles.text}>Edit</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
