import { EventLogColumnKey } from "./types";

export const EVENT_LOG_TABLE_INDEX: Record<EventLogColumnKey, string> = {
  REFERENCE_ID: "referenceId",
  EVENT_NUMBER: "eventNumber",
  TRADING_PARTNER: "tradingPartner",
  DOCUMENT_ID: "documentId",
  DOCUMENT_TYPE: "documentType",
  MESSAGE: "message",
  DOCUMENT_DIRECTION: "documentDirection",
  CREATED_TIMESTAMP: "createdTimestamp",
};

export const EDI_EVENT_LOG_LOCAL_STORAGE_KEY = "edi-event-log-config";

export const EDI_EVENT_LOG_SEARCH_KEY = "config";

export const EMPTY_OBJECT_STRING = "{}";

export const PAGE_SIZE = 25;

export const DOCUMENT_TYPE_FILTER_CONFIG: {
  text: string;
  value: string;
}[] = [
  { text: "Purchase Order (850)", value: "850" },
  { text: "Invoice (810)", value: "810" },
  { text: "Ship Notice (856)", value: "856" },
  { text: "PO Change (860)", value: "860" },
  { text: "PO Acknowledgement (855)", value: "855" },
  { text: "Ready to Ship (RTS)", value: "RTS" },
  { text: "Functional Acknowledgement (997)", value: "997" },
  { text: "Grocery Purchase Order (875)", value: "875" },
  { text: "Grocery PO Change (876)", value: "876" },
  { text: "Grocery Invoice (880)", value: "880" },
];

export const DOCUMENT_DIRECTION_FILTER_CONFIG = [
  { text: "Incoming", value: "Incoming" },
  { text: "Outgoing", value: "Outgoing" },
];

export const eventLogBlankObject = {
  referenceId: "",
  tradingPartner: "",
  documentType: "",
  message: "",
  documentDirection: "",
  eventNumber: "",
  createdTimestamp: "",
};

export const eventLogCsvConfig = [
  {
    key: "referenceId",
    label: "Document Id",
    hidden: false,
  },
  {
    key: "tradingPartner",
    label: "Trading Partner",
    hidden: false,
  },
  {
    key: "documentType",
    label: "Document Type",
    hidden: false,
  },
  {
    key: "message",
    label: "Message",
    hidden: false,
  },
  {
    key: "documentDirection",
    label: "Incoming / Outgoing",
    hidden: false,
  },
  {
    key: "createdTimestamp",
    label: "Timestamp",
    hidden: false,
  },
  {
    key: "eventNumber",
    label: "Event Id",
    hidden: false,
  },
];

export const DOCUMENT_TYPE_MAP = DOCUMENT_TYPE_FILTER_CONFIG.reduce(
  (docType: Record<string, string>, item) => {
    docType[item.value] = item.text;
    return docType;
  },
  {}
);

