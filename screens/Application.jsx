import { useStore } from "glassx";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme";
import { AddressForm, IDForm } from "../layouts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const Application = ({}) => {
  const [step, setStep] = useStore("step");
  const [_, setDisplaySuccess] = useStore("displaySuccess");

  useEffect(() => {
    return () => {
      setStep(undefined);
      setDisplaySuccess(false);
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <SafeAreaView edges={["top"]}>
        {step === 1 ? <AddressForm useStep={setStep} /> : <IDForm />}
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
