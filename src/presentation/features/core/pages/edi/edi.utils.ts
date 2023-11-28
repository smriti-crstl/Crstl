import { GetAssociatedPOChangeDocsResponseModel } from "domain/entity/edi/models";
import { saveAs } from "file-saver";
import { get, head, pick, startCase, toString } from "lodash";
import moment from "moment";
import * as XLSX from "xlsx";

import {
  CSV_DATE_FORMAT,
  CSVColumn,
  FILE,
} from "../analytics/components/common/ExcelExport/csv.config";
import { removeUserInput } from "../edi-edit/helpers";
import { Document } from "../edi-purchase-order/types/TargetJson850";

export const getLineItemsFromObject = (lin: any) => {
  const keys = Object.keys(lin);
  let upc = "";
  let sku = "";
  let buyersItemNo = "";
  let vendor = "";
  keys.forEach((key) => {
    if (
      lin[key] === "vendors_style_number_VA" ||
      lin[key] === "VN" ||
      lin[key] === "vendors_sellers_item_number_VN"
    ) {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        vendor = lin[`product_service_id_0${idx + 1}`];
      } else {
        vendor = lin[`product_service_id_${idx + 1}`];
      }
    } else if (lin[key] === "buyers_item_number_IN" || lin[key] === "IN") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        buyersItemNo = lin[`product_service_id_0${idx + 1}`];
      } else {
        buyersItemNo = lin[`product_service_id_${idx + 1}`];
      }
    } else if (
      lin[key] === "CB" ||
      lin[key] === "buyers_catalog_number_CB" ||
      lin[key] === "PI" ||
      lin[key] === "purchasers_item_code_PI" ||
      lin[key] === "SK" ||
      lin[key] === "stock_keeping_unit_sku_SK"
    ) {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        sku = lin[`product_service_id_0${idx + 1}`];
      } else {
        sku = lin[`product_service_id_${idx + 1}`];
      }
    } else if (
      lin[key] === "UP" ||
      lin[key] === "upc_consumer_package_code_1_5_5_1_UP" ||
      lin[key] === "UI" ||
      lin[key] === "upc_consumer_package_code_1_5_5_UI" ||
      lin[key] === "ucc_12_UP" ||
      lin[key] === "GTIN" ||
      lin[key] === "gtin_14_digit_data_structure_UK" ||
      lin[key] === "UK" ||
      lin[key] === "UA"
    ) {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        upc = lin[`product_service_id_0${idx + 1}`];
      } else {
        upc = lin[`product_service_id_${idx + 1}`];
      }
    }
  });

  return {
    upc,
    sku,
    buyersItemNo,
    vendor,
  };
};

export const getLineItemDatesFromObject = (lin: any) => {
  let requestedDate = "";
  let approvalDate = "";
  let shippedDate = "";
  let currentScheduledShipDate = "";

  if (!lin) {
    return {
      requestedDate,
      approvalDate,
      shippedDate,
      currentScheduledShipDate,
    };
  }

  const keys = Object.keys(lin);

  keys.forEach((key) => {
    if (lin[key] === "requested_ship_010" || lin[key] === "010") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        requestedDate = lin[`date_0${idx + 1}`];
      } else {
        requestedDate = lin[`date_${idx + 1}`];
      }
    } else if (lin[key] === "approved_275" || lin[key] === "275") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        approvalDate = lin[`date_0${idx + 1}`];
      } else {
        approvalDate = lin[`date_${idx + 1}`];
      }
    } else if (lin[key] === "011") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        shippedDate = lin[`date_0${idx + 1}`];
      } else {
        shippedDate = lin[`date_${idx + 1}`];
      }
    } else if (lin[key] === "current_schedule_ship_068" || lin[key] === "068") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        currentScheduledShipDate = lin[`date_0${idx + 1}`];
      } else {
        currentScheduledShipDate = lin[`date_${idx + 1}`];
      }
    }
  });

  return {
    requestedDate,
    approvalDate,
    shippedDate,
    currentScheduledShipDate,
  };
};

