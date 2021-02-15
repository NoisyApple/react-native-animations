import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  const opacity = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 5000 });
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ ...style, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>Hello There</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
