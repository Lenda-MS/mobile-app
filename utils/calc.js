import { Metrics } from "../theme";

export const getScreenPercent = (number) => {
  return (number / 100) * Metrics.SCREEN_WIDTH;
};

export const getInterest = (amount) => {
  return Number((Number(amount) * 0.015).toFixed(2)) + Number(amount);
};
