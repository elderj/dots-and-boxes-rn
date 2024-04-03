import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const boardSize = Math.min(width, height) * 0.9; // Adjust the multiplier as needed
const gridSize = 10; // Number of rows and columns in the grid

export const GameBoard = () => {
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < gridSize + 1; i++) {
      for (let j = 0; j < gridSize + 1; j++) {
        dots.push(
          <View
            key={`${i}-${j}`}
            style={[
              styles.dot,
              {
                left: (boardSize / gridSize) * i - 5, // Adjust the offset
                top: (boardSize / gridSize) * j - 5, // Adjust the offset
              },
            ]}
          />
        );
      }
    }
    return dots;
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < gridSize; i++) {
      const rowCells = [];
      for (let j = 0; j < gridSize; j++) {
        rowCells.push(
          <View
            key={`${i}-${j}`}
            style={[
              styles.cell,
              {
                width: boardSize / gridSize,
                height: boardSize / gridSize,
              },
            ]}
          />
        );
      }
      cells.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowCells}
        </View>
      );
    }
    return cells;
  };

  return (
    <View style={styles.gameBoard}>
      {renderDots()}
      {renderCells()}
    </View>
  );
};

const styles = StyleSheet.create({
  gameBoard: {
    width: boardSize,
    height: boardSize,
    backgroundColor: "gray",
    position: "relative",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
    position: "absolute",
  },
  cell: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
});

export default GameBoard;
