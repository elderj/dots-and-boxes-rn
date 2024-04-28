import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { darkenColor, lightenColor } from "./helper";

// TODO: Affect Cells based off edge values
// TODO: Add player scores

const Edge = ({
  x,
  i,
  j,
  boardSize,
  gridSize,
  edgeState,
  setEdgeState,
  status,
  playersTurn,
  ownership,
  p1Color,
  p2Color,
}) => {
  const handlePress = () => {
    if (status !== "confirmed") {
      const updatedEdgeState = edgeState.map((edge) => {
        if (edge.x === x && edge.y === j) {
          // Toggle the status between "selected" and "confirmed" if the edge is already selected
          if (edge.status === "selected") {
            return {
              ...edge,
              status: "confirmed",
              ownership: playersTurn,
            };
          }
          // Set the clicked edge to "selected"
          return {
            ...edge,
            status: "selected",
            ownership: playersTurn,
          };
        } else if (edge.status === "selected") {
          // Reset any other edge that is currently "selected" to "open"
          return {
            ...edge,
            status: "open",
            ownership: 0,
          };
        }
        return edge;
      });

      // Update the edge state with the new state
      setEdgeState(updatedEdgeState);
    } else {
      //TODO: possible toast or notification here
    }
  };

  // Calculate dynamic offsets based on gridSize
  const horizontalOffset = (boardSize / (gridSize * 2)) * i;
  const verticalOffset = (boardSize / (gridSize * 2)) * j;

  return j % 2 === 0 ? (
    <TouchableOpacity
      onPress={handlePress}
      key={`${i}-${j}`}
      style={{ zIndex: 2 }}
    >
      <View
        style={[
          styles.edge,
          {
            width: boardSize / gridSize,
            left: horizontalOffset - boardSize / (gridSize * 2),
            top: verticalOffset - 2,
            height: 5,
            padding: 0,
            backgroundColor: highlightEdge(status, ownership, p1Color, p2Color),
          },
        ]}
      >
        {/* <Text>{x + " " + j}</Text> */}
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={handlePress}
      key={`${i}-${j}`}
      style={{ zIndex: 2 }}
    >
      <View
        style={[
          styles.edge,
          {
            height: boardSize / gridSize,
            width: 5,
            left: horizontalOffset - 2,
            top: verticalOffset - boardSize / (gridSize * 2),

            backgroundColor: highlightEdge(status, ownership, p1Color, p2Color),
          },
        ]}
      >
        {/* <Text>{x + " " + j}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const highlightEdge = (status, ownership, p1Color, p2Color) => {
  if (status === "selected" && ownership === 1) {
    return lightenColor(p1Color);
  } else if (status === "selected" && ownership === 2) {
    return lightenColor(p2Color);
  } else if (status === "confirmed" && ownership === 1) {
    return p1Color;
  } else if (status === "confirmed" && ownership === 2) {
    return p2Color;
  } else {
    return "black";
  }
};

const styles = StyleSheet.create({
  edge: {
    backgroundColor: "black",
    position: "absolute",
    zIndex: 2,
    margin: 0,
  },
});

export default Edge;
