// WEBSITE FOR HEX-COLOR_NAMES MAPPING: https://chir.ag/projects/name-that-color

import {
  IThemeColors,
  IThemeColorsActions,
  IThemeColorsBackground,
  IThemeColorsBase,
  IThemeColorsGreyScale,
  IThemeColorsText,
} from "../contract";

const COLORS: IThemeColors = {
  //COMMON
  BLACK: "#000",
  WHITE: "#fff",
  // APP SPECIFIC
  SMALT: "#002A98",
  PERSIAN_GREEN: "#03989E",
  MISCHKA: "#D4D7DE",
  MOON_RAKER: "#C9D6F5",
  CREAM_CAN: "#FFC53D",
  CINNABAR: "#E33436",
  FRUIT_SALAD: "#4caf50",
  PURPLE: "#3631B9",
  KLIEN_BLUE: "#0012A6",
  LIGHT_KLIEN_BLUE: "#0012A680",
  SILVER_CHALICE: "#A1A1A1",
  SILVER: "#CDCCCC",
  WHITE_SMOKE: "#f0f0f0",
  ALTO: "#D9D9D9",
  CHATEAU_GREEN: "#34A853",
  CHATEAU_GREEN_BG: "rgba(52, 168, 83, 0.1)",
  MOSS_GREEN: "#A2D7B0",
  PANACHE: "#EBF7EE",
  NEGATIVE_RED: "#FF4D4F",
  NEGATIVE_RED_LIGHT: "#F1C4BE",
  NEGATIVE_RED_BG: "rgba(255, 77, 79, 0.09)",
  ALMOST_BLACK: "#262626",
  LIGHT_BLUE: "#eff3fc",
  GRAY: "#818181",
  BALI_HAI: "#8F9FAE",
  LIGHT_YELLOW: "#FDF884",
  LAVENDER_INDIGO: "#A15FFF",
  CONCORD: "#7C7A7A",
  ULTRAMARINE_BLUE: "#4E63F8",
  GRAY_DARK: "rgba(190, 190, 190, 0.17)",
  SILVER_FOIL: "#B0B0B0",
  ULTRAMARINE_BLUE_FADED: "#4E63F833",
  SOFT_PEACH: "#FFEAEA",
  BRIGHT_RED: "#FF0000",
  HONEYDEW_GREEN: "#ECFFF1",
  EARLY_DAWN_YELLOW: "#FFF7E6",
  LIGHT_MUSTARD: "#F7C960",
  DUSTY_GRAY: "#9C9C9C",
  HAWKES_BLUE: "#D6DDFC",
  POLAR: "#F6F9FD",
  BOTTICELLI: "#D4DCE8",
  RHINO: "#303B6E",
  BLACK_PEARL: "#091137",
  TITAN_WHITE: "#EFF1FF",
  CORNFLOWER_BLUE: "#96A2F9",
  MERCURY: "#E2E2E2",
  FOG: "#DBE0FF",
  RAJAH: "#FABF79",
  FLUSH_ORANGE: "#FF8000",
  BRIDESMAID: "#FEF4EA",
  CONCRETE: "#F3F3F3",
  XANADU: "#777E78",
  PASTEL_SKY: "#19ABFF",
  AQUA_BLUE: "#48BDE9",
  FROST_WHITE: "#E8F6FF",
  ROYAL_BLUE: "#5151E1",
  LIGHT_GRAY: "#EFEFEF",
  INDOCHINE: "#CC7A00",
  PERSIAN_BLUE: "#1D33B3",
  KLIEN_BLUE_BG: "rgba(0, 18, 166, 0.2)",
};

const GREY_SCALE: IThemeColorsGreyScale = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#d5d5d5",
  A200: "#aaaaaa",
  A400: "#303030",
  A700: "#616161",
};

const TEXT_COLORS: IThemeColorsText = {
  //   PRIMARY: "rgba(0, 0, 0, 0.87)",
  //   SECONDARY: "rgba(0, 0, 0, 0.54)",
  PRIMARY: COLORS.BLACK,
  SECONDARY: COLORS.WHITE,
  DISABLED: "rgba(0, 0, 0, 0.38)",
  HINT: "rgba(0, 0, 0, 0.38)",
  LIGHT: COLORS.SILVER_CHALICE,
  CALENDAR_CHIP_TEXT: COLORS.CHATEAU_GREEN,
  CALENDAR_CHIP_DISABLED_TEXT: COLORS.MOSS_GREEN,
  CALENDAR_CHIP_TEXT_GREEN: COLORS.CHATEAU_GREEN,
  CALENDAR_CHIP_DISABLED_TEXT_GREEN: COLORS.MOSS_GREEN,
  CALENDAR_CHIP_TEXT_NEGATIVE_RED: COLORS.NEGATIVE_RED,
  CALENDAR_CHIP_DISABLED_TEXT_NEGATIVE_RED: COLORS.NEGATIVE_RED_LIGHT,
  CALENDAR_CHIP_TEXT_EQ: COLORS.GRAY,
};

const BACKGROUND_COLORS: IThemeColorsBackground = {
  PRIMARY: COLORS.WHITE,
  SECONDARY: GREY_SCALE[200],
  TERTIARY: GREY_SCALE[500],
  CALENDAR_CHIP_BG_COLOR: "rgba(52, 168, 83, 0.1)",
  CALENDAR_CHIP_DISABLED_BG_COLOR: COLORS.PANACHE,
  TABLE_HEADER_BG_COLOR: COLORS.LIGHT_BLUE,
  CALENDAR_CHIP_BG_GREEN: COLORS.CHATEAU_GREEN_BG,
  CALENDAR_CHIP_BG_NEGATIVE_RED: COLORS.NEGATIVE_RED_BG,
  CALENDAR_CHIP_BG_EQ: COLORS.SILVER,
};

const ACTIONS: IThemeColorsActions = {
  ACTIVE: "rgba(0, 0, 0, 0.54)",
  HOVER: "rgba(0, 0, 0, 0.04)",
  HOVER_OPACITY: 0.04,
  SELECTED: "rgba(0, 0, 0, 0.08)",
  SELECTED_OPACITY: 0.08,
  DISABLED: "rgba(0, 0, 0, 0.26)",
  DISABLED_BACKGROUND: "rgba(0, 0, 0, 0.12)",
  DISABLED_OPACITY: 0.38,
  FOCUS: "rgba(0, 0, 0, 0.12)",
  FOCUS_OPACITY: 0.12,
  ACTIVATED_OPACITY: 0.12,
};

const BASE_COLORS: IThemeColorsBase = {
  PRIMARY: COLORS.KLIEN_BLUE,
  SECONDARY: COLORS.SMALT,
  TERTIARY: COLORS.PURPLE,
  INFO: COLORS.MOON_RAKER,
  WARNING: COLORS.CREAM_CAN,
  SUCCESS: COLORS.FRUIT_SALAD,
  ERROR: COLORS.CINNABAR,
};

export {
  COLORS,
  GREY_SCALE,
  TEXT_COLORS,
  BACKGROUND_COLORS,
  ACTIONS,
  BASE_COLORS,
};
