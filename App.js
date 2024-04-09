import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, View } from "react-native";
import { GameBoard } from "./components/GameBoard";
import StartMenu from "./components/StartMenu";
import SplashModalContent from "./components/SplashModalContent";

export default function App() {
  const [splashModalVisible, setSplashModalVisible] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(true);

  const [gridSize, setGridSize] = useState(5);
  const [vsComputer, setVsComputer] = useState(true);
  const [playersTurn, setPlayersTurn] = useState(1);

  const [players, setPlayers] = useState([]);

  const handleStartGame = () => {
    console.log("Starting a game");
    console.log("Grid Size:" + gridSize);
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
          gridSize={gridSize}
          onBoardSizeChange={setGridSize}
          vsComputer={vsComputer}
          onVsComputerChange={setVsComputer}
          onStartGame={handleStartGame}
          setPlayers={setPlayers}
        />
      )}
      {!splashModalVisible && !startMenuVisible && (
        <View style={styles.gameContainer}>
          <Text style={styles.gameBoardText}>Player {playersTurn}'s turn</Text>
          <Text style={styles.gameBoardText}>{gridSize + "x" + gridSize}</Text>
          <GameBoard
            gridSize={gridSize}
            players={players}
            playersTurn={playersTurn}
            setPlayersTurn={setPlayersTurn}
          />
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
    paddingTop: 40, // Adjust this value as needed
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  gameContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  gameBoardText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
