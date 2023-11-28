import { PurchaseOrderSummaryResponse } from "@crstl/api/src/apis/models/PurchaseOrderSummary";
import { AxiosError } from "axios";
import { getNewOrdersSummary } from "domain/entity/orders/repositories";
import { QueryObserverResult, UseQueryOptions } from "react-query";
import { useQuery } from "react-query";
const ORDERS_QUERY_KEYS = {
  GET_CHANNELS: "GET_CHANNELS",
  GET_ORDERS: "GET_ORDERS",
  GET_ORGANIZATION_CONFIG: "GET_ORGANIZATION_CONFIG",
  GET_PURCHASE_ORDER_DETAILS: "GET_PURCHASE_ORDER_DETAILS",
  GET_COMMENTS: "GET_COMMENTS",
  GET_SHOPIFY_COUNT: "GET_SHOPIFY_COUNT",
};

const useNewOrdersSummaryQuery = <TData = PurchaseOrderSummaryResponse>(
  orgId: string,
  page?: string,
  pageCount?: string,
  orderStatus?: string,
  invoiceStatus?: string,
  deliveryStatus?: string,
  paymentStatus?: string,
  customer?: string,
  chargebackStatus?: string,
  options?: UseQueryOptions<PurchaseOrderSummaryResponse[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [
      ORDERS_QUERY_KEYS.GET_ORDERS,
      orgId,
      page,
      pageCount,
      orderStatus,
      invoiceStatus,
      deliveryStatus,
      paymentStatus,
      customer,
      chargebackStatus,
    ],
    getNewOrdersSummary,
    options
  );
};

export { useNewOrdersSummaryQuery };
