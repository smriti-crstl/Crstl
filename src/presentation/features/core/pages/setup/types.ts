export enum QuestionKeys {
  NUMBER_OF_EDI_TRADING_PARTNERS = "numberOfEdiTradingPartners",
  AVERAGE_MONTHLY_PO_PROCESSED = "averageMonthlyPoProcessed",
  SUPPORT_DROPSHIP_ORDERS = "supportDropshipOrders",
  WORK_WITH_3PL = "workWith3pl",
  INTERACT_WITH_EDI_DOCUMENTS = "interactWithEdiDocuments",
  INTEGRATIONS_NEEDED = "integrationsNeeded",
}

export type VendorIds = Array<{
  tradingPartnerId?: string;
  tradingPartnerName?: string;
  vendorId?: string;
  processed?: string;
}>;

export type HandleListChangeFn = ({
  arrIndex,
  field,
  value,
}: {
  arrIndex: number;
  field: "tradingPartnerId" | "vendorId" | "tradingPartnerName";
  value: string;
}) => void;

export type UpdateVendorIdsDataFn = (vendorIds: VendorIds) => void;

