import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  BanksDataRes,
  CollectiveBalanceChartRes,
  CreditCardsData,
  LiveBlocksTokenRes,
  SankeyDataRes,
} from "../models";

const REPLACE_PARAMS = {
  orgId: ":orgId",
};

const ENDPOINTS = {
  GET_BALANCE_CHART_DATA: "finance/account/balance",
  GET_BANKS_DATA: "finance/account/balance/card",
  GET_CREDIT_CARDS_DATA: "finance/account/balance/credit",
  GET_LIVE_BLOCK_DATA: `live_auth/${REPLACE_PARAMS.orgId}`,
  GET_SANKEY_DATA: "finance/transaction/category/sankey",
};

const getCollectiveBalanceChartData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<CollectiveBalanceChartRes> => {
  return await API_V1.get(ENDPOINTS.GET_BALANCE_CHART_DATA, {
    params: { startDate, endDate },
  }).then((res) => res.data);
};

const getLiveBlock = async ({
  queryKey: [_id, orgId],
}: QueryFunctionContext<string[]>): Promise<LiveBlocksTokenRes> => {
  return await API_V1.get(
    ENDPOINTS.GET_LIVE_BLOCK_DATA.replace(REPLACE_PARAMS.orgId, orgId)
  ).then((res) => res.data);
};

const getBanksData = async (): Promise<BanksDataRes> => {
  return await API_V1.get(ENDPOINTS.GET_BANKS_DATA).then((res) => res.data);
};

const getCreditCardsData = async (): Promise<CreditCardsData> => {
  return await API_V1.get(ENDPOINTS.GET_CREDIT_CARDS_DATA).then(
    (res) => res.data
  );
};

const getSankeyData = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<SankeyDataRes> => {
  return await API_V1.get(ENDPOINTS.GET_SANKEY_DATA, {
    params: { startDate, endDate },
  }).then((res) => res.data);
};

export {
  getCollectiveBalanceChartData,
  getBanksData,
  getCreditCardsData,
  getLiveBlock,
  getSankeyData,
};

