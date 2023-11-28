import { theme } from "globals/themes";
import { CSV_CONFIG } from "../../../analytics/components/common/ExcelExport/csv.config";
import {
  StyledDownArrow,
  StyledDownArrowDisabled,
  StyledUpArrow,
  StyledUpArrowDisabled,
} from "./MoneyCalendar.style";

export enum PaymentType {
  RECEIVABLE = "receivable",
  PAYABLE = "payable",
}

export enum FlowType {
  INFLOW = "inflow",
  OUTFLOW = "outflow",
}

export enum COMPARE {
  EQ = "equal",
  LT = "lesser",
  GT = "greater",
}

export enum SIGN {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  ZERO = "zero",
}

export const mainConfig = {
  [COMPARE.EQ]: {
    BACKGROUND: {
      [SIGN.POSITIVE]: theme.palette.background.CALENDAR_CHIP_BG_GREEN,
      [SIGN.NEGATIVE]: theme.palette.background.CALENDAR_CHIP_BG_NEGATIVE_RED,
      [SIGN.ZERO]: theme.palette.background.CALENDAR_CHIP_BG_EQ,
    },
    FONT: {
      [SIGN.POSITIVE]: theme.palette.text.CALENDAR_CHIP_TEXT_GREEN,
      [SIGN.NEGATIVE]: theme.palette.text.CALENDAR_CHIP_TEXT_NEGATIVE_RED,
      [SIGN.ZERO]: theme.palette.text.CALENDAR_CHIP_TEXT_EQ,
    },
    ARROW: {
      [SIGN.POSITIVE]: <StyledUpArrow />,
      [SIGN.NEGATIVE]: <StyledDownArrow />,
      [SIGN.ZERO]: <StyledUpArrow />,
    },
  },
  [COMPARE.LT]: {
    BACKGROUND: {
      [SIGN.POSITIVE]: theme.palette.background.CALENDAR_CHIP_BG_GREEN,
      [SIGN.NEGATIVE]: theme.palette.background.CALENDAR_CHIP_BG_NEGATIVE_RED,
      [SIGN.ZERO]: theme.palette.background.CALENDAR_CHIP_BG_EQ,
    },
    FONT: {
      [SIGN.POSITIVE]: theme.palette.text.CALENDAR_CHIP_DISABLED_TEXT_GREEN,
      [SIGN.NEGATIVE]:
        theme.palette.text.CALENDAR_CHIP_DISABLED_TEXT_NEGATIVE_RED,
      [SIGN.ZERO]: theme.palette.text.CALENDAR_CHIP_TEXT_EQ,
    },
    ARROW: {
      [SIGN.POSITIVE]: <StyledUpArrowDisabled />,
      [SIGN.NEGATIVE]: <StyledDownArrowDisabled />,
      [SIGN.ZERO]: <StyledUpArrowDisabled />,
    },
  },
  [COMPARE.GT]: {
    BACKGROUND: {
      [SIGN.POSITIVE]: theme.palette.background.CALENDAR_CHIP_BG_GREEN,
      [SIGN.NEGATIVE]: theme.palette.background.CALENDAR_CHIP_BG_NEGATIVE_RED,
      [SIGN.ZERO]: theme.palette.background.CALENDAR_CHIP_BG_EQ,
    },
    FONT: {
      [SIGN.POSITIVE]: theme.palette.text.CALENDAR_CHIP_TEXT_GREEN,
      [SIGN.NEGATIVE]: theme.palette.text.CALENDAR_CHIP_TEXT_NEGATIVE_RED,
      [SIGN.ZERO]: theme.palette.text.CALENDAR_CHIP_TEXT_EQ,
    },
    ARROW: {
      [SIGN.POSITIVE]: <StyledUpArrow />,
      [SIGN.NEGATIVE]: <StyledDownArrow />,
      [SIGN.ZERO]: <StyledUpArrow />,
    },
  },
};

export enum TRANSACTION {
  ACTUAL = "ActualTransactions",
  EXPECTED = "ExpectedPayments",
}

export const csvConfig = {
  [TRANSACTION.ACTUAL]: {
    FILENAME: "Actual Transactions",
    CONFIG: CSV_CONFIG.MONEY_CAL_ACTUAL,
  },
  [TRANSACTION.EXPECTED]: {
    FILENAME: "Expected Payments",
    CONFIG: CSV_CONFIG.MONEY_CAL_EXPECTED,
  },
};

export type SignType = SIGN.POSITIVE | SIGN.NEGATIVE | SIGN.ZERO;
export type CompareType = COMPARE.EQ | COMPARE.GT | COMPARE.LT;
