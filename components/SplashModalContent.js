import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { CustomText } from "./CustomText";

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashModalContent(props) {
  return (
    <View style={styles.splashModalContent}>
      <CustomText />
      <Text>Custom Text with Reddit Mono Font</Text>
      <TouchableOpacity onPress={() => props.setSplashModalVisible(false)}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  splashModalContent: {
    flex: 1,

    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    elevation: 2,
    color: "white",
  },
});
