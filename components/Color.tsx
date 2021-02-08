import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const COLOR_WIDTH = width / 3;
const RADIUS = 45;

interface ColorProps {
  color: {
    start: string;
    end: string;
  };
  index: number;
}

const Color = ({ color }: ColorProps) => {
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationX }) => {
      translateX.value = translationX;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.container}>
        <LinearGradient
          colors={[color.start, color.end]}
          style={styles.gradient}
        />
      </Animated.View>
    </PanGestureHandler>
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
