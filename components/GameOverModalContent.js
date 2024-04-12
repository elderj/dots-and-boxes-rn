import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GameOverModalContent = (props) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/go.png")} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { marginRight: 10 }]}
          onPress={props.handleResetChangeOpts}
        >
          <Text style={styles.buttonText}>Change Options</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={props.handleReset}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300, // Adjust the size as needed
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -150, // Half of the height
    marginLeft: -150, // Half of the width
  },
  image: {
    width: 200,
    height: 200,
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
