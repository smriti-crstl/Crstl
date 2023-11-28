import { ObjectId } from "mongodb";

import { TradingPartners } from "../EdiMapping";
import { ShipToModel } from "./AddressModel";
import { EdiCommentModel } from "./EdiCommentModel";
import { TranslateError } from "./Translate";

export type ControlNumberRecord = {
  document_id: ObjectId;
  reference_id: string;
  customer_id: string;
  integration_id: string;
  document_type: string;
  trading_partner_id: ObjectId;
  isa13: string;
  gs06: string;
  st02: string;
  isa05?: string;
  isa06?: string;
  isa07?: string;
  isa08?: string;
  gs02?: string;
  gs03?: string;
  created_at: string;
};

export function controlNumberRecord(
  document_id: ObjectId,
  reference_id: string,
  customer_id: string,
  integration_id: string,
  document_type: string,
  trading_partner_id: ObjectId,
  isa13: string,
  gs06: string,
  st02: string,
  optional_properties: {
    isa05?: string;
    isa06?: string;
    isa07?: string;
    isa08?: string;
    gs02?: string;
    gs03?: string;
  }
): ControlNumberRecord {
  return {
    document_id,
    reference_id,
    customer_id,
    integration_id,
    document_type,
    trading_partner_id,
    isa13: isa13,
    gs06: gs06,
    st02: st02,
    ...optional_properties,
    created_at: new Date().toISOString()
  };
}

export interface DearSystemsInput {
  docId: string;
  docType: string;
  reprocessing?: boolean;
}

export function dearSystemsInput(
  docId: string,
  docType: string,
  reprocessing?: string
): DearSystemsInput {
  return {
    docId: docId,
    docType: docType,
    reprocessing: reprocessing ? (reprocessing === "true" ? true : false) : true
  };
}

export interface AutofillDocumentInput {
  sourceDocumentType: string;
  sourceDocumentId: string;
  targetDocumentType: "856" | "810" | "997" | "880" | "865" | "855" | "RTS";
  tradingPartner: TradingPartners;
  organizationId: string;
}

export interface AutofillDocumentOutput {
  status: number;
  code: string;
  data: {
    documentId?: string;
    message: string;
    errors?: TranslateError[];
  };
}

export interface DocumentToInsertModel {
  files: [];
  source_document_id?: string;
}

export interface GenericDocumentModel {
  metadata: any;
  file: {
    json_edi: any;
    metadata: any;
  };
}

export interface ListDocumentModel {
  status: number;
  code: string;
  data: GenericDocumentModel;
}

export type WorkflowRequestDocumentType = "850" | "875";

export interface StepperConfigResponseModel {
  status: number;
  code: string;
  data?: EdiWorkflowStep[];
  supportedLabelTypes?: {
    shippingLabel?: boolean;
    packingSlip?: boolean;
    palletLabel?: boolean;
  };
}

export function stepperConfigResponseModel(
  status: number,
  code: string,
  data: EdiWorkflowStep[],
  supportedLabelTypes?: {
    shippingLabel?: boolean;
    packingSlip?: boolean;
    palletLabel?: boolean;
  }
) {
  return {
    status: status,
    code: code,
    data: data,
    supportedLabelTypes: supportedLabelTypes
  };
}

export interface AckDocumentInput {
  sourceDocumentType: string;
  sourceDocumentId: string;
  tradingPartner: TradingPartners;
}

export interface AckDocumentOutput {
  status: number;
  code: string;
  data: {
    documentId?: string;
    message: string;
    errors?: TranslateError[];
  };
}

export interface UpdateDocumentInput {
  documentId: string;
  file: {
    json_edi: any;
    metadata: any;
  };
  documentType: string;
  sendAfterSave?: boolean;
}

export interface DocumentUpdatedResponseModel {
  status: number;
  code: string;
  data: {
    message: string;
    errors?: TranslateError[];
  };
}

export interface SearchOrdersResponseDataModel {
  message?: string;
  orders?: SearchOrdersOrderModel[];
}

export interface SearchDocumentsResponseDataModel {
  message?: string;
  documents?: SearchDocumentsDocumentModel[];
  totalCount?: number;
}

export interface SearchOrdersResponseModel {
  status: number;
  code: string;
  data: SearchOrdersResponseDataModel;
}

export interface SearchDocumentsResponseModel {
  status: number;
  code: string;
  data: SearchDocumentsResponseDataModel;
}

export enum SearchDocumentsDateField {
  created_at = "created_at",
  earliest_ship_date = "earliest_ship_date",
  requested_ship_date = "requested_ship_date",
  latest_ship_date = "latest_ship_date",
  requested_delivery_date = "requested_delivery_date",
  latest_delivery_date = "latest_delivery_date",
  requested_pickup_date = "requested_pickup_date"
}

export interface SearchDocumentsInput {
  searchString?: string;
  filter?: {
    tradingPartnerId?: string[];
    documentType?: string[];
    status?: string[];
    documentDirection?: DocumentDirection;
    dateField?: SearchDocumentsDateField[];
    dateRange?: {
      start?: string;
      end?: string;
    };

    /**
     * @Deprecated Use dateField and dateRange instead.
     */
    createdAt?: {
      start?: string;
      end?: string;
    };
  };
  sort?: {
    date?: string;
  };
  limit?: number;
  offset?: number;
}

