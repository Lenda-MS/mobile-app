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
import { Formik } from "formik";
import * as Yup from "yup";
import { firebase } from "../firebase";

export const Login = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Enter minimum of 5 characters")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

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
            height: "40%",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/Logo-black.png")}
            resizeMode="contain"
            style={{ height: 80 }}
          />
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            try {
              const res = await firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password);
              const uid = res.user.uid;
              const usersRef = firebase.firestore().collection("users");
              const doc = await usersRef.doc(uid).get();
              if (!doc.exists) {
                console.log("doc does not exist");
              }
              console.log(doc.data());
              resetForm();
              setLoading(false);
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
            setLoading(false);
          }}
          validationSchema={loginSchema}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            values,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    ...styles.label,
                    fontSize: getScreenPercent(10),
                    marginBottom: "10%",
                  }}
                >
                  Login
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.input}>
                  <TextInput
                    style={{ flex: 1, borderWidth: 0 }}
                    keyboardType={"email-address"}
                    value={values.email}
                    onBlur={handleBlur("email")}
                    autoCapitalize={"none"}
                    onChangeText={handleChange("email")}
                  />
                </View>
                {errors.email && touched.email ? (
                  <Text style={styles.errorStyle}>{errors.email}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.input}>
                  <TextInput
                    style={{ flex: 1, borderWidth: 0 }}
                    textContentType="password"
                    secureTextEntry={true}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                  />
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.errorStyle}>{errors.password}</Text>
                ) : null}
              </View>
              <Button
                title={"Login"}
                spinnerStyle={{ color: Colors.PRIMARY }}
                loading={loading}
                textStyle={{ fontSize: 16, color: "white" }}
                style={styles.button}
                onPress={handleSubmit}
              />
              <View style={{ alignItems: "center", marginTop: "5%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>Dont have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(Screens.SIGNUP)}
                  >
                    <Text style={{ ...styles.label, marginLeft: 5 }}>
                      Signup
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
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
    height: "14%",
    marginVertical: getScreenPercent(2.3),
  },
  errorStyle: {
    color: "red",
  },
  inputContainer: {
    marginBottom: "2%",
    marginTop: "1%",
  },
  errorStyle: {
    color: "red",
  },
  input: {
    borderBottomColor: Colors.SECONDARY,
    borderWidth: 1.5,
    height: getScreenPercent(12.5),
    width: "100%",
    borderRadius: 10,
    marginTop: "2%",
    flexDirection: "row",
    paddingBottom: getScreenPercent(0.4),
    paddingHorizontal: getScreenPercent(4),
    justifyContent: "space-between",
    marginBottom: 2,
  },
});
