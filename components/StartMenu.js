import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput, // Import TextInput
} from "react-native";

const StartMenu = ({
  gridSize,
  onBoardSizeChange,
  onStartGame,
  setPlayers,
}) => {
  const [playerOneName, setPlayerOneName] = useState("Player 1"); // State for player one name
  const [playerTwoName, setPlayerTwoName] = useState("Player 2"); // State for player one name
  const [isComputerPlayerEnabled, setIsComputerPlayerEnabled] = useState(true);

  const toggleComputerPlayer = () => {
    setIsComputerPlayerEnabled(!isComputerPlayerEnabled);
  };
  const handleIncrease = () => {
    onBoardSizeChange(gridSize + 1);
  };

  const handleDecrease = () => {
    onBoardSizeChange(Math.max(gridSize - 1, 5)); // Ensure board size doesn't go below 5
  };

  const handleStart = () => {
    setPlayers([
      { name: playerOneName, isComputer: false, color: "#1E88E5" },
      {
        name: playerTwoName,
        isComputer: isComputerPlayerEnabled,
        color: "#FF5252",
      },
    ]);
    onStartGame();
  };

  const { width, height } = Dimensions.get("window");
  const boardSize = Math.min(width, height) * 0.8; // Adjust the multiplier as needed

  return (
    <View style={styles.menu}>
      <Text style={styles.stepperButtonText}>Board Size:</Text>
      <View style={styles.stepperContainer}>
        <TouchableOpacity
          style={{ backgroundColor: "#FF5252", ...styles.stepperButton }}
          onPress={handleDecrease}
          disabled={gridSize <= 4}
        >
          <Text style={{ color: "white", ...styles.stepperButtonText }}>-</Text>
        </TouchableOpacity>
        <Text>
          {gridSize}x{gridSize}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "#4CAF50", ...styles.stepperButton }}
          onPress={handleIncrease}
          disabled={gridSize > 9}
        >
          <Text style={{ color: "white", ...styles.stepperButtonText }}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.stepperButtonText}>Players:</Text>
      <View style={{ flexDirection: "row", width: boardSize }}>
        <View style={styles.playerView}>
          <Text style={styles.playerText}>Player One:</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={playerOneName}
            onChangeText={setPlayerOneName}
            placeholder="Enter Name"
          />
        </View>
        <View style={styles.playerView}>
          <Text style={styles.playerText}>Player One:</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={playerTwoName}
            onChangeText={setPlayerTwoName}
            placeholder="Enter Name"
          />
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Computer Player:</Text>
            <Switch
              value={isComputerPlayerEnabled}
              onValueChange={toggleComputerPlayer}
            />
          </View>
        </View>
      </View>
      <Button title="Start Game" onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },

  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  stepperButton: {
    padding: 4,
    borderRadius: 5,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 28,
  },
  stepperButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    // padding: 1,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 30,
    marginBottom: 30,
  },

  playerView: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  playerText: { textAlign: "center" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    marginTop: 10,
    color: "black", // You can adjust the color as needed
  },
});

export default StartMenu;
