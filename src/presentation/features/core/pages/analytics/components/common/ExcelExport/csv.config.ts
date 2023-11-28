export type CSVColumn = {
  label: string;
  hidden: boolean;
  key: string;
};

export const CSV_CONFIG = {
  BANK_AND_CREDIT_CARD_SPEND_BY_MERCHANT_CATEGORY: [
    {
      label: "Merchant",
      hidden: false,
      key: "merchantName",
    },
    {
      label: "Category",
      hidden: false,
      key: "category",
    },
    {
      label: "Account",
      hidden: false,
      key: "accountName",
    },
    {
      label: "Amount(USD)",
      hidden: false,
      key: "estimatedSpendInGivenPeriod",
    },
    {
      label: "Start Date",
      hidden: false,
      key: "startDate",
    },
    {
      label: "End Date",
      hidden: false,
      key: "endDate",
    },
  ],
  UPCOMING_PAYOUTS: [
    {
      label: "Source",
      hidden: false,
      key: "source",
    },
    {
      label: "Status",
      hidden: false,
      key: "status",
    },
    {
      label: "Amount(USD)",
      hidden: false,
      key: "amount",
    },
  ],
  ACCOUNTS_PAYABLE: [
    {
      label: "Vendor",
      hidden: false,
      key: "vendor",
    },
    {
      label: "Current",
      hidden: false,
      key: "current",
    },
    {
      label: "1-30 days",
      hidden: false,
      key: "due1to30",
    },
    {
      label: "31-60 days",
      hidden: false,
      key: "due31To60",
    },
    {
      label: "61-90 days",
      hidden: false,
      key: "due61To90",
    },
    {
      label: "90+ days",
      hidden: false,
      key: "dueMoreThan90",
    },
    {
      label: "Total",
      hidden: false,
      key: "total",
    },
  ],
  ACCOUNTS_RECEIVABLE: [
    {
      label: "Customer",
      hidden: false,
      key: "customer",
    },
    {
      label: "Current",
      hidden: false,
      key: "current",
    },
    {
      label: "1-30 days",
      hidden: false,
      key: "due1to30",
    },
    {
      label: "31-60 days",
      hidden: false,
      key: "due31to60",
    },
    {
      label: "61-90 days",
      hidden: false,
      key: "due61to90",
    },
    {
      label: "90+ days",
      hidden: false,
      key: "dueMoreThan90",
    },
    {
      label: "Total",
      hidden: false,
      key: "total",
    },
  ],
  TOP_PRODUCTS: [
    {
      label: "SKU",
      hidden: false,
      key: "sku",
    },
    {
      label: "Channel",
      hidden: false,
      key: "channel",
    },
    {
      label: "Sales",
      hidden: false,
      key: "sales",
    },
    {
      label: "Start Date",
      hidden: false,
      key: "startDate",
    },
    {
      label: "End Date",
      hidden: false,
      key: "endDate",
    },
  ],
  AMAZON_INVENTORY_LEVELS: [
    {
      label: "SKU",
      hidden: false,
      key: "sku",
    },
    {
      label: "Product name",
      hidden: false,
      key: "productName",
    },
    {
      label: "Availability",
      hidden: false,
      key: "quantity",
    },
  ],
  ORDERS: [
    {
      label: "Order ID",
      hidden: false,
      key: "orderName",
    },
    {
      label: "Order Date",
      hidden: false,
      key: "receivedAt",
    },
    {
      label: "Customer",
      hidden: false,
      key: "channelName",
    },
    {
      label: "Source",
      hidden: false,
      key: "source",
    },
    {
      label: "Delivery Status",
      hidden: true,
      key: "deliveryStatus",
    },
    {
      label: "Invoice",
      hidden: true,
      key: "invoiceStatus",
    },
    {
      label: "Chargeback",
      hidden: true,
      key: "chargebackStatus",
    },
    {
      label: "Total",
      hidden: false,
      key: "totalAmount",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
  ],
  ORDERS_B2B: [
    {
      label: "Order ID",
      hidden: false,
      key: "orderName",
    },
    {
      label: "Order Date",
      hidden: false,
      key: "receivedAt",
    },
    {
      label: "Customer",
      hidden: false,
      key: "channelName",
    },
    {
      label: "Source",
      hidden: false,
      key: "source",
    },
    {
      label: "Delivery Status",
      hidden: false,
      key: "deliveryStatus",
    },
    {
      label: "Total",
      hidden: false,
      key: "totalAmount",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
    {
      label: "Invoice",
      hidden: false,
      key: "invoiceStatus",
    },
  ],
  CASH_ON_HANDS: [
    {
      label: "Balance",
      hidden: false,
      key: "balance",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
    {
      label: "Label",
      hidden: false,
      key: "label",
    },
    {
      label: "Value",
      hidden: false,
      key: "value",
    },
  ],
  BANK_ACCOUNTS: [
    {
      label: "Account Name",
      hidden: false,
      key: "accountName",
    },
    {
      label: "Account Number",
      hidden: false,
      key: "accountNumber",
    },
    {
      label: "Balance",
      hidden: false,
      key: "balance",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
    {
      label: "Name",
      hidden: false,
      key: "name",
    },
  ],
  CREDIT_CARDS: [
    {
      label: "Account Name",
      hidden: false,
      key: "accountName",
    },
    {
      label: "Account Number",
      hidden: false,
      key: "accountNumber",
    },
    {
      label: "Balance",
      hidden: false,
      key: "balance",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
    {
      label: "Limit",
      hidden: false,
      key: "limit",
    },
    {
      label: "Name",
      hidden: false,
      key: "name",
    },
    {
      label: "Message",
      hidden: false,
      key: "message",
    },
  ],
  MONEY_CAL_ACTUAL: [
    {
      label: "Date",
      hidden: false,
      key: "date",
    },
    {
      label: "Counterparty",
      hidden: false,
      key: "counterparty",
    },
    {
      label: "Amount",
      hidden: false,
      key: "amount",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
    {
      label: "Type",
      hidden: false,
      key: "type",
    },
  ],
  MONEY_CAL_EXPECTED: [
    {
      label: "Due Date",
      hidden: false,
      key: "dueDate",
    },
    {
      label: "Customer / Vendor",
      hidden: false,
      key: "customer",
    },
    {
      label: "Total Amount",
      hidden: false,
      key: "totalAmount",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
    {
      label: "Type",
      hidden: false,
      key: "type",
    },
  ],
  ADS_INDIVIDUAL_METRICS: [
    {
      label: "Date",
      hidden: false,
      key: "x",
    },
    {
      label: "Value",
      hidden: false,
      key: "y",
    },
    {
      label: "Platform",
      hidden: false,
      key: "defaultValue",
    },
    {
      label: "Start Date",
      hidden: false,
      key: "startDate",
    },
    {
      label: "End Date",
      hidden: false,
      key: "endDate",
    },
  ],
  AVERAGE_ORDER_VALUE: [
    {
      label: "Date",
      hidden: false,
      key: "date",
    },
    {
      label: "Order Value",
      hidden: false,
      key: "orderValue",
    },
    {
      label: "Source",
      hidden: false,
      key: "source",
    },
    {
      label: "Start Date",
      hidden: false,
      key: "startDate",
    },
    {
      label: "End Date",
      hidden: false,
      key: "endDate",
    },
  ],
  TOTAL_ORDERS: [
    {
      label: "Date",
      hidden: false,
      key: "date",
    },
    {
      label: "Orders",
      hidden: false,
      key: "orders",
    },
    {
      label: "Source",
      hidden: false,
      key: "source",
    },
    {
      label: "Start Date",
      hidden: false,
      key: "startDate",
    },
    {
      label: "End Date",
      hidden: false,
      key: "endDate",
    },
  ],
  ADS_METRICS: [
    {
      label: "Metric",
      hidden: false,
      key: "metric",
    },
    {
      label: "Value",
      hidden: false,
      key: "value",
    },
    {
      label: "Change(%)",
      hidden: false,
      key: "change",
    },
    {
      label: "Start Date",
      hidden: false,
      key: "startDate",
    },
    {
      label: "End Date",
      hidden: false,
      key: "endDate",
    },
  ],
  // THIS IS DONE USING CUSTOM CONFIG, Check out ShopifyInventoryTable.tsx
  // SHOPIFY_INVENTORY_LEVELS: [
  // ],
  EXPENSES: [
    {
      label: "Date",
      hidden: false,
      key: "dateOfTransaction",
    },
    {
      label: "Account Name",
      hidden: false,
      key: "accountName",
    },
    {
      label: "Merchant Name",
      hidden: false,
      key: "merchantName",
    },
    {
      label: "Category",
      hidden: false,
      key: "category",
    },
    {
      label: "Amount",
      hidden: false,
      key: "transactionAmount",
    },
    {
      label: "Currency",
      hidden: false,
      key: "currency",
    },
  ],
};

export const FILE = {
  TYPE: "text/plain;charset=UTF-8",
  EXTENSION: ".csv",
  ORIGIN: "A2",
};

export const POPOVER_TITLE = "Export as CSV";

export const CSV_DATE_FORMAT = "MMM DD, YYYY";
