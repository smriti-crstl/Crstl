import { AxiosError, AxiosResponse } from "axios";
import {
  DeleteCommentReq,
  DeleteCommentRes,
} from "domain/entity/orders/models";
import { API_V1 } from "domain/network";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { QueryFunctionContext } from "react-query";

import {
  DocumentUpdatedResponseModel,
  StepperConfigResponseModel,
  UpdateDocumentInput,
} from "models/v1/edi/EdiDocuments";

import {
  AddEdiCommentReq,
  AddEdiCommentRes,
  DocumentDetailResponse,
  GetAppMarketplaceTokenRes,
  GetASNAdditionalDataResponseModel,
  GetAssociatedPOChangeDocsResponseModel,
  GetEdiCommentsResponseModel,
  GetInvoiceAdditionalDataResponseModel,
  GetOrdersSummaryCountResponseModel,
  GetPOVersionsResponseModel,
  ListDocumentSchema,
  PostAutoFillReq,
  PostAutoFillRes,
  PostPOChangeStateReq,
  PostPOChangeStateRes,
  PutUpdateOrderStateReq,
  PutUpdateOrderStateRes,
  SearchOrdersResponseModel,
  ShippingLabelModel,
} from "../models";
import {
  EventLogResponseModel,
  ListDocumentSchemaResponse,
  SaveCustomSortReq,
  SaveCustomSortRes,
} from "../models/index";

const ENDPOINTS = {
  LIST_DOCUMENT: "/edi/listDocument",
  UPDATE_DOCUMENT_856: "/edi/update-856",
  UPDATE_DOCUMENT_810: "/edi/update-810",
  SEARCH_ORDERS: "/edi/search/orders",
  GET_EVENT_LOG: "/edi/audit-log",
  GET_WORKFLOW: "/edi/workflow",
  GET_ORDER_COUNT_SUMMARY: "/edi/order-count-summary",
  POST_AUTOFILL: "/edi/autofill-",
  POST_AUTOFILL_DOC: "/edi/autofill-doc",
  GET_ADDITIONAL_ASN_DATA: "/edi/asn-additional-data",
  UPDATE_ORDER_STATUS: "/edi/order-state",
  CREATE_COMMENT: "/edi/order/comment",
  GET_COMMENTS: "/edi/order/:orderId/comments",
  GET_INVOICE_ADDITIONAL_DATA: "/edi/invoice-additional-data",
  DELETE_COMMENT: "/edi/comment/:commentId/delete",
  GET_PO_ERRORS: "/edi/order/po-errors",
  GET_ASSOCIATED_PO_CHANGE_DOCs: "/edi/order/:orderId/po-changes",
  POST_PO_CHANGE_STATE: "/edi/po-change-state",
  GET_PO_VERSIONS: "/edi/order/:orderId/versions",
  GET_SHIPPING_LABELS: "/edi/shipping-labels",
  LIST_DOCUMENT_SCHEMA: "/edi-schema",
  EXPORT_CSV_ORDERS: "/edi/orders/export",
  EXPORT_EVENT_LOG_CSV_ORDERS: "/edi/audit-log/export",
  EXPORT_SEARCH_CSV_ORDERS: "/edi/search/documents/export",
  RESET_ORDER: "/edi/reset",
  UPDATE_DOCUMENT_855: "/edi/update-855",
  UPDATE_DOCUMENT_RTS: "/edi/update-rts",
  UPDATE_DOCUMENT_GENERIC: "/edi/update-doc",
  SAVE_SHIPPING_LABEL_CUSTOM_SORT_ORDER: "/org-data/shipping-label-sort",
  GET_APP_MARKETPLACE_TOKEN: "/edi/app-marketplace-token",
};

function createUrlWithParams(
  url: string,
  params: Record<string, string>
): string {
  const result = Object.entries(params).reduce((acc, [key, value]) => {
    acc = acc.replaceAll(`:${key}`, value);
    return acc;
  }, url);

  return result;
}

const listDocumentById = async function ({
  queryKey: [_id, documentType, id, edit, version],
}: QueryFunctionContext<string[]>): Promise<DocumentDetailResponse> {
  const params = new URLSearchParams({
    documentType,
    id,
    ...(edit ? { edit } : {}),
    ...(version ? { version } : {}),
  });

  return await API_V1.get(
    `${ENDPOINTS.LIST_DOCUMENT}?${params?.toString()}`
  ).then((res: AxiosResponse<DocumentDetailResponse>) => res.data);
};

