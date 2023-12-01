import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  FacebookAdResponse,
  GoogleAdResponse,
  MarketingMetricChartResponseModel,
} from "models/v1/AdwordsModel";

const ENDPOINTS = {
  GET_AD_WORDS_DATA: "/marketing/google",
  GET_AD_WORDS_TREND: "/marketing/google/chart",
  GET_AD_WORDS_REPORT: "/marketing/google/report",
  GET_FACEBOOK_AD_METRICS: "/marketing/fb",
  GET_FACEBOOK_AD_TREND: "/marketing/fb/chart",
  GET_FACEBOOK_AD_REPORT: "/marketing/fb/report",
};

async function getAdWordsData({ queryKey }: QueryFunctionContext<string[]>) {
  const [, dateWindow] = queryKey;
  return API_V1.get<GoogleAdResponse>(ENDPOINTS.GET_AD_WORDS_DATA, {
    params: { dateWindow },
  }).then((res) => res.data);
}

async function getAdWordsTrend({ queryKey }: QueryFunctionContext<string[]>) {
  const [, aggregation] = queryKey;
  return API_V1.get<MarketingMetricChartResponseModel>(
    ENDPOINTS.GET_AD_WORDS_TREND,
    { params: { aggregation } }
  ).then((res) => res.data);
}

type GetAdWordsIndividualMetricsTrend = [string, string[], string, string];

function getAdWordsIndividualMetricsTrend({
  queryKey,
}: QueryFunctionContext<GetAdWordsIndividualMetricsTrend>) {
  const [, metricKeys, aggregation, period] = queryKey;

  const requests = metricKeys.map((metric) => {
    return API_V1.get<MarketingMetricChartResponseModel>(
      ENDPOINTS.GET_AD_WORDS_REPORT,
      {
        params: { metric, aggregation, period },
      }
    ).then((res) => res.data);
  });

  return Promise.all(requests);
}

async function getFacebookAdMetricsData({
  queryKey,
}: QueryFunctionContext<string[]>) {
  const [, dateWindow] = queryKey;
  return API_V1.get<FacebookAdResponse>(ENDPOINTS.GET_FACEBOOK_AD_METRICS, {
    params: { dateWindow },
  }).then((res) => res.data);
}

async function getFacebookAdsTrend({
  queryKey,
}: QueryFunctionContext<string[]>) {
  const [, aggregation] = queryKey;
  return API_V1.get<MarketingMetricChartResponseModel>(
    ENDPOINTS.GET_FACEBOOK_AD_TREND,
    { params: { aggregation } }
  ).then((res) => res.data);
}

function getFacebookAdsIndividualMetricsTrend({
  queryKey,
}: QueryFunctionContext<GetAdWordsIndividualMetricsTrend>) {
  const [, metricKeys, aggregation, period] = queryKey;

  const requests = metricKeys.map((metric) => {
    return API_V1.get<MarketingMetricChartResponseModel>(
      ENDPOINTS.GET_FACEBOOK_AD_REPORT,
      {
        params: { metric, aggregation, period },
      }
    ).then((res) => res.data);
  });

  return Promise.all(requests);
}

export {
  getAdWordsData,
  getAdWordsTrend,
  getAdWordsIndividualMetricsTrend,
  getFacebookAdMetricsData,
  getFacebookAdsTrend,
  getFacebookAdsIndividualMetricsTrend,
};

