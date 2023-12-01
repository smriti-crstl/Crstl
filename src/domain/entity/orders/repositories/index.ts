import { AxiosResponse } from "axios";
import { API_V1 } from "domain/network";
import { sortByDate } from "presentation/utils";
import { QueryFunctionContext } from "react-query";

import { PurchaseOrderSummaryResponse } from "models/PurchaseOrderSummary";

import {
  CreateCommentReq,
  DeleteCommentReq,
  DeleteCommentRes,
  GetCommentsRes,
  OrdersSummaryRes,
  OrganizationConfigModelRes,
  PurchaseOrderResTransformed,
  ShopifyOrdersCountRes,
  TransformedChannels,
  UpdateConfigurableChipsQueryReq,
  UpdateConfigurableChipsRes,
} from "../models";
import {
  transformChannels,
  transformPurchaseOrderDetails,
} from "./transformation";

const REPLACE_PARAMS = {
  orgId: ":orgId",
  poId: "poId",
  commentId: "commentId",
};

const ENDPOINTS = {
  GET_CHANNELS: "/channel",
  GET_ORDERS: `/organization/${REPLACE_PARAMS.orgId}/poSummary`,
  GET_NEW_ORDERS: `/organization/${REPLACE_PARAMS.orgId}/po_summary`,
  GET_ORG_CONFIG: "/config",
  GET_SHOPIFY_COUNT: `/owner/${REPLACE_PARAMS.orgId}/shopify/count`,
  GET_SINGLE_PURCHASE_ORDER_DETAILS: `/purchase_order/${REPLACE_PARAMS.poId}`,
  GET_COMMENTS: `/comments/${REPLACE_PARAMS.poId}`,
  POST_COMMENT: `/comments/${REPLACE_PARAMS.poId}`,
  DELETE_COMMENT: `/comments/${REPLACE_PARAMS.commentId}`,
  CHANGE_CHIP_STATUS: `/purchase_order/${REPLACE_PARAMS.poId}/change_status`,
};

const getChannels = async (): Promise<TransformedChannels> => {
  return await API_V1.get(ENDPOINTS.GET_CHANNELS).then(
    (res): TransformedChannels => transformChannels(res.data)
  );
};

const getOrdersSummary = async function ({
  queryKey: [
    _id,
    orgId = "",
    includeShopify = "0",
    includeAmazon = "0",
    includeB2B = "0",
  ],
}: QueryFunctionContext<string[]>): Promise<OrdersSummaryRes[]> {
  return await API_V1.get(
    ENDPOINTS.GET_ORDERS.replace(REPLACE_PARAMS.orgId, orgId),
    { params: { includeShopify, includeAmazon, includeB2B } }
  ).then((res: AxiosResponse<OrdersSummaryRes[]>) => {
    const resData = res.data;
    return sortByDate<OrdersSummaryRes, keyof OrdersSummaryRes>(
      resData,
      "receivedAt",
      "DSC"
    );
  });
};

const getNewOrdersSummary = async function ({
  queryKey: [
    _id,
    orgId = "",
    page,
    pageCount,
    orderStatus,
    invoiceStatus,
    deliveryStatus,
    paymentStatus,
    customer,
    chargebackStatus,
  ],
}: QueryFunctionContext<string[]>): Promise<PurchaseOrderSummaryResponse[]> {
  return await API_V1.get(
    ENDPOINTS.GET_NEW_ORDERS.replace(REPLACE_PARAMS.orgId, orgId),
    {
      params: {
        page,
        pageCount,
        orderStatus,
        invoiceStatus,
        deliveryStatus,
        paymentStatus,
        customer,
        chargebackStatus,
      },
    }
  ).then((res: AxiosResponse<PurchaseOrderSummaryResponse[]>) => res.data);
};

const getShopifyCount = async function ({
  queryKey: [_id, orgId = ""],
}: QueryFunctionContext<string[]>): Promise<ShopifyOrdersCountRes> {
  return await API_V1.get(
    ENDPOINTS.GET_SHOPIFY_COUNT.replace(REPLACE_PARAMS.orgId, orgId)
  ).then((res: AxiosResponse<ShopifyOrdersCountRes>) => res.data);
};

const getOrganizationConfig = async ({
  queryKey: [_id],
}: QueryFunctionContext<string[]>): Promise<OrganizationConfigModelRes> => {
  return await API_V1.get(ENDPOINTS.GET_ORG_CONFIG).then((res) => res.data[0]);
};

const getSinglePurchaseOrderDetails = async ({
  queryKey: [_id, poId],
}: QueryFunctionContext<string[]>): Promise<PurchaseOrderResTransformed> => {
  return await API_V1.get(
    ENDPOINTS.GET_SINGLE_PURCHASE_ORDER_DETAILS.replace(
      REPLACE_PARAMS.poId,
      poId
    )
  ).then((res) => transformPurchaseOrderDetails(res.data));
};

const getComments = async ({
  queryKey: [_id, poId],
}: QueryFunctionContext<string[]>): Promise<GetCommentsRes[]> => {
  return await API_V1.get(
    ENDPOINTS.GET_COMMENTS.replace(REPLACE_PARAMS.poId, poId)
  ).then((res) =>
    sortByDate<GetCommentsRes, keyof GetCommentsRes>(
      res.data,
      "createdAt",
      "DSC"
    )
  );
};

const createComment = async ({
  poId,
  ...payload
}: CreateCommentReq): Promise<GetCommentsRes> => {
  type FromDataPayload = Omit<CreateCommentReq, "poId">;
  const createFormData = (data: FromDataPayload): FormData => {
    const form = new FormData();
    const keys = Object.keys(data) as Array<keyof FromDataPayload>;
    for (let i = 0; i < keys.length; i++) {
      form.append(keys[i], data[keys[i]]);
    }
    return form;
  };
  const formData = createFormData(payload);
  return await API_V1.post(
    ENDPOINTS.POST_COMMENT.replace(REPLACE_PARAMS.poId, poId),
    formData,
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }
  ).then((res) => res.data);
};

const deleteComment = async ({
  commentId,
}: DeleteCommentReq): Promise<DeleteCommentRes> => {
  return await API_V1.delete(
    ENDPOINTS.DELETE_COMMENT.replace(REPLACE_PARAMS.commentId, commentId)
  ).then((res) => res.data);
};

const changeChipStatus = async ({
  poId,
  ...queryParams
}: UpdateConfigurableChipsQueryReq): Promise<UpdateConfigurableChipsRes> => {
  return await API_V1.put(
    ENDPOINTS.CHANGE_CHIP_STATUS.replace(REPLACE_PARAMS.poId, poId),
    null,
    { params: queryParams }
  ).then((res) => res.data);
};

export {
  ENDPOINTS,
  getChannels,
  getOrdersSummary,
  getOrganizationConfig,
  getSinglePurchaseOrderDetails,
  getComments,
  createComment,
  deleteComment,
  changeChipStatus,
  getShopifyCount,
  getNewOrdersSummary,
};

