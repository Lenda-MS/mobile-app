import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./navigations";
import { firebase } from "./firebase";

import { Onboarding, Login, Signup } from "./screens";
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
} from "@expo-google-fonts/work-sans";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
export default function App() {
  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection("users");
  //   const unSubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           setLoading(false);
  //           setUser(userData);
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  //   return () => unSubscribe();
  // }, []);
  const [fontsLoaded] = useFonts({
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName={Screens.ONBOARDING}>
            <Stack.Screen
              name={Screens.ONBOARDING}
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screens.LOGIN}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screens.SIGNUP}
              component={Signup}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}
