import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <Text style={styles.title}>Are you sure you want to reset?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Change options or just start the same game over??
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={props.handleResetChangeOpts}
            >
              <Text style={styles.buttonText}>Change Options</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.handleReset}>
              <Text style={styles.buttonText}>Reset Game</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  title: {
    fontSize: 20,
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

export default ResetModalContent;
