import { numberFormatter, currencyFormatter } from "presentation/utils";

function formatValue(
  value: number,
  format?: string,
  currency?: string,
  compact?: boolean
): string {
  if (format === "currency") {
    return currencyFormatter(value, currency, compact);
  }
  if (format === "percentage") {
    return `${value}%`;
  }
  return numberFormatter(value);
}

export { formatValue };
