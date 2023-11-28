// colors

export interface IThemeContainerColor {
  readonly border: string;
}
export interface IThemeColors {
  readonly BLACK: string;
  readonly WHITE: string;
  readonly SMALT: string;
  readonly PERSIAN_GREEN: string;
  readonly MISCHKA: string;
  readonly MOON_RAKER: string;
  readonly CREAM_CAN: string;
  readonly CINNABAR: string;
  readonly FRUIT_SALAD: string;
  readonly PURPLE: string;
  readonly KLIEN_BLUE: string;
  readonly LIGHT_KLIEN_BLUE: string;
  readonly SILVER_CHALICE: string;
  readonly SILVER: string;
  readonly WHITE_SMOKE: string;
  readonly ALTO: string;
  readonly CHATEAU_GREEN: string;
  readonly MOSS_GREEN: string;
  readonly CHATEAU_GREEN_BG: string;
  readonly PANACHE: string;
  readonly NEGATIVE_RED: string;
  readonly NEGATIVE_RED_BG: string;
  readonly NEGATIVE_RED_LIGHT: string;
  readonly ALMOST_BLACK: string;
  readonly LIGHT_BLUE: string;
  readonly GRAY: string;
  readonly LIGHT_GRAY: string;
  readonly BALI_HAI: string;
  readonly LIGHT_YELLOW: string;
  readonly CONCORD: string;
  readonly ROYAL_BLUE: string;
  readonly [key: string]: string;
}

export interface IThemeColorsGreyScale {
  readonly 50: string;
  readonly 100: string;
  readonly 200: string;
  readonly 300: string;
  readonly 400: string;
  readonly 500: string;
  readonly 600: string;
  readonly 700: string;
  readonly 800: string;
  readonly 900: string;
  readonly A100: string;
  readonly A200: string;
  readonly A400: string;
  readonly A700: string;
}

export interface IThemeColorsText {
  readonly PRIMARY: string;
  readonly SECONDARY: string;
  readonly DISABLED: string;
  readonly HINT: string;
  readonly LIGHT: string;
  readonly CALENDAR_CHIP_TEXT: string;
  readonly CALENDAR_CHIP_DISABLED_TEXT: string;
  readonly CALENDAR_CHIP_TEXT_GREEN: string;
  readonly CALENDAR_CHIP_DISABLED_TEXT_GREEN: string;
  readonly CALENDAR_CHIP_TEXT_NEGATIVE_RED: string;
  readonly CALENDAR_CHIP_DISABLED_TEXT_NEGATIVE_RED: string;
  readonly CALENDAR_CHIP_TEXT_EQ: string;
}

export interface IThemeColorsBackground {
  readonly PRIMARY: string;
  readonly SECONDARY: string;
  readonly TERTIARY: string;
  readonly CALENDAR_CHIP_BG_COLOR: string;
  readonly CALENDAR_CHIP_DISABLED_BG_COLOR: string;
  readonly TABLE_HEADER_BG_COLOR: string;
  readonly CALENDAR_CHIP_BG_GREEN: string;
  readonly CALENDAR_CHIP_BG_NEGATIVE_RED: string;
  readonly CALENDAR_CHIP_BG_EQ: string;
}

export interface IThemeColorsActions {
  readonly ACTIVE: string;
  readonly HOVER: string;
  readonly HOVER_OPACITY: number;
  readonly SELECTED: string;
  readonly SELECTED_OPACITY: number;
  readonly DISABLED: string;
  readonly DISABLED_BACKGROUND: string;
  readonly DISABLED_OPACITY: number;
  readonly FOCUS: string;
  readonly FOCUS_OPACITY: number;
  readonly ACTIVATED_OPACITY: number;
}

export interface IThemeColorsBase {
  readonly PRIMARY: string;
  readonly SECONDARY: string;
  readonly TERTIARY: string;
  readonly INFO: string;
  readonly WARNING: string;
  readonly SUCCESS: string;
  readonly ERROR: string;
}

// shadows

export interface IThemeShadows {
  readonly 0: string;
  readonly 1: string;
  readonly 2: string;
  readonly 3: string;
  readonly 4: string;
  readonly 5: string;
  readonly 6: string;
  readonly 7: string;
  readonly 8: string;
  readonly 9: string;
  readonly 10: string;
  readonly 11: string;
  readonly 12: string;
  readonly 13: string;
  readonly 14: string;
  readonly 15: string;
  readonly 16: string;
  readonly 17: string;
  readonly 18: string;
  readonly 19: string;
  readonly 20: string;
  readonly 21: string;
  readonly 22: string;
  readonly 23: string;
  readonly 24: string;
  readonly HEADER: string;
}

// shapes

export interface IThemeShapes {
  readonly BORDER_RADIUS: {
    readonly XS: string;
    readonly SM: string;
    readonly MD: string;
    readonly LG: string;
    readonly XL: string;
    readonly XXL: string;
    readonly XXXL: string;
    readonly CIRCLE: string;
  };
}

// spacing

export interface IThemesSpacing {
  readonly SMALL: string;
  readonly MEDIUM: string;
  readonly LARGE: string;
  readonly XL: string;
  readonly XXL: string;
  readonly XXXL: string;
  readonly TOP: string;
  readonly LEFT: string;
  readonly RIGHT: string;
  readonly BOTTOM: string;
}

// typography

export type TypographyWeights = "LIGHT" | "REGULAR" | "MEDIUM" | "BOLD";

export interface IThemeWeights {
  readonly LIGHT: number;
  readonly REGULAR: number;
  readonly MEDIUM: number;
  readonly BOLD: number;
}

export type TypographySizes =
  | "XXS"
  | "XS"
  | "SM"
  | "MD"
  | "LG"
  | "XL"
  | "XXL"
  | "XXXL";
export interface IThemesTypography {
  readonly SIZES: {
    readonly XXS: string;
    readonly XS: string;
    readonly SM: string;
    readonly MD: string;
    readonly LG: string;
    readonly XL: string;
    readonly XXL: string;
    readonly XXXL: string;
  };
  readonly WEIGHTS: IThemeWeights;
}
export interface IThemesMixins {
  lightenColor(colorCode: string, ratio?: number): string;
  addExtraPadding(
    extraPadding: string | boolean | undefined,
    defaultValue: string
  ): null | string;
}

