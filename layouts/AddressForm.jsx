import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { Alert, Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { firebase } from "../firebase";
import GlassX, { useStore } from "glassx";
import SelectDropdown from "react-native-select-dropdown";
import { regions } from "../constants";

export const AddressForm = ({ useStep }) => {
  const [loading, setLoading] = useState();

  const [displaySuccess, setDisplaySuccess] = useStore("displaySuccess");
  const [application] = useStore("application");

  const addressSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    region: Yup.string().required("Region is required"),
    city: Yup.string().required("City is required"),
    gps_address: Yup.string(),
  });

  const data = regions;

  return (
    <>
      {displaySuccess && (
        <Alert
          type="success"
          text="🎉 Your account has been created successfully"
        />
      )}
      <View
        style={{
          marginBottom: getScreenPercent(15),
          marginTop: getScreenPercent(5),
        }}
      >
        <Text
          style={[
            styles.label,
            {
              fontSize: 34,
              textAlign: "center",
              marginBottom: getScreenPercent(2),
            },
          ]}
        >
          😚 Almost there!{" "}
        </Text>
        <Text style={[styles.label, { textAlign: "center" }]}>
          We need few details to complete your account
        </Text>
      </View>
      <Formik
        initialValues={{
          address: application ? application.address : "",
          region: application ? application.region : "",
          city: application ? application.city : "",
          gps_address: application ? application.gps_address : "",
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            const user = GlassX.get("user");
            const usersRef = firebase.firestore().collection("users");
            await usersRef.doc(user.id).update({ step: 2 });
            const data = {
              id: user.id,
              ...values,
              status: "incomplete",
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
            };
            const applicationsRef = firebase
              .firestore()
              .collection("applications");
            if (application) {
              await applicationsRef.doc(user.id).update({
                ...values,
                updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
              });
            } else await applicationsRef.doc(user.id).set(data);
            setDisplaySuccess(false);
            setLoading(false);
            resetForm();
            useStep(2);
          } catch (err) {
            setLoading(false);
          }
        }}
        validationSchema={addressSchema}
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
              Personal Address
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
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
              <Text style={styles.label}>Region</Text>
              <SelectDropdown
                data={data}
                onSelect={(selectedItem) => {
                  setFieldValue("region", selectedItem);
                }}
                defaultButtonText={values.region}
                buttonTextStyle={{
                  ...styles.label,
                  textAlign: "left",
                  fontSize: 14,
                }}
                buttonStyle={{
                  width: "100%",
                  borderWidth: 1.5,
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 10,
                  marginTop: "2%",
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              {errors.region && touched.region ? (
                <Text style={styles.errorStyle}>{errors.region}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>City</Text>
              <View style={styles.input}>
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 0,
                    ...styles.label,
                  }}
                  value={values.city}
                  onBlur={handleBlur("city")}
                  onChangeText={(text) => {
                    handleChange("city")(text);
                  }}
                />
              </View>
              {errors.city && touched.city ? (
                <Text style={styles.errorStyle}>{errors.city}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>GPS Address [Optional]</Text>
              <View style={styles.input}>
                <TextInput
                  style={{ flex: 1, borderWidth: 0, ...styles.label }}
                  value={values.gps_address}
                  onBlur={handleBlur("gps_address")}
                  onChangeText={(text) => {
                    handleChange("gps_address")(text);
                  }}
                />
              </View>
              {errors.gps_address && touched.gps_address ? (
                <Text style={styles.errorStyle}>{errors.gps_address}</Text>
              ) : null}
            </View>
            <Button
              title={"Next"}
              loading={loading}
              textStyle={{ fontSize: 18, color: "white" }}
              style={styles.button}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </>
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
    width: "100%",
    backgroundColor: Colors.SECONDARY,
    height: "11%",
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