const getListDocumentSchema = async ({
  queryKey: [_id, documentType, documentId, tradingPartnerId],
}: QueryFunctionContext<string[]>): Promise<ListDocumentSchema> => {
  const params = {
    documentType,
    documentId,
    tradingPartnerId,
  };

  return await API_V1.get(`${ENDPOINTS.LIST_DOCUMENT_SCHEMA}`, { params }).then(
    (res: AxiosResponse<ListDocumentSchemaResponse>) => res.data.data
  );
};

const getInvoiceAdditionalData = async function ({
  queryKey: [_id, id],
}: QueryFunctionContext<
  string[]
>): Promise<GetInvoiceAdditionalDataResponseModel> {
  return await API_V1.get(
    `${ENDPOINTS.GET_INVOICE_ADDITIONAL_DATA}?id=${id}`
  ).then(
    (res: AxiosResponse<GetInvoiceAdditionalDataResponseModel>) => res.data
  );
};

const updateDocument856 = async function (data: UpdateDocumentInput) {
  const result = await API_V1.put(ENDPOINTS.UPDATE_DOCUMENT_856, data)
    .then((res: AxiosResponse<DocumentUpdatedResponseModel>) => res.data)
    .catch((error: AxiosError<DocumentUpdatedResponseModel>) => {
      const responseData = error.response?.data;
      if (data.sendAfterSave) {
        return Promise.reject(responseData);
      }
      return responseData;
    });

  return result;
};

const updateDocument810 = async function (data: UpdateDocumentInput) {
  const result = await API_V1.put(ENDPOINTS.UPDATE_DOCUMENT_810, data)
    .then((res: AxiosResponse<DocumentUpdatedResponseModel>) => res.data)
    .catch((error: AxiosError<DocumentUpdatedResponseModel>) => {
      const responseData = error.response?.data;
      if (data.sendAfterSave) {
        return Promise.reject(responseData);
      }
      return responseData;
    });

  return result;
};

const searchOrders = async function ({
  queryKey: [
    pageNumber,
    pageSize,
    direction,
    orderState,
    asnState,
    deliveryState,
    paymentState,
    chargebackState,
  ],
}: QueryFunctionContext<string[]>): Promise<SearchOrdersResponseModel> {
  return await API_V1.get(
    `${ENDPOINTS.SEARCH_ORDERS}?pageNumber=${pageNumber}&direction=${direction}&pageSize=${pageSize}&orderState=${orderState}&asnState=${asnState}&deliveryState=${deliveryState}&paymentState=${paymentState}&chargebackState=${chargebackState}`
  ).then((res: AxiosResponse<SearchOrdersResponseModel>) => res.data);
};

const getPurchaseOrderErrors = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  const [pageNo, direction] = queryKey;
  const params = new URLSearchParams({ pageNo, direction });

  const result = await API_V1.get(ENDPOINTS.GET_PO_ERRORS, { params }).then(
    (res) => res.data?.data
  );

  return result;
};

// TODO: remove reliance on documentType once BE is updated
const getWorkflow = async function ({
  queryKey: [_queryKey, orderId, documentType],
}: QueryFunctionContext<string[]>): Promise<StepperConfigResponseModel> {
  return await API_V1.get(ENDPOINTS.GET_WORKFLOW, {
    params: {
      orderId,
      documentType,
    },
  }).then((res: AxiosResponse<StepperConfigResponseModel>) => res.data);
};

const getEdiOrdersCSV = async function ({
  queryKey: [id],
}: QueryFunctionContext<string[]>) {
  return await API_V1.get(`${ENDPOINTS.EXPORT_CSV_ORDERS}?orderIds=${id}`).then(
    (res) => res.data
  );
};

const getEdiEventLogCSV = async function ({
  queryKey: [_queryKey, ids, config],
}: QueryFunctionContext<string[]>) {
  return await API_V1.get(ENDPOINTS.EXPORT_EVENT_LOG_CSV_ORDERS, {
    params: {
      documentIds: ids,
      config: JSON.stringify(config),
    },
  }).then((res) => res.data);
};

