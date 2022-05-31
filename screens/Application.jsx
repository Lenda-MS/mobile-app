import GlassX, { useStore } from "glassx";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme";
import { AddressForm, AppLoader, IDForm } from "../layouts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase";

export const Application = ({}) => {
  const [step, setStep] = useStore("step");
  const [loading, setLoading] = useState(true);
  const [_, setDisplaySuccess] = useStore("displaySuccess");

  useEffect(() => {
    const applicationsRef = firebase.firestore().collection("applications");
    applicationsRef
      .where("userId", "==", GlassX.get("user").id)
      .onSnapshot((querySnapshot) => {
        GlassX.set({
          application: querySnapshot.docs[0].data(),
        });
        setLoading(false);
      });
    return () => {
      setStep(undefined);
      setDisplaySuccess(false);
    };
  }, []);

  if (loading) return <AppLoader />;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <SafeAreaView edges={["top"]}>
        {step === 1 ? (
          <AddressForm useStep={setStep} />
        ) : (
          <IDForm useStep={setStep} />
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    justifyContent: "center",
  },
});
