import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import Color from "./Color";
import Background from "./Background";

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

const { width } = Dimensions.get("window");
const COLOR_WIDTH = width / 3;
const snapPoints = colors.map((_, i) => -i * COLOR_WIDTH);

const ColorSelector = () => {
  const [colorSelection, setColorSelection] = useState({
    previous: colors[0],
    current: colors[0],
    position: { x: 0, y: 0 },
  });
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, { x }) => {
      translateX.value = x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.container}>
        <Background colorSelection={colorSelection} />
        <View style={styles.placeholder} />
        {colors.map((color, index) => {
          return (
            <Color
              color={color}
              key={index}
              index={index}
              translateX={translateX}
              onPress={(position) => {
                translateX.value = withSpring(-index * COLOR_WIDTH);
                setColorSelection({
                  position,
                  previous: colorSelection.current,
                  current: color,
                });
              }}
            />
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
  },
  placeholder: {
    width: COLOR_WIDTH,
  },
});

export default ColorSelector;
