import { AverageOrderValueB2CRes } from "./../../entity/analytics/model/index";
import { AxiosError } from "axios";
import {
  CashOnHandDonutChartRes,
  OrderByRetailerChartRes,
  AverageOrderValueChartRes,
  OrderByCustomerChartRes,
  RevenueByRetailerChartRes,
  OrderDeliveryStatusChartRes,
  SalesBySkuB2BChartRes,
  SalesBySkuB2CChartRes,
  InvoiceProjectionRes,
  B2BOrdersDataRes,
  B2COrdersDataRes,
  TopSalesBySkuRes,
  PaymentDetailResponse,
  AccountsPayableAgingResponse,
  ShopifyInventorySkuLocationRes,
  AmzInventorySkuResponse,
  AccountsReceivableAgingResponse,
  PayoutsRes,
  TransactionByMerchantRes,
  ActualPaymentDetailResponse,
} from "domain/entity/analytics/model";
import {
  getCashOnHandsChartData,
  getOrderByRetailerChartData,
  getAverageOrderValueChartData,
  getOrderByCustomerChartData,
  getRevenueByRetailerChartData,
  getOrderDeliveryStatusChartData,
  getSalesBySkuB2BChartData,
  getSalesBySkuB2CChartData,
  getInvoiceProjectionChartData,
  getB2BOrdersChartData,
  getB2COrdersChartData,
  getTopSalesBySKUData,
  getPaymentDetail,
  getUpcomingPayouts,
  getAPAgingData,
  getARAgingData,
  getShopifyInventoryData,
  getAmazonInventoryData,
  getSpendByMerchantCategory,
  getAverageOrderValueB2C,
  getActualPaymentDetail,
} from "domain/entity/analytics/repositories";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

const ANALYTICS_QUERIES = {
  ANALYTICS_CASH_ON_HANDS_QUERY: "ANALYTICS_CASH_ON_HANDS_QUERY",
  ANALYTICS_RETAILER_CHART_QUERY: "ANALYTICS_RETAILER_CHART_QUERY",
  ANALYTICS_AVERAGE_ORDERS_QUERY: "ANALYTICS_AVERAGE_ORDERS_QUERY",
  ANALYTICS_ORDER_BY_CUSTOMER_QUERY: "ANALYTICS_ORDER_BY_CUSTOMER_QUERY",
  ANALYTICS_REVENUE_BY_RETAILER_QUERY: "ANALYTICS_REVENUE_BY_RETAILER_QUERY",
  ANALYTICS_ORDER_BY_DELIVERY_QUERY: "ANALYTICS_ORDER_BY_DELIVERY_QUERY",
  ANALYTICS_SALES_BY_SKU_B2B_QUERY: "ANALYTICS_SALES_BY_SKU_B2B_QUERY",
  ANALYTICS_SALES_BY_SKU_B2C_QUERY: "ANALYTICS_SALES_BY_SKU_B2B_QUERY",
  ANALYTICS_INVOICE_PROJECTION_QUERY: "ANALYTICS_INVOICE_PROJECTION_QUERY",
  ANALYTICS_ORDER_DELIVERY_STATUS: "ANALYTICS_ORDER_DELIVERY_STATUS",
  GET_B2B_ORDERS_DATA: "GET_B2B_ORDERS_DATA",
  GET_B2C_ORDERS_DATA: "GET_B2C_ORDERS_DATA",
  GET_TOP_SALES_BY_SKU: "GET_TOP_SALES_BY_SKU",
  GET_UPCOMING_PAYOUTS: "GET_UPCOMING_PAYOUTS",
  GET_AP_AGING_REPORT: "GET_AP_AGING_REPORT",
  GET_AR_AGING_REPORT: "GET_AR_AGING_REPORT",
  GET_SHOPIFY_INVENTORY_DATA: "GET_SHOPIFY_INVENTORY_DATA",
  GET_AMAZON_INVENTORY_DATA: "GET_AMAZON_INVENTORY_DATA",
  SPEND_BY_MERCHANT_CATEGORY: "SPEND_BY_MERCHANT_CATEGORY",
  GET_AVERAGE_ORDER_VALUE_B2C: "GET_AVERAGE_ORDER_VALUE_B2C",
  ACTUAL_PAYMENT_DETAIL_QUERY: "ACTUAL_PAYMENT_DETAIL_QUERY",
};

const useGetCashOnHandsDataQuery = <TData = CashOnHandDonutChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<CashOnHandDonutChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_CASH_ON_HANDS_QUERY, startDate, endDate],
    getCashOnHandsChartData,
    options
  );
};

const useGetRetailerChartDataQuery = <TData = OrderByRetailerChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<OrderByRetailerChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_RETAILER_CHART_QUERY, startDate, endDate],
    getOrderByRetailerChartData,
    options
  );
};

const useGetAverageOrderValueDataQuery = <TData = AverageOrderValueChartRes>(
  dateRange?: string,
  options?: UseQueryOptions<AverageOrderValueChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_AVERAGE_ORDERS_QUERY, dateRange],
    getAverageOrderValueChartData,
    options
  );
};

const useGetOrderByCustomerDataQuery = <TData = OrderByCustomerChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<OrderByCustomerChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_ORDER_BY_CUSTOMER_QUERY, startDate, endDate],
    getOrderByCustomerChartData,
    options
  );
};

const useRevenueByRetailerDataQuery = <TData = RevenueByRetailerChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<RevenueByRetailerChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_REVENUE_BY_RETAILER_QUERY, startDate, endDate],
    getRevenueByRetailerChartData,
    options
  );
};

const useOrderDeliveryStatusDataQuery = <TData = OrderDeliveryStatusChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<OrderDeliveryStatusChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_ORDER_DELIVERY_STATUS, startDate, endDate],
    getOrderDeliveryStatusChartData,
    options
  );
};

