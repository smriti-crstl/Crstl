import color from "color";

const lightenColor = (colorCode: string, ratio?: number): string =>
  color(colorCode)
    .fade(ratio || 0.2)
    .toString();

const addExtraPadding = (
  extraPadding: string | boolean | undefined,
  defaultValue: string
): null | string => {
  if (!extraPadding) {
    return null;
  }
  if (typeof extraPadding === "boolean") {
    return defaultValue;
  } else if (typeof extraPadding === "string") {
    return extraPadding;
  } else {
    console.warn("Unexpected Behavior");
    return null;
  }
};

export { lightenColor, addExtraPadding };
