import React from "react";
import { StyleSheet, View } from "react-native";
import Color from "./Color";

const colors = [
  {
    id: 0,
    start: "#00e0d3",
    end: "#00b4d4",
  },
  {
    id: 1,
    start: "#00b4d4",
    end: "#409cae",
  },
  {
    id: 2,
    start: "#66d8a4",
    end: "#409cae",
  },
  {
    id: 3,
    start: "#fc727b",
    end: "#f468a0",
  },
  {
    id: 4,
    start: "#8289ea",
    end: "#7a6fc1",
  },
  {
    id: 5,
    start: "#fec7a3",
    end: "#fd9d9c",
  },
];

const ColorSelector = () => {
  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        return <Color color={color} key={index} index={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
  },
});

export default ColorSelector;
