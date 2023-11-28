export interface IOrderTableSortConfig {
  label: string;
  value: string;
}

export const ORDERS_TABLE_SORTING_VALUE_CONSTANTS: {
  DATE_NEWEST: string;
  DATE_OLDEST: string;
  PAYMENT_STATUS_ASC: string;
  PAYMENT_STATUS_DSC: string;
  DELIVERY_STATUS_ASC: string;
  DELIVERY_STATUS_DSC: string;
  PRICE_ASC: string;
  PRICE_DSC: string;
} = {
  DATE_OLDEST: "DATE_OLDEST",
  DATE_NEWEST: "DATE_NEWEST",
  DELIVERY_STATUS_ASC: "DELIVERY_STATUS_ASC",
  DELIVERY_STATUS_DSC: "DELIVERY_STATUS_DSC",
  PAYMENT_STATUS_ASC: "PAYMENT_STATUS_ASC",
  PAYMENT_STATUS_DSC: "PAYMENT_STATUS_DSC",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DSC: "PRICE_DSC",
};

export const ORDERS_TABLE_SORTING_CONFIG: IOrderTableSortConfig[] = [
  {
    label: "Date (oldest first)",
    value: ORDERS_TABLE_SORTING_VALUE_CONSTANTS.DATE_OLDEST,
  },
  {
    label: "Date (newest first)",
    value: ORDERS_TABLE_SORTING_VALUE_CONSTANTS.DATE_NEWEST,
  },
  {
    label: "Total Price (low to high)",
    value: ORDERS_TABLE_SORTING_VALUE_CONSTANTS.PRICE_ASC,
  },
  {
    label: "Total Price (high to low)",
    value: ORDERS_TABLE_SORTING_VALUE_CONSTANTS.PRICE_DSC,
  },
];
