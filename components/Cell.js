import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Cell = ({ x, y, boardSize, gridSize, cellState }) => {
  const index = cellState.findIndex(
    (cell) => cell.x === x + 1 && cell.y === y + 1
  );

  const getBackgroundColor = (ownership, capturedBy) => {
    switch (ownership) {
      case "empty":
        return "lightgray";
      case "owned":
        if (capturedBy === 1) {
          return "#64B5F6";
        } else if (capturedBy === 2) {
          // Check which player captured the cell
          return "#FF8A80";
        }
      default:
        return "lightgray"; // Default color
    }
  };

  const checker = () => {
    // console.log("check cell state");
    // console.log(cellState[index]);
    // console.log("Check coords:   x" + (x + 1) + "   y:" + (y + 1));
    // console.log("Index:");
    // console.log(index);
  };

  return (
    <TouchableOpacity onPress={checker}>
      <View
        style={[
          styles.cell,
          {
            width: boardSize / gridSize,
            height: boardSize / gridSize,
            backgroundColor: getBackgroundColor(
              cellState[index]?.ownership,
              cellState[index]?.capturedBy
            ),
          },
        ]}
      >
        {/* <Text>
          X: {cellState[index]?.x} Y: {cellState[index]?.y}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Cell;
