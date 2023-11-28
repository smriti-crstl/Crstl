/* eslint no-unused-vars: "off" */

export enum ChargebackStatusModel
{
    Open = 'Open',
    Submitted = 'Submitted',
    Won = 'Won',
    Lost = 'Lost'
}

export enum FulfillmentStatusModel
{
    // Still things to do
    Unfulfilled = 'Unfulfilled',
    // Everything is done
    Fulfilled = 'Fulfilled',
    // packed part of it
    PartiallyFulfilled = 'Partially Fulfilled',
    // when packed and ready but shipping is yet to occur
    Scheduled = 'Scheduled'
}

export enum InvoiceStatusModel
{
    Open = 'Open',
    Sent = 'Sent',
    Delayed = 'Delayed'
}

export enum PaymentStatusModel
{
    Pending = 'Pending',
    PartiallyPaid = 'Partially Paid',
    Paid = 'Paid',
    Refunded = 'Refunded',
    Voided = 'Voided',
    Delayed = 'Delayed',
    Overpaid = 'Overpaid',
    Unpaid = "Unpaid",
    Expired = "Expired",
    Authorized = "Authorized",
    PartiallyRefunded = "Partially Refunded"
}

export enum DeliveryStatusModel
{
    Unknown = 'Unknown',
    PreTransit = 'Pre-Transit',
    InTransit = 'In-Transit',
    OutForDelivery = 'Out for delivery',
    AvailableForPickup = 'Available for Pickup',
    ReturnToSender = 'Return to Sender',
    Delivered = 'Delivered',
    Failure = "Failure",
    Cancelled = "Cancelled"
}

export enum PaymentTermsModel
{
    Net30 = 'Net30',
    Net60 = 'Net60',
    Net90 = 'Net90',
    Custom = 'Custom'
}

export enum PackStatusModel
{
    NotPacked = 'Not Packed',
    Packing = 'Packing',
    Packed = 'Packed'
}

export enum ShipStatusModel
{
    NotShipped = 'Not Shipped',
    PartiallyShipped = 'Partially Shipped',
    Shipped = 'Shipped'
}

