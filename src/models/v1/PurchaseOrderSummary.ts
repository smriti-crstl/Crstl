export interface PurchaseOrderSummary
{
    id?: string;
    receivedAt?: Date | null;
    orderStatus?: string;
    channelName?: string;
    fulfillmentStatus?:string;
    invoiceStatus?: string;
    deliveryStatus?: string;
    source?: string;
    orderName?: string;
    totalAmount?: string;
}