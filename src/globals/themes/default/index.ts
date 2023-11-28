// THEME INSPIRATION : https://material-ui.com/customization/default-theme/
import { DefaultTheme } from "styled-components";
import {
  ACTIONS,
  BACKGROUND_COLORS,
  BASE_COLORS,
  COLORS,
  GREY_SCALE,
  TEXT_COLORS,
} from "./colors";
import { lightenColor, addExtraPadding } from "./mixins";
import { SHADOWS } from "./shadows";
import { SHAPES } from "./shapes";
import { COMMON_SPACING } from "./spacing";
import { TYPOGRAPHY } from "./typography";

const theme: DefaultTheme = {
  palette: {
    base: {
      ...BASE_COLORS,
    },
    colors: {
      ...COLORS,
    },
    greyScale: {
      ...GREY_SCALE,
    },
    text: {
      ...TEXT_COLORS,
    },
    background: {
      ...BACKGROUND_COLORS,
    },
    actions: {
      ...ACTIONS,
    },
  },
  shadows: {
    ...SHADOWS,
  },
  typography: { ...TYPOGRAPHY },
  shapes: { ...SHAPES },
  spacing: {
    ...COMMON_SPACING,
  },
  mixins: {
    lightenColor,
    addExtraPadding,
  },
  fixed: {
    heights: {
      header: "80px",
    },
    paddings: {
      tabLeft: "4rem",
    },
  },

  // deferred
  // transitions, zIndex, media
};

export { theme };
