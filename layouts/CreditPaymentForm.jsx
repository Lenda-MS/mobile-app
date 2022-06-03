import { Formik } from "formik";
import GlassX, { useStore } from "glassx";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Alert, Button } from "../components";
import { networks } from "../constants";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import * as Yup from "yup";
import { firebase } from "../firebase";
import uuid from "react-native-uuid";

export const CreditPaymentForm = ({}) => {
  const [loading, setLoading] = useState();
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [wallet] = useStore("wallet");

  const paymentSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    network: Yup.string().required("Network is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  const user = GlassX.get("user");
  return (
    <View>
      <Formik
        initialValues={{
          amount: "",
          paymentMethod: user.phoneNumber,
          network: "",
        }}
        validationSchema={paymentSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            if (Number(values.amount) > wallet.debt.toFixed(2)) {
              throw new Error("firestore/invalid-amount");
            }
            const walletsRef = firebase.firestore().collection("wallets");
            const transactionsRef = firebase
              .firestore()
              .collection("transactions");

            const transactionId = uuid.v4();
            await transactionsRef.doc(transactionId).set({
              ...values,
              userId: user.id,
              type: "payment",
              id: transactionId,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
            });

            if (wallet.debt - Number(values.amount) != 0) {
              setSuccess(true);
              setError(false);
            }

            setLoading(false);
            const balance = Number(
              wallet.balance + Number(values.amount)
            ).toFixed(2);
            const debt = Number(wallet.debt - Number(values.amount)).toFixed(2);

            values.amount = "";
            await walletsRef.doc(user.id).update({
              balance: Number(balance),
              debt: Number(debt),
            });
          } catch (err) {
            const message =
              err.message === "firestore/invalid-amount"
                ? "🥵 Amount is larger than debt"
                : "🥵 Something went wrong";

            setErrorMessage(message);
            setError(true);
            setSuccess(false);
            setLoading(false);
          }
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          values,
          setFieldValue,
          touched,
        }) => (
          <View style={styles.formContainer}>
            {isError && <Alert type={"error"} text={errorMessage} />}
            {isSuccess && (
              <Alert type={"success"} text={"🎉 Credit paid successfully"} />
            )}
            <Text
              style={{
                ...styles.label,
                fontSize: getScreenPercent(6),
                marginBottom: getScreenPercent(3),
                color: "red",
                marginTop: getScreenPercent(3),
              }}
            >
              Debt: GHS {wallet.debt.toFixed(2)}
            </Text>
            <Text style={styles.label}>Amount to pay</Text>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <TextInput
                  style={{ flex: 1, borderWidth: 0 }}
                  onBlur={handleBlur("amount")}
                  value={values.amount}
                  keyboardType={"decimal-pad"}
                  onChangeText={(text) => {
                    setError(false);
                    setSuccess(false);
                    handleChange("amount")(text);
                  }}
                />
              </View>
              {errors.amount && touched.amount ? (
                <Text style={styles.errorStyle}>{errors.amount}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Payment Method</Text>
              <View style={[styles.input, styles.phoneInput]}>
                <Text
                  style={[styles.label, { marginRight: getScreenPercent(2) }]}
                >
                  +233
                </Text>
                <TextInput
                  style={{ flex: 1, borderWidth: 0 }}
                  defaultValue={values.paymentMethod}
                  editable={false}
                  textContentType={"telephoneNumber"}
                />
              </View>
              {errors.paymentMethod && touched.paymentMethod ? (
                <Text style={styles.errorStyle}>{errors.paymentMethod}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Network</Text>

              <SelectDropdown
                data={networks}
                onSelect={(selectedItem) => {
                  setFieldValue("network", selectedItem);
                }}
                defaultButtonText={""}
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
              {errors.network && touched.network ? (
                <Text style={styles.errorStyle}>{errors.network}</Text>
              ) : null}
            </View>

            <Button
              title={"Pay credit"}
              spinnerStyle={{ color: Colors.PRIMARY }}
              loading={loading}
              textStyle={{ fontSize: 16, color: "white" }}
              style={styles.button}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: getScreenPercent(12),
    marginHorizontal: getScreenPercent(13),
  },
  label: {
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: 16,
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: "100%",
    backgroundColor: Colors.SECONDARY,
    height: getScreenPercent(15),
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
    width: getScreenPercent(80),
    borderRadius: 10,
    marginTop: "2%",
    flexDirection: "row",
    paddingBottom: getScreenPercent(0.4),
    paddingHorizontal: getScreenPercent(4),
    justifyContent: "space-between",
    marginBottom: 2,
  },
});
