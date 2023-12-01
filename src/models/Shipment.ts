import { AddressModel } from "./ValueTypes";

export interface ShipmentItemModel
{
    orderItemId: string;
    numberItemsShipped: number;
}

export interface ShipmentPhotoModel
{
    readonly filename: string;
    readonly mediatype: string;
    readonly imageUrl: string;
}

export interface ShipmentModel
{
    id: string;
    createdOn: Date;
    createdBy: string;
    shipmentNumber: string;
    purchaseOrderId: string;
    shipFrom: AddressModel;
    shipTo: AddressModel;
    shipmentItems: ShipmentItemModel[];
    photos: ShipmentPhotoModel[];
}

export interface ShipmentUpdate
{
    shipmentNumber: string;
    shipFrom: AddressModel;
    shipTo: AddressModel;
}
export interface ShipmentCreate extends ShipmentUpdate
{
    purchaseOrderId: string;
}
