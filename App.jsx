import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./navigations";
import { Home } from "./screens";
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
          <Stack.Navigator initialRouteName={Screens.HOME}>
            <Stack.Screen name={Screens.HOME} component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}
