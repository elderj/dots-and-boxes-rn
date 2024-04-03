import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, View } from "react-native";
import { GameBoard } from "./components/GameBoard";
import StartMenu from "./components/StartMenu";
import SplashModalContent from "./components/SplashModalContent";

export default function App() {
  const [splashModalVisible, setSplashModalVisible] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dots and Boxes</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={splashModalVisible}
        onRequestClose={() => {
          setSplashModalVisible(false);
        }}
      >
        <SplashModalContent setSplashModalVisible={setSplashModalVisible} />
      </Modal>

      {!splashModalVisible && startMenuVisible && <StartMenu />}
      {!splashModalVisible && !startMenuVisible && <GameBoard />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
