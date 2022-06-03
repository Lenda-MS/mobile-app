import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FONTS } from "../theme";
import { getScreenPercent } from "../utils";

export const TransactionsTable = ({ transactions, loading }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.header}>Transactions</Text>
        <Text
          style={{
            fontSize: getScreenPercent(4.5),
            fontFamily: FONTS.WORK_SANS_MEDIUM,
          }}
        >
          Last 5
        </Text>
      </View>
      {loading ? (
        <View>
          <AnimatedLottieView
            style={{ height: getScreenPercent(39) }}
            source={require("../assets/loader.json")}
            autoPlay
            loop
          />
        </View>
      ) : transactions.length === 0 ? (
        <View>
          <AnimatedLottieView
            style={{
              height: getScreenPercent(40),
              width: getScreenPercent(40),
            }}
            source={require("../assets/emptytransaction.json")}
            autoPlay
            loop
          />
          <Text style={{ ...styles.header, textAlign: "center" }}>
            No Transactions
          </Text>
        </View>
      ) : (
        <View style={{ marginTop: getScreenPercent(4) }}>
          {transactions.map((transaction) => {
            return (
              <View style={styles.transaction} key={transaction.id}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {transaction.type === "payment" ? (
                    <Image
                      style={styles.icon}
                      source={require("../assets/Iconly/Bold/Download.png")}
                    />
                  ) : (
                    <Image
                      style={styles.icon}
                      source={require("../assets/Iconly/Bold/Upload.png")}
                    />
                  )}
                  <View style={{ marginLeft: getScreenPercent(3) }}>
                    <Text
                      style={{
                        fontSize: getScreenPercent(4.5),
                        fontFamily: FONTS.WORK_SANS_MEDIUM,
                        marginBottom: getScreenPercent(2),
                      }}
                    >
                      {transaction.type.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        fontSize: getScreenPercent(3),
                        fontFamily: FONTS.WORK_SANS_MEDIUM,
                      }}
                    >
                      {new Date(
                        transaction.createdAt.seconds * 1000
                      ).toUTCString()}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: getScreenPercent(5),
                      fontFamily: FONTS.WORK_SANS_MEDIUM,
                    }}
                  >
                    GHS {Number(transaction.amount).toFixed(2)}{" "}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "column" },
  header: {
    fontSize: getScreenPercent(7),
    fontFamily: FONTS.WORK_SANS_MEDIUM,
  },
  transaction: {
    flexDirection: "row",
    marginTop: getScreenPercent(2),
    marginBottom: getScreenPercent(3),
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    height: getScreenPercent(8),
    width: getScreenPercent(8),
  },
});
