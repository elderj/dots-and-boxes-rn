import React, { useState } from "react";
import {
  Text,
  View,
  Switch,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import CustomText from "./CustomText";

const StartMenu = ({
  gridSize,
  onBoardSizeChange,
  onStartGame,
  setPlayers,
  players,
}) => {
  const [playerOneName, setPlayerOneName] = useState(players[0].name);
  const [playerTwoName, setPlayerTwoName] = useState(players[1].name);
  const [isComputerPlayerEnabled, setIsComputerPlayerEnabled] = useState(false);
  const [computerDifficulty, setComputerDifficulty] = useState("easy");
  const [showDifficultyOptions, setShowDifficultyOptions] = useState(false);
  const [playerOneColor, setPlayerOneColor] = useState("#1E88E5");
  const [playerTwoColor, setPlayerTwoColor] = useState("#FF5252");

  const handleIncrease = () => {
    if (gridSize <= 11) {
      onBoardSizeChange(gridSize + 1);
    }
  };

  const handleDecrease = () => {
    if (gridSize > 1) {
      onBoardSizeChange(gridSize - 1);
    }
  };

  const handleStart = () => {
    setPlayers([
      { name: playerOneName, isComputer: false, color: playerOneColor },
      {
        name: playerTwoName,
        isComputer: isComputerPlayerEnabled,
        color: playerTwoColor,
        difficulty: computerDifficulty,
      },
    ]);
    onStartGame();
  };

  return (
    <View style={styles.menu}>
      <CustomText
        text="Game Options:"
        fontFamily="Quicksand_700Bold"
        styles={styles.bigTitle}
      />

      <CustomText
        text="Board Options:"
        fontFamily="Quicksand_700Bold"
        styles={styles.subTitleText}
      />

      <View style={styles.stepperContainer}>
        <CustomText
          text="Board Size:"
          fontFamily="Quicksand_400Regular"
          styles={styles.label}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#FF5252", ...styles.stepperButton }}
          onPress={handleDecrease}
          disabled={gridSize <= 1}
        >
          <CustomText
            text="-"
            fontFamily="Quicksand_700Bold"
            styles={{ color: "white", ...styles.stepperButtonText }}
          />
        </TouchableOpacity>

        <CustomText
          text={gridSize + "x" + gridSize}
          fontFamily="Quicksand_700Bold"
        />
        <TouchableOpacity
          style={{ backgroundColor: "#4CAF50", ...styles.stepperButton }}
          onPress={handleIncrease}
          disabled={gridSize > 10}
        >
          <CustomText
            text="+"
            fontFamily="Quicksand_700Bold"
            styles={{ color: "white", ...styles.stepperButtonText }}
          />
        </TouchableOpacity>
      </View>

      {/* Could add additional options here like bonus squares */}
      {/* <View style={styles.stepperContainer}>
        <CustomText
          text="Ya ya :"
          fontFamily="Quicksand_400Regular"
          styles={styles.label}
        />
      </View> */}

      <CustomText
        text="Player Options:"
        fontFamily="Quicksand_700Bold"
        styles={styles.subTitleText}
      />
      <View style={styles.playerView}>
        <CustomText
          text="Player One:"
          fontFamily="Quicksand_500Medium"
          styles={styles.playerText}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginHorizontal: "5%" }}>
            <CustomText
              text="Name:"
              fontFamily="Quicksand_400Regular"
              styles={styles.label}
            />
            <TextInput
              style={styles.input}
              value={playerOneName}
              onChangeText={setPlayerOneName}
              placeholder="Enter Name"
            />
          </View>
          <View>
            <CustomText
              text="Color:"
              fontFamily="Quicksand_400Regular"
              styles={styles.label}
            />
            <TouchableOpacity
              style={[styles.colorBox, { backgroundColor: playerOneColor }]}
              // onPress={() => setPlayerOneColor("#1E88E5")}
            />
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.playerView}>
        <CustomText
          text="Player Two:"
          fontFamily="Quicksand_500Medium"
          styles={styles.playerText}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginHorizontal: "5%" }}>
            <CustomText
              text="Name:"
              fontFamily="Quicksand_400Regular"
              styles={styles.label}
            />
            <TextInput
              style={styles.input}
              value={playerTwoName}
              onChangeText={setPlayerTwoName}
              placeholder="Enter Name"
            />
          </View>
          <View>
            <CustomText
              text="Color:"
              fontFamily="Quicksand_400Regular"
              styles={styles.label}
            />
            <TouchableOpacity
              style={[styles.colorBox, { backgroundColor: playerTwoColor }]}
              // onPress={() => setPlayerOneColor("#FF5252")}
            />
          </View>
        </View>
        <View style={styles.switchContainer}>
          <CustomText
            text="Computer Player:"
            fontFamily="Quicksand_400Regular"
            styles={styles.label}
          />
          <Switch
            value={isComputerPlayerEnabled}
            onValueChange={(value) => {
              setIsComputerPlayerEnabled(value);
              setShowDifficultyOptions(value);
            }}
          />
        </View>
        {showDifficultyOptions && (
          <View style={styles.difficultyOptions}>
            <CustomText
              text="Difficulty:"
              fontFamily="Quicksand_400Regular"
              styles={styles.label}
            />

            <TouchableOpacity
              onPress={() => setComputerDifficulty("easy")}
              style={[
                styles.difficultyButton,
                computerDifficulty === "easy" && styles.selectedEasyButton,
              ]}
            >
              <Text style={styles.difficultyButtonText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setComputerDifficulty("medium")}
              style={[
                styles.difficultyButton,
                computerDifficulty === "medium" && styles.selectedMedButton,
              ]}
            >
              <Text style={styles.difficultyButtonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setComputerDifficulty("hard")}
              style={[
                styles.difficultyButton,
                computerDifficulty === "hard" && styles.selectedHardButton,
              ]}
            >
              <Text style={styles.difficultyButtonText}>Hard</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.stepperContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  menu: {
    justifyContent: "center",
    padding: 30,

    backgroundColor: "white",
    width: "77%",
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 2,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  stepperButton: {
    padding: 4,
    borderRadius: 5,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 28,
  },
  stepperButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: -5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  playerView: {
    width: "100%",
    marginBottom: 10,
  },
  playerText: {
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 10,
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 2,
    width: 150,
  },
  label: {
    marginBottom: 5,
    color: "black",
  },
  difficultyOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  difficultyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  selectedEasyButton: {
    backgroundColor: "#4CAF50",
  },
  selectedMedButton: {
    backgroundColor: "#FFD700",
  },
  selectedHardButton: {
    backgroundColor: "#FF5733",
  },
  difficultyButtonText: {
    color: "black",
  },
  colorBox: {
    width: 30,
    height: 30,
    marginVertical: 5,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    padding: 5,
  },
});

export default StartMenu;
