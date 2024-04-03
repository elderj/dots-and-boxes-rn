import React from "react";
import {
  View,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const StartMenu = ({
  boardSize,
  onBoardSizeChange,
  vsComputer,
  onVsComputerChange,
  onStartGame,
}) => {
  const handleIncrease = () => {
    onBoardSizeChange(boardSize + 1);
  };

  const handleDecrease = () => {
    onBoardSizeChange(Math.max(boardSize - 1, 5)); // Ensure board size doesn't go below 5
  };

  return (
    <View style={styles.menu}>
      <View style={styles.stepperContainer}>
        <Text style={{ width: 120, ...styles.stepperButtonText }}>
          Board Size: {boardSize}x{boardSize}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "red", ...styles.stepperButton }}
          onPress={handleDecrease}
          disabled={boardSize <= 4}
        >
          <Text style={{ color: "white", ...styles.stepperButtonText }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "green", ...styles.stepperButton }}
          onPress={handleIncrease}
          disabled={boardSize > 9}
        >
          <Text style={{ color: "white", ...styles.stepperButtonText }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.stepperButtonText}>Play against Computer:</Text>
        <Switch value={vsComputer} onValueChange={onVsComputerChange} />
      </View>
      <Button title="Start Game" onPress={onStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
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
    margin: 2,
    alignItems: "center",
  },
  stepperButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  boardSizeText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
});

export default StartMenu;
