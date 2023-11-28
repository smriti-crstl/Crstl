import { currencyUSDFormatter } from "./index";

describe("currencyUSDFormatter", () => {
  it.each([
    [1000, "$1k"],
    [1000_000, "$1m"],
    [1000_000_000, "$1b"],
    [1000_000_000_000, "$1t"],
  ])("should abbreviate %s to %s", (amount, formattedValue) => {
    const result = currencyUSDFormatter(amount, true);
    expect(result).toBe(formattedValue);
  });
});
