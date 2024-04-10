import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Cell from "./Cell";
import Edge from "./Edge";
import {
  countConfirmedEdges,
  countOpenEdges,
  getBlankCells,
  getBlankEdges,
  getEdgePairs,
} from "./helper";

const { width, height } = Dimensions.get("window");
const boardSize = Math.min(width, height) * 0.9; // Adjust the multiplier as needed

export const GameBoard = (props) => {
  const [edgeState, setEdgeState] = useState(getBlankEdges(props.gridSize));
  const [cellState, setCellState] = useState(getBlankCells(props.gridSize));

  const totalEdges = countOpenEdges(edgeState);
  const [confirmedEdges, setConfirmedEdges] = useState(
    countConfirmedEdges(edgeState)
  );

  useEffect(() => {
    checkGameProgress();
  }, [edgeState]);

  const checkEdgesOfCell = (ex, why, index) => {
    const edgesToCheck = getEdgePairs(ex, why);

    const allEdgesConfirmed = edgesToCheck.every(({ x, y }) => {
      const edge = edgeState.find((edge) => edge.x === x && edge.y === y);
      return edge && edge.status === "confirmed";
    });

    if (allEdgesConfirmed) {
      console.log("Found a Case for    x:" + ex + "   y:" + why);
      setCellState((prevCellState) => {
        const updatedCellState = [...prevCellState];
        updatedCellState[index] = { x: ex, y: why, ownership: "owned" };
        return updatedCellState;
      });
    }
  };

  const checkGameProgress = () => {
    const gameIsOver = countConfirmedEdges(edgeState) === totalEdges;

    if (gameIsOver) {
      console.log("Game Over!");
    } else {
      console.log("Checking Game Progress:");
      if (confirmedEdges < countConfirmedEdges(edgeState)) {
        setConfirmedEdges(countConfirmedEdges(edgeState));
        if (props.playersTurn === 1) {
          props.setPlayersTurn(2);
          if (props.players[1].isComputer) {
            console.log("Ok, computer's turn now");
            setTimeout(() => {
              props.setPlayersTurn(1);
            }, 2500);
          }
        } else {
          props.setPlayersTurn(1);
        }
      }

      cellState.forEach((cell, index) => {
        checkEdgesOfCell(cell.x, cell.y, index);
      });

      console.log("Check Edge State:");
      console.log(edgeState);
    }
  };

  const renderEdgesAndDots = () => {
    const dots = [];
    for (let j = 0; j < props.gridSize * 2 + 1; j++) {
      let relativeIdxX = 1;
      for (let i = 0; i < (props.gridSize + 1) * 2 - 1; i++) {
        if ((j % 2 !== 0 && i % 2 === 0) || (j % 2 === 0 && i % 2 !== 0)) {
          const index = edgeState.findIndex(
            (edge) => edge.x === relativeIdxX && edge.y === j
          );
          const status = edgeState[index]?.status || "open";
          const ownership = edgeState[index]?.ownership || 0;
          dots.push(
            <Edge
              key={relativeIdxX + "-" + j}
              x={relativeIdxX}
              i={i}
              j={j}
              boardSize={boardSize}
              gridSize={props.gridSize}
              edgeState={edgeState}
              setEdgeState={setEdgeState}
              status={status}
              playersTurn={props.playersTurn}
              ownership={ownership}
            />
          );
          relativeIdxX++;
        } else {
          dots.push(
            <View
              key={`${i}.${j}`}
              style={[
                styles.dot,
                {
                  left: (boardSize / (props.gridSize * 2)) * i - 5,
                  top: (boardSize / (props.gridSize * 2)) * j - 5,
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
    const renderedCells = [];
    for (let y = 0; y < props.gridSize; y++) {
      const colCells = [];
      for (let x = 0; x < props.gridSize; x++) {
        colCells.push(
          <Cell
            key={`${x}.${y}`}
            x={x}
            y={y}
            boardSize={boardSize}
            gridSize={props.gridSize}
            cellState={cellState}
          />
        );
      }
      renderedCells.push(
        <View key={`col-${y}`} style={styles.row}>
          {colCells}
        </View>
      );
    }
    return renderedCells;
  };

  return (
    <View style={styles.gameBoard}>
      {renderEdgesAndDots()}
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
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
    position: "absolute",
    zIndex: 1000,
  },
  row: {
    flexDirection: "row",
    zIndex: 1,
  },
});

export default GameBoard;
