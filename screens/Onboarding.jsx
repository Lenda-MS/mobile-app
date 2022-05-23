import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "../theme";
import { SvgUri } from "react-native-svg";
import { Button } from "../components";
import { getScreenPercent } from "../utils/calc";

export const Onboarding = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require("../assets/Logo-black.png")} />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={"Login"}
          textStyle={{ fontSize: 16, color: "white" }}
          style={{ ...styles.button }}
        />
        <Button
          title={"Signup"}
          textStyle={{ fontSize: 16, color: "white" }}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    justifyContent: "flex-end",
    height: "50%",
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: "100%",
    backgroundColor: Colors.SECONDARY,
    height: "13%",
    marginVertical: getScreenPercent(2.3),
  },
  // loginButton: {
  //   borderWidth,
  // },
  btnContainer: {
    height: "50%",
    justifyContent: "center",
    width: "80%",
  },
});
