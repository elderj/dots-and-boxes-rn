import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CustomText from "./CustomText";

const { width, height } = Dimensions.get("window");

const ResetModalContent = (props) => {
  const closeModal = () => {
    props.setResetModalVisible(false);
  };

  const handleYes = () => {
    setQ(2);
  };

  const [q, setQ] = useState(1);

  return (
    <View style={styles.container}>
      {q === 1 ? (
        <>
          <CustomText
            text="Are you sure you want to reset?"
            fontFamily="Quicksand_700Bold"
            styles={styles.title}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleYes}>
              <CustomText
                text="Yes"
                fontFamily="Quicksand_700Bold"
                styles={styles.buttonText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <CustomText
                text="No"
                fontFamily="Quicksand_700Bold"
                styles={styles.buttonText}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <CustomText
            text="Change options or just start the same game over??"
            fontFamily="Quicksand_700Bold"
            styles={styles.title}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={props.handleResetChangeOpts}
            >
              <CustomText
                text="Change Options"
                fontFamily="Quicksand_700Bold"
                styles={styles.buttonText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.handleReset}>
              <CustomText
                text="Reset Game"
                fontFamily="Quicksand_700Bold"
                styles={styles.buttonText}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
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
  title: {
    fontSize: height * 0.025,
    padding: 20,
    textAlign: "center",
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

export default ResetModalContent;
