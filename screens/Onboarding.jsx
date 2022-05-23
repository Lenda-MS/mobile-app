import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Colors } from "../theme";
import { Button } from "../components";
import { getScreenPercent } from "../utils/calc";
import { Screens } from "../navigations";

export const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/Logo-black.png")}
          resizeMode="contain"
          style={{ height: 80 }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={"Login"}
          textStyle={{ fontSize: 16, color: Colors.SECONDARY }}
          style={{ ...styles.button, ...styles.loginButton }}
          onPress={() => navigation.navigate(Screens.LOGIN)}
        />
        <Button
          title={"Signup"}
          textStyle={{ fontSize: 16, color: "white" }}
          style={styles.button}
          onPress={() => navigation.navigate(Screens.SIGNUP)}
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
  loginButton: {
    borderWidth: 2,
    backgroundColor: Colors.PRIMARY,
  },
  btnContainer: {
    height: "50%",
    justifyContent: "center",
    width: "80%",
  },
});
