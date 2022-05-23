import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";

export const Button = ({ children, style, title, onPress, textStyle }) => {
  const { button } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={{ ...button, ...style }}>
      {title ? (
        <Text style={{ ...styles.buttonText, ...textStyle }}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    // shadowOffset: { height: 10, width: 0 },
    // shadowColor: Colors.SECONDARY,
    // elevation: 1,
    // shadowOpacity: 0.2,
    // shadowRadius: 30,
  },
  buttonText: {
    color: Colors.SECONDARY,
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: getScreenPercent(5.1),
  },
});
