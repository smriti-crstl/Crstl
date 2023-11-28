import { createTitle } from "../edi.utils";
import { eventLogBlankObject } from "./constants";

export const generateLoadedCSV = (data: any) => {
  const result: any[] = [];
  data?.forEach((sampleCSVObject: any) => {
    const newObject = JSON.parse(JSON.stringify(eventLogBlankObject));
    Object.keys(eventLogBlankObject).forEach((ogKey) => {
      const value = sampleCSVObject[ogKey] || "";
      if (
        typeof value === "string" &&
        value.length > 0 &&
        value.indexOf("_") >= 0
      ) {
        newObject[ogKey] = createTitle(value);
      } else {
        newObject[ogKey] = value;
      }
    });
    result.push(newObject);
  });
  return result;
};

