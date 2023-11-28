import { AxiosResponse } from "axios";
import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  AccountsPayableAgingResponse,
  AccountsReceivableAgingResponse,
  ActualPaymentDetailResponseModel,
  AmzInventorySkuResponse,
  AverageOrderValueB2CRes,
  AverageOrderValueChartRes,
  B2BOrdersDataRes,
  B2COrdersDataRes,
  CashOnHandDonutChartRes,
  InvoiceProjectionRes,
  OrderByCustomerChartRes,
  OrderByRetailerChartRes,
  OrderDeliveryStatusChartRes,
  PaymentDetailResponse,
  PayoutsRes,
  RevenueByRetailerChartRes,
  SalesBySkuB2BChartRes,
  SalesBySkuB2CChartRes,
  ShopifyInventorySkuLocationRes,
  TopSalesBySkuRes,
  TransactionByMerchantRes,
} from "../model";

const ENDPOINTS = {
  GET_CASH_ON_HANDS_CHART: "finance/account/balance/chart",
  GET_ORDER_BY_RETAILER_CHART: "purchase_order/report/order-by-retailer",
  GET_AVERAGE_ORDER_VALUE_CHART: "purchase_order/report/avg-order-value",
  GET_ORDER_BY_CUSTOMER_CHART: "purchase_order/report/order-by-customer",
  GET_REVENUE_BY_RETAILER_CHART: "purchase_order/report/revenue-by-retailer",
  GET_ORDER_DELIVERY_STATUS_CHART:
    "purchase_order/report/order-delivery-status",
  GET_SALES_BY_SKU_B2B: "purchase_order/report/sales-by-sku/b2b",
  GET_SALES_BY_SKU_B2C: "purchase_order/report/sales-by-sku/b2b",
  GET_INVOICE_PROJECTION: "invoice/projection",
  GET_B2B_ORDERS_DATA: "/purchase_order/report/b2b-orders",
  GET_B2C_ORDERS_DATA: "/purchase_order/report/b2c-orders",
  GET_TOP_SALES_BY_SKU: "/purchase_order/report/top-sales-by-sku-new",
  GET_AP_AGING_REPORT: "/payables/report/ap-aging",
  GET_AR_AGING_REPORT: "/invoice/report/ar-aging",
  GET_PAYMENT_DETAIL: "payment/detail",
  GET_UPCOMING_PAYOUTS: "payouts",
  GET_SHOPIFY_INVENTORY_DATA: "/inventory/shopify/sku-location",
  GET_AMAZON_INVENTORY_DATA: "/inventory/amz/sku",
  GET_SPEND_BY_MERCHANT_CATEGORY: "/finance/transaction/group-by-merchant",
  GET_AVERAGE_ORDER_VALUE_B2C:
    "/purchase_order/report/b2c-average-order-value-v2",
  GET_ACTUAL_PAYMENT_DETAIL: "/finance/transaction/detail",
};

const getCashOnHandsChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<CashOnHandDonutChartRes> {
  return await API_V1.get(ENDPOINTS.GET_CASH_ON_HANDS_CHART, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<CashOnHandDonutChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getOrderByRetailerChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<OrderByRetailerChartRes> {
  return await API_V1.get(ENDPOINTS.GET_ORDER_BY_RETAILER_CHART, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<OrderByRetailerChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getAverageOrderValueChartData = async function ({
  queryKey: [_id, dateRangeSelected = "days_30"],
}: QueryFunctionContext<string[]>): Promise<AverageOrderValueChartRes> {
  return await API_V1.get(ENDPOINTS.GET_AVERAGE_ORDER_VALUE_CHART, {
    params: { dateRange: dateRangeSelected },
  }).then((res: AxiosResponse<AverageOrderValueChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getOrderByCustomerChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<OrderByCustomerChartRes> {
  return await API_V1.get(ENDPOINTS.GET_ORDER_BY_CUSTOMER_CHART, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<OrderByCustomerChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getRevenueByRetailerChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<RevenueByRetailerChartRes> {
  return await API_V1.get(ENDPOINTS.GET_REVENUE_BY_RETAILER_CHART, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<RevenueByRetailerChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getOrderDeliveryStatusChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<OrderDeliveryStatusChartRes> {
  return await API_V1.get(ENDPOINTS.GET_ORDER_DELIVERY_STATUS_CHART, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<OrderDeliveryStatusChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getSalesBySkuB2BChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<SalesBySkuB2BChartRes> {
  return await API_V1.get(ENDPOINTS.GET_SALES_BY_SKU_B2B, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<SalesBySkuB2BChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getSalesBySkuB2CChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<SalesBySkuB2CChartRes> {
  return await API_V1.get(ENDPOINTS.GET_SALES_BY_SKU_B2C, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<SalesBySkuB2CChartRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getInvoiceProjectionChartData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<InvoiceProjectionRes> {
  return await API_V1.get(ENDPOINTS.GET_INVOICE_PROJECTION, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<InvoiceProjectionRes>) => {
    const resData = res.data;
    return resData;
  });
};

const getPaymentDetail = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<PaymentDetailResponse> {
  return await API_V1.get(ENDPOINTS.GET_PAYMENT_DETAIL, {
    params: { startDate, endDate },
  }).then((res) => res.data?.data);
};

const getActualPaymentDetail = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>) {
  return await API_V1.get<ActualPaymentDetailResponseModel>(
    ENDPOINTS.GET_ACTUAL_PAYMENT_DETAIL,
    {
      params: { startDate, endDate },
    }
  ).then((res) => res.data?.data);
};

const getB2COrdersChartData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<B2COrdersDataRes> => {
  return await API_V1.get(ENDPOINTS.GET_B2C_ORDERS_DATA, {
    params: { startDate, endDate },
  }).then((res) => res.data);
};

const getB2BOrdersChartData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<B2BOrdersDataRes> => {
  return await API_V1.get(ENDPOINTS.GET_B2B_ORDERS_DATA, {
    params: { startDate, endDate },
  }).then((res) => res.data);
};

const getTopSalesBySKUData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<TopSalesBySkuRes> => {
  return await API_V1.get(ENDPOINTS.GET_TOP_SALES_BY_SKU, {
    params: { startDate, endDate },
  }).then((res) => res.data);
};

const getAPAgingData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<AccountsPayableAgingResponse> => {
  return await API_V1.get(ENDPOINTS.GET_AP_AGING_REPORT, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<AccountsPayableAgingResponse>) => {
    return res.data;
  });
};

const getARAgingData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<
  string[]
>): Promise<AccountsReceivableAgingResponse> => {
  return await API_V1.get(ENDPOINTS.GET_AR_AGING_REPORT, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<AccountsReceivableAgingResponse>) => {
    return res.data;
  });
};

const getShopifyInventoryData = async () => {
  return await API_V1.get(ENDPOINTS.GET_SHOPIFY_INVENTORY_DATA).then(
    (res: AxiosResponse<ShopifyInventorySkuLocationRes>) => {
      return res.data;
    }
  );
};

const getAmazonInventoryData = async () => {
  return await API_V1.get(ENDPOINTS.GET_AMAZON_INVENTORY_DATA).then(
    (res: AxiosResponse<AmzInventorySkuResponse>) => {
      return res.data;
    }
  );
};

const getUpcomingPayouts = async (): Promise<PayoutsRes> => {
  return await API_V1.get(ENDPOINTS.GET_UPCOMING_PAYOUTS).then(
    (res: AxiosResponse<PayoutsRes>) => res.data
  );
};

const getSpendByMerchantCategory = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<TransactionByMerchantRes> => {
  return API_V1.get<TransactionByMerchantRes>(
    ENDPOINTS.GET_SPEND_BY_MERCHANT_CATEGORY,
    {
      params: { startDate, endDate },
    }
  ).then((res) => res.data);
};

const getAverageOrderValueB2C = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>) => {
  const params = { startDate, endDate };

  return API_V1.get<AverageOrderValueB2CRes>(
    ENDPOINTS.GET_AVERAGE_ORDER_VALUE_B2C,
    { params }
  ).then((res) => res.data);
};

export {
  ENDPOINTS,
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
};

