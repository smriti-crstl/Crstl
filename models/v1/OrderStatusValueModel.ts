export interface OrderStatusValueModel {
  OrderStatus: Array<{
    status: string;
    status_type: string;
    background_color: string;
    text_color: string;
  }>;
  FulfillmentStatus: Array<{
    status: string;
    status_type: string;
    background_color: string;
    text_color: string;
  }>;
  DeliveryStatus: Array<{
    status: string;
    status_type: string;
    background_color: string;
    text_color: string;
  }>;
  InvoiceStatus: Array<{
    status: string;
    status_type: string;
    background_color: string;
    text_color: string;
  }>;
  PaymentStatus: Array<{
    status: string;
    status_type: string;
    background_color: string;
    text_color: string;
  }>;
  ChargebackStatus: Array<{
    status: string;
    status_type: string;
    background_color: string;
    text_color: string;
  }>;
}
