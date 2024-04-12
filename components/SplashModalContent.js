import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import CustomText from "./CustomText";

const height = Dimensions.get("window").height;

const openUrl = (url) => {
  Linking.openURL(url);
};

export default function SplashModalContent(props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/images/boardbg.png")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "repeat",
      }}
    >
      <View style={styles.splashModalContent}>
        {/* Title */}
        <CustomText
          text="Dots and Boxes"
          fontFamily="Quicksand_700Bold"
          styles={styles.title}
        />
        {/* App Logo */}
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />

        <CustomText
          text="by"
          fontFamily="Quicksand_700Bold"
          style={styles.appTitle}
        />

        {/* Company Logo */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Image
            style={{ width: height * 0.05, height: height * 0.05 }}
            resizeMode="stretch"
            source={require("../assets/images/diamondLogo.png")}
          />
          <CustomText
            text="Elder Design Concepts"
            fontFamily="Pacifico_400Regular"
            styles={styles.brandLogoFont}
          />
        </View>

        {/* Agreement Switch */}
        <View style={styles.switchContainer}>
          <Switch
            value={agreed}
            onValueChange={(value) => setAgreed(value)}
            trackColor={{ false: "#F6B90A", true: "#B4EB0A" }}
          />
          <CustomText
            text="I have read and agree to the"
            fontFamily="Quicksand_600SemiBold"
            styles={styles.appTitle}
          />
          <TouchableOpacity
            onPress={() =>
              openUrl(
                "https://elderdesignconcepts.com/#/portfolio/dots-and-boxes/terms"
              )
            }
          >
            <CustomText
              text="Terms of Service"
              fontFamily="Quicksand_600SemiBold"
              styles={styles.appTitle}
            />
          </TouchableOpacity>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => props.setSplashModalVisible(false)}
          style={[styles.closeButton, { opacity: agreed ? 1 : 0.5 }]}
          disabled={!agreed}
        >
          <Text style={styles.closeButtonText}>Let's Go!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashModalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Use a semi-transparent background color
    width: "100%",
    paddingVertical: 50, // Add vertical padding to create space around the content
  },
  logo: {
    width: 120,
    height: 120,
    marginVertical: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 20,
    maxWidth: "95%",
    flexWrap: "wrap",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 14,
    flexWrap: "wrap",
  },
  brandLogoFont: {
    fontSize: height * 0.0275,
    color: "black",
  },
  closeButton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});
