import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, View } from "react-native";
import { GameBoard } from "./components/GameBoard";
import StartMenu from "./components/StartMenu";
import SplashModalContent from "./components/SplashModalContent";

export default function App() {
  const [splashModalVisible, setSplashModalVisible] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(true);

  const [boardSize, setBoardSize] = useState(5);
  const [vsComputer, setVsComputer] = useState(true);

  const handleStartGame = () => {
    console.log("Starting a game");
    console.log("Board Size:" + boardSize);
    console.log("Play Comp:" + vsComputer);

    setStartMenuVisible(false);
  };

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

      {!splashModalVisible && startMenuVisible && (
        <StartMenu
          boardSize={boardSize}
          onBoardSizeChange={setBoardSize}
          vsComputer={vsComputer}
          onVsComputerChange={setVsComputer}
          onStartGame={handleStartGame}
        />
      )}
      {!splashModalVisible && !startMenuVisible && (
        <View>
          <Text style={styles.gameBoardText}>
            {boardSize + "x" + boardSize}
          </Text>
          <GameBoard gridSize={boardSize} />
        </View>
      )}
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
  gameBoardText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
