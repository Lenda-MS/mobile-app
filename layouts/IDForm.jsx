import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import GlassX from "glassx";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../firebase";

export const IDForm = ({ useStep }) => {
  const [loading, setLoading] = useState();
  const user = GlassX.get("user");

  const idSchema = Yup.object().shape({
    idNumber: Yup.string().required("Ghana card number is required"),
    idPicture: Yup.string().required("ID card picture is required"),
    userPicture: Yup.string().required("Your picture is required"),
  });

  const pickImage = async (setImage, field) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const extension = result.uri.split(".").pop();
      const base64Image = `data:image/${extension};base64,${result.base64}`;
      setImage(field, base64Image);
    }
  };
  const uploadImage = async (base64Image) => {
    const apiUrl = "https://api.cloudinary.com/v1_1/ddoldsdnz/image/upload";
    let data = {
      file: base64Image,
      upload_preset: "xflraxxn",
    };

    const r = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    let json = await r.json();
    return json.secure_url;
  };
  return (
    <View>
      <Formik
        initialValues={{
          idNumber: "",
          idPicture: "",
          userPicture: "",
        }}
        validationSchema={idSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            const idPicture = await uploadImage(values.idPicture);
            const userPicture = await uploadImage(values.userPicture);

            const applicationsRef = firebase
              .firestore()
              .collection("applications");

            await applicationsRef.doc(user.id).set(
              {
                idPicture,
                userPicture,
                idNumber: values.idNumber,
                status: "processing",
                updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
              },
              { merge: true }
            );

            setLoading(false);
            resetForm();
          } catch (err) {
            console.log(err);
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
              <View style={[styles.input, styles.phoneInput]}>
                <Text
                  style={[styles.label, { marginRight: getScreenPercent(2) }]}
                >
                  GHA -
                </Text>
                <TextInput
                  style={{ flex: 1, borderWidth: 0, ...styles.label }}
                  value={values.idNumber}
                  onBlur={handleBlur("idNumber")}
                  onChangeText={(text) => {
                    handleChange("idNumber")(text);
                  }}
                />
              </View>

              {errors.idNumber && touched.idNumber ? (
                <Text style={styles.errorStyle}>{errors.idNumber}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ID card</Text>
              <TouchableOpacity
                style={{ ...styles.imagePicker }}
                onPress={() => pickImage(setFieldValue, "idPicture")}
                onBlur={handleBlur("idPicture")}
              >
                {values.idPicture ? (
                  <Image
                    resizeMode="stretch"
                    style={styles.imagePreview}
                    source={{ uri: values.idPicture }}
                  />
                ) : (
                  <UploadNotice text={"Upload your ID card"} />
                )}
              </TouchableOpacity>
              {errors.idPicture && touched.idPicture ? (
                <Text style={styles.errorStyle}>{errors.idPicture}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Your picture</Text>
              <TouchableOpacity
                style={{ ...styles.imagePicker }}
                onPress={() => pickImage(setFieldValue, "userPicture")}
              >
                {values.userPicture ? (
                  <Image
                    resizeMode="stretch"
                    style={styles.imagePreview}
                    source={{
                      uri: values.userPicture,
                    }}
                  />
                ) : (
                  <UploadNotice text={"Upload your picture"} />
                )}
              </TouchableOpacity>
              {errors.userPicture && touched.userPicture ? (
                <Text style={styles.errorStyle}>{errors.userPicture}</Text>
              ) : null}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={"Back"}
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

const UploadNotice = ({ text }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Image
        resizeMode="contain"
        style={{
          height: getScreenPercent(20),
          marginBottom: getScreenPercent(3),
        }}
        source={require("../assets/upload.png")}
      />
      <Text
        style={{
          fontFamily: FONTS.WORK_SANS_MEDIUM,
          fontSize: getScreenPercent(4.5),
        }}
      >
        {text}
      </Text>
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
  imagePreview: { width: "100%", height: "100%", borderRadius: 8 },
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
    borderBottomColor: Colors.SECONDARY,
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: 2,
    padding: 2,
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
