import { AxiosError } from "axios";

import {
  CashOnHandDonutChartRes,
  OrderByCustomerChartRes,
  OrderByRetailerChartRes,
  OrderDeliveryStatusChartRes,
  RevenueByRetailerChartRes,
} from "@crstl/app/src/domain/entity/analytics/model";
import {
  useGetCashOnHandsDataQuery,
  useGetOrderByCustomerDataQuery,
  useGetRetailerChartDataQuery,
  useOrderDeliveryStatusDataQuery,
  useRevenueByRetailerDataQuery,
} from "@crstl/app/src/domain/interactors/analytics";

export const useGetAnalyticsChartDataFinance = (
  startDate: string,
  endDate: string
): [
  CashOnHandDonutChartRes | undefined,
  { cashOnHandsIsFetching: boolean; error: AxiosError | null }
] => {
  const {
    data: getCashOnHands,
    error: error,
    isFetching: cashOnHandsIsFetching,
  } = useGetCashOnHandsDataQuery(startDate, endDate);
  return [getCashOnHands, { cashOnHandsIsFetching, error }];
};

export const useGetRetailerOrdersAnalyticsChartDataSales = (
  startDate: string,
  endDate: string
): [
  OrderByRetailerChartRes | undefined,
  { isRetailerOrdersFetching: boolean; error: AxiosError | null }
] => {
  const {
    data: getRetailerOrders,
    error: error,
    isFetching: isRetailerOrdersFetching,
  } = useGetRetailerChartDataQuery(startDate, endDate);
  return [getRetailerOrders, { isRetailerOrdersFetching, error }];
};

export const useOrderDeliveryStatusChartDataOperations = (
  startDate: string,
  endDate: string
): [
  OrderDeliveryStatusChartRes | undefined,
  { isOrderDeliveryStatusFetching: boolean; error: AxiosError | null }
] => {
  const {
    data: getOrderDeliveryStatus,
    error: error,
    isFetching: isOrderDeliveryStatusFetching,
  } = useOrderDeliveryStatusDataQuery(startDate, endDate);
  return [getOrderDeliveryStatus, { isOrderDeliveryStatusFetching, error }];
};

export const useRevenueByRetailerChartDataSales = (
  startDate: string,
  endDate: string
): [
  RevenueByRetailerChartRes | undefined,
  { isRevenueByRetailerStatusFetching: boolean; error: AxiosError | null }
] => {
  const {
    data: getRevenueByRetailer,
    error: error,
    isFetching: isRevenueByRetailerStatusFetching,
  } = useRevenueByRetailerDataQuery(startDate, endDate);
  return [getRevenueByRetailer, { isRevenueByRetailerStatusFetching, error }];
};

export const useOrderByCustomerChartDataSales = (
  startDate: string,
  endDate: string
): [
  OrderByCustomerChartRes | undefined,
  { isOrderByCustomerStatusFetching: boolean; error: AxiosError | null }
] => {
  const {
    data: getOrderByCustomer,
    error: error,
    isFetching: isOrderByCustomerStatusFetching,
  } = useGetOrderByCustomerDataQuery(startDate, endDate);
  return [getOrderByCustomer, { isOrderByCustomerStatusFetching, error }];
};
