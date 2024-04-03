import React from "react";
import { View, Text, Switch, Button, StyleSheet } from "react-native";

const StartMenu = ({
  boardSize,
  onBoardSizeChange,
  vsComputer,
  onVsComputerChange,
  onStartGame,
}) => {
  return (
    <View style={styles.menu}>
      <Text>
        Board Size: {boardSize}x{boardSize}
      </Text>
      {/* <Slider
        style={{ width: 200, marginTop: 10 }}
        step={1}
        minimumValue={5}
        maximumValue={10}
        value={boardSize}
        onValueChange={onBoardSizeChange}
      /> */}
      <View style={styles.switchContainer}>
        <Text>Play against Computer:</Text>
        <Switch value={vsComputer} onValueChange={onVsComputerChange} />
      </View>
      <Button title="Start Game" onPress={onStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

export default StartMenu;