export const getAdminContactInfo = (lin: any) => {
  let email = "";
  let telephone = "";

  if (!lin) {
    return {
      email,
      telephone,
    };
  }

  const keys = Object.keys(lin);

  keys.forEach((key) => {
    if (lin[key] === "telephone_TE") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        telephone = lin[`communication_number_0${idx + 1}`];
      } else {
        telephone = lin[`communication_number_${idx + 1}`];
      }
    } else if (lin[key] === "electronic_mail_EM") {
      const idx = parseInt(key.substring(key.length - 2, key.length));
      if (idx < 10) {
        email = lin[`communication_number_0${idx + 1}`];
      } else {
        email = lin[`communication_number_${idx + 1}`];
      }
    }
  });

  return {
    email,
    telephone,
  };
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isUpperCase = (char: string) => /^[A-Z]*$/.test(char);
export const isNum = (char: string) => /^[0-9]*$/.test(char);

export const createTitle = (titleString: string) => {
  const titleArray: string[] = [];
  titleString.split("_").map((word: string) => {
    if (!(word === "loop" || isUpperCase(word[0]) || isNum(word[0]))) {
      titleArray.push(capitalizeFirstLetter(word));
    }
  });
  return titleArray.join(" ");
};

export const getValue = (
  path: string,
  data?: Document,
  defaultValue: unknown = ""
) => {
  return get(data, path, defaultValue);
};

export const exportToCsv = (
  config: CSVColumn[],
  csvData: any[],
  fileName: string
) => {
  const fileType = FILE.TYPE;
  const fileExtension = FILE.EXTENSION;

  const exportModel: string[] = [];
  const headers: string[] = [];
  config?.forEach((column: CSVColumn) => {
    if (!column.hidden) {
      exportModel.push(column.key);
      headers.push(column.label);
    }
  });
  const filteredData = csvData.map((c: any) => {
    return pick(c, exportModel);
  });
  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [headers]);
  XLSX.utils.sheet_add_json(ws, filteredData, {
    origin: FILE.ORIGIN,
    skipHeader: true,
  });
  const csv = XLSX.utils.sheet_to_csv(ws);
  const data = new Blob([csv], { type: fileType });
  const date = moment().format(CSV_DATE_FORMAT);
  saveAs(data, `${fileName} (${date})${fileExtension}`);
};

export const getNewPoChanges = (
  data?: GetAssociatedPOChangeDocsResponseModel
) => {
  const responseData = data?.data;

  const newPos = responseData?.filter((poItem) => {
    const mostRecentState = head(poItem.state);
    const isMostRecentStateNew =
      mostRecentState?.value?.toLowerCase() === "new";
    return isMostRecentStateNew;
  });

  const firstNewPo = head(newPos);
  const newPosCount = newPos?.length ?? 0;

  const firstPo = head(responseData);

  return {
    hasNewPos: newPosCount > 0,
    poChangeId: firstPo?.id ?? "",
    newPosCount,
    hasPos: responseData ? responseData?.length > 0 : false,
    newPOChangeId: firstNewPo?.id ?? "",
  };
};

export const getSourceDocumentTypeFromPathName = (pathname: string) => {
  if (
    pathname.includes("grocery-purchase-order") ||
    pathname.includes("grocery-purchase-order-change")
  ) {
    return "875";
  }

  return "850";
};

export const getTpfName = ({
  name,
  flavor,
}: {
  name?: string;
  flavor?: string;
}): string => {
  if (!name) {
    return "";
  }

  return flavor ? `${name} - ${flavor}` : name;
};

export const getTpfNameFromListDoc = (listDoc: unknown): string => {
  if (!listDoc) {
    return "";
  }

  const name: string = get(listDoc, "data.metadata.trading_partner_name", "");
  const flavor: string = get(
    listDoc,
    "data.metadata.trading_partner_flavor",
    ""
  );

  return getTpfName({ name, flavor });
};

// input general_contact_CN : output General Contact [CN]
export const getFallbackTextForCode = (code?: string): string => {
  code = removeUserInput(code);

  if (!code) {
    return "";
  }

  if (typeof code !== "string") {
    return toString(code);
  }

  const splittedValue = code.split("_");

  if (splittedValue.length < 2) {
    return startCase(code);
  }

  const codeText = splittedValue.pop() ?? "";

  return `${startCase(splittedValue.join(" "))} [${codeText}]`;
};

