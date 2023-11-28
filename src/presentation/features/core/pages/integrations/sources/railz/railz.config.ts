const DEFAULT_FALLBACK_RAILZ_WID =
  "wid_prod_ad45df30-473e-433f-afdf-4fc87f239781";

export const RAILS_CONFIG = {
  WIDGET_ID: import.meta.env.VITE_APP_RAILZ_WID || DEFAULT_FALLBACK_RAILZ_WID,
  REDIRECT_URL: `${window.location.origin}/integrations/Accounting?railz_connect=true`,
  REMOVE_RAILZ_WATERMARK: false,
  HEADER_ENABLED: false,
  RAILS_CONNECT_DIV: "railz-connect",
  RAILZ_INTEGRATION: "Railz Integration",
};
