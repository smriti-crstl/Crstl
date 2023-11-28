import { LDFlagSet } from "launchdarkly-js-sdk-common";
import moment from "moment";
import { SearchFieldsValue } from "./types";

/**
 * Do not change these constants or existing bookmakers will break.
 * Make sure all new constants are unique.
 */
const SEARCH_URL_PARAMS_CONSTANTS = {
  SEARCH_STRING: "q",
  TRADING_PARTNER: "tp",
  DOCUMENT_TYPE: "dt",
  STATUS: "st",
  DATE_FIELD: "df",
  START_DATE: "sd",
  END_DATE: "ed",
};

/**
 * Info about a URL search parameter.
 */
interface SearchParamEncoder {
  key: string;

  /**
   * Get the value of a search field as a string.
   */
  get: (data: SearchFieldsValue) => string | undefined;

  /**
   * Set the value of a search field from a string.
   */
  set: (data: SearchFieldsValue, value: string, flags: LDFlagSet) => void;
}

class SearchParamEncoderMoment implements SearchParamEncoder {
  constructor(
    public key: string,
    public getMoment: (data: SearchFieldsValue) => moment.Moment | undefined,
    public setMoment: (
      data: SearchFieldsValue,
      value: moment.Moment,
      flags: LDFlagSet
    ) => void
  ) {}

  public get(data: SearchFieldsValue) {
    const value = this.getMoment(data);
    return value ? moment(value).format("YYYY-MM-DD") : undefined;
  }

  public set(data: SearchFieldsValue, value: string, flags: LDFlagSet) {
    const m = moment(value, "YYYY-MM-DD");
    if (m.isValid()) {
      this.setMoment(data, m, flags);
    }
  }
}

class SearchParamEncoderStringArray implements SearchParamEncoder {
  constructor(
    public key: string,
    public getArray: (data: SearchFieldsValue) => string[] | undefined,
    public setArray: (data: SearchFieldsValue, value: string[]) => void
  ) {}

  public get(data: SearchFieldsValue) {
    const array = this.getArray(data);
    return array && array.length > 0 ? array.join(",") : undefined;
  }

  public set(data: SearchFieldsValue, value: string) {
    this.setArray(data, value.split(","));
  }
}

/**
 * Encodes search parameters into a URL query string.
 */
export class SearchParamsUrlEncoder {
  private static readonly PARAMS: SearchParamEncoder[] = [
    {
      key: SEARCH_URL_PARAMS_CONSTANTS.SEARCH_STRING,
      get: (data) => data.searchString,
      set: (data, value) => (data.searchString = value),
    },
    new SearchParamEncoderStringArray(
      SEARCH_URL_PARAMS_CONSTANTS.DATE_FIELD,
      (data) => data.filter?.dateField,
      (data, value) =>
        (SearchParamsUrlEncoder.ensureFilter(data).dateField = value)
    ),
    new SearchParamEncoderMoment(
      SEARCH_URL_PARAMS_CONSTANTS.START_DATE,
      (data) => {
        if (data?.filter?.dateRange) {
          return data?.filter?.dateRange[0];
        } else if (data?.filter?.createdAt) {
          return data?.filter?.createdAt[0];
        }
      },
      (data, value, flags) => {
        if (flags.searchAdditionalDateFields) {
          SearchParamsUrlEncoder.ensureDateRange(data)[0] = value;
        } else {
          SearchParamsUrlEncoder.ensureCreatedAt(data)[0] = value;
        }
      }
    ),
    new SearchParamEncoderMoment(
      SEARCH_URL_PARAMS_CONSTANTS.END_DATE,
      (data) => {
        if (data?.filter?.dateRange) {
          return data?.filter?.dateRange[1];
        } else if (data?.filter?.createdAt) {
          return data?.filter?.createdAt[1];
        }
      },
      (data, value, flags) => {
        if (flags.searchAdditionalDateFields) {
          SearchParamsUrlEncoder.ensureDateRange(data)[1] = value;
        } else {
          SearchParamsUrlEncoder.ensureCreatedAt(data)[1] = value;
        }
      }
    ),
    new SearchParamEncoderStringArray(
      SEARCH_URL_PARAMS_CONSTANTS.TRADING_PARTNER,
      (data) => data.filter?.tradingPartnerId,
      (data, value) =>
        (SearchParamsUrlEncoder.ensureFilter(data).tradingPartnerId = value)
    ),
    new SearchParamEncoderStringArray(
      SEARCH_URL_PARAMS_CONSTANTS.DOCUMENT_TYPE,
      (data) => data.filter?.documentType,
      (data, value) =>
        (SearchParamsUrlEncoder.ensureFilter(data).documentType = value)
    ),
    new SearchParamEncoderStringArray(
      SEARCH_URL_PARAMS_CONSTANTS.STATUS,
      (data) => data.filter?.status,
      (data, value) =>
        (SearchParamsUrlEncoder.ensureFilter(data).status = value)
    ),
  ];

  /**
   * Encodes the parameters of a SearchFieldsValue to a query string (excluding the ?);
   */
  public static encode(data: SearchFieldsValue): string {
    const searchParams = new URLSearchParams();
    for (const param of SearchParamsUrlEncoder.PARAMS) {
      const value = param.get(data);
      if (value) {
        searchParams.set(param.key, value);
      }
    }
    return searchParams.toString();
  }

  /**
   * Decodes URLSearchParams into a SearchFieldsValue.
   */
  public static decode(
    searchParams: URLSearchParams,
    flags: LDFlagSet
  ): SearchFieldsValue {
    const data: SearchFieldsValue = {};
    for (const param of SearchParamsUrlEncoder.PARAMS) {
      const value = searchParams.get(param.key);
      if (value) {
        param.set(data, value, flags);
      }
    }
    return data;
  }

  /**
   * Lazily creates the filter object if it doesn't exist.
   *
   * @returns the filter object
   */
  static ensureFilter(data: SearchFieldsValue) {
    if (!data.filter) {
      data.filter = {};
    }
    return data.filter;
  }

  /**
   * Lazily creates the createdAt object if it doesn't exist.
   *
   * @returns the createdAt object
   */
  static ensureCreatedAt(data: SearchFieldsValue) {
    const filter = this.ensureFilter(data);
    if (!filter.createdAt) {
      filter.createdAt = [undefined, undefined];
    }
    return data.filter!.createdAt!;
  }

  /**
   * Lazily creates the dateRange object if it doesn't exist.
   *
   * @returns the dateRange object
   */
  static ensureDateRange(data: SearchFieldsValue) {
    const filter = this.ensureFilter(data);
    if (!filter.dateRange) {
      filter.dateRange = [undefined, undefined];
    }
    return data.filter!.dateRange!;
  }
}
