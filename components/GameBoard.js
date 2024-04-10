import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Cell from "./Cell";
import Edge from "./Edge";
import {
  countConfirmedEdges,
  countOpenEdges,
  getBlankCells,
  getBlankEdges,
  getEdgePairs,
  getPlayerScore,
} from "./helper";

const { width, height } = Dimensions.get("window");
const boardSize = Math.min(width, height) * 0.9; // Adjust the multiplier as needed

export const GameBoard = (props) => {
  const [edgeState, setEdgeState] = useState(getBlankEdges(props.gridSize));
  const [cellState, setCellState] = useState(getBlankCells(props.gridSize));
  const [player1Score, setPlayer1Score] = useState(
    getPlayerScore(1, cellState)
  );
  const [player2Score, setPlayer2Score] = useState(
    getPlayerScore(2, cellState)
  );
  const [remainingEdges, setRemainingEdges] = useState(edgeState.length);
  const [remainingCells, setRemainingCells] = useState(cellState.length);

  const totalEdges = countOpenEdges(edgeState);
  const [confirmedEdges, setConfirmedEdges] = useState(
    countConfirmedEdges(edgeState)
  );

  useEffect(() => {
    evaluateEdgeState();
  }, [edgeState]);

  useEffect(() => {
    evaluateCellState();
  }, [cellState]);

  const checkEdgesOfCell = (ex, why, index) => {
    const edgesToCheck = getEdgePairs(ex, why);

    const allEdgesConfirmed = edgesToCheck.every(({ x, y }) => {
      const edge = edgeState.find((edge) => edge.x === x && edge.y === y);
      return edge && edge.status === "confirmed";
    });

    if (allEdgesConfirmed && cellState[index].ownership !== "owned") {
      setCellState((prevCellState) => {
        const updatedCellState = [...prevCellState];

        updatedCellState[index] = {
          x: ex,
          y: why,
          ownership: "owned",
          capturedBy: props.playersTurn, // Store the player who captured the cell
        };
        return updatedCellState;
      });
    }
  };

  const makeComputersMove = () => {
    // Filter edges where ownership is 0 and status is open
    const availableEdges = edgeState.filter(
      (edge) => edge.ownership === 0 && edge.status === "open"
    );

    // Check if there are any available edges for the computer to claim
    if (availableEdges.length > 0) {
      // Randomly select one of the available edges
      const randomEdge =
        availableEdges[Math.floor(Math.random() * availableEdges.length)];

      // Update the selected edge's ownership to 2 and status to "confirmed"
      const updatedEdge = { ...randomEdge, ownership: 2, status: "confirmed" };

      // Update the edgeState array with the modified edge
      const updatedEdgeState = edgeState.map((edge) =>
        edge.x === updatedEdge.x && edge.y === updatedEdge.y
          ? updatedEdge
          : edge
      );

      // Update the state to trigger a re-render
      setEdgeState(updatedEdgeState);
    } else {
      // Handle the case when there are no available edges for the computer to claim
      console.log("No available edges for the computer to claim.");
    }
  };

  const evaluateEdgeState = () => {
    const gameIsOver = countConfirmedEdges(edgeState) === totalEdges;

    if (gameIsOver) {
      console.log("Game Over!");
    } else {
      if (confirmedEdges < countConfirmedEdges(edgeState)) {
        setConfirmedEdges(countConfirmedEdges(edgeState));
        if (props.playersTurn === 1) {
          props.setPlayersTurn(2);
          if (props.players[1].isComputer) {
            makeComputersMove();
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

      setRemainingEdges(edgeState.length - countConfirmedEdges(edgeState));
    }
  };

  const evaluateCellState = () => {
    setRemainingCells(getPlayerScore(0, cellState));
    setPlayer1Score(getPlayerScore(1, cellState));
    setPlayer2Score(getPlayerScore(2, cellState));
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

  const renderPlayerInfo = () => {
    return (
      <View style={styles.playerInfo}>
        <View style={styles.playerScore}>
          <Text>Player 1 Score: {player1Score}</Text>
        </View>
        <View style={styles.playerScore}>
          <Text>Player 2 Score: {player2Score}</Text>
        </View>
      </View>
    );
  };

  const renderGeneralInfo = () => {
    return (
      <View style={styles.generalInfo}>
        <Text>Remaining Edges: {remainingEdges}</Text>
        <Text>Remaining Cells: {remainingCells}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPlayerInfo()}
      {renderGeneralInfo()}
      <View style={styles.gameBoard}>
        {renderEdgesAndDots()}
        {renderCells()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  playerScore: {
    flex: 1,
    alignItems: "center",
  },
  generalInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
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