type ReferenceIdKey = "reference_id" | "source_document_reference_id";

export type DocumentDirection = "incoming" | "outgoing";

type DateRangeKey =
  | "source_created_at"
  | "lastFile.chameleon_doc.heading.earliest_ship_date"
  | "lastFile.chameleon_doc.heading.requested_ship_date"
  | "lastFile.chameleon_doc.heading.latest_ship_date"
  | "lastFile.chameleon_doc.heading.delivery_requested_date"
  | "lastFile.chameleon_doc.heading.latest_delivery_date"
  | "lastFile.chameleon_doc.heading.requested_pickup_date";
export interface DateRange {
  $gte?: string;
  $lt?: string;
}

export interface SearchDocumentsFilterObj {
  customer_id: string;
  deleted_at?: { $exists: boolean };
  $or?: {
    [key in ReferenceIdKey]?: {
      $regex: string;
      $options: string;
    };
  }[];
  trading_partner_id?: {
    $in: ObjectId[];
  };
  document_type?: {
    $in: string[];
  };
  document_direction?: DocumentDirection;
  "state.0.value"?: {
    $in: string[];
  };
  $and?: {
    $or?: {
      [key in DateRangeKey]?: DateRange;
    }[];
  }[];
}

export interface SearchDocumentsSortObj {
  createdAt: number;
  _id: number;
}

export interface SearchDocumentsPaginationObj {
  limit: number;
  offset: number;
}

export const searchDocumentsResponse = (
  status: number,
  code: string,
  data: SearchDocumentsResponseDataModel
): SearchDocumentsResponseModel => ({ status, code, data });

export function searchOrderResponse(
  status: number,
  code: string,
  data: SearchOrdersResponseDataModel
) {
  return {
    status: status,
    code: code,
    data: data
  };
}

