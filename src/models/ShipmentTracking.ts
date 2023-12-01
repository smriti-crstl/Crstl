export interface ShipmentTracking 
{
    id: string;
    externalPk: string;
    object: string;
    mode: string;
    status: string;
    statusDetail: string;
    objectCreatedAt: string;
    objectUpdatedAt: string;
    signedBy: string;
    weight: string;
    estDeliveryDate: string;
    carrier: string;
    trackingDetails: any;
    carrierDetail: any;
    publicUrl: string;
}