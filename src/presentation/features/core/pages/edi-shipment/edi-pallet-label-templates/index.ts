import { HEBWarehousePalletLabelPrintPage } from "./HEB/ShipmentPrintPageHEBWarehouse";

/**
 * * Trading partner specific views come in here
 */
export const palletLabelViewMap: Record<string, any> = {
  "heb - warehouse": HEBWarehousePalletLabelPrintPage,

  // fallback
  heb: HEBWarehousePalletLabelPrintPage,
};

