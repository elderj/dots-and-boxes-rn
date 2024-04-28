import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CustomText from "./CustomText";

const { width, height } = Dimensions.get("window");

const GameOverModalContent = (props) => {
  const winnerIdx = props.player1Score > props.player2Score ? 0 : 1;
  const winnerName = props.players[winnerIdx].name;

  // Calculate font sizes and dimensions based on screen dimensions

  const buttonWidth = width * 0.32;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/drawnCrown.png")}
        style={styles.image}
      />
      <CustomText
        text="Game Over!"
        fontFamily="Pacifico_400Regular"
        styles={styles.fancyTitle}
      />

      <CustomText
        text={winnerName + " wins!"}
        fontFamily="Quicksand_400Regular"
        styles={styles.winnerMsg}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={props.handleResetChangeOpts}
        >
          <CustomText
            text="Change Options"
            fontFamily="Quicksand_400Regular"
            styles={styles.buttonText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={props.handleReset}
        >
          <CustomText
            text="Reset Game"
            fontFamily="Quicksand_400Regular"
            styles={styles.buttonText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8, // Adjust the width based on screen width
    width: "100%", // Adjust the width based on screen width
    height: "100%",
    // borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // marginTop: -((height * 0.4) / 2), // Half of the height
    // marginLeft: -((width * 0.8) / 2), // Half of the width
    // borderColor: "black",
    // borderWidth: 5,
  },
  fancyTitle: {
    // fontSize will be dynamically set
    fontSize: height * 0.0375,
  },
  image: {
    width: width * 0.25, // Adjust the width based on screen width
    height: width * 0.25, // Adjust the height based on screen width
  },
  winnerMsg: {
    // fontSize will be dynamically set
    marginTop: 8,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 8,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: height * 0.02,
    padding: 10,
  },
});

export default GameOverModalContent;
