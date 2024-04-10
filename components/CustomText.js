import React from "react";
import { Text, View } from "react-native";

//  Add custom font packages here,
//  they will need to be added to the project also
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import {
  // Quicksand_300Light,
  Quicksand_400Regular,
  // Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export default function CustomText(props) {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Pacifico_400Regular,
  });

  return (
    <View>
      {fontsLoaded ? (
        <Text
          style={{
            ...props.styles,
            fontFamily: props.fontFamily,
          }}
        >
          {props.text}
        </Text>
      ) : (
        <Text
          style={{
            ...props.styles,
          }}
        >
          {props.text}
        </Text>
      )}
    </View>
  );
}
