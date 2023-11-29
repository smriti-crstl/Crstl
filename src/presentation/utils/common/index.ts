import { differenceInDays, intervalToDuration } from "date-fns";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  getItemFromSessionStorage,
  setItemInSessionStorage,
} from "domain/services/sessionStorage";
import { DEFAULT_FNS_DATE_FORMAT } from "globals/configs";
import { Base64 } from "js-base64";
import { startCase } from "lodash";
import queryString from 'query-string';

const isBool = (value: unknown): boolean => typeof value === "boolean";

const convertStringToSentenceCase = (val: string): string => {
  return startCase(val);
};

const decodeUrl = <URLObject = { [key: string]: string }>(
  urlString: string
): URLObject => {
  let decoded;
  try {
    decoded = JSON.parse(Base64.decode(urlString));
  } catch (e) {
    decoded = {};
  }
  return decoded;
};

const encodeToUrl = <URLObject = { [key: string]: string }>(
  param: URLObject,
  uriSafe = true
): string => {
  return Base64.encode(JSON.stringify(param), uriSafe);
};

const parseSearchParams = <ResultData = { [key: string]: string }>(
  searchQuery: string
): ResultData => {
  // Removing ? from the search URL
  const parsedQuery = queryString.parse(searchQuery.slice(1));
  return ({ ...parsedQuery } as unknown) as ResultData;
};

const currencyUSDFormatter = (number: number, isCompact?: boolean): string => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    notation: isCompact ? "compact" : "standard",
  })
    .format(number)
    .toLowerCase();
};

const currencyFormatter = (
  number: number,
  currency = "USD",
  isCompact?: boolean
) => {
  const safeCurrency = currency ?? "USD";
  return new Intl.NumberFormat("en-US", {
    currency: safeCurrency,
    style: "currency",
    notation: isCompact ? "compact" : "standard",
  })
    .format(number)
    .toLowerCase();
};

const numberFormatter = (number: number): string => {
  return new Intl.NumberFormat("en-US").format(number);
};

const sortByDate = <TDataType, K extends keyof TDataType>(
  arr: TDataType[],
  dataIndex: K,
  type: "ASC" | "DSC"
): TDataType[] => {
  const sortedArray = arr.sort((a: TDataType, b: TDataType) => {
    const dateAValue = a[dataIndex];
    const dateBValue = b[dataIndex];
    // sort based on date
    if (
      (typeof dateAValue === "string" || typeof dateAValue === "number") &&
      (typeof dateBValue === "string" || typeof dateBValue === "number")
    ) {
      new Date(dateBValue);
      if (type === "DSC") {
        return new Date(dateBValue).valueOf() - new Date(dateAValue).valueOf();
      } else {
        return new Date(dateAValue).valueOf() - new Date(dateBValue).valueOf();
      }
    }
    // fallback case for unexpected values
    return -1;
  });
  return sortedArray;
};

const formatDate = (
  date: string | number | Date,
  customDateFormat?: string
): string => {
  return format(new Date(date), customDateFormat || DEFAULT_FNS_DATE_FORMAT);
};

const convertZonedTimeToUtc = (
  zonedTime: string,
  IANATimezone: string
): Date => {
  return zonedTimeToUtc(zonedTime, IANATimezone);
};

const convertUtcToZonedTime = (utcDate: string, IANATimezone: string): Date => {
  return utcToZonedTime(utcDate, IANATimezone);
};

const formatIsoUtcToZonedTime = (date: string, IANATimezone: string): Date => {
  const zonedTime = convertUtcToZonedTime(date, IANATimezone);
  return zonedTime;
};

const EllipsedText = (text: string, limit: number): string => {
  let formatedText = "";

  if (text?.length > limit) {
    formatedText = `${text.substring(0, limit)}...`;
  } else {
    formatedText = text;
  }
  return formatedText;
};

const getEndDate = (month: number, year: number) => {
  if (month === 2 && ((0 == year % 4 && 0 != year % 100) || 0 == year % 400)) {
    return 29;
  } else {
    if (month % 2 === 1) {
      return 31;
    }
    if (month % 2 === 1) {
      return 30;
    } else {
      return 28;
    }
  }
};
const getWeekDayString = (day: number) => {
  switch (day) {
    case 0:
      return "SUN";
      break;
    case 1:
      return "MON";
      break;
    case 2:
      return "TUE";
      break;
    case 3:
      return "WED";
      break;
    case 4:
      return "THU";
      break;
    case 5:
      return "FRI";
      break;
    case 6:
      return "SAT";
      break;
    default:
      return;
      break;
  }
};

const remainingTimeInterval = (updatedAt?: string) => {
  const now = new Date();
  const endDate = updatedAt || now;
  const end = new Date(endDate as string);
  return intervalToDuration({
    start: now,
    end: end,
  });
};

const getTickValues = (
  startDate: string,
  endDate: string,
  colCount: number
): string => {
  const diffDays = Math.abs(
    differenceInDays(new Date(startDate), new Date(endDate))
  );
  const noOfDays = Math.round(diffDays / colCount) || 1;
  return `every ${noOfDays} days`;
};

function getSafeNumber(value: any = "", defaultValue = 0) {
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

// ref: https://www.codemzy.com/blog/fix-chunkloaderror-react
// a function to retry loading a chunk to avoid chunk load error for out of date code
const lazyRetry = function (
  componentImport: () => Promise<any>,
  name: string
): any {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(
      getItemFromSessionStorage(`retry-${name}-refreshed`) || "false"
    );
    // try to import the component
    componentImport()
      .then((component) => {
        setItemInSessionStorage(`retry-${name}-refreshed`, "false"); // success so reset the refresh
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          setItemInSessionStorage(`retry-${name}-refreshed`, "true"); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }
        reject(error); // Default error behavior as already tried refresh
      });
  });
};

export {
  isBool,
  convertStringToSentenceCase,
  parseSearchParams,
  currencyUSDFormatter,
  currencyFormatter,
  numberFormatter,
  sortByDate,
  formatDate,
  convertUtcToZonedTime,
  convertZonedTimeToUtc,
  formatIsoUtcToZonedTime,
  EllipsedText,
  getEndDate,
  getWeekDayString,
  remainingTimeInterval,
  decodeUrl,
  encodeToUrl,
  getTickValues,
  getSafeNumber,
  lazyRetry,
};

