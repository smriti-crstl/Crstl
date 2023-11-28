export const EDI_LIST_VIEW_TABLE_DATA_INDEXES: Record<
  | "DOCUMENT_DATE"
  | "DOCUMENT_TYPE"
  | "REFERENCE_ID"
  | "SOURCE_DOCUMENT_REFERENCE_ID"
  | "TRADING_PARTNER_ID"
  | "AMOUNT"
  | "STATUS",
  string
> = {
  DOCUMENT_DATE: "createdAt",
  DOCUMENT_TYPE: "documentType",
  REFERENCE_ID: "referenceId",
  SOURCE_DOCUMENT_REFERENCE_ID: "sourceDocumentReferenceId",
  TRADING_PARTNER_ID: "tradingPartnerId",
  AMOUNT: "amount",
  STATUS: "status",
};

export const ediSearchBlankObject = {
  referenceId: "",
  documentType: "",
  amount: "",
  tradingPartnerId: "",
  status: "",
  sourceDocumentReferenceId: "",
  createdAt: "",
};

export const ediSearchCsvConfig = [
  {
    key: "referenceId",
    label: "Document #",
    hidden: false,
  },
  {
    key: "documentType",
    label: "Document Type",
    hidden: false,
  },
  {
    key: "amount",
    label: "Amount",
    hidden: false,
  },
  {
    key: "tradingPartnerId",
    label: "Trading Partner",
    hidden: false,
  },
  {
    key: "status",
    label: "Status",
    hidden: false,
  },
  {
    key: "sourceDocumentReferenceId",
    label: "Purchase Order #",
    hidden: false,
  },
  {
    key: "createdAt",
    label: "Date",
    hidden: false,
  },
];

export const TABLE_PAGE_SIZE = 20;

