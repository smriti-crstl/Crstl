import {
  ChargebackStatusModel,
  FulfillmentStatusModel,
  InvoiceStatusModel,
  PackStatusModel,
  PaymentStatusModel,
  ShipStatusModel
} from "./EnumTypes";
import { PurchaseOrderStatusModel } from "./PurchaseOrder";

export interface PurchaseOrderSummaryModel {
  readonly id: string;
  readonly receivedAt: string;
  readonly totalAmount?: string;
  readonly status?: PurchaseOrderStatusModel;
  readonly projectedDate?: string;
  readonly hoursToShip?: number;
  readonly channelName?: string;
  readonly numItems?: number;
  readonly fulfillmentStatus?: FulfillmentStatusModel;
  readonly chargebackStatus?: ChargebackStatusModel;
  readonly invoiceStatus?: InvoiceStatusModel;
  readonly paymentStatus?: PaymentStatusModel;
  readonly currentOrderStatus?: PurchaseOrderStatusModel;
  readonly source?: string;
  readonly orderName?: string;
  readonly deliveryStatus?: string;
  readonly currency?: string;
}

export interface PurchaseOrderSummaryResponse {
  totalResults: any;
  orders: Array<{
    readonly id: string;
    readonly receivedAt: string;
    readonly totalAmount?: string;
    readonly status?: PurchaseOrderStatusModel;
    readonly projectedDate?: string;
    readonly hoursToShip?: number;
    readonly channelName?: string;
    readonly numItems?: number;
    readonly fulfillmentStatus?: FulfillmentStatusModel;
    readonly chargebackStatus?: ChargebackStatusModel;
    readonly invoiceStatus?: InvoiceStatusModel;
    readonly paymentStatus?: PaymentStatusModel;
    readonly currentOrderStatus?: PurchaseOrderStatusModel;
    readonly source?: string;
    readonly orderName?: string;
    readonly deliveryStatus?: string;
    readonly currency?: string;
  }>;
}

export interface PurchaseOrderItemSummaryModel {
  readonly sku: string;
  readonly externalSku: string;
  readonly productName: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalAmount: number;

  readonly packStatus: PackStatusModel;
  readonly numPacked: number;

  readonly shipStatus: ShipStatusModel;
  readonly numShipped: number;
}

export interface PurchaseOrderSummaryQueryRequest {
  invoiceStatus: string;
  paymentStatus: string;
  deliveryStatus: string;
  chargebackStatus: string;
  customer: string;
  orderStatus: string;
  page: any;
  orders: any;
  includeShopify: any;
}

export interface PurchaseOrderImportSummaryModel {
  logs: any;
}