const getEdiSearchCSV = async function ({
  queryKey: [_queryKey, ids, config],
}: QueryFunctionContext<string[]>) {
  return await API_V1.get(ENDPOINTS.EXPORT_SEARCH_CSV_ORDERS, {
    params: {
      documentIds: ids,
      config: JSON.stringify(config),
    },
  }).then((res) => res.data);
};

const getEdiComments = async function ({
  queryKey: [_id, id],
}: QueryFunctionContext<string[]>): Promise<GetEdiCommentsResponseModel> {
  return await API_V1.get(ENDPOINTS.GET_COMMENTS.replace(":orderId", id)).then(
    (res: AxiosResponse<GetEdiCommentsResponseModel>) => res.data
  );
};

const getOrdersSummaryCount = async function (): Promise<GetOrdersSummaryCountResponseModel> {
  return await API_V1.get(`${ENDPOINTS.GET_ORDER_COUNT_SUMMARY}`).then(
    (res: AxiosResponse<GetOrdersSummaryCountResponseModel>) => res.data
  );
};

const postAutofill = async (
  payload: PostAutoFillReq
): Promise<PostAutoFillRes> => {
  // calling autofill-doc for all new document types after 855, 856, 810 and RTS e.g. 880 (grocery invoice) instead of e.g. autofill-810 and so on
  let endpointUrl = "";
  const { targetDocumentType } = payload;
  if (
    targetDocumentType === CoreEDIDocumentNumber.ShipNotice ||
    targetDocumentType === CoreEDIDocumentNumber.Acknowledgement ||
    targetDocumentType === CoreEDIDocumentNumber.RTS ||
    targetDocumentType === CoreEDIDocumentNumber.Invoice
  ) {
    endpointUrl = `${ENDPOINTS.POST_AUTOFILL}${payload.targetDocumentType}`;
  } else {
    endpointUrl = ENDPOINTS.POST_AUTOFILL_DOC;
  }

  return await API_V1.post(endpointUrl, payload).then(
    (res: AxiosResponse<PostAutoFillRes>) => res.data
  );
};

const getAdditionalASNData = async function ({
  queryKey: [id],
}: QueryFunctionContext<string[]>): Promise<GetASNAdditionalDataResponseModel> {
  return await API_V1.get(`${ENDPOINTS.GET_ADDITIONAL_ASN_DATA}?id=${id}`).then(
    (res: AxiosResponse<GetASNAdditionalDataResponseModel>) => res.data
  );
};

const putUpdateOrderStatus = async (
  payload: PutUpdateOrderStateReq
): Promise<PutUpdateOrderStateRes> => {
  return await API_V1.put(`${ENDPOINTS.UPDATE_ORDER_STATUS}`, payload).then(
    (res: AxiosResponse<PutUpdateOrderStateRes>) => res.data
  );
};

const deleteEdiComment = async ({
  commentId,
}: DeleteCommentReq): Promise<DeleteCommentRes> => {
  return await API_V1.put(
    ENDPOINTS.DELETE_COMMENT.replace(":commentId", commentId)
  ).then((res: AxiosResponse<DeleteCommentRes>) => res.data);
};

const createEdiComment = async (
  payload: AddEdiCommentReq
): Promise<AddEdiCommentRes> => {
  return await API_V1.post(`${ENDPOINTS.CREATE_COMMENT}`, payload).then(
    (res: AxiosResponse<AddEdiCommentRes>) => res.data
  );
};

const getAssociatedPOChangeDocs = async function ({
  queryKey: [_id, id, sourceDocumentType],
}: QueryFunctionContext<
  string[]
>): Promise<GetAssociatedPOChangeDocsResponseModel> {
  return await API_V1.get(
    ENDPOINTS.GET_ASSOCIATED_PO_CHANGE_DOCs.replace(":orderId", id),
    {
      params: {
        sourceDocumentType,
      },
    }
  ).then(
    (res: AxiosResponse<GetAssociatedPOChangeDocsResponseModel>) => res.data
  );
};

const postPOChangeState = async (
  payload: PostPOChangeStateReq
): Promise<PostPOChangeStateRes> => {
  return await API_V1.post(`${ENDPOINTS.POST_PO_CHANGE_STATE}`, payload).then(
    (res: AxiosResponse<PostAutoFillRes>) => res.data
  );
};

