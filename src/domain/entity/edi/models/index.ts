import {
  AutofillDocumentOutput,
  OrderStateUpdateResponseModel,
  POChangeStateUpdateResponseModel,
} from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import {
  SaveCustomSortRequest,
  SaveCustomSortResponse,
} from "@crstl/api/src/apis/models/v1/edi/OrgData";
import { PrismaticAuthToken } from "@crstl/api/src/apis/models/v1/edi/prismatic";

export type { ShippingLabelModel } from "@crstl/api/src/apis/models/v1/edi/ShippingLabel";

export interface DocumentMetadata {
  ext_id: string;
  customer_id: string;
  po_id: string;
  document_type: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  ext_created_at: string;
  trading_partner_name: string;
}

export interface DocumentDetailResponse {
  code: string;
  data: any;
}

export interface EDIDocumentModel {
  document: any;
  metadata: DocumentMetadata;
}

export interface OrderStateColors {
  orderStateColor: StateColor;
  asnStateColor: StateColor;
  invoiceStateColor: StateColor;
  deliveryStateColor: StateColor;
  paymentStateColor: StateColor;
  chargebackStateColor: StateColor;
}

export interface StateColor {
  backgroundColor: string;
  textColor: string;
}

export type DocumentListRow = {
  id: string;
  readonly _id: string;
  readonly orderTotal: string;
  readonly orderState: string;
  readonly tradingPartner: string;
  // readonly asnState: string;
  readonly invoiceState: string;
  readonly deliveryState: string;
  readonly documentType: string;
  readonly paymentState: string;
  readonly chargebackState: string;
  readonly orderId: string;
  readonly orderDate: string;
  readonly stateColors: OrderStateColors;
};

export interface SearchOrdersResponseModelData {
  message: string;
  orders: DocumentListRow[];
}
export interface SearchOrdersResponseModel {
  status: string;
  code: string;
  data: SearchOrdersResponseModelData;
}

export interface OrderCountSummaryColorObject {
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  iconBackground: string;
}

export interface OrderCountSummaryObject {
  id: string;
  label: string;
  color: OrderCountSummaryColorObject;
  count: number;
}

export interface GetOrdersSummaryCountResponseModel {
  status: string;
  code: string;
  data: OrderCountSummaryObject[];
}

export type PostAutoFillRes = AutofillDocumentOutput;
export type PostAutoFillReq = {
  sourceDocumentId: string;
  sourceDocumentType: string;
  targetDocumentType: string;
};

export interface ASNShiptoObject {
  locationId: string;
  address1: string;
  address2: string;
  city: string;
  provinceCode: string;
  postalCode: string;
  countryCode: string;
}

export interface ASNProductDetail {
  productDescription: string;
  sku: string;
  upc: string;
}

export interface ASNAdditionalDataObject {
  shipTo: ASNShiptoObject;
  productDetails: ASNProductDetail[];
}
export interface GetASNAdditionalDataResponseModel {
  status: string;
  code: string;
  data: ASNAdditionalDataObject;
}

export type PutUpdateOrderStateRes = OrderStateUpdateResponseModel;
export type PutUpdateOrderStateReq = {
  orderId: string;
  stateType: string;
  newValue: string;
  documentType: string;
};

export type AddEdiCommentReq = {
  orderId: string;
  comment: string;
};

export interface AddCommentDataObject {
  comment: string;
  commentId: string;
}

export type AddEdiCommentRes = {
  status: string;
  code: string;
  data: AddCommentDataObject;
};

export interface GetEdiCommentsDataObject {
  orderId: string;
  userId: string;
  commentDescription: string;
  attachment?: string | null;
  createdAt: string;
  id: string;
  fullName?: string;
  imageUrl?: string;
}
export interface GetEdiCommentsResponseModel {
  status: string;
  code: string;
  data: GetEdiCommentsDataObject[];
}

export interface ProductDetail {
  productId: string;
  productDescription: string;
}
export interface GetInvoiceAdditionalDataResponseModel {
  status: string;
  code: string;
  data: ProductDetail[];
}

export interface DeleteCommentResponseModel {
  status: string;
  code: string;
  message: string;
}

export interface GetAssociatedPOChangeDocsDataObject {
  id: string;
  poId: string;
  state: {
    value: string;
    updated_at: string;
    updated_by: string;
  }[];
  createdAt: string;
  updatedAt: string;
  extCreatedAt: string;
  messageTimestamp: string;
  poChangeDate: string;
  source850DocId: string;
  poChangeAckId?: string;
}

export interface GetAssociatedPOChangeDocsResponseModel {
  status: number;
  code: string;
  data?: GetAssociatedPOChangeDocsDataObject[];
  message?: string;
}

export type PostPOChangeStateReq = {
  poChangeId: string;
  newValue: "Accepted" | "Rejected";
  sourceDocumentType?: string;
};

export interface GetPOVersionsResponseModel {
  status: number;
  code: string;
  data: GetPOVersionsDataObject[];
}

export interface GetPOVersionsDataObject {
  version: number;
  createdAt: string;
  extCreatedAt: string;
}

export type PostPOChangeStateRes = POChangeStateUpdateResponseModel;

export interface ListDocumentSchema {
  enhancedSchema: Record<string, any>;
  quickEntryUISchema: Record<string, any>;
  fullEntryUISchema: Record<string, any>;
  defaultInputSchema: Record<string, any>;
  viewModeUISchema: Record<string, any>;
}

export interface ListDocumentSchemaResponse {
  status: number;
  code: string;
  data: ListDocumentSchema;
  metadata: Record<string, string>;
}

export interface EventLogResponseModel {
  status: string;
  code: string;
  data: {
    data: EventLogResponseModelDataItem[];
    totalCount: number;
  };
}

export interface EventLogResponseModelDataItem {
  id: string;
  eventNumber: string;
  tradingPartner: string;
  referenceId: string;
  documentId: string;
  documentType: string;
  documentTypeNumber: string;
  documentDirection: string;
  documentDirectionStyle: EventLogChipStyle;
  createdTimestamp: string;
  status: string;
  statusTimestamp: string;
  statusStyle: EventLogChipStyle;
  routing?: EventLogRouting;
}

export interface EventLogChipStyle {
  color: string;
  borderColor: string;
  backgroundColor: string;
}

export interface EventLogRouting {
  documentType: string;
  id: string;
  tabName: string;
  orderId: string;
}

export type SaveCustomSortRes = SaveCustomSortResponse;
export type SaveCustomSortReq = SaveCustomSortRequest;

export type GetAppMarketplaceTokenRes = PrismaticAuthToken;

