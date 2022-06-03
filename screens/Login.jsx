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
import { getScreenPercent, setUser } from "../utils";
import { Alert, Button } from "../components";
import { Screens } from "../navigations";
import { Formik } from "formik";
import * as Yup from "yup";
import { firebase } from "../firebase";
import GlassX from "glassx";
import { useNavigation } from "@react-navigation/native";

export const Login = ({}) => {
  const [loading, setLoading] = useState();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigation = useNavigation();
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
            height: "35%",
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
              const applicationsRef = firebase
                .firestore()
                .collection("applications");

              const doc = await usersRef.doc(uid).get();
              const userData = doc.data();
              const applicationDoc = await applicationsRef
                .doc(GlassX.get("user").id)
                .get();

              GlassX.set({
                step: userData.step,
                displaySuccess: false,
                user: userData,
                applications: applicationDoc.data(),
              });
              await setUser(userData);
              resetForm();
              setLoading(false);
              if (!applicationDoc.exists)
                navigation.navigate(Screens.APPLICATION);
              else if (
                ["processing", "disapproved"].includes(
                  applicationDoc.data().status
                )
              )
                navigation.navigate(Screens.NOTICE);
              else if (userData.status === "inactive")
                navigation.navigate(Screens.APPLICATION);
              else navigation.navigate(Screens.HOME);
            } catch (err) {
              console.log(err);
              setError(true);
              const message =
                err.code === "auth/user-not-found"
                  ? "🥵 Account does not exist"
                  : err.code === "auth/wrong-password"
                  ? "🥵 Your password is incorrect"
                  : "🥵 Somethin went wrong";

              setErrorMessage(message);
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
                    marginBottom: "8%",
                  }}
                >
                  Login
                </Text>
              </View>
              {isError && <Alert text={errorMessage} type="error" />}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.input}>
                  <TextInput
                    style={{ flex: 1, borderWidth: 0 }}
                    keyboardType={"email-address"}
                    value={values.email}
                    onBlur={handleBlur("email")}
                    autoCapitalize={"none"}
                    textContentType="emailAddress"
                    onChangeText={(text) => {
                      handleChange("email")(text);
                      setError(false);
                    }}
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
                    onChangeText={(text) => {
                      handleChange("password")(text);
                      setError(false);
                    }}
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