const getPOVersions = async ({
  queryKey: [_id, orderId, sourceDocumentType],
}: QueryFunctionContext<string[]>) => {
  const url = createUrlWithParams(ENDPOINTS.GET_PO_VERSIONS, { orderId });

  return API_V1.get(url, { params: { sourceDocumentType } }).then(
    (res: AxiosResponse<GetPOVersionsResponseModel>) => res.data
  );
};

const getShippingLabels = async ({
  queryKey: [_id, poId, sortBy],
  pageParam = 0,
}: QueryFunctionContext<string[]>) => {
  return API_V1.get(ENDPOINTS.GET_SHIPPING_LABELS, {
    params: { poId, sortBy, page: pageParam },
  }).then((res: AxiosResponse<ShippingLabelModel>) => res.data);
};

const resetDocument = async ({
  queryKey: [_id, documentType, documentId],
}: QueryFunctionContext<string[]>) => {
  const params = {
    documentType,
    documentId,
  };

  const result = await API_V1.put(ENDPOINTS.RESET_ORDER, {}, { params }).then(
    (res: AxiosResponse<DocumentUpdatedResponseModel>) => res.data
  );

  return result;
};

const updateDocument855 = async function (data: UpdateDocumentInput) {
  const result = await API_V1.put(ENDPOINTS.UPDATE_DOCUMENT_855, data).then(
    (res: AxiosResponse<DocumentUpdatedResponseModel>) => res.data
  );

  if (data.sendAfterSave && result.data?.errors) {
    return Promise.reject(result);
  }

  if (result.data?.errors) {
    return Promise.resolve({ data: { message: "Draft saved successfully" } });
  }

  return result;
};

const updateDocumentRTS = async function (data: UpdateDocumentInput) {
  const result = await API_V1.put(ENDPOINTS.UPDATE_DOCUMENT_RTS, data).then(
    (res: AxiosResponse<DocumentUpdatedResponseModel>) => res.data
  );

  if (data.sendAfterSave && result.data?.errors) {
    return Promise.reject(result);
  }

  if (result.data?.errors) {
    return Promise.resolve({ data: { message: "Draft saved successfully" } });
  }

  return result;
};

const updateDocumentGeneric = async function (data: UpdateDocumentInput) {
  const result = await API_V1.put(ENDPOINTS.UPDATE_DOCUMENT_GENERIC, data).then(
    (res: AxiosResponse<DocumentUpdatedResponseModel>) => res.data
  );

  if (data.sendAfterSave && result.data?.errors) {
    return Promise.reject(result);
  }

  if (result.data?.errors) {
    return Promise.resolve({ data: { message: "Draft saved successfully" } });
  }

  return result;
};

const getEventLog = async ({
  queryKey: [_id, config],
}: QueryFunctionContext<string[]>) => {
  return await API_V1.get(ENDPOINTS.GET_EVENT_LOG, {
    params: { config: JSON.stringify(config) },
  }).then((res: AxiosResponse<EventLogResponseModel>) => res.data);
};

const saveCustomSortOrder = async (
  payload: SaveCustomSortReq
): Promise<SaveCustomSortRes> => {
  return await API_V1.post(
    `${ENDPOINTS.SAVE_SHIPPING_LABEL_CUSTOM_SORT_ORDER}`,
    payload
  ).then((res: AxiosResponse<SaveCustomSortRes>) => res.data);
};

const getAppMarketplaceToken = async function (): Promise<GetAppMarketplaceTokenRes> {
  return await API_V1.post(ENDPOINTS.GET_APP_MARKETPLACE_TOKEN).then(
    (res: AxiosResponse<GetAppMarketplaceTokenRes>) => res.data
  );
};

export {
  ENDPOINTS,
  listDocumentById,
  updateDocument856,
  updateDocument810,
  searchOrders,
  getWorkflow,
  postAutofill,
  getOrdersSummaryCount,
  getAdditionalASNData,
  putUpdateOrderStatus,
  createEdiComment,
  getEdiComments,
  getInvoiceAdditionalData,
  deleteEdiComment,
  getPurchaseOrderErrors,
  getAssociatedPOChangeDocs,
  postPOChangeState,
  getPOVersions,
  getShippingLabels,
  getListDocumentSchema,
  getEdiOrdersCSV,
  getEdiEventLogCSV,
  getEdiSearchCSV,
  resetDocument,
  updateDocument855,
  updateDocumentRTS,
  updateDocumentGeneric,
  getEventLog,
  saveCustomSortOrder,
  getAppMarketplaceToken,
};

