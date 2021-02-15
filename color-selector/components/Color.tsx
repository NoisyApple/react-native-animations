import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const COLOR_WIDTH = width / 3;
const RADIUS = 45;

interface ColorProps {
  color: {
    start: string;
    end: string;
  };
  index: number;
  translateX: Animated.SharedValue<number>;
  onPress: (position: { x: number; y: number }) => void;
}

const Color = ({ color, translateX, index, onPress }: ColorProps) => {
  const inputRange = [
    -COLOR_WIDTH * (index + 1),
    -COLOR_WIDTH * index,
    -COLOR_WIDTH * (index - 1),
  ];
  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onActive: ({ absoluteX: x, absoluteY: y }) => {
        runOnJS(onPress)({ x, y });
      },
    }
  );
  const style = useAnimatedStyle(() => {
    const angle = interpolate(
      translateX.value,
      inputRange,
      [0, Math.PI / 2, Math.PI],
      Extrapolate.CLAMP
    );
    const translateY = 100 * Math.cos(angle);
    const scale = 0.8 + 0.2 * Math.sin(angle);
    return {
      transform: [{ translateX: translateX.value }, { translateY }, { scale }],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <TapGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          <LinearGradient
            colors={[color.start, color.end]}
            style={styles.gradient}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: COLOR_WIDTH,
    alignItems: "center",
  },
  gradient: {
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderWidth: 6,
    borderColor: "#fff",
  },
});

export default Color;
