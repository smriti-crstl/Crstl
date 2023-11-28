import "styled-components";

import {
  IThemeColors,
  IThemeColorsActions,
  IThemeColorsBackground,
  IThemeColorsBase,
  IThemeColorsGreyScale,
  IThemeColorsText,
  IThemeShadows,
  IThemeShapes,
  IThemesMixins,
  IThemesSpacing,
  IThemesTypography,
} from "./contract";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      base: IThemeColorsBase;
      colors: IThemeColors;
      greyScale: IThemeColorsGreyScale;
      text: IThemeColorsText;
      background: IThemeColorsBackground;
      actions: IThemeColorsActions;
    };
    shadows: IThemeShadows;
    typography: IThemesTypography;
    shapes: IThemeShapes;
    spacing: IThemesSpacing;
    mixins: IThemesMixins;
    fixed: {
      heights: {
        header: string;
      };
      paddings: {
        tabLeft: string;
      };
    };
  }
}