export interface SearchOrdersOrderModel {
  _id: string;
  orderId: string;
  orderDate: string;
  orderTotal: string;
  orderState: string | null;
  invoiceState: string | null;
  asnState: string | null;
  deliveryState: string | null;
  paymentState: string | null;
  chargebackState: string | null;
  labelCount?: number;
  asnId?: string;
  invoiceId?: string;
  ackId?: string;
  rtsId?: string;
  stateColors?: {
    orderStateColor?: {
      backgroundColor?: string;
      textColor?: string;
    };
    asnStateColor?: {
      backgroundColor?: string;
      textColor?: string;
    };
    invoiceStateColor?: {
      backgroundColor?: string;
      textColor?: string;
    };
    deliveryStateColor?: {
      backgroundColor?: string;
      textColor?: string;
    };
    paymentStateColor?: {
      backgroundColor?: string;
      textColor?: string;
    };
    chargebackStateColor?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  messageTimestamp: string | null;
  isTestDocument?: boolean;
}

// todo: refine this model to be more accurate than just "string" as types
export interface SearchDocumentsDocumentModel {
  id: string;
  referenceId: string;
  documentType: string;
  documentId: string;
  sourceDocumentType?: string;
  sourceDocumentId?: string;
  sourceDocumentReferenceId?: string;
  tradingPartnerId: string;
  tradingPartnerName?: string;
  documentDirection: string;
  documentSlug?: string;
  sourceDocumentSlug?: string;
  status: string;
  createdAt: string;
  amount?: number;
}

export interface EDIDocumentState {
  value: string;
  updated_at: string;
  updated_by: string;
  label_count?: number;
  po_change_doc_id?: string;
  po_change_doc_version?: string;
  document_type?: string;
  document_id?: string;
}

export interface EdiWorkflowStep {
  title: DocumentTitle;
  subTitle?: string;
  content?: string;
  id?: string;
  documentType: string;
  slug: string;
  state: DocumentState;
  color: EdiWorkflowStepColorConfig;
  type: ActionButtonType;
  label: string;
  disabled?: boolean;
}

export function ediWorkflowStep(
  title: DocumentTitle,
  documentType: string,
  slug: string,
  state: DocumentState,
  color: EdiWorkflowStepColorConfig,
  type: ActionButtonType,
  label: string,
  subtitle?: string,
  content?: string,
  id?: string,
  disabled?: boolean
) {
  return {
    title: title,
    documentType: documentType,
    slug: slug,
    state: state,
    color: color,
    type: type,
    label: label,
    subTitle: subtitle,
    content: content,
    id: id,
    disabled: disabled
  };
}

export interface EdiWorkflowStepColorConfig {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  showTick?: boolean;
}

export interface UpdateOrderStateInput {
  orderId: string;
  stateType: OrderStates;
  newValue: DocumentState;
  documentType: "850" | "875";
}

export interface OrderStateUpdateResponseModel {
  status: number;
  code: string;
  data: {
    message: string;
    errors?: Array<{ message: string }>;
  };
}

export interface OrderCountSummary {
  status: number;
  code: string;
  data: Array<{
    id: string;
    label: string;
    count: number;
    color: {
      backgroundColor: string;
      textColor: string;
      iconColor: string;
      iconBackground: string;
    };
  }>;
}

export enum OrderStates {
  state = "state",
  asn_state = "asn_state",
  invoice_state = "invoice_state",
  payment_state = "payment_state",
  chargeback_state = "chargeback_state",
  delivery_state = "delivery_state"
}

export interface AdditionalAsnData {
  status: number;
  code: string;
  data?: {
    productDetails: Array<{
      upc?: string;
      sku?: string;
      productDescription?: string;
    }>;
    shipTo?: ShipToModel;
    shipFrom?: { locationId?: string; address?: string };
  };
  message?: string;
}

export interface EDIOrderCommentCreatedInput {
  orderId: string;
  comment: string;
}

export interface EDIOrderCommentCreatedOutput {
  status: number;
  code: string;
  data?: {
    commentId?: string;
    comment?: string;
    message?: string;
  };
}

export interface OrderComment {
  status: number;
  code: string;
  data?: EdiCommentModel[];
  message?: string;
}

export interface AckRawDocumentInput {
  sourceDocumentType: string;
  sourceDocumentId: string;
  partnerId: string;
}

export interface AckRawDocumentOutput {
  status: number;
  code: string;
  data: {
    documentId?: string;
    message: string;
    errors?: TranslateError[];
  };
}

export interface DeleteOrderComment {
  status: number;
  code: string;
  message: string;
}

export interface AdditionalInvoiceData {
  status: number;
  code: string;
  data?: {
    productDetails: Array<{
      productId?: string;
      productDescription?: string;
    }>;
  };
  message?: string;
}

export interface PurchaseOrderVersions {
  status: number;
  code: string;
  data?: Array<{
    version: number;
    createdAt: string;
    extCreatedAt: string;
  }>;
  message?: string;
}

export interface PoChangeForOrderResponse {
  status: number;
  code: string;
  data?: Array<{}>;
  message?: string;
}

export interface UpdatePOChangeStateInput {
  poChangeId: string;
  newValue: string;
  sourceDocumentType?: string;
}

export interface POChangeStateUpdateResponseModel {
  status: number;
  code: string;
  data?: {
    errors?: Array<{ message: string }>;
  };
  message?: string;
}

export enum POStateUpdatedAfterPOChangeCode {
  UNRESOLVED_PO_CHANGES_PRESENT = "UNRESOLVED_PO_CHANGES_PRESENT",
  PO_STATE_UPDATED = "PO_STATE_UPDATED",
  ERROR = "ERROR"
}

export enum POChangeStateUpdateAllowedCode {
  NO_UNRESOLVED_PO_CHANGES_PRESENT = "NO_UNRESOLVED_PO_CHANGES_PRESENT",
  PO_CHANGE_STATE_UPDATE_ALLOWED = "PO_CHANGE_ALLOWED",
  PO_CHANGE_STATE_UPDATE_NOT_ALLOWED = "PO_CHANGE_STATE_UPDATE_NOT_ALLOWED",
  ERROR = "ERROR"
}

export interface ResetFormResponse {
  status: number;
  code: string;
  message: string;
}

export enum DocumentTitle {
  PurchaseOrder = "Purchase Order",
  GroceryPurchaseOrder = "Grocery PO",
  Shipment = "Shipment",
  Acknowledgement = "Acknowledgement",
  Invoice = "Invoice",
  GroceryInvoice = "Grocery Invoice",
  RTS = "Ready to Ship"
}

export enum DocumentSlug {
  PurchaseOrder = "purchase-order",
  GroceryPurchaseOrder = "grocery-purchase-order",
  Shipment = "shipment",
  Acknowledgement = "acknowledgement",
  Invoice = "invoice",
  GroceryInvoice = "grocery-invoice",
  RTS = "rts"
}

export type DocumentState =
  | "NonExistent"
  | "Draft"
  | "Queued"
  | "Send_Success"
  | "Send_Failure"
  | "Accepted"
  | "Acknowledged"
  | "Rejected"
  | OrderState;

export type OrderState =
  | "New"
  | "Open"
  | "Completed"
  | "Acknowledged"
  | "PO_Change"
  | "Cancelled"
  | ""
  | "NA"
  | "Default";

export type ActionButtonType = "chip" | "button";

export interface WorkflowStepConfig {
  state: DocumentState;
  color: EdiWorkflowStepColorConfig;
  type: ActionButtonType;
  label: string;
  disabled: boolean;
  title: DocumentTitle;
  slug: DocumentSlug;
}

export function workflowStepConfig(
  state: DocumentState,
  color: EdiWorkflowStepColorConfig,
  type: ActionButtonType,
  label: string,
  disabled: boolean,
  title: DocumentTitle,
  slug: DocumentSlug
) {
  return {
    state: state,
    color: color,
    type: type,
    label: label,
    disabled: disabled,
    title: title,
    slug: slug
  };
}
