import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  customText: {
    fontFamily: "RedditMono",
    // fontSize: 16,
  },
});

export const CustomText = () => {
  return (
    <Text style={styles.customText}>Custom Text with Reddit Mono Font</Text>
  );
};
