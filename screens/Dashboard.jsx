import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../theme";

export const Dashboard = ({}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
});
