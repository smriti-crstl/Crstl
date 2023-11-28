import { LDFlagSet } from "launchdarkly-js-sdk-common";
import moment from "moment";
import { SearchParamsUrlEncoder } from "./SearchParamsUrlEncoder";

describe("encode", () => {
  it("should return empty string if no search params", () => {
    expect(SearchParamsUrlEncoder.encode({})).toBe("");
    expect(
      SearchParamsUrlEncoder.encode({
        filter: {},
      })
    ).toBe("");
  });

  it("handles string parameters", () => {
    expect(
      SearchParamsUrlEncoder.encode({
        searchString: "test",
      })
    ).toBe("q=test");

    expect(
      SearchParamsUrlEncoder.encode({
        searchString: "",
      })
    ).toBe("");
  });

  it("handles date parameters", () => {
    expect(
      SearchParamsUrlEncoder.encode({
        filter: {
          createdAt: [moment("2023-01-01", "YYYY-MM-DD")],
        },
      })
    ).toBe("sd=2023-01-01");

    expect(
      SearchParamsUrlEncoder.encode({
        filter: {
          dateRange: [
            moment("2023-01-01", "YYYY-MM-DD"),
            moment("2023-01-02", "YYYY-MM-DD"),
          ],
        },
      })
    ).toBe("sd=2023-01-01&ed=2023-01-02");
  });

  it("handles string array parameters", () => {
    expect(
      SearchParamsUrlEncoder.encode({
        filter: {
          tradingPartnerId: ["10", "20"],
        },
      })
    ).toBe("tp=10%2C20");

    expect(
      SearchParamsUrlEncoder.encode({
        filter: {
          tradingPartnerId: ["10"],
        },
      })
    ).toBe("tp=10");

    expect(
      SearchParamsUrlEncoder.encode({
        filter: {
          tradingPartnerId: [],
        },
      })
    ).toBe("");
  });

  it("concatenates multiple parameters", () => {
    expect(
      SearchParamsUrlEncoder.encode({
        searchString: "search",
        filter: {
          documentType: ["dt1", "dt2"],
          createdAt: [moment("2023-01-01", "YYYY-MM-DD")],
        },
      })
    ).toBe("q=search&sd=2023-01-01&dt=dt1%2Cdt2");
  });
});

describe("decode", () => {
  let searchParams: URLSearchParams;
  let flags: LDFlagSet = {};

  beforeEach(() => {
    searchParams = new URLSearchParams();
    flags = {
      searchAdditionalDateFields: true,
    };
  });

  it("handles no parameters", () => {
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual(
      {}
    );
  });

  it("handles strings", () => {
    searchParams.set("q", "test,123");
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual({
      searchString: "test,123",
    });
  });

  it("handles dateRange & createdAt", () => {
    searchParams.set("sd", "2023-01-04");
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual({
      filter: {
        dateRange: [moment("2023-01-04", "YYYY-MM-DD"), undefined],
      },
    });

    flags.searchAdditionalDateFields = false;
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual({
      filter: {
        createdAt: [moment("2023-01-04", "YYYY-MM-DD"), undefined],
      },
    });
  });

  it("handles invalid moments", () => {
    searchParams.set("sd", "invalid start date");
    searchParams.set("ed", "2023-01-04");
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual({
      filter: {
        dateRange: [undefined, moment("2023-01-04", "YYYY-MM-DD")],
      },
    });
  });

  it("handles string arrays", () => {
    searchParams.set("tp", "123,456");
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual({
      filter: {
        tradingPartnerId: ["123", "456"],
      },
    });
  });

  it("handles multiple parameters", () => {
    searchParams.set("q", "test,123");
    searchParams.set("ed", "2023-01-04");
    searchParams.set("st", "123,456");
    expect(SearchParamsUrlEncoder.decode(searchParams, flags)).toStrictEqual({
      searchString: "test,123",
      filter: {
        dateRange: [undefined, moment("2023-01-04", "YYYY-MM-DD")],
        status: ["123", "456"],
      },
    });
  });
});
