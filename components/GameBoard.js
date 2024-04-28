import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Cell from "./Cell";
import Edge from "./Edge";
import CustomText from "./CustomText";
import {
  countConfirmedEdges,
  getBlankCells,
  getBlankEdges,
  getEdgePairs,
  getPlayerScore,
} from "./helper";
import GameOverModalContent from "./GameOverModalContent";
import ResetModalContent from "./ResetModalContent";
import InfoModalContent from "./InfoModalContent";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";

const { width, height } = Dimensions.get("window");
const boardSize = Math.min(width, height) * 0.9; // Adjust the multiplier as needed

export const GameBoard = (props) => {
  const p1C = props.players[0].color;
  const p2C = props.players[1].color;

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

  const [confirmedEdges, setConfirmedEdges] = useState(
    countConfirmedEdges(edgeState)
  );

  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  // Game Over Interstitial
  const interstitialAdIdGameplay = __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-9896015466295501/9009163656";
  const {
    isLoaded: isLoadedGameplay,
    load: loadGameplay,
    show: showGameplay,
  } = useInterstitialAd(interstitialAdIdGameplay, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    loadGameplay();
  }, [loadGameplay]);

  // TODO: Consider adding this back in if you want an add that fires right at gameover
  // useEffect(() => {
  //   if (remainingCells === 0 && isLoadedGameplay) {
  //     showGameplay();
  //   }
  // }, [remainingCells, isLoadedGameplay]);

  // Game Reset Interstitial
  const interstitialAdIdReset = __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-9896015466295501/7802025201";
  const {
    isLoaded: isLoadedReset,
    load: loadReset,
    show: showReset,
  } = useInterstitialAd(interstitialAdIdReset, {
    requestNonPersonalizedAdsOnly: true,
  });
  useEffect(() => {
    loadReset();
  }, [loadReset]);

  useEffect(() => {
    evaluateEdgeState();
  }, [edgeState]);

  useEffect(() => {
    evaluateCellState();
  }, [cellState]);

  useEffect(() => {
    remainingCells === 0 && gameOver();
  }, [remainingCells]);

  const handleReset = () => {
    setEdgeState(getBlankEdges(props.gridSize));
    setCellState(getBlankCells(props.gridSize));
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRemainingEdges(edgeState.length);
    setRemainingCells(cellState.length);
    setConfirmedEdges(0);
    props.setPlayersTurn(1);
    setResetModalVisible(false);
    setGameOverModalVisible(false);
    isLoadedReset && showReset();
  };

  const handleResetChangeOpts = () => {
    handleReset();
    props.setStartMenuVisible(true);
  };

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

  const makeComputersMoveEasy = () => {
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

  const makeComputersMoveMedium = () => {
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

  const makeComputersMoveHard = () => {
    // Filter edges where ownership is 0 and status is open
    const availableEdges = edgeState.filter(
      (edge) => edge.ownership === 0 && edge.status === "open"
    );

    if (availableEdges.length > 0) {
      // Identify nearly closed edges
      const nearlyClosedEdges = availableEdges.filter((edge) => {
        // Check if completing this edge would nearly complete a cell
        const cellCandidates = getEdgePairs(edge.x, edge.y)
          .map(({ x, y }) =>
            cellState.find((cell) => cell.x === x && cell.y === y)
          )
          .filter((cell) => cell && cell.ownership === "owned");

        return cellCandidates.length === 2; // Edge would nearly complete a cell
      });

      // Prioritize nearly closed edges if any are found
      const prioritizedEdges =
        nearlyClosedEdges.length > 0 ? nearlyClosedEdges : availableEdges;

      // Randomly select one of the prioritized edges
      const randomEdge =
        prioritizedEdges[Math.floor(Math.random() * prioritizedEdges.length)];

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
      console.log("No available edges for the computer to claim.");
    }
  };

  const makeComputersMove = (difficulty) => {
    switch (difficulty) {
      case "easy":
        makeComputersMoveEasy();
        break;
      case "medium":
        makeComputersMoveMedium();
        break;
      case "hard":
        makeComputersMoveHard();
        break;
      default:
        console.error("Invalid difficulty level");
    }
  };

  const evaluateEdgeState = () => {
    if (confirmedEdges < countConfirmedEdges(edgeState)) {
      setConfirmedEdges(countConfirmedEdges(edgeState));
      if (props.playersTurn === 1) {
        props.setPlayersTurn(2);
        if (props.players[1].isComputer) {
          setTimeout(() => {
            makeComputersMove(props.players[1].difficulty);
            props.setPlayersTurn(1);
          }, 1000);
        }
      } else {
        props.setPlayersTurn(1);
      }
    }

    cellState.forEach((cell, index) => {
      checkEdgesOfCell(cell.x, cell.y, index);
    });

    setRemainingEdges(edgeState.length - countConfirmedEdges(edgeState));
  };

  const evaluateCellState = () => {
    setRemainingCells(getPlayerScore(0, cellState));
    setPlayer1Score(getPlayerScore(1, cellState));
    setPlayer2Score(getPlayerScore(2, cellState));

    if (remainingCells === 0) {
      gameOver();
    }
  };

  const gameOver = () => {
    setGameOverModalVisible(true);
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
              p1Color={p1C}
              p2Color={p2C}
              ownership={ownership}
            />
          );
          relativeIdxX++;
        } else {
          if (i % 2 === 0) {
            dots.push(
              <View
                key={`${i}.${j}`}
                style={[
                  styles.dot,

                  {
                    left: (boardSize / (props.gridSize * 2)) * i - 5,
                    top: (boardSize / (props.gridSize * 2)) * j - 5,
                    backgroundColor: "#020202",
                  },
                ]}
              />
            );
          } // else case here renders dots in the middle of cells!
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
            p1C={p1C}
            p2C={p2C}
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
    const p1 = props.players[0];
    const p2 = props.players[1];

    return (
      <View style={styles.playerInfo}>
        <View
          style={{
            paddingVertical: 5,
            borderWidth: 5,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: props.playersTurn === 1 ? p1.color : "white",
          }}
        >
          <View style={styles.player}>
            <View style={[styles.colorBox, { backgroundColor: p1.color }]} />
            <Text style={styles.playerText}>{p1.name}</Text>
          </View>
          <Text style={styles.playerScoreText}>Score: {player1Score}</Text>
        </View>
        <View
          style={{
            paddingVertical: 5,
            borderWidth: 5,
            marginHorizontal: 10,
            marginVertical: 10,
            borderColor: props.playersTurn === 2 ? p2.color : "white",
          }}
        >
          <View style={styles.player}>
            <View style={[styles.colorBox, { backgroundColor: p2.color }]} />
            <Text style={styles.playerText}>{p2.name}</Text>
          </View>
          <Text style={styles.playerScoreText}>Score: {player2Score}</Text>
        </View>
      </View>
    );
  };

  const renderGeneralInfo = () => {
    return (
      <View style={styles.generalInfo}>
        <Text style={styles.playerScoreText}>
          Remaining Edges: {remainingEdges}
        </Text>
        <Text style={styles.playerScoreText}>
          Remaining Cells: {remainingCells}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameOverModalVisible}
        onRequestClose={() => {
          setGameOverModalVisible(false);
        }}
      >
        <GameOverModalContent
          setGameOverModalVisible={setGameOverModalVisible}
          handleReset={handleReset}
          handleResetChangeOpts={handleResetChangeOpts}
          player1Score={player1Score}
          player2Score={player2Score}
          players={props.players}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={resetModalVisible}
        onRequestClose={() => {
          setResetModalVisible(false);
        }}
      >
        <ResetModalContent
          setResetModalVisible={setResetModalVisible}
          handleReset={handleReset}
          handleResetChangeOpts={handleResetChangeOpts}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(false);
        }}
      >
        <InfoModalContent setInfoModalVisible={setInfoModalVisible} />
      </Modal>
      {renderPlayerInfo()}
      {renderGeneralInfo()}
      <View style={styles.gameBoard}>
        {renderEdgesAndDots()}
        {renderCells()}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInfoModalVisible(true)}
        >
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setResetModalVisible(true)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  playerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  playerText: {
    fontSize: height * 0.019,
  },
  playerScoreText: {
    textAlign: "center",
    fontSize: height * 0.016,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    position: "absolute",
    marginTop: 20,
    bottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: height * 0.018,
  },
});

export default GameBoard;
