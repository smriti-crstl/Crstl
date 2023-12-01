export interface PaymentModel
{
    id: string;
    externalPk: string;
    createdAt: string;
    lastUpdatedAt: string;
    txnDate: string;
    customer: any;
    linkedTxn: any;
    totalAmount: any;
    receivedAt: any;
    ownerId: string;
    integrationId: string;
}