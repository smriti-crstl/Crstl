import {
  CORE_ANALYTICS_FINANCE_CASH_AND_CARDS,
  CORE_ANALYTICS_FINANCE_ACCOUNTING,
  CORE_ANALYTICS_SALES,
  CORE_ANALYTICS_OPERATIONS,
} from "globals/configs";
import { getHeaderTitle } from "./config";

describe("getHeaderTitle", () => {
  it.each([
    [CORE_ANALYTICS_FINANCE_CASH_AND_CARDS, "Cash & Cards"],
    [CORE_ANALYTICS_FINANCE_ACCOUNTING, "Accounting"],
    [CORE_ANALYTICS_SALES, "Sales"],
    [CORE_ANALYTICS_OPERATIONS, "Operations"],
    ["finance", "Integrations"],
  ])(`should return correct title for: %s`, (url, title) => {
    const result = getHeaderTitle(url);
    expect(result).toBe(title);
  });

  it("should return default title when no match is found", () => {
    const result = getHeaderTitle("/page");
    expect(result).toBe("Page");
  });
});
