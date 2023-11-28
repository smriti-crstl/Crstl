import { generatePath } from "react-router-dom";

import {
  CoreRouteAlertsOptions,
  CoreRouteAnalyticsOptions,
  CoreRouteIntegrationsOptions,
  CoreRouteOrdersOptions,
} from "./constants";

// Root
const APP_ROOT_URL = "/";

// Generic

// Public Pages

const PRIVACY_POLICY = "/privacy-policy";
const EULA = "/eula";

// Error Pages
const PAGE_NOT_FOUND = "/404";
const UNAUTHORIZED = "/403";
const SOMETHING_WENT_WRONG = "/500";

// Auth
const LOGIN = "/login";
const SIGN_UP = "/sign-up";
const EMAIL_SIGN_UP = "/email-sign-up";
const RESET_PASSWORD = "/reset-password";

const ORG_SELECTION = "/org-selection";

// Shopify URLS
const SHOPIFY_APP = "/shopify/:type?";
const SHOPIFY_CUSTOM_APP = "/shopify/custom";
const SHOPIFY_ONBOARDING = "/shopify/onboarding/:type?";

//Core URLS

const CORE_BASE = "/";

const CORE_HOME = "/home";

// General orders route
const CORE_ORDERS = "/orders/:source/list/:type/:pageNumber";
const CORE_ORDERS_NEW = "/orders/:source/list/:type/:pageNumber";
const CORE_ORDERS_V2 = "/ordersv2/list/:type/:pageNumber";

const CORE_EDI_EVENT_LOG = "/event-log";

const CORE_EDI_LIST = "/edi/list/:pageNumber";
const CORE_EDI_LIST_WITH_PARAMS =
  "/edi/list/(pageNumber)?/:pageNumber?/(type)?/:type?";

const CORE_EDI_LIST_PAGE = generatePath(CORE_EDI_LIST, {
  pageNumber: "1",
});

// Options available on orders general route
const CORE_ORDERS_ALL = generatePath(CORE_ORDERS_NEW, {
  type: CoreRouteOrdersOptions.ALL,
  pageNumber: "1",
  source: CoreRouteOrdersOptions.SHOPIFY,
});

// const CORE_ORDERS_SHOPIFY = generatePath(CORE_ORDERS_NEW, {
//   type: CoreRouteOrdersOptions.SHOPIFY,
//   pageNumber: "1",
//   source: CoreRouteOrdersOptions.SHOPIFY,
// });
// const CORE_ORDERS_AMAZON = generatePath(CORE_ORDERS_NEW, {
//   type: CoreRouteOrdersOptions.AMAZON,
//   pageNumber: "1",
//   source: "shopify",
// });

// const CORE_ORDERS_DRAFTS = generatePath(CORE_ORDERS, {
//   type: CoreRouteOrdersOptions.DRAFTS,
//   pageNumber: "1",
//   source: "b2b",
// });
const CORE_ORDERS_VIEW = "/orders/view/:type/:id";

// General Integrations Route
const CORE_INTEGRATIONS = "/integrations/:type?/:redirectionType?";
// General base integrations path for the Marketplace - basically: /integrations
const CORE_INTEGRATIONS_BASE = generatePath(CORE_INTEGRATIONS);
// Options available on integrations general route
const CORE_INTEGRATIONS_ALL = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.ALL,
});
const CORE_INTEGRATIONS_EDI = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.EDI,
});
const CORE_INTEGRATIONS_SHIPPING_AND_FULFILLMENT = generatePath(
  CORE_INTEGRATIONS,
  {
    type: CoreRouteIntegrationsOptions.SHIPPING_AND_FULFILLMENT,
  }
);
const CORE_INTEGRATIONS_MARKETING = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.MARKETING,
});
const CORE_INTEGRATIONS_FINANCIAL = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.FINANCIAL,
});
const CORE_INTEGRATIONS_ACCOUNTING = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.ACCOUNTING,
});
const CORE_INTEGRATIONS_E_COMMERCE = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.E_COMMERCE,
});
const CORE_INTEGRATIONS_MY_INTEGRATIONS = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.MY_INTEGRATIONS,
});
const CORE_INTEGRATIONS_COLLABORATION = generatePath(CORE_INTEGRATIONS, {
  type: CoreRouteIntegrationsOptions.COLLABORATION,
});

const CORE_CHANNELS = "/channels";
// const CORE_GUIDELINES = "/guidelines";
const CORE_ANALYTICS = "/analytics/:selectedTab";
// Options available on analytics general route
const CORE_ANALYTICS_ALL = generatePath(CORE_ANALYTICS, {
  selectedTab: CoreRouteAnalyticsOptions.ALL,
});
const CORE_ANALYTICS_FINANCE = generatePath(CORE_ANALYTICS, {
  selectedTab: CoreRouteAnalyticsOptions.FINANCE,
});
const CORE_ANALYTICS_FINANCE_CASH_AND_CARDS =
  "/analytics/finance/cash-and-cards";
