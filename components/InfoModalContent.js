import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import CustomText from "./CustomText";

const InfoModalContent = (props) => {
  const closeModal = () => {
    props.setInfoModalVisible(false);
  };

  const openUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText
          text="How to Play:"
          fontFamily="Quicksand_700Bold"
          styles={styles.title}
        />
        <CustomText
          text="The game is played on a grid of dots. Players take turns connecting two dots with a line. To confirm a move, an edge must be pressed twice. If a player completes the fourth side of a box, they capture that box, and it changes color. The player with the most points wins!"
          fontFamily="Quicksand_400Regular"
          styles={styles.text}
        />

        <CustomText
          text="Game Options:"
          fontFamily="Quicksand_700Bold"
          styles={styles.title}
        />
        <CustomText
          text="- Start Menu: Allows customization of board size, player names, colors, and difficulty level."
          fontFamily="Quicksand_400Regular"
          styles={styles.text}
        />

        <TouchableOpacity
          onPress={() =>
            openUrl(
              "https://elderdesignconcepts.com/#/portfolio/dots-and-boxes/terms"
            )
          }
        >
          <CustomText
            text="Terms of Service (TOS)"
            fontFamily="Quicksand_700Bold"
            styles={styles.link}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openUrl(
              "https://elderdesignconcepts.com/#/portfolio/dots-and-boxes/privacy"
            )
          }
        >
          <CustomText
            text="Privacy Policy (PP)"
            fontFamily="Quicksand_700Bold"
            styles={styles.link}
          />
        </TouchableOpacity>

        <CustomText
          text="Check out our other apps and games!"
          fontFamily="Quicksand_700Bold"
          styles={styles.title}
        />
        <TouchableOpacity
          onPress={() =>
            openUrl(
              "https://play.google.com/store/apps/dev?id=9138247524963784910"
            )
          }
        >
          <CustomText
            text="Visit our Android Store"
            fontFamily="Quicksand_400Regular"
            styles={styles.link}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openUrl("https://www.elderdesignconcepts.com")}
        >
          <CustomText
            text="Visit our website: elderdesignconcepts.com"
            fontFamily="Quicksand_400Regular"
            styles={styles.link}
          />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={closeModal}>
        <CustomText
          text="Close"
          fontFamily="Quicksand_700Bold"
          styles={styles.closeButton}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: "#2196F3",
    textAlign: "center",
    padding: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

export default InfoModalContent;
