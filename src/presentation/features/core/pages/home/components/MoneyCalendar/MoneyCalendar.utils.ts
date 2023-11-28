import moment from "moment";
import { COMPARE, CompareType, SIGN, SignType } from "./MoneyCalendar.enums";

export const getType = (date?: string, currentDate?: string): CompareType => {
  if (moment(date) === moment(currentDate)) {
    return COMPARE.EQ;
  }
  if (moment(date) > moment(currentDate)) {
    return COMPARE.GT;
  }
  if (moment(date) < moment(currentDate)) {
    return COMPARE.LT;
  }
  return COMPARE.EQ;
};

export const getColor = (totalDueAmount: number): SignType => {
  if (totalDueAmount === 0) {
    return SIGN.ZERO;
  }
  if (totalDueAmount > 0) {
    return SIGN.POSITIVE;
  }
  if (totalDueAmount < 0) {
    return SIGN.NEGATIVE;
  }
  return SIGN.ZERO;
};
