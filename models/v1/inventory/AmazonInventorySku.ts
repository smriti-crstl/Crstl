import { ChartMetadata } from "../../../../domain/v1/Chart";

export interface AmzInventorySkuSeries {
  sku: string;
  quantity: string;
  productName: string;
}

export interface AmzInventorySkuResponse {
  data: Array<AmzInventorySkuSeries>;
  lastUpdatedAt: string;
  metadata?: ChartMetadata;
}
