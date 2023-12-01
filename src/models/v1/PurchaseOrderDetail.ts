export interface PurchaseOrderDetails{
    orderName? : string;
    totalAmount? : any;
    channelName? : string;
    billTo?: any;
    shipTo?: any;
    createdAt?: Date | null;
    externalPk?:string;
    source?: string;
    moneyDetails?: any;
    orderItems?: any;
    dates?: any;
    organizationId?: any;
    receivedAt?: any;
    statusHistory?: any;
    fulfillmentStatusHistory?: any;
    deliveryStatusHistory?:any;
    invoiceStatusHistory?: any;
    orderStatus?: string;
    fulfillmentStatus?: string;
    invoiceStatus?: string;
    deliveryStatus?: string;
}