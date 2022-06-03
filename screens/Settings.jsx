import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors, FONTS } from "../theme";
import { Screens } from "../navigations";
import { getScreenPercent, setUser } from "../utils";
import GlassX from "glassx";

export const Settings = ({ signout }) => {
  const user = GlassX.get("user");
  const application = GlassX.get("application");
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: getScreenPercent(8),
            marginBottom: getScreenPercent(3),
            marginTop: getScreenPercent(10),
            fontFamily: FONTS.WORK_SANS_MEDIUM,
          }}
        >
          {user.fullname}
        </Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.header}>Personal Details</Text>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: getScreenPercent(4),
          }}
        >
          <Text style={styles.text}>Phone Number: +{user.phoneNumber} </Text>
          <Text style={styles.text}>Email: {user.email} </Text>
        </View>
      </View>
      <View style={styles.group}>
        <Text style={styles.header}>Address Details </Text>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: getScreenPercent(4),
          }}
        >
          <Text style={styles.text}>House Address: {application.address}</Text>
          <Text style={styles.text}>City : {application.city} </Text>
          <Text style={styles.text}>Region: {application.region} </Text>
          <Text style={styles.text}>
            GPS Address: {application.gpsAddress}{" "}
          </Text>
        </View>
      </View>
      <View marginTop={getScreenPercent(20)}>
        <TouchableOpacity onPress={signout}>
          <Text
            style={{
              marginLeft: 5,
              fontSize: getScreenPercent(5.5),
              color: "#ff0000",
              fontFamily: FONTS.WORK_SANS_MEDIUM,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
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
  group: {
    marginLeft: 5,
    marginTop: getScreenPercent(7),
    marginBottom: getScreenPercent(3),
  },
  header: {
    fontSize: getScreenPercent(6),
    fontFamily: FONTS.WORK_SANS_MEDIUM,
    marginBottom: getScreenPercent(5),
  },
  text: { fontSize: 17, margin: 10, fontFamily: FONTS.WORK_SANS_MEDIUM },
});
