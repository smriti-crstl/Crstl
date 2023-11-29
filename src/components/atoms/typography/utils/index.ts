import {
  TypographySizes,
  TypographyWeights,
} from "@crstl/app/src/globals/themes/default/contract";

export type Size = TypographySizes;
export type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5";

export type Weight = TypographyWeights;

const getSizeToElementMapping = (size: Size): HeadingTypes => {
  switch (size) {
    case "MD":
      return "h2";
    case "SM":
      return "h3";
    case "XS":
      return "h4";
    case "XXS":
      return "h5";
    default:
      return "h1";
  }
};

export { getSizeToElementMapping };
