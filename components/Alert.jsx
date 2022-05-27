import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FONTS } from "../theme";
import { getScreenPercent } from "../utils/calc";

export const Alert = ({ text, textStyle, containerStyle, type }) => {
  const colors = {
    info: {
      background: "#cce5ff",
      text: "#134f90",
    },
    success: {
      background: "#d4edda",
      text: "#296737",
    },
    error: {
      background: "#f9d7da",
      text: "#77242c",
    },
    warning: {
      background: "#fff4cd",
      text: "#856504",
    },
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[type || "info"].background },
        containerStyle,
      ]}
    >
      <Text
        style={[styles.text, { color: colors[type || "info"].text }, textStyle]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: getScreenPercent(10),
    borderRadius: 5,
    marginBottom: getScreenPercent(2),
  },
  text: {
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: 16,
  },
});
