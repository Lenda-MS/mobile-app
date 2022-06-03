import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, FONTS } from "../theme";
import LottieView from "lottie-react-native";
import { getScreenPercent, setUser } from "../utils";
import { firebase } from "../firebase";
import { Screens } from "../navigations";
import { AppLoader } from "../layouts";
import GlassX, { useStore } from "glassx";
import { Button } from "../components";

export const Notice = ({ navigation }) => {
  const [application, setApplication] = useStore("application");
  const [loading, setLoading] = useState(true);
  const [_, setStore] = useStore();
  useEffect(() => {
    const applicationsRef = firebase.firestore().collection("applications");
    applicationsRef.doc(GlassX.get("user").id).onSnapshot((querySnapshot) => {
      if (querySnapshot.exists) {
        setApplication(querySnapshot.data());
      } else {
        setLoading(false);
        setApplication(undefined);
        navigation.navigate(Screens.LOGIN);
      }
    });
    setLoading(false);

    return () => setLoading(false);
  }, []);
  console.log(application.status);
  if (loading) return <AppLoader />;
  const signout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    setStore({});
    await setUser("");
    navigation.navigate(Screens.LOGIN);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {application.status === "processing" ? (
        <Processing />
      ) : application.status === "disapproved" ? (
        <Disapproved />
      ) : (
        <Approved navigation={navigation} />
      )}

      <Button
        title={"Sign out"}
        spinnerStyle={{ color: Colors.PRIMARY }}
        loading={loading}
        textStyle={{ fontSize: getScreenPercent(4.5), color: Colors.SECONDARY }}
        style={styles.button}
        onPress={signout}
      />
    </View>
  );
};

const Processing = () => {
  return (
    <>
      <LottieView
        style={{ height: getScreenPercent(55) }}
        source={require("../assets/waiting.json")}
        autoPlay
        loop
      />
      <Text style={{ ...styles.notice, fontSize: getScreenPercent(9.1) }}>
        Application is Processing
      </Text>
      <Text
        style={{
          ...styles.notice,
          marginTop: getScreenPercent(4),
          lineHeight: getScreenPercent(8),
        }}
      >
        Your application is being reviewed
      </Text>
    </>
  );
};
const Disapproved = () => {
  return (
    <>
      <LottieView
        style={{ height: getScreenPercent(55) }}
        source={require("../assets/rejected.json")}
        autoPlay
        loop
      />
      <Text style={{ ...styles.notice, fontSize: getScreenPercent(9.1) }}>
        Application Disapproved
      </Text>
      <Text
        style={{
          ...styles.notice,
          marginTop: getScreenPercent(4),
          lineHeight: getScreenPercent(8),
        }}
      >
        Your application is unsuccessful. We cant approve credit at this time.
      </Text>
    </>
  );
};
const Approved = ({ navigation }) => {
  return (
    <>
      <LottieView
        style={{ height: getScreenPercent(55) }}
        source={require("../assets/approved.json")}
        autoPlay
        loop
      />
      <Text style={{ ...styles.notice, fontSize: getScreenPercent(9.1) }}>
        Application Approved
      </Text>
      <Text
        style={{
          ...styles.notice,
          marginTop: getScreenPercent(4),
          fontSize: getScreenPercent(6),
          lineHeight: getScreenPercent(8),
        }}
      >
        You have been awarded a credit of GHS 200.00
      </Text>
      <Button
        title={"View dashboard"}
        onPress={() => navigation.navigate(Screens.HOME)}
        textStyle={{ fontSize: getScreenPercent(4.5), color: Colors.PRIMARY }}
        style={{
          width: getScreenPercent(45),
          backgroundColor: Colors.SECONDARY,
          height: getScreenPercent(14),
          marginBottom: getScreenPercent(-20),
          marginTop: getScreenPercent(10),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  notice: {
    fontSize: getScreenPercent(5),
    textAlign: "center",
    marginHorizontal: getScreenPercent(3),
    fontFamily: FONTS.WORK_SANS_MEDIUM,
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: getScreenPercent(45),
    backgroundColor: Colors.PRIMARY,
    height: getScreenPercent(14),
    borderWidth: 2,
    marginTop: getScreenPercent(25),
    marginVertical: getScreenPercent(2.3),
  },
});
