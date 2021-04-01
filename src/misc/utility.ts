import toDecimals from "round-to-decimal";
import { upgrade } from "./interfaces";

export const calcCost = (upgrade: upgrade, amount: number) =>
  toDecimals(upgrade.cost * 1.01 ** amount, 2);

export const getArrayNumber = (array: number[], index: number) => array[index] ?? 0;

/**
 * Converts hours to milliseconds
 */
export const htm = (hours: number) => 1000 * 60 * 60 * hours;

/**
 * Converts milliseconds to hours
 */
export const mth = (milliseconds: number) => milliseconds / 3600000;
