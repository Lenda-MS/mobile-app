import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { Button } from "../components";
import { Screens } from "../navigations";

export const Signup = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <SafeAreaView edges={["top"]}>
        <View
          style={{
            alignItems: "center",
            height: "30%",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/Logo-black.png")}
            resizeMode="contain"
            style={{ height: 80 }}
          />
        </View>
        <View style={styles.formContainer}>
          <Text
            style={{
              ...styles.label,
              fontSize: getScreenPercent(10),
              marginBottom: "10%",
            }}
          >
            Signup
          </Text>
          <Text style={styles.label}>Id Number</Text>
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1, borderWidth: 0 }}
              autoFocus={true}
              value={id}
              onChangeText={(text) => setId(text)}
            />
          </View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1, borderWidth: 0 }}
              autoFocus={true}
              value={id}
              onChangeText={(text) => setId(text)}
            />
          </View>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1, borderWidth: 0 }}
              autoFocus={true}
              value={id}
              onChangeText={(text) => setId(text)}
            />
          </View>

          <Button
            title={"Signup"}
            textStyle={{ fontSize: 16, color: "white" }}
            style={styles.button}
          />
          <View style={{ alignItems: "center", marginTop: "5%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(Screens.LOGIN)}
              >
                <Text style={{ ...styles.label, marginLeft: 5 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: "8%",
  },
  label: {
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: 16,
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: "100%",
    backgroundColor: Colors.SECONDARY,
    height: "12%",
    marginVertical: getScreenPercent(2.3),
  },
  input: {
    borderBottomColor: Colors.SECONDARY,
    borderWidth: 1.5,
    height: 50,
    borderRadius: 10,
    marginTop: "3%",
    flexDirection: "row",
    paddingBottom: getScreenPercent(0.4),
    paddingHorizontal: getScreenPercent(4),
    marginBottom: "5%",
    justifyContent: "space-between",
  },
});
