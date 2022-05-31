import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../theme";
import LottieView from "lottie-react-native";

export const AppLoader = ({}) => {
  return (
    <View style={styles.container}>
      <LottieView source={require("../assets/loader.json")} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
