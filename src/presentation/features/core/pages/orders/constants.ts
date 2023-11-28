import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

export const ORDERS_ALL_TABS_CONSTANTS = {
  ALL: {
    tabName: CORE_ORDERS_TEXT_CONSTANTS.TAB_NAMES.ALL,
    tabKey: "all",
  },
  DRAFTS: {
    tabName: CORE_ORDERS_TEXT_CONSTANTS.TAB_NAMES.DRAFTS,
    tabKey: "drafts",
  },
};

export const ORDER_DETAILS_TAB_KEYS = {
  TAB_1: "TAB_1",
  TAB_2: "TAB_2",
};

export const ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS = {
  ORDER: "ORDER",
  FULFILLMENT: "FULFILLMENT",
  INVOICING: "INVOICING",
  PAYMENT: "PAYMENT",
  CHARGEBACK: "CHARGEBACK",
  DELIVERY_STATUS: "DELIVERY_STATUS",
};

export const ORDER_DETAILS_VIEW_STATUS_TABLE_DATA_INDEXES = {
  LABEL: "label",
  FIELD: "field",
  CONFIG_DATA: "configData",
  UPDATED_BY: "updatedBy",
  HISTORY_DATA: "historyData",
};

export const ORDER_COLUMN_FIELDS = {
  CHANNEL_NAME: "channelName",
  CHARGEBACK_STATUS: "chargebackStatus",
  DELIVERY_STATUS: "deliveryStatus",
  PAYMENT_STATUS: "paymentStatus",
  CUSTOMER: "channelName",
  INVOICE_STATUS: "invoiceStatus",
  ORDER_STATUS: "status",
};

export const ORDERS_FILE_NAME = {
  shopify: "Shopify Orders",
  amazon: "Amazon Orders",
  b2b: "B2B Orders",
} as const;

export const CSV_FILE_NAME = {
  ORDERS: "Orders",
  UPCOMING_PAYOUTS: "Upcoming Payouts",
  ACCOUNTS_PAYABLE: "Accounts Payable aging report",
  ACCOUNTS_RECEIVABLE: "Accounts Receivable aging report",
  TOP_PRODUCTS: "Top Products by Sales",
  AMAZON_INVENTORY_LEVELS: "Amazon Inventory Levels",
  SHOPIFY_INVENTORY_LEVELS: "Shopify Inventory Levels",
  CASH_ON_HANDS: "Cash on hand",
  BANK_ACCOUNTS: "Bank Accounts",
  CREDIT_CARDS: "Credit Cards",
  AVERAGE_ORDER_VALUE: "Average Order Value",
  TOTAL_ORDERS: "Total orders (e-Commerce)",
  ADS_METRICS: "Ads Metrics",
  EXPENSES: "Expenses",
};
