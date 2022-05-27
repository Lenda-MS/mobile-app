import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";

export const Button = ({
  children,
  style,
  title,
  onPress,
  textStyle,
  loading,
  spinnerStyle,
}) => {
  const { button } = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...button, ...style }}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator
          size={spinnerStyle ? spinnerStyle.size : undefined}
          color={spinnerStyle ? spinnerStyle.color : undefined}
        />
      ) : title ? (
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
  },
  buttonText: {
    color: Colors.SECONDARY,
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: getScreenPercent(5.1),
  },
});
