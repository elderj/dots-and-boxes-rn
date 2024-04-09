import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Cell = ({ x, y, boardSize, gridSize, cellState }) => {
  const index = cellState.findIndex(
    (cell) => cell.x === x + 1 && cell.y === y + 1
  );

  const getBackgroundColor = (ownership) => {
    switch (ownership) {
      case "empty":
        return "lightgray";
      case "owned":
        return "salmon";
      // Add more cases for other statuses as needed
      default:
        return "lightgray"; // Default color
    }
  };

  const checker = () => {
    console.log("check cell state");
    console.log(cellState[index]);
    console.log("Check coords:   x" + (x + 1) + "   y:" + (y + 1));
    console.log("Index:");
    console.log(index);
  };

  return (
    <TouchableOpacity onPress={checker}>
      <View
        style={[
          styles.cell,
          {
            width: boardSize / gridSize,
            height: boardSize / gridSize,
            backgroundColor: getBackgroundColor(cellState[index]?.ownership),
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
