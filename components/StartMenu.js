import React, { useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Switch,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import CustomText from "./CustomText";
import { darkenColor, lightenColor, getRandomComputerName } from "./helper";

const { width, height } = Dimensions.get("window");

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

  const handleColorSet = (player, chosenColor) => {
    if (player === 1) {
      playerTwoColor !== chosenColor && setPlayerOneColor(chosenColor);
    } else {
      playerOneColor !== chosenColor && setPlayerTwoColor(chosenColor);
    }
  };

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
          <View>
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#1E88E5",
                    borderColor:
                      playerOneColor === "#1E88E5"
                        ? darkenColor("#1E88E5")
                        : lightenColor("#1E88E5"),
                    borderWidth:
                      playerOneColor === "#1E88E5" ||
                      playerTwoColor === "#1E88E5"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(1, "#1E88E5")}
              />
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#FF5252",
                    borderColor:
                      playerOneColor === "#FF5252"
                        ? darkenColor("#FF5252")
                        : lightenColor("#FF5252"),
                    borderWidth:
                      playerOneColor === "#FF5252" ||
                      playerTwoColor === "#FF5252"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(1, "#FF5252")}
              />
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#ffcf40",
                    borderColor:
                      playerOneColor === "#ffcf40"
                        ? darkenColor("#ffcf40")
                        : lightenColor("#ffcf40"),
                    borderWidth:
                      playerOneColor === "#ffcf40" ||
                      playerTwoColor === "#ffcf40"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(1, "#ffcf40")}
              />

              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#4CAF50",
                    borderColor:
                      playerOneColor === "#4CAF50"
                        ? darkenColor("#4CAF50")
                        : lightenColor("#4CAF50"),
                    borderWidth:
                      playerOneColor === "#4CAF50" ||
                      playerTwoColor === "#4CAF50"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(1, "#4CAF50")}
              />
            </View>
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
          {/* <View> */}
          <View>
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#1E88E5",
                    borderColor:
                      playerTwoColor === "#1E88E5"
                        ? darkenColor("#1E88E5")
                        : lightenColor("#1E88E5"),
                    borderWidth:
                      playerOneColor === "#1E88E5" ||
                      playerTwoColor === "#1E88E5"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(2, "#1E88E5")}
              />
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#FF5252",
                    borderColor:
                      playerTwoColor === "#FF5252"
                        ? darkenColor("#FF5252")
                        : lightenColor("#FF5252"),
                    borderWidth:
                      playerOneColor === "#FF5252" ||
                      playerTwoColor === "#FF5252"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(2, "#FF5252")}
              />
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#ffcf40",
                    borderColor:
                      playerTwoColor === "#ffcf40"
                        ? darkenColor("#ffcf40")
                        : lightenColor("#ffcf40"),
                    borderWidth:
                      playerOneColor === "#ffcf40" ||
                      playerTwoColor === "#ffcf40"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(2, "#ffcf40")}
              />

              <TouchableOpacity
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: "#4CAF50",
                    borderColor:
                      playerTwoColor === "#4CAF50"
                        ? darkenColor("#4CAF50")
                        : lightenColor("#4CAF50"),
                    borderWidth:
                      playerOneColor === "#4CAF50" ||
                      playerTwoColor === "#4CAF50"
                        ? 3
                        : 0,
                  },
                ]}
                onPress={() => handleColorSet(2, "#4CAF50")}
              />
            </View>
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
              value && setPlayerTwoName(getRandomComputerName());
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
    fontSize: height * 0.025,
    marginBottom: height * 0.025,
    textAlign: "center",
  },
  menu: {
    marginTop: height * 0.1,
    justifyContent: "center",
    paddingHorizontal: 30,

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
    marginBottom: height * 0.0075,
    marginLeft: -5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 36,
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
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 2,
    width: width * 0.3,
  },
  label: {
    marginBottom: 5,
    color: "black",
    fontSize: height * 0.018,
  },
  difficultyOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  difficultyButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  selectedEasyButton: {
    backgroundColor: "#4CAF50",
  },
  selectedMedButton: {
    backgroundColor: "#ffcf40",
  },
  selectedHardButton: {
    backgroundColor: "#FF5733",
  },
  difficultyButtonText: {
    color: "black",
  },
  colorBox: {
    width: height * 0.025,
    height: height * 0.025,
    marginVertical: 5,
    borderRadius: 5,
    marginHorizontal: 4,
  },

  button: {
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: lightenColor("#4CAF50"),
    padding: height * 0.01,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
  },
});

export default StartMenu;