const useSalesBySkuB2BDataQuery = <TData = SalesBySkuB2BChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<SalesBySkuB2BChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_SALES_BY_SKU_B2B_QUERY, startDate, endDate],
    getSalesBySkuB2BChartData,
    options
  );
};

const useSalesBySkuB2CDataQuery = <TData = SalesBySkuB2CChartRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<SalesBySkuB2CChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_SALES_BY_SKU_B2C_QUERY, startDate, endDate],
    getSalesBySkuB2CChartData,
    options
  );
};

const useInvoiceProjectionDataQuery = <TData = InvoiceProjectionRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<InvoiceProjectionRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_INVOICE_PROJECTION_QUERY, startDate, endDate],
    getInvoiceProjectionChartData,
    options
  );
};

const usePaymentDetailQuery = <TData = PaymentDetailResponse>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<PaymentDetailResponse, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.ANALYTICS_INVOICE_PROJECTION_QUERY, startDate, endDate],
    getPaymentDetail,
    options
  );
};

const useActualPaymentDetailQuery = (
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<ActualPaymentDetailResponse, AxiosError>
) => {
  return useQuery(
    [ANALYTICS_QUERIES.ACTUAL_PAYMENT_DETAIL_QUERY, startDate, endDate],
    getActualPaymentDetail,
    options
  );
};

const useGetB2COrdersDataQuery = <TData = B2COrdersDataRes>(
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<B2COrdersDataRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.GET_B2C_ORDERS_DATA, startDate, endDate],
    getB2COrdersChartData,
    options
  );
};

const useGetB2BOrdersDataQuery = <TData = B2BOrdersDataRes>(
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<B2BOrdersDataRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.GET_B2B_ORDERS_DATA, startDate, endDate],
    getB2BOrdersChartData,
    options
  );
};

const useGetTopSalesBySKUQuery = <TData = TopSalesBySkuRes>(
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<TopSalesBySkuRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ANALYTICS_QUERIES.GET_TOP_SALES_BY_SKU, startDate, endDate],
    getTopSalesBySKUData,
    options
  );
};

const useGetAccountsPayableAgingQuery = (
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<AccountsPayableAgingResponse, AxiosError>
) => {
  const result = useQuery(
    [ANALYTICS_QUERIES.GET_AP_AGING_REPORT, startDate, endDate],
    getAPAgingData,
    options
  );

  return {
    ...result,
    data: result.data,
    lastUpdatedAt: result.data?.lastUpdatedAt ?? "",
  };
};

const useGetShopifyInventoryData = (
  options?: UseQueryOptions<ShopifyInventorySkuLocationRes, AxiosError>
) => {
  const result = useQuery(
    [ANALYTICS_QUERIES.GET_SHOPIFY_INVENTORY_DATA],
    getShopifyInventoryData,
    options
  );

  return {
    ...result,
    data: result.data,
    lastUpdatedAt: result.data?.lastUpdatedAt ?? "",
  };
};

const useGetAmazonInventoryData = (
  options?: UseQueryOptions<AmzInventorySkuResponse, AxiosError>
) => {
  const result = useQuery(
    [ANALYTICS_QUERIES.GET_AMAZON_INVENTORY_DATA],
    getAmazonInventoryData,
    options
  );

  return {
    ...result,
    data: result.data,
    lastUpdatedAt: result.data?.lastUpdatedAt ?? "",
  };
};

const useGetAccountsReceivableAgingQuery = (
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<AccountsReceivableAgingResponse, AxiosError>
) => {
  const result = useQuery(
    [ANALYTICS_QUERIES.GET_AR_AGING_REPORT, startDate, endDate],
    getARAgingData,
    options
  );

  return {
    ...result,
    data: result.data,
    lastUpdatedAt: result.data?.lastUpdatedAt ?? "",
  };
};

const useGetUpcomingPayoutsQuery = (
  options?: UseQueryOptions<PayoutsRes, AxiosError>
) => {
  return useQuery(
    [ANALYTICS_QUERIES.GET_UPCOMING_PAYOUTS],
    getUpcomingPayouts,
    options
  );
};

const useGetSpendByMerchantCategory = (
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<TransactionByMerchantRes>
) => {
  return useQuery(
    [ANALYTICS_QUERIES.SPEND_BY_MERCHANT_CATEGORY, startDate, endDate],
    getSpendByMerchantCategory,
    options
  );
};

const useGetAverageOrderValueB2C = (
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<AverageOrderValueB2CRes>
) => {
  return useQuery(
    [ANALYTICS_QUERIES.GET_AVERAGE_ORDER_VALUE_B2C, startDate, endDate],
    getAverageOrderValueB2C,
    options
  );
};

export {
  useGetCashOnHandsDataQuery,
  useGetRetailerChartDataQuery,
  useGetAverageOrderValueDataQuery,
  useGetOrderByCustomerDataQuery,
  useRevenueByRetailerDataQuery,
  useOrderDeliveryStatusDataQuery,
  useSalesBySkuB2BDataQuery,
  useSalesBySkuB2CDataQuery,
  useInvoiceProjectionDataQuery,
  useGetB2BOrdersDataQuery,
  useGetB2COrdersDataQuery,
  useGetTopSalesBySKUQuery,
  usePaymentDetailQuery,
  useGetUpcomingPayoutsQuery,
  useGetAccountsPayableAgingQuery,
  useGetAccountsReceivableAgingQuery,
  useGetShopifyInventoryData,
  useGetAmazonInventoryData,
  useGetSpendByMerchantCategory,
  useGetAverageOrderValueB2C,
  useActualPaymentDetailQuery,
};
