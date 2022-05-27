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

export const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const signupSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    password: Yup.string()
      .min(5, "Enter minimum of 5 characters")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .min(9, "Invalid phone number")
      .required("Phone number is required"),
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <SafeAreaView edges={["top"]}>
        <View
          style={{
            alignItems: "center",
            height: "23%",
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
            fullname: "",
            password: "",
            phoneNumber: "",
          }}
          validationSchema={signupSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            const res = await firebase
              .auth()
              .createUserWithEmailAndPassword(values.email, values.password);
            const uid = res.user.uid;
            const data = {
              id: uid,
              ...values,
              phoneNumber: `233${values.phoneNumber}`,
            };
            const usersRef = firebase.firestore().collection("users");
            await usersRef.doc(uid).set(data);
            resetForm();
            setLoading(false);
          }}
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
                  Signup
                </Text>
              </View>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <View style={styles.input}>
                  <TextInput
                    style={{ flex: 1, borderWidth: 0 }}
                    onBlur={handleBlur("fullname")}
                    value={values.fullname}
                    onChangeText={handleChange("fullname")}
                  />
                </View>
                {errors.fullname && touched.fullname ? (
                  <Text style={styles.errorStyle}>{errors.fullname}</Text>
                ) : null}
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
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={[styles.input, styles.phoneInput]}>
                  <Text
                    style={[styles.label, { marginRight: getScreenPercent(2) }]}
                  >
                    +233
                  </Text>
                  <TextInput
                    style={{ flex: 1, borderWidth: 0 }}
                    value={values.phoneNumber}
                    keyboardType={"phone-pad"}
                    maxLength={9}
                    onBlur={handleBlur("phoneNumber")}
                    onChangeText={handleChange("phoneNumber")}
                  />
                </View>
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text style={styles.errorStyle}>{errors.phoneNumber}</Text>
                ) : null}
              </View>

              <Button
                title={"Signup"}
                spinnerStyle={{ color: Colors.PRIMARY }}
                loading={loading}
                textStyle={{ fontSize: 16, color: "white" }}
                style={styles.button}
                onPress={handleSubmit}
              />
              <View style={{ alignItems: "center", marginTop: "5%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>Have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(Screens.LOGIN)}
                  >
                    <Text style={{ ...styles.label, marginLeft: 5 }}>
                      Login
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
    height: "9%",
    marginVertical: getScreenPercent(2.3),
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
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
