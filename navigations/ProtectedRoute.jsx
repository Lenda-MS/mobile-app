import GlassX from "glassx";
import React from "react";
import { StyleSheet } from "react-native";
import { Login } from "../screens";
import { getUser } from "../utils";
import { Screens } from "./screens";

export const ProtectedRoute = ({ component: C, props }) => {
  getUser()
    .then((user) => {
      if (user) {
        GlassX.set({ user });
      }
    })
    .catch((_) => {
      props.navigation.navigate(Screens.LOGIN);
    });

  if (GlassX.get("user")) {
    return <C {...props} />;
  }
  return <Login />;
};

const styles = StyleSheet.create({});
