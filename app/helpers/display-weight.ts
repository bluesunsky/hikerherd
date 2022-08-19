import { WeightUnit } from "db";

export const gToOz = (grams: number) => {
  return grams * 0.03527396195;
};

export const ozToLb = (ounces: number) => {
  return ounces / 16;
};

export const gToKg = (grams: number) => {
  return grams / 1000;
};

export const ozTog = (ounces: number) => {
  return ounces / 0.03527396195;
};

export const withDecimalPlaces = (value: number, length: number = 2) => {
  var s = (Math.round(value * 10 ** length) / 10 ** length).toString();
  const p = (s + (s.indexOf(".") != -1 ? "" : ".0")).split(".");
  const a = p[0];
  if (length == 0) return a;
  var b = !p[1] ? "0" : p[1];
  return a + "." + b.padEnd(length, "0");
};

export const displayWeight = (
  weight: number,
  unit: WeightUnit,
  large?: boolean,
  length?: number
) => {
  if (unit === WeightUnit.METRIC) {
    return large
      ? `${withDecimalPlaces(gToKg(weight), length)}kg`
      : `${withDecimalPlaces(weight, 0)}g`;
  } else {
    return large
      ? `${withDecimalPlaces(ozToLb(gToOz(weight)), length)}lb`
      : `${withDecimalPlaces(gToOz(weight))}oz`;
  }
};

export default displayWeight;
