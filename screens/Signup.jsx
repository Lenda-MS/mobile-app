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
import RadioButtonRN from "radio-buttons-react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { Button } from "../components";
import { Screens } from "../navigations";

export const Signup = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const data = [
    {
      label: "Student",
    },
    {
      label: "Staff",
    },
  ];

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
            height: "25%",
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
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                ...styles.label,
                fontSize: getScreenPercent(10),
                marginBottom: "10%",
              }}
            >
              Signup
            </Text>
          </View>
          <Text style={styles.label}>ID Number</Text>
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
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={{ marginBottom: "5%" }}>
            <RadioButtonRN
              data={data}
              selectedBtn={(e) => console.log(e)}
              activeColor={Colors.SECONDARY}
              circleSize={14}
              box={false}
              textStyle={styles.label}
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
    height: "10%",
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
