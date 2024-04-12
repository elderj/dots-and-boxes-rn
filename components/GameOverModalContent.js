import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CustomText from "./CustomText";

const GameOverModalContent = (props) => {
  const winnerIdx = props.player1Score > props.player2Score ? 0 : 1;

  const winnerName = props.players[winnerIdx].name;

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
          style={[styles.button, { marginRight: 10 }]}
          onPress={props.handleResetChangeOpts}
        >
          <CustomText
            text="Change Options"
            fontFamily="Quicksand_400Regular"
            styles={styles.buttonText}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={props.handleReset}>
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
    width: 400,
    height: 400, // Adjust the size as needed
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -250, // Half of the height
    marginLeft: -200, // Half of the width
    borderColor: "black",
    borderWidth: 5,
  },
  fancyTitle: {
    fontSize: 30,
  },
  image: {
    width: 140,
    height: 140,
  },
  winnerMsg: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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

export default GameOverModalContent;