const CORE_ANALYTICS_FINANCE_EXPENSES = "/analytics/finance/expenses";
const CORE_ANALYTICS_FINANCE_ACCOUNTING = "/analytics/finance/accounting";

const CORE_ANALYTICS_OPERATIONS = generatePath(CORE_ANALYTICS, {
  selectedTab: CoreRouteAnalyticsOptions.OPERATIONS,
});
const CORE_ANALYTICS_SALES = generatePath(CORE_ANALYTICS, {
  selectedTab: CoreRouteAnalyticsOptions.SALES,
});

const CORE_ALERTS = "/alerts/:selectedTab";
// Options available on analytics general route
const CORE_ALERTS_ALL = generatePath(CORE_ALERTS, {
  selectedTab: CoreRouteAlertsOptions.ALL,
});
const CORE_ALERTS_ALERTS = generatePath(CORE_ALERTS, {
  selectedTab: CoreRouteAlertsOptions.ALERTS,
});
const CORE_ALERTS_SUMMARY = generatePath(CORE_ALERTS, {
  selectedTab: CoreRouteAlertsOptions.SUMMARY,
});
const CORE_ALERTS_UPDATES = generatePath(CORE_ALERTS, {
  selectedTab: CoreRouteAlertsOptions.UPDATES,
});

const CORE_MARKETING = "/marketing";

const CORE_MARKETING_GOOGLE = "/marketing/google";

const CORE_MARKETING_FACEBOOK = "/marketing/facebook";

const CORE_SETTINGS = "/settings/:tabName";

const CORE_ONBOARDING = "/onboarding/:tabName";

const CORE_SETUP = "/setup";

const CORE_PLAID_CALLBACK = "/finance/callback";

const CORE_ORDERS_SHOPIFY_LANDING = "/orders/shopify/list/all/1";
const CORE_ORDERS_AMAZON_LANDING = "/orders/amazon/list/all/1";
const CORE_ORDERS_B2B_LANDING = "/orders/b2b/list/all/1";

const CORE_EDI_LIST_VIEW = "/edi/list/1";
const CORE_EDI = "/edi/:documentType/:tabName/:id/:orderId";

const CORE_EDI_SEARCH_VIEW_PAGE = "/edi/search";

const CORE_EDI_PURCHASE_ORDER =
  "/edi/purchase-order/view/:id/:orderId/:version?";
const CORE_EDI_PURCHASE_ORDER_CHANGE =
  "/edi/purchase-order-change/view/:id/:orderId";

const CORE_EDI_TIMELINE_PAGE = "/edi/timeline";

const CORE_EDI_INVOICE_EDIT_PAGE = "/edi/invoice/edit/:id/:orderId/:customer?";
const CORE_EDI_INVOICE_VIEW_PAGE = "/edi/invoice/view/:id/:orderId";

const CORE_EDI_SHIPMENT_EDIT_PAGE =
  "/edi/shipment/edit/:id/:orderId/:customer?";
const CORE_EDI_SHIPMENT_VIEW_PAGE = "/edi/shipment/view/:id/:orderId";

const CORE_EDI_SHIPMENT_EDIT_PAGE_V2 = "/edi/shipment/edit/:id/:orderId/v2";
const CORE_EDI_INVOICE_EDIT_PAGE_V2 = "/edi/invoice/edit/:id/:orderId/v2";

const CORE_EDI_EDIT_PAGE =
  "/edi/:documentType/edit/v2/:documentId/:purchaseOrderId";

const CORE_EDI_FORM_PLAYGROUND = "/edi/form-playground";
const CORE_EDI_SHIPMENT_LABELS_PLAYGROUND = "/edi/shipment-label-playground";

const CORE_ACCESS_DENIED = "/access-denied";

const CORE_EDI_PO_ACK_VIEW_PAGE = "/edi/acknowledgement/view/:id/:orderId";
const CORE_EDI_PO_ACK_EDIT_PAGE = "/edi/acknowledgement/edit/:id/:orderId";

const CORE_EDI_PO_CHANGE_ACK_VIEW_PAGE =
  "/edi/change-acknowledgement/view/:id/:orderId";
const CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE =
  "/edi/change-acknowledgement/edit/:id/:orderId";

const CORE_EDI_RTS_VIEW_PAGE = "/edi/rts/view/:id/:orderId";
const CORE_EDI_RTS_EDIT_PAGE = "/edi/rts/edit/:id/:orderId";

const CORE_EDI_GROCERY_PURCHASE_ORDER =
  "/edi/grocery-purchase-order/view/:id/:orderId/:version?";
const CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE =
  "/edi/grocery-purchase-order-change/view/:id/:orderId";

const CORE_EDI_GROCERY_INVOICE_EDIT_PAGE =
  "/edi/grocery-invoice/edit/:id/:orderId";
