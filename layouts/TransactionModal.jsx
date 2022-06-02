import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getScreenPercent } from "../utils";
import { FONTS } from "../theme";
import LottieView from "lottie-react-native";
import { useStore } from "glassx";
import { CreditWithdrawalForm } from "./CreditWithdrawalForm";
import { CreditPaymentForm } from "./CreditPaymentForm";

export const TransactionModal = React.forwardRef(({ type }, ref) => {
  const [wallet] = useStore("wallet");

  return (
    <View>
      <RBSheet
        ref={ref}
        height={getScreenPercent(180)}
        openDuration={350}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderRadius: 20,
          },
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <Text style={styles.header}>
            {" "}
            {type === "pay" ? "Credit Payment" : "Credit Withdrawal"}{" "}
          </Text>
          {type === "pay" ? (
            <CreditPayment wallet={wallet} />
          ) : (
            <CreditWithdrawalForm />
          )}
        </KeyboardAwareScrollView>
      </RBSheet>
    </View>
  );
});

const CreditPayment = ({ wallet }) => {
  return <>{wallet.debt === 0 ? <NoDebt /> : <CreditPaymentForm />}</>;
};

const NoDebt = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <LottieView
        style={{
          height: getScreenPercent(55),
          marginTop: getScreenPercent(4),
        }}
        source={require("../assets/noPayment.json")}
        autoPlay
        loop
      />
      <Text
        style={{
          ...styles.header,
          fontSize: getScreenPercent(7.1),
          marginTop: getScreenPercent(10),
        }}
      >
        You have no debt.
      </Text>
      <Text
        style={{
          ...styles.header,
          fontSize: getScreenPercent(4.5),
          marginTop: getScreenPercent(4),
        }}
      >
        All credits have been paid.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    textAlign: "center",
    fontSize: getScreenPercent(10),
    marginTop: getScreenPercent(-30),
  },
});
