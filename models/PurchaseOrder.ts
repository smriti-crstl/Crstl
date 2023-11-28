/* eslint no-unused-vars: "off" */

import { ChartMetadata } from "../../domain/v1/Chart";
import { PaymentTermsModel } from "./EnumTypes";
import { AddressModel } from "./ValueTypes";

export enum PurchaseOrderStatusModel {
  Open = "Open",
  Acknowledged = "Acknowledged",
  POChange = "PO Change",
  ASN = "ASN",
  InProgress = "In Progress",
  Archived = "Archived",
  Cancelled = "Cancelled"
}

export enum StatusLabel {
  orderStatus = "orderStatus",
  paymentStatus = "paymentStatus",
  fulfillmentStatus = "fulfillmentStatus",
  invoiceStatus = "invoiceStatus",
  chargebackStatus = "chargebackStatus",
  deliveryStatus = "deliveryStatus"
}

export interface ShipWindowModel {
  dateFrom: string;
  dateTo: any;
}

export interface PurchaseOrderItemModel {
  sku: string;
  externalSku: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}
export interface PurchaseOrderItemUpdate {
  quantity: number;
  unitPrice: number;
  productName: string;
}
export interface PurchaseOrderItemCreate extends PurchaseOrderItemUpdate {
  sku: string;
  externalSku: string;
}

export interface PurchaseOrderModel {
  id: string;
  receivedAt: string;
  shipWindow: ShipWindowModel;
  billTo: AddressModel;
  shipTo: AddressModel;
  projectedDate: string | null;
  paymentTerms: PaymentTermsModel;
  channelId: string;
  orderItems: PurchaseOrderItemModel[];
  attachments: string[];
}

export interface PurchaseOrderResponse {
  id: string;
  receivedAt: string;
  shipWindow?: ShipWindowModel;
  billTo?: AddressModel;
  shipTo?: AddressModel;
  statusHistory?: any;
  fulfillmentStatusHistory?: any;
  chargebackStatusHistory?: any;
  invoiceStatusHistory?: any;
  paymentStatusHistory?: any;
  projectedDate?: string | null;
  paymentTerms?: PaymentTermsModel;
  channelId?: string;
  attachments?: string[];
  channelName?: string;
  orderItems?: any[];
  organizationId?: string;
  externalPk?: string;
  orderName?: string;
  dates?: any;
  dates856?: {
    actualShip?: string;
    scheduledShip?: string;
  };
  totalAmount?: number;
  totalNotProvided?: boolean;
  deliveryStatus?: string;
  deliveryStatusHistory?: any;
  // Added new field
  /* 
    **********************
    Money Details
    **********************
    netDueDays?: number;
    discountDueDays?: number;
    discountPercentage?: number;
    termsType?: string;
    termsStartDate?: string;
    */
  moneyDetails?: any;
  trackingDetails?: any;
  carrierInformation?: {
    carrierAlphaCode?: string;
    carrierTransMethodCode?: string;
  };
  // statuses
  orderStatus?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  invoiceStatus?: string;
  chargebackStatus?: string;
  invoiceId?: string;
  invoiceAmount?: string;
  invoiceDocNumber?: string;
}
export interface PurchaseOrderUpdate {
  receivedAt: string;
  shipWindow: any;
  billTo: AddressModel | null;
  shipTo: AddressModel | null;
  projectedDate: string | null;
  paymentTerms: PaymentTermsModel;
}
export interface PurchaseOrderCreate extends PurchaseOrderUpdate {
  id: string;
  channelId: string;
  channelName: string;
  paymentStatus?: string;
  orderStatus?: string;
  fulfillmentStatus?: string;
  source: string;
  orderItems: PurchaseOrderItemCreate[];
  orderName: string;
  totalAmount?: string;
}

export interface UpdateConfigurableChipsQueryRequest {
  label: StatusLabel;
  prevValue: string;
  value: string;
}
export interface UpdateConfigurableChipsResponse {
  message: string;
}

export interface OrderByCustomerChartResponseModel {
  total: any;
  data: Array<{
    id: string;
    color: string;
    textColor: string;
    label: any;
    value: any;
    currency?: string;
    percent: any;
    isEstimated?: boolean;
  }>;
  metadata?: ChartMetadata;
}

export interface AvgOrderValueChartResponseModel {
  id: string;
  color: string;
  data: Array<{ x: string; y: any; isEstimated?: boolean }>;
}

export interface OrderByRetailerChartResponseModel {
  total: any;
  data: Array<{
    label: string;
    value: number;
    currency?: string;
    id: string;
    color: string;
    textColor: string;
  }>;
  metadata?: ChartMetadata;
}

export interface RevenueByRetailerChartResponseModel {
  total: any;
  data: Array<{
    id: any;
    color: string;
    textColor: string;
    label: any;
    value: any;
    percent: any;
    isEstimated?: boolean;
    currency?: string;
  }>;
  metadata?: ChartMetadata;
}

export interface OrderDeliveryStatusChart {
  total: any;
  lastUpdatedAt?: any;
  data: Array<{
    label: string;
    value: number;
    currency?: string;
    id: string;
    color: string;
    texColor: string;
  }>;
  metadata?: ChartMetadata;
}

export interface SalesBySkuB2BChartResponseModel {
  data: Array<{ x: any; y: string; percentChange: any }>;
}

export interface SalesBySkuB2CChartResponseModel {
  data: Array<{ x: any; y: string }>;
}

export interface OrderByCustomerLineChart {
  total: any;
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: any;
      y: any;
    }>;
  }>;
  metadata?: ChartMetadata;
}

export interface AOVForB2C {
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: string;
      y: string;
    }>;
  }>;
  metadata?: ChartMetadata;
}

export interface TopSalesBySku {
  sales: any;
  sku: string;
  channel: string;
}

export interface TopSalesBySkuResponse {
  data: Array<{ sales: any; sku: string; channel: string; currency?: string }>;
  metadata?: ChartMetadata;
}
