import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Edge from "./Edge";

const { width, height } = Dimensions.get("window");
const boardSize = Math.min(width, height) * 0.8; // Adjust the multiplier as needed

export const GameBoard = (props) => {
  const renderDots = () => {
    const dots = [];
    for (let j = 0; j < props.gridSize * 2 + 1; j++) {
      let relativeIdxX = 1;

      for (let i = 0; i < (props.gridSize + 1) * 2 - 1; i++) {
        if ((j % 2 !== 0 && i % 2 === 0) || (j % 2 === 0 && i % 2 !== 0)) {
          dots.push(
            <Edge
              x={relativeIdxX}
              i={i}
              j={j}
              boardSize={boardSize}
              gridSize={props.gridSize}
            />
          );
          relativeIdxX++;
        } else {
          dots.push(
            <View
              key={`${i}-${j}`}
              style={[
                styles.dot,
                {
                  left: (boardSize / (props.gridSize * 2)) * i - 5, // Adjust the offset
                  top: (boardSize / (props.gridSize * 2)) * j - 5, // Adjust the offset
                },
              ]}
            />
          );
        }
      }
    }
    return dots;
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < props.gridSize; i++) {
      const rowCells = [];
      for (let j = 0; j < props.gridSize; j++) {
        if (i !== j) {
          rowCells.push(
            <View
              key={`${i}-${j}`}
              style={[
                styles.cell,
                {
                  width: boardSize / props.gridSize,
                  height: boardSize / props.gridSize,
                },
              ]}
            />
          );
        } else {
          rowCells.push(
            <View
              key={`${i}-${j}`}
              style={[
                styles.cell,
                {
                  width: boardSize / props.gridSize,
                  height: boardSize / props.gridSize,
                  backgroundColor: "aqua",
                },
              ]}
            />
          );
        }
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

    zIndex: 1, // Set zIndex to 3 for cells
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
    position: "absolute",
    zIndex: 1, // Set zIndex to 1 for dots
  },
  orangeDot: {
    width: 40,
    height: 20,
    backgroundColor: "orange",
    borderRadius: 5,
    position: "absolute",
    zIndex: 10000, // Higher than the dot
  },
  cell: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    zIndex: 1,
    // position: "absolute",
  },
  row: {
    flexDirection: "row",
    zIndex: 1,
  },
});

export default GameBoard;
