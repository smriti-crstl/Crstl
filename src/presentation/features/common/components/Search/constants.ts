import { SearchDocumentsDateField } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { AdvanceSearchOptions } from "./types";

export const STATUS_OPTIONS_CONFIG: AdvanceSearchOptions[] = [
  { label: "New", value: "New" },
  { label: "Completed", value: "Completed" },
  { label: "Open", value: "Open" },
  { label: "PO Change", value: "PO_Change" },
  { label: "Acknowledged", value: "Acknowledged" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Non Existent", value: "NonExistent" },
  { label: "Draft", value: "Draft" },
  { label: "Queued", value: "Queued" },
  { label: "Send Success", value: "Send_Success" },
  { label: "Send Failure", value: "Send_Failure" },
  { label: "Accepted", value: "Accepted" },
  { label: "Rejected", value: "Rejected" },
];

export const DATE_FIELD_OPTIONS_CONFIG: AdvanceSearchOptions[] = [
  { label: "Created At", value: SearchDocumentsDateField.created_at },
  {
    label: "Earliest Ship Date",
    value: SearchDocumentsDateField.earliest_ship_date,
  },
  {
    label: "Requested Ship Date",
    value: SearchDocumentsDateField.requested_ship_date,
  },
  {
    label: "Latest Ship Date",
    value: SearchDocumentsDateField.latest_ship_date,
  },
  {
    label: "Requested Delivery Date",
    value: SearchDocumentsDateField.requested_delivery_date,
  },
  {
    label: "Latest Delivery Date",
    value: SearchDocumentsDateField.latest_delivery_date,
  },
  {
    label: "Requested Pickup Date",
    value: SearchDocumentsDateField.requested_pickup_date,
  },
];

export const DATE_FIELD_WARNING = `One or more of the fields you selected may not be
  present on all documents. Only documents containing the selected fields will be
  included in search results.`;

export const SEARCH_NAME_CONSTANTS = {
  SEARCH_STRING: "searchString",
  TRADING_PARTNER: ["filter", "tradingPartnerId"],
  DOCUMENT_TYPE: ["filter", "documentType"],
  STATUS: ["filter", "status"],
  DOCUMENT_DIRECTION: ["filter", "documentDirection"],
  CREATED_AT: ["filter", "createdAt"],
  DATE_FIELD: ["filter", "dateField"],
  DATE_RANGE: ["filter", "dateRange"],
  LIMIT: "limit",
  OFFSET: "offset",
};

export const SEARCH_LABEL_CONSTANTS = {
  TRADING_PARTNER: "Trading Partner",
  DOCUMENT_TYPE: "Document Type",
  STATUS: "Status",
  DOCUMENT_DIRECTION: "Document Direction",
  DATE_FIELD: "Date Field",
  DATE_RANGE: "Date Range",
};
