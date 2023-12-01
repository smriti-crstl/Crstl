import { CashOnHandDonutChart } from "models/AccountBalance";
import {
  AvgOrderValueChartResponseModel,
  OrderByCustomerChartResponseModel,
  OrderByCustomerLineChart,
  OrderByRetailerChartResponseModel,
  OrderDeliveryStatusChart,
  RevenueByRetailerChartResponseModel,
  SalesBySkuB2BChartResponseModel,
  SalesBySkuB2CChartResponseModel,
} from "models/PurchaseOrder";
import {
  moneyCalendarResponse,
  PaymentDetailResponseModel,
} from "models/Invoice";
import { AlertsResponse } from "models/Alerts";
import {
  APAgingReportResponse,
  APAgingReportSeries,
} from "models/APAgingReport";
import {
  ARAgingReportResponse,
  ARAgingReportSeries,
} from "models/ARAgingReport";
import { PayoutsResponse } from "models/Payouts";
import { ShopifyInventorySkuLocationResponse } from "models/v1/inventory/ShopifyInventorySkuLocation";
import { AmzInventorySkuResponse as AmzInventorySkyRes } from "models/v1/inventory/AmazonInventorySku";
import { Metadata } from "domain/entity/shared/models/metadata";

export interface TransactionByMerchant {
  estimatedTotalSpent: string;
  merchantName: string;
  category: string;
  accountSubtype: string;
  currency?: string;
}

export interface TransactionByMerchantRes {
  data: TransactionByMerchant[];
  metadata: Metadata["metadata"];
}

export type CashOnHandDonutChartRes = CashOnHandDonutChart & Metadata;
export type OrderByRetailerChartRes = OrderByRetailerChartResponseModel;
export type AverageOrderValueChartRes = AvgOrderValueChartResponseModel[];
export type OrderByCustomerChartRes = OrderByCustomerChartResponseModel;
export type RevenueByRetailerChartRes = RevenueByRetailerChartResponseModel;
export type OrderDeliveryStatusChartRes = OrderDeliveryStatusChart & Metadata;
export type SalesBySkuB2BChartRes = SalesBySkuB2BChartResponseModel;
export type SalesBySkuB2CChartRes = SalesBySkuB2CChartResponseModel;
export type InvoiceProjectionRes = moneyCalendarResponse;
export type AlertsRes = AlertsResponse;
export type B2BOrdersDataRes = OrderByCustomerLineChart;
export type B2COrdersDataRes = OrderByCustomerLineChart & Metadata;
export type TopSalesBySkuRes = {
  data: Array<{
    sales: any;
    sku: string;
    channel: string;
    currency?: string;
  }>;
  metadata: Metadata["metadata"];
};
export type PaymentDetailResponse = PaymentDetailResponseModel & Metadata;
export type ActualPaymentDetailResponse = {
  total: string;
  data: {
    key: string;
    amount: string;
    date: string;
    currency: string;
    type: string;
    counterparty: string;
  }[];
  metadata: Metadata["metadata"];
};
export type ActualPaymentDetailResponseModel = {
  code: string;
  data: ActualPaymentDetailResponse;
};
export type PayoutsRes = PayoutsResponse & Metadata;
export type { PayoutData } from "models/Payouts";
export type AccountsPayableAgingResponse = APAgingReportResponse & Metadata;
export type AccountsPayableAgingSeries = APAgingReportSeries;
export type AccountsReceivableAgingResponse = ARAgingReportResponse & Metadata;
export type AccountsReceivableAgingSeries = ARAgingReportSeries;
export type ShopifyInventorySkuLocationRes = ShopifyInventorySkuLocationResponse &
  Metadata;
export type { ShopifyInventorySkuLocationSeries } from "models/v1/inventory/ShopifyInventorySkuLocation";

export type AmzInventorySkuResponse = AmzInventorySkyRes & Metadata;
export type { AmzInventorySkuSeries } from "models/v1/inventory/AmazonInventorySku";

export type AverageOrderValueB2CRes = {
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: string;
      y: string;
    }>;
  }>;
  metadata: Metadata["metadata"];
};
