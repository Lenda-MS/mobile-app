import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./navigations";

import { Onboarding, Login, Signup, Home, Application } from "./screens";
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
} from "@expo-google-fonts/work-sans";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
export default function App() {
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
            <Stack.Screen
              name={Screens.HOME}
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screens.APPLICATION}
              component={Application}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}
