import moment from "moment";
import { getFilterCount } from ".";

describe("getFilterCount", () => {
  it("handles undefined filter", async () => {
    expect(getFilterCount({})).toBe(0);
  });

  it("handles empty filter", async () => {
    expect(
      getFilterCount({
        filter: {},
      })
    ).toBe(0);
  });

  it("excludes searchString", async () => {
    expect(
      getFilterCount({
        searchString: "test",
        filter: {},
      })
    ).toBe(0);
  });

  it("counts filters", async () => {
    expect(
      getFilterCount({
        searchString: "test",
        filter: {
          tradingPartnerId: ["tp1", "tp2"],
          documentType: [], // Excluded because empty
          status: ["Open"],
          createdAt: [], // Excluded because empty
          dateField: ["df1"],
          dateRange: [moment(), moment()],
        },
      })
    ).toBe(4);
  });
});
