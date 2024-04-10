import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const StartMenu = ({
  gridSize,
  onBoardSizeChange,
  onStartGame,
  setPlayers,
}) => {
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");
  const [isComputerPlayerEnabled, setIsComputerPlayerEnabled] = useState(false);
  const [computerDifficulty, setComputerDifficulty] = useState("easy");
  const [showDifficultyOptions, setShowDifficultyOptions] = useState(false);

  const handleIncrease = () => {
    onBoardSizeChange(gridSize + 1);
  };

  const handleDecrease = () => {
    onBoardSizeChange(Math.max(gridSize - 1, 5));
  };

  const handleStart = () => {
    setPlayers([
      { name: playerOneName, isComputer: false, color: "#1E88E5" },
      {
        name: playerTwoName,
        isComputer: isComputerPlayerEnabled,
        color: "#FF5252",
        difficulty: computerDifficulty,
      },
    ]);
    onStartGame();
  };

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
        <Text style={styles.playerText}>Player Two:</Text>
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
            onValueChange={(value) => {
              setIsComputerPlayerEnabled(value);
              setShowDifficultyOptions(value);
            }}
          />
        </View>
        {showDifficultyOptions && (
          <View style={styles.difficultyOptions}>
            <Text style={styles.label}>Difficulty:</Text>
            <TouchableOpacity
              onPress={() => setComputerDifficulty("easy")}
              style={[
                styles.difficultyButton,
                computerDifficulty === "easy" &&
                  styles.selectedDifficultyButton,
              ]}
            >
              <Text style={styles.difficultyButtonText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setComputerDifficulty("medium")}
              style={[
                styles.difficultyButton,
                computerDifficulty === "medium" &&
                  styles.selectedDifficultyButton,
              ]}
            >
              <Text style={styles.difficultyButtonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setComputerDifficulty("hard")}
              style={[
                styles.difficultyButton,
                computerDifficulty === "hard" &&
                  styles.selectedDifficultyButton,
              ]}
            >
              <Text style={styles.difficultyButtonText}>Hard</Text>
            </TouchableOpacity>
          </View>
        )}
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
    width: 300, // Set a fixed width
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
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  playerView: {
    marginBottom: 10,
  },
  playerText: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    color: "black",
  },
  difficultyOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  difficultyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  selectedDifficultyButton: {
    backgroundColor: "#2196F3",
  },
  difficultyButtonText: {
    color: "black",
  },
});

export default StartMenu;
