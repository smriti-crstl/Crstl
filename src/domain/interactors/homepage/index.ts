import { AxiosError } from "axios";
import {
  CollectiveBalanceChartRes,
  CreditCardsData,
  SankeyDataRes,
} from "domain/entity/homepage/models";
import {
  getBanksData,
  getCollectiveBalanceChartData,
  getCreditCardsData,
  getSankeyData,
} from "domain/entity/homepage/repositories";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { CardResponseModel } from "../../../../../api/src/apis/models/plaid/PlaidIntegration";

const HOMEPAGE_QUERY_KEYS = {
  GET_COLLECTIVE_BALANCE_CHART_DATA: "GET_COLLECTIVE_BALANCE_CHART_DATA",
  GET_BANKS_DATA: "GET_BANKS_DATA",
  GET_CREDIT_CARDS_DATA: "GET_CREDIT_CARDS_DATA",
  GET_SANKEY_DATA: "GET_SANKEY_DATA",
};

const useGetCollectiveBalanceChartDataQuery = <
  TData = CollectiveBalanceChartRes
>(
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<CollectiveBalanceChartRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [HOMEPAGE_QUERY_KEYS.GET_COLLECTIVE_BALANCE_CHART_DATA, startDate, endDate],
    getCollectiveBalanceChartData,
    options
  );
};

const useGetBanksDataQuery = <TData = CardResponseModel>(
  options?: UseQueryOptions<CardResponseModel, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(HOMEPAGE_QUERY_KEYS.GET_BANKS_DATA, getBanksData, options);
};

type GetBanksDataQueryType = typeof useGetBanksDataQuery;

const useGetCreditCardsDataQuery = <TData = CreditCardsData>(
  options?: UseQueryOptions<CreditCardsData, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    HOMEPAGE_QUERY_KEYS.GET_CREDIT_CARDS_DATA,
    getCreditCardsData,
    options
  );
};

type GetCreditCardsDataQueryType = typeof useGetBanksDataQuery;

const useGetSankeyDataQuery = <TData = SankeyDataRes>(
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<SankeyDataRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [HOMEPAGE_QUERY_KEYS.GET_SANKEY_DATA, startDate, endDate],
    getSankeyData,
    options
  );
};

export {
  useGetCollectiveBalanceChartDataQuery,
  useGetBanksDataQuery,
  useGetCreditCardsDataQuery,
  useGetSankeyDataQuery,
};

export type { GetBanksDataQueryType, GetCreditCardsDataQueryType };
