import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../theme";

export const Home = ({}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
});
