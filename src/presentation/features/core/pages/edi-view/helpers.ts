import { isEmpty, isObject, toNumber } from "lodash";

export const getKeyEndingIn = (item: any, ending: string) => {
  if (isEmpty(item) || !isObject(item)) {
    return "";
  }

  const keys = Object.keys(item) || [];

  return keys?.find((key) => key.endsWith(ending)) ?? "";
};

// keys ending in _01, _02, _03, etc. should be sorted in ascending order
export const getSortedKeysNumeric = (keys: string[]): string[] => {
  if (!keys.length) {
    return [];
  }

  return keys.sort((a, b) => {
    const aNum = toNumber(a.split("_").pop());
    const bNum = toNumber(b.split("_").pop());

    return aNum - bNum;
  });
};

// keys ending in _N1, _N2, _N3, etc. should be sorted in ascending order
export const getSortedKeysAlphaNumeric = (keys: string[]): string[] => {
  if (!keys.length) {
    return [];
  }

  return keys.sort((a, b) => {
    const aAlphaNum = a.split("_").pop() || "";
    const bAlphaNum = b.split("_").pop() || "";

    if (aAlphaNum === bAlphaNum) {
      return 0;
    }

    return aAlphaNum < bAlphaNum ? -1 : 1;
  });
};

