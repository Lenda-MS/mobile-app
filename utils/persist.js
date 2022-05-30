import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUser = async (user) => {
  user = JSON.stringify(user);
  try {
    await AsyncStorage.setItem("user", user);
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user) return JSON.parse(user);
  } catch (err) {
    throw new Error("Something went wrong");
  }
};
