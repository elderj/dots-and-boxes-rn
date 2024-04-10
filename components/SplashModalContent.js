import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import CustomText from "./CustomText";

const height = Dimensions.get("window").height;

export default function SplashModalContent(props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={styles.splashModalContent}>
      {/* Title */}
      <CustomText
        text="Dots and Boxes"
        fontFamily="Quicksand_700Bold"
        styles={styles.title}
      />
      {/* App Logo */}
      <Image
        source={require("../assets/images/diamondLogo.png")}
        style={styles.logo}
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
        <CustomText
          text="I have read and agree to the TOS"
          fontFamily="Quicksand_600SemiBold"
          styles={styles.appTitle}
        />
        <Switch
          value={agreed}
          onValueChange={(value) => setAgreed(value)}
          trackColor={{ false: "lightgray", true: "green" }}
        />
      </View>

      {/* Close Button */}
      <TouchableOpacity
        onPress={() => props.setSplashModalVisible(false)}
        style={[styles.closeButton, { opacity: agreed ? 1 : 0.5 }]}
        disabled={!agreed}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  splashModalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  brandLogoFont: {
    fontSize: height * 0.03,
    color: "black",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
