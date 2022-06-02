import React from "react";
import { StyleSheet, Image } from "react-native";
import { Colors } from "../theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screens } from "../navigations";
import { Dashboard } from "./Dashboard";
import { Settings } from "./Settings";
import { Transact } from "./Transact";
import { Statistics } from "./Statistics";
import { getScreenPercent } from "../utils";

const Tab = createBottomTabNavigator();

export const Home = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.DASHBOARD}
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={Screens.DASHBOARD}
        component={Dashboard}
        options={{
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
      />
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
        name={Screens.STATISTICS}
        component={Statistics}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                activeImage={require("../assets/Iconly/Bold/Chart.png")}
                image={require("../assets/Iconly/Light/Chart.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Screens.SETTINGS}
        component={Settings}
        options={{
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
      />
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
