import { ICoreIntegrationsTextConstants } from "./interface";

export const CORE_INTEGRATIONS_TEXT_CONSTANTS: ICoreIntegrationsTextConstants = {
  TAB_NAMES: {
    ALL: "All",
    ACCOUNTING: "Accounting",
    EDI: "EDI",
    E_COMMERCE: "e-Commerce",
    MY_INTEGRATIONS: "My Integrations",
    SHIPPING_AND_FULFILLMENT: "Shipping & Fulfillment",
    INVENTORY: "Inventory",
    PAYOUTS: "Payouts",
    FINANCIAL: "Financial",
    COLLABORATION: "Collaboration",
    MARKETING: "Marketing",
    MARKETPLACE: "Marketplace",
  },
  CTA_BUTTON: {
    TEXT: "Add",
  },
  FINANCIAL_TAB: {
    CONNECTED_BANK_HEADING: "Additional accounts",
    NO_BANK_CONNECTED_PLACEHOLDER: "No bank accounts have been added yet",
    SELECT_BANK: "Select your account(s)",
    PLAID_BUTTON_TEXT: "Connect to your Financial Institutions",
  },
  NO_INTEGRATIONS: "No integrations added yet",
  RESULT_MODAL: {
    FAILURE_BUTTON_TEXT: "Try again",
    FAILURE_SUB_TEXT:
      "Please try again in 5 minutes, or contact us at help@crstl.so",
    FAILURE_TEXT: "Hmm well that didn’t go as expected.",
    SUCCESS_BUTTON_TEXT: "Close",
    SUCCESS_TEXT: (name: string) => `Successfully integrated ${name}!`,
  },
};

