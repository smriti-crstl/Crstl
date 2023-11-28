import { IntegrationTypes } from "domain/entity/integrations/models";

export enum CoreRouteOrdersOptions {
  ALL = "all",
  DRAFTS = "drafts",
  SHOPIFY = "shopify",
  AMAZON = "amazon",
  B2B = "b2b",
}

export const CoreRouteIntegrationsOptions = {
  ALL: "all",
  INVENTORY: IntegrationTypes.Inventory,
  PAYOUTS: IntegrationTypes.Payouts,
  EDI: IntegrationTypes.EDI,
  ACCOUNTING: IntegrationTypes.Accounting,
  FINANCIAL: IntegrationTypes.Finance,
  E_COMMERCE: IntegrationTypes.ECommerce,
  SHIPPING_AND_FULFILLMENT: IntegrationTypes.ShippingAndFulfillment,
  MY_INTEGRATIONS: "my-integrations",
  COLLABORATION: IntegrationTypes.Collaboration,
  MARKETING: "Marketing",
  MARKETPLACE: IntegrationTypes.Marketplace,
};

export interface ICoreRouteSettingsOptions {
  PROFILE: "profile-tab";
  PASSWORD: "password-tab";
  COMPANY: "company-tab";
  TEAM: "team-tab";
}

export const CoreRouteSettingsOptions = {
  PROFILE: "profile-tab",
  PASSWORD: "password-tab",
  COMPANY: "company-tab",
  TEAM: "team-tab",
  BILLING: "billing-tab",
};

export const CoreRouteOnboardingOptions = {
  TASKS: "tasks-tab",
  EDI: "edi-tab",
  ALERTS: "alerts-tab",
  GLOBAL_EDI: "global-edi-tab",
  CONNECTIONS: "connections-tab",
};

export enum CoreShopifyAppTypes {
  CUSTOM = "custom",
}

export enum IntegrationsRedirectionUrlConstants {
  QBO = "qbo",
}

export const CoreRouteAnalyticsOptions = {
  ALL: "all",
  FINANCE: "finance",
  OPERATIONS: "operations",
  SALES: "sales",
};

export const CoreRouteAlertsOptions = {
  ALL: "all",
  ALERTS: "alerts",
  UPDATES: "updates",
  SUMMARY: "summary",
};

export const codeToTextMapping: Record<string, string> = {
  original_00: "Original",
  "00": "Original",
  stand_alone_order_SA: "Stand Alone",
  defined_by_buyer_and_seller_DF: "Defined by Buyer and Seller",
  origin_shipping_point_OR: "Origin[Shipping Point] [OR]",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
  AT: "Acknowledgment Type",
  case_CA: "Case(s)",
  CA: "Case(s)",
  each_EA: "Each(es)",
  EA: "Each(es)",
  PC: "Piece(s)",
  IA: "Items Accepted [IA]",
  IC: "Item Accepted - Changes Made [IC]",
  IR: "Item Rejected [IR]",
  IQ: "Item Accepted - Quantity Changed [IQ]",
  "068": "Current Ship Date",
  LB: "Pound",
  pound_LB: "Pound",
  cubic_feet_CF: "Cubic Feet",
  OZ: "Ounce - Av",
  original_N: "Original",
  ship_to_ST: "Ship To",
  ST: "Ship To",
  ship_from_SF: "Ship From",
  vendor_VN: "Vendor Name",
  bill_to_party_BT: "Bill To Party",
  BT: "Bill To Party",
  motor_common_carrier_M: "Motor Common Carrier",
  replace_all_values_RZ: "Replace All Values",
  prepaid_by_seller_PP: "Prepaid by Seller [PP]",
  destination_shipping_DE: "Destination [Shipping] [DE]",
  invoice_date_3: "Invoice Date [3]",
  basic_01: "Basic [01]",
  receipt_of_goods_15: "Receipt of Goods [15]",
  delivery_date_2: "Delivery Date [2]",
  collect_CC: "Collect [CC]",
  DZ: "Dozen(s)",
  buying_party_purchaser_BY: "Buying Party [Purchaser] [BY]",
  supplier_manufacturer_SU: "Supplier/Manufacturer [SU]",
};

export const firstTransactionSetNoOutput =
  "interchanges[0].groups[0].transaction_sets[0]";

export const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

