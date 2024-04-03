import React from "react";
import {
  View,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Edge = ({ x, i, j, boardSize, gridSize }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log("x:" + x + "  y:" + j)}
      key={`${i}-${j}`}
      style={{ zIndex: 50000 }}
    >
      <View
        style={[
          styles.orangeDot,
          {
            left: (boardSize / (gridSize * 2)) * i - 10, // Adjust the offset
            top: (boardSize / (gridSize * 2)) * j - 10, // Adjust the offset
          },
        ]}
      ></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orangeDot: {
    width: 20,
    height: 20,
    backgroundColor: "orange",
    borderRadius: 25,
    position: "absolute",
    zIndex: 10000, // Higher than the dot
  },
});

export default Edge;
