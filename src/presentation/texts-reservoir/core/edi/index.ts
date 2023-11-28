export enum CoreEDIDocumentNumber {
  Invoice = "810",
  GroceryInvoice = "880",
  Acknowledgement = "855",
  ShipNotice = "856",
  RTS = "RTS",
  PurchaseOrder = "850",
  GroceryPurchaseOrder = "875",
  GroceryPurchaseOrderChange = "876",
  PurchaseOrderChange = "860",
  PurchaseOrderChangeAck = "865",
}

export const CORE_EDI_DOCUMENT_NAMES: {
  [key in CoreEDIDocumentNumber]: string;
} = {
  [CoreEDIDocumentNumber.Invoice]: "Invoice",
  [CoreEDIDocumentNumber.GroceryInvoice]: "Grocery Invoice",
  [CoreEDIDocumentNumber.Acknowledgement]: "Acknowledgement",
  [CoreEDIDocumentNumber.ShipNotice]: "Ship Notice",
  [CoreEDIDocumentNumber.RTS]: "Ready To Ship",
  [CoreEDIDocumentNumber.PurchaseOrder]: "Order",
  [CoreEDIDocumentNumber.GroceryPurchaseOrder]: "Grocery PO",
  [CoreEDIDocumentNumber.GroceryPurchaseOrderChange]: "Grocery PO Change",
  [CoreEDIDocumentNumber.PurchaseOrderChange]: "Purchase Order Change",
  [CoreEDIDocumentNumber.PurchaseOrderChangeAck]: "PO Change Acknowledgement",
};

