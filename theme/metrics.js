import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const Metrics = {
  SCREEN_WIDTH: width < height ? width : height,
  SCREEN_HEIGHT: width < height ? height : width,
};

export const Sizes = {
  MAIN_PADDING: "12%",
};