const CORE_EDI_GROCERY_INVOICE_VIEW_PAGE =
  "/edi/grocery-invoice/view/:id/:orderId";

// Root URL
export { APP_ROOT_URL };

// Generic URLS
export {
  PAGE_NOT_FOUND,
  UNAUTHORIZED,
  SOMETHING_WENT_WRONG,
  PRIVACY_POLICY,
  EULA,
  SHOPIFY_APP,
  SHOPIFY_ONBOARDING,
  SHOPIFY_CUSTOM_APP,
};

// Auth URLS
export { LOGIN, SIGN_UP, EMAIL_SIGN_UP, RESET_PASSWORD, ORG_SELECTION };

// Core URLS

export {
  CORE_BASE,
  CORE_HOME,
  //orders
  CORE_ORDERS_NEW,
  CORE_ORDERS,
  CORE_ORDERS_V2,
  CORE_ORDERS_ALL,
  // CORE_ORDERS_DRAFTS,
  CORE_ORDERS_VIEW,
  // CORE_ORDERS_SHOPIFY,
  // CORE_ORDERS_AMAZON,
  //channels
  CORE_CHANNELS,
  //guidelines
  // CORE_GUIDELINES,
  //integrations
  CORE_INTEGRATIONS,
  CORE_INTEGRATIONS_BASE,
  CORE_INTEGRATIONS_ALL,
  CORE_INTEGRATIONS_EDI,
  CORE_INTEGRATIONS_SHIPPING_AND_FULFILLMENT,
  CORE_INTEGRATIONS_FINANCIAL,
  CORE_INTEGRATIONS_ACCOUNTING,
  CORE_INTEGRATIONS_E_COMMERCE,
  CORE_INTEGRATIONS_MY_INTEGRATIONS,
  CORE_INTEGRATIONS_COLLABORATION,
  CORE_INTEGRATIONS_MARKETING,
  //analytics
  CORE_ANALYTICS,
  CORE_ANALYTICS_FINANCE,
  CORE_ANALYTICS_OPERATIONS,
  CORE_ANALYTICS_SALES,
  CORE_ANALYTICS_ALL,
  CORE_ANALYTICS_FINANCE_CASH_AND_CARDS,
  CORE_ANALYTICS_FINANCE_EXPENSES,
  CORE_ANALYTICS_FINANCE_ACCOUNTING,
  //settings
  CORE_SETTINGS,
  CORE_SETUP,
  //alerts,
  CORE_ALERTS,
  CORE_ALERTS_ALL,
  CORE_ALERTS_ALERTS,
  CORE_ALERTS_SUMMARY,
  CORE_ALERTS_UPDATES,
  //marketing
  CORE_MARKETING,
  CORE_MARKETING_GOOGLE,
  CORE_MARKETING_FACEBOOK,
  //plaid
  CORE_PLAID_CALLBACK,
  //landing
  CORE_ORDERS_SHOPIFY_LANDING,
  CORE_ORDERS_AMAZON_LANDING,
  CORE_ORDERS_B2B_LANDING,
  CORE_EDI,
  CORE_EDI_PURCHASE_ORDER,
  CORE_EDI_PURCHASE_ORDER_CHANGE,
  CORE_EDI_TIMELINE_PAGE,
  CORE_EDI_INVOICE_EDIT_PAGE,
  CORE_EDI_INVOICE_VIEW_PAGE,
  CORE_EDI_SHIPMENT_EDIT_PAGE,
  CORE_EDI_SHIPMENT_VIEW_PAGE,
  CORE_EDI_LIST_VIEW,
  CORE_EDI_LIST_PAGE,
  CORE_EDI_SEARCH_VIEW_PAGE,
  CORE_EDI_LIST,
  CORE_EDI_EVENT_LOG,
  CORE_EDI_LIST_WITH_PARAMS,
  CORE_ACCESS_DENIED,
  CORE_EDI_SHIPMENT_EDIT_PAGE_V2,
  CORE_EDI_INVOICE_EDIT_PAGE_V2,
  CORE_EDI_EDIT_PAGE,
  CORE_EDI_FORM_PLAYGROUND,
  CORE_EDI_SHIPMENT_LABELS_PLAYGROUND,
  CORE_EDI_PO_ACK_VIEW_PAGE,
  CORE_EDI_PO_ACK_EDIT_PAGE,
  CORE_EDI_PO_CHANGE_ACK_VIEW_PAGE,
  CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE,
  CORE_EDI_RTS_VIEW_PAGE,
  CORE_EDI_RTS_EDIT_PAGE,
  CORE_EDI_GROCERY_PURCHASE_ORDER,
  CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE,
  CORE_EDI_GROCERY_INVOICE_EDIT_PAGE,
  CORE_EDI_GROCERY_INVOICE_VIEW_PAGE,
  //onboarding
  CORE_ONBOARDING,
};

export * from "./constants";

