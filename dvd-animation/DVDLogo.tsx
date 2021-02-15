import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const DVDLogo = () => {
  return (
    <View>
      <Animated.View style={{ ...styles.imageContainer }}>
        <Image
          style={styles.image}
          resizeMode={"contain"}
          source={require("./assets/DVDLOGO.png")}
        />
      </Animated.View>
    </View>
  );
};

export default DVDLogo;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "crimson",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  image: {
    width: 100,
  },
});
