import { currencyUSDFormatter } from "presentation/utils";

import { createTitle } from "../edi.utils";
import { DOCUMENT_TYPE_MAP } from "../event-log/constants";
import {
  EDI_LIST_VIEW_TABLE_DATA_INDEXES,
  ediSearchBlankObject,
} from "./constants";

export const generateLoadedCSV = (data: any, tradingPartners: any) => {
  const result: any[] = [];
  data?.forEach((sampleCSVObject: any) => {
    const newObject = JSON.parse(JSON.stringify(ediSearchBlankObject));
    Object.keys(ediSearchBlankObject).forEach((ogKey) => {
      const value = sampleCSVObject[ogKey] || "";
      const tradingPartnerId =
        sampleCSVObject[EDI_LIST_VIEW_TABLE_DATA_INDEXES.TRADING_PARTNER_ID];

      if (ogKey === EDI_LIST_VIEW_TABLE_DATA_INDEXES.DOCUMENT_TYPE) {
        newObject[ogKey] = DOCUMENT_TYPE_MAP[value];
      } else if (
        ogKey === EDI_LIST_VIEW_TABLE_DATA_INDEXES.TRADING_PARTNER_ID
      ) {
        newObject[ogKey] = tradingPartners?.[tradingPartnerId];
      } else if (ogKey === EDI_LIST_VIEW_TABLE_DATA_INDEXES.STATUS) {
        newObject[ogKey] = value?.replaceAll("_", " ");
      } else if (ogKey === EDI_LIST_VIEW_TABLE_DATA_INDEXES.AMOUNT) {
        newObject[ogKey] = value ? currencyUSDFormatter(value) : "";
      } else if (
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

