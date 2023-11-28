import { ChartMetadata } from "../../../../domain/v1/Chart";

export interface ShopifyInventorySkuLocationSeries {
  sku: string;
}

export interface ShopifyInventorySkuLocationResponse {
  data: Array<ShopifyInventorySkuLocationSeries>;
  lastUpdatedAt: string;
  metadata?: ChartMetadata;
}
