export interface OrderExportCSVModel {
  poNumber?: string;
  poDate?: string;
  releaseNumber?: string;
  retailersPo?: string;
  deptNumber?: string;
  carrier?: string;
  poLineNumber?: number;
  qtyOrdered?: string;
  unitPrice?: string;
  unitOfMeasure?: string;
  upcEan?: string;
  buyersCatalogOrStockKeepingNumber?: string;
  vendorNumber?: string;
  numberOfInnerPacks?: string;
  numberOfPcsPerInnerPack?: string;
  productItemDescription?: string;
  recordType?: string;
  contractNmber?: string;
  vendorStyle?: string;
  poPurpose?: string;
  poType?: string;
  retailPrice?: string;
  shipDates?: string;
  paymentTerms?: string;
  paymentTermsDiscDaysDue?: string;
  frtTerms?: string;
  buyingPartyName?: string;
  buyingPartyLocation?: string;
  buyingPartyAddress1?: string;
  buyingPartyAddress2?: string;
  buyingPartyCity?: string;
  buyingPartyState?: string;
  buyingPartyZip?: string;
  buyingPartyCountry?: string;
  poTotalAmount?: string;
}
