import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./navigations";

import {
  Onboarding,
  Login,
  Signup,
  Home,
  Application,
  Notice,
} from "./screens";
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
} from "@expo-google-fonts/work-sans";
import AppLoading from "expo-app-loading";
import GlassX, { PersistedState } from "glassx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProtectedRoute } from "./navigations/ProtectedRoute";

const Stack = createNativeStackNavigator();
GlassX.store({
  plugins: [
    new PersistedState({
      storage: AsyncStorage,
      env: "react-native",
      key: "glassx",
    }),
  ],
});
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
            <Stack.Screen name={Screens.HOME} options={{ headerShown: false }}>
              {(props) => <ProtectedRoute component={Home} props={props} />}
            </Stack.Screen>
            <Stack.Screen
              name={Screens.APPLICATION}
              options={{ headerShown: false, gestureEnabled: false }}
            >
              {(props) => (
                <ProtectedRoute component={Application} props={props} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name={Screens.NOTICE}
              options={{ headerShown: false, gestureEnabled: false }}
            >
              {(props) => <ProtectedRoute component={Notice} props={props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}
