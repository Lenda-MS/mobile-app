import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { Button } from "../components";
import { TransactionModal } from "../layouts";

export const Transact = ({}) => {
  const refRBSheet = useRef();
  const [transactionType, setTransactionType] = useState();

  const openTransactionModal = (type) => {
    refRBSheet.current.open();
    setTransactionType(type);
  };

  return (
    <View style={styles.container}>
      <TransactionModal
        ref={refRBSheet}
        type={transactionType}
        setType={setTransactionType}
      />
      <LottieView
        style={{ height: getScreenPercent(55) }}
        source={require("../assets/payorwithdrawal.json")}
        autoPlay
        loop
      />
      <Text style={{ ...styles.header, fontSize: getScreenPercent(9.1) }}>
        Pay or Withdraw
      </Text>
      <View style={{ marginTop: getScreenPercent(20) }}>
        <Button
          style={styles.button}
          onPress={() => openTransactionModal("pay")}
        >
          <Image
            style={styles.buttonIcon}
            source={require("../assets/Iconly/Light/Download.png")}
          />
          <Text style={styles.buttonText}>Pay Credit</Text>
        </Button>
        <Button
          style={{ ...styles.button, backgroundColor: Colors.SECONDARY }}
          onPress={() => openTransactionModal("withdraw")}
        >
          <Image
            style={styles.buttonIcon}
            source={require("../assets/Iconly/Light/Upload.png")}
          />
          <Text style={{ ...styles.buttonText, color: Colors.PRIMARY }}>
            Withdraw Credit
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: getScreenPercent(5),
    textAlign: "center",
    marginHorizontal: getScreenPercent(3),
    fontFamily: FONTS.WORK_SANS_MEDIUM,
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: getScreenPercent(80),
    backgroundColor: Colors.PRIMARY,
    height: getScreenPercent(14),
    borderWidth: 2,
    marginBottom: getScreenPercent(6),
    flexDirection: "row",
  },
  buttonIcon: {
    width: getScreenPercent(6),
    height: getScreenPercent(6),
  },
  buttonText: {
    fontSize: getScreenPercent(5),
    color: Colors.SECONDARY,
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    marginLeft: getScreenPercent(3),
  },
});
