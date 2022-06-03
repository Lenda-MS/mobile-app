import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, FONTS } from "../theme";
import { getScreenPercent } from "../utils";
import { firebase } from "../firebase";
import GlassX, { useStore } from "glassx";
import UserAvatar from "react-native-user-avatar";
import { Button } from "../components";
import { TransactionModal, TransactionsTable } from "../layouts";
import { Screens } from "../navigations";

export const Dashboard = ({ navigation }) => {
  const user = GlassX.get("user");
  const [wallet] = useStore("wallet");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const refRBSheet = useRef();
  const [transactionType, setTransactionType] = useState();

  const openTransactionModal = (type) => {
    refRBSheet.current.open();
    setTransactionType(type);
  };

  useEffect(() => {
    setLoading(true);
    const transactionsref = firebase.firestore().collection("transactions");
    transactionsref
      .where("userId", "==", user.id)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((querySnapshot) => {
        const transactions = [];
        querySnapshot.docs.forEach((doc) => {
          transactions.push(doc.data());
        });
        setTransactions(transactions);
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TransactionModal
        ref={refRBSheet}
        type={transactionType}
        setType={setTransactionType}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text
              style={{
                fontSize: getScreenPercent(4.1),
                marginBottom: getScreenPercent(1.5),
                fontFamily: FONTS.WORK_SANS_REGULAR,
              }}
            >
              Hello, {user.fullname}
            </Text>
            <Text style={styles.headerText}>Welcome Back!</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.SETTINGS)}
          >
            <UserAvatar
              size={50}
              name={user.fullname}
              bgColor={Colors.SECONDARY}
            />
          </TouchableOpacity>
        </View>
        <WalletCard wallet={wallet} />
        <View
          style={{
            flexDirection: "row",
            marginTop: getScreenPercent(6),
            justifyContent: "space-between",
            marginBottom: getScreenPercent(8),
          }}
        >
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
        <TransactionsTable transactions={transactions} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const WalletCard = ({ wallet }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInner}>
        <View>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: FONTS.WORK_SANS_MEDIUM,
            }}
          >
            Balance
          </Text>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: FONTS.WORK_SANS_MEDIUM,
              fontSize: getScreenPercent(7),
            }}
          >
            GHS {wallet.balance.toFixed(2)}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: FONTS.WORK_SANS_MEDIUM,
            }}
          >
            debt
          </Text>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: FONTS.WORK_SANS_MEDIUM,
              fontSize: getScreenPercent(7),
            }}
          >
            GHS {wallet.debt.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: getScreenPercent(7),
  },
  header: {
    flexDirection: "row",
    marginTop: getScreenPercent(8),
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    fontSize: getScreenPercent(8),
  },
  cardContainer: {
    borderColor: Colors.SECONDARY,
    borderWidth: 2,
    marginTop: getScreenPercent(8),
    height: getScreenPercent(45),
    borderRadius: 20,
    padding: getScreenPercent(1),
  },
  cardInner: {
    backgroundColor: Colors.SECONDARY,
    flex: 1,
    borderRadius: 18,
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: getScreenPercent(3),
  },
  button: {
    borderColor: Colors.SECONDARY,
    width: getScreenPercent(40),
    backgroundColor: Colors.PRIMARY,
    height: getScreenPercent(14),
    borderWidth: 2,
    marginBottom: getScreenPercent(6),
    flexDirection: "row",
  },
  buttonIcon: {
    width: getScreenPercent(5),
    height: getScreenPercent(5),
  },
  buttonText: {
    fontSize: getScreenPercent(4),
    color: Colors.SECONDARY,
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    marginLeft: getScreenPercent(3),
  },
});
