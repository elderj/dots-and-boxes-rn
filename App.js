import React, { useState, useEffect } from "react";
import { Image, StatusBar, ImageBackground, StyleSheet } from "react-native";
import { Modal, View, Text } from "react-native";
import { GameBoard } from "./components/GameBoard";
import StartMenu from "./components/StartMenu";
import SplashModalContent from "./components/SplashModalContent";
import CustomText from "./components/CustomText";
import { getDefaultPlayers } from "./components/helper";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";

const interstitialAdId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-9896015466295501/9192500131";

export default function App() {
  const [splashModalVisible, setSplashModalVisible] = useState(true);
  const [startMenuVisible, setStartMenuVisible] = useState(true);
  const [gridSize, setGridSize] = useState(3);
  const [vsComputer, setVsComputer] = useState(true);
  const [playersTurn, setPlayersTurn] = useState(1);
  const [players, setPlayers] = useState(getDefaultPlayers());

  const openUrl = (url) => {
    Linking.openURL(url);
  };

  const { isLoaded, load, show } = useInterstitialAd(interstitialAdId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!splashModalVisible && isLoaded) {
      show();
    }
  }, [splashModalVisible, isLoaded]);

  const handleStartGame = () => {
    setStartMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={splashModalVisible}
        onRequestClose={() => {
          setSplashModalVisible(false);
        }}
      >
        <SplashModalContent setSplashModalVisible={setSplashModalVisible} />
      </Modal>

      {!splashModalVisible && startMenuVisible && (
        <ImageBackground
          source={require("./assets/images/boardbg.png")}
          style={styles.imageBackground}
        >
          <View style={styles.menuContainer}>
            <StartMenu
              gridSize={gridSize}
              onBoardSizeChange={setGridSize}
              vsComputer={vsComputer}
              onVsComputerChange={setVsComputer}
              onStartGame={handleStartGame}
              setPlayers={setPlayers}
              players={players}
            />
          </View>
        </ImageBackground>
      )}
      {!splashModalVisible && !startMenuVisible && (
        <View style={styles.gameContainer}>
          <Image
            source={require("./assets/images/logo.png")}
            style={styles.logo}
          />
          <CustomText
            text="Dots and Boxes"
            fontFamily="Quicksand_700Bold"
            styles={styles.title}
          />

          <GameBoard
            gridSize={gridSize}
            players={players}
            playersTurn={playersTurn}
            setPlayersTurn={setPlayersTurn}
            setStartMenuVisible={setStartMenuVisible}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Use a semi-transparent background color
    marginTop: "-33%",
  },
  gameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  gameBoardText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
  },
});
