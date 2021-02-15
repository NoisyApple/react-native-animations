import React, { useCallback, useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { withBouncing } from "./withBouncing";

const { width, height } = Dimensions.get("window");

const VELOCITY = 100;
const CONTAINER_WIDTH = 120;
const CONTAINER_HEIGHT = 80;
const COLORS = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
];

const DVDLogo = () => {
  const color = useSharedValue(COLORS[0]);
  const transalateX = useSharedValue(0);
  const transalateY = useSharedValue(0);
  const onBounce = useCallback(() => {
    "worklet";
    let nextIndex = Math.round(Math.random() * COLORS.length);
    nextIndex =
      COLORS[nextIndex] === color.value
        ? (nextIndex + 1) % COLORS.length
        : nextIndex;
    color.value = COLORS[nextIndex];
  }, [color]);

  useEffect(() => {
    transalateX.value = withBouncing(
      VELOCITY,
      0,
      width - CONTAINER_WIDTH,
      onBounce
    );
    transalateY.value = withBouncing(
      VELOCITY,
      0,
      height - CONTAINER_HEIGHT,
      onBounce
    );
  });

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: transalateX.value },
      { translateY: transalateY.value },
    ],
    backgroundColor: color.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[animStyle, styles.imageContainer]}>
        <Image style={styles.image} source={require("./assets/DVDLOGO.png")} />
      </Animated.View>
    </View>
  );
};

export default DVDLogo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  imageContainer: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 50,
  },
});
