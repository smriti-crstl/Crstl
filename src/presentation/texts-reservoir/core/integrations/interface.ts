export interface ICoreIntegrationsTextConstants {
  TAB_NAMES: {
    ALL: string;
    EDI: string;
    SHIPPING_AND_FULFILLMENT: string;
    ACCOUNTING: string;
    E_COMMERCE: string;
    INVENTORY: string;
    MY_INTEGRATIONS: string;
    PAYOUTS: string;
    FINANCIAL: string;
    COLLABORATION: string;
    MARKETING: string;
    MARKETPLACE: string;
  };
  FINANCIAL_TAB: {
    SELECT_BANK: string;
    CONNECTED_BANK_HEADING: string;
    NO_BANK_CONNECTED_PLACEHOLDER: string;
    PLAID_BUTTON_TEXT: string;
  };
  CTA_BUTTON: {
    TEXT: string;
  };
  NO_INTEGRATIONS: string;
  RESULT_MODAL: {
    FAILURE_BUTTON_TEXT: string;
    FAILURE_SUB_TEXT: string;
    FAILURE_TEXT: string;
    SUCCESS_TEXT: (name: string) => string;
    SUCCESS_BUTTON_TEXT: string;
  };
}

