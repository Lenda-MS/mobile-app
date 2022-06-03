import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { FONTS } from "../theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screens } from "../navigations";
import { Dashboard } from "./Dashboard";
import { Settings } from "./Settings";
import { Transact } from "./Transact";
import { getScreenPercent, setUser } from "../utils";
import GlassX, { useStore } from "glassx";
import { AppLoader } from "../layouts";
import { firebase } from "../firebase";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const [_, setWallet] = useStore("wallet");
  const [loading, setLoading] = useState(true);
  const [__, setStore] = useStore();
  useEffect(() => {
    const walletsRef = firebase.firestore().collection("wallets");
    walletsRef.doc(GlassX.get("user").id).onSnapshot((querySnapshot) => {
      if (querySnapshot.exists) {
        setWallet(querySnapshot.data());
        setLoading(false);
      } else navigation.navigate(Screens.LOGIN);

      setLoading(false);
    });
  }, []);

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
    <Tab.Navigator
      initialRouteName={Screens.DASHBOARD}
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={Screens.DASHBOARD}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                activeImage={require("../assets/Iconly/Bold/Home.png")}
                image={require("../assets/Iconly/Light/Home.png")}
              />
            );
          },
        }}
      >
        {(props) => <Dashboard {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Screens.TRANSACT}
        component={Transact}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                activeImage={require("../assets/Iconly/Bold/Swap.png")}
                image={require("../assets/Iconly/Light/Swap.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Screens.SETTINGS}
        options={{
          headerTitleStyle: {
            fontFamily: FONTS.WORK_SANS_MEDIUM,
            fontSize: getScreenPercent(5.4),
          },
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                activeImage={require("../assets/Iconly/Bold/Setting.png")}
                image={require("../assets/Iconly/Light/Setting.png")}
              />
            );
          },
        }}
      >
        {(props) => <Settings signout={signout} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const TabIcon = ({ image, focused, activeImage }) => {
  return focused ? (
    <Image style={styles.tabIcon} resizeMode="cover" source={activeImage} />
  ) : (
    <Image style={styles.tabIcon} resizeMode="stretch" source={image} />
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: getScreenPercent(5.4),
    height: getScreenPercent(5.4),
  },
});
