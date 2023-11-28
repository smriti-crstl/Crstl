export interface InvoiceModel {
  readonly id: string;
  externalPk: string;
  createdAt: string;
  lastUpdatedAt: string;
  customField: any;
  docNumber: any;
  txnDate: any;
  currency: string;
  customer: any;
  dueDate: string;
  emailStatus: string;
  totalAmount: any;
  billEmailAddress: string;
  balance: number;
  receivedAt: any;
  ownerId: string;
  integrationId: string;
  purchaseOrderId: string;
}

export interface invoiceProjectionResponse {
  key: string;
  totalAmount: any;
  currency: string;
  customer: any;
  dueDate: string;
}

export interface moneyCalendarResponse {
  total: number;
  data: Array<{
    key: string;
    totalAmount: any;
    currency: string;
    customer: any;
    dueDate: string;
  }>;
}

export interface PaymentDetailResponseModel {
  total: string;
  data: {
    key: string;
    totalAmount: string;
    dueDate: string;
    currency: string;
    customer: string;
    type: string;
  }[]
}; 