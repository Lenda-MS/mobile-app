import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import GlassX, { useStore } from "glassx";

export const IDForm = ({ useStep }) => {
  const [loading, setLoading] = useState();

  return (
    <View>
      <Formik
        initialValues={{
          idNumber: "",
          idPicture: "",
          userPicture: "",
        }}
        onSubmit={async (values, { resetForm }) => {}}
        // validationSchema={}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          values,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            <Text
              style={[
                styles.label,
                { fontSize: 20, marginBottom: getScreenPercent(2) },
              ]}
            >
              ID Card Information
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ghana card number</Text>
              <View style={styles.input}>
                <TextInput
                  style={{ flex: 1, borderWidth: 0, ...styles.label }}
                  value={values.address}
                  onBlur={handleBlur("address")}
                  onChangeText={(text) => {
                    handleChange("address")(text);
                  }}
                />
              </View>
              {errors.address && touched.address ? (
                <Text style={styles.errorStyle}>{errors.address}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Upload ID card</Text>
              <TouchableOpacity
                style={{ ...styles.input, ...styles.imagePicker }}
              ></TouchableOpacity>
              {errors.address && touched.address ? (
                <Text style={styles.errorStyle}>{errors.address}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Upload your picture</Text>
              <TouchableOpacity
                style={{ ...styles.input, ...styles.imagePicker }}
              ></TouchableOpacity>
              {errors.address && touched.address ? (
                <Text style={styles.errorStyle}>{errors.address}</Text>
              ) : null}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={"Back"}
                loading={loading}
                textStyle={{ fontSize: 18, color: Colors.SECONDARY }}
                style={{ ...styles.button, ...styles.backButton }}
                onPress={() => useStep(1)}
              />
              <Button
                title={"Submit"}
                loading={loading}
                textStyle={{ fontSize: 18, color: "white" }}
                style={styles.button}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: "8%",
  },
  label: {
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: 16,
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: "47%",
    backgroundColor: Colors.SECONDARY,
    height: getScreenPercent(13),
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getScreenPercent(8),
  },
  backButton: {
    borderWidth: 2,
    backgroundColor: Colors.PRIMARY,
  },
  imagePicker: {
    height: getScreenPercent(50),
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
