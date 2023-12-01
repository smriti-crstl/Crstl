import { AxiosError } from "axios";
import {
  GoogleAdResponse,
  FacebookAdResponse,
  MarketingMetricChartResponseModel,
} from "models/v1/AdwordsModel";
import {
  getAdWordsData,
  getAdWordsIndividualMetricsTrend,
  getAdWordsTrend,
  getFacebookAdMetricsData,
  getFacebookAdsTrend,
  getFacebookAdsIndividualMetricsTrend,
} from "domain/entity/marketing";
import { useQuery, UseQueryOptions } from "react-query";

const MARKETING_QUERIES = {
  GET_AD_WORDS_DATA: "GET_AD_WORDS_DATA",
  GET_AD_WORDS_TREND: "GET_AD_WORDS_TREND",
  GET_AD_WORDS_INDIVIDUAL_METRICS_TREND:
    "GET_AD_WORDS_INDIVIDUAL_METRICS_TREND",
  GET_FACEBOOK_AD_METRICS: "GET_FACEBOOK_AD_METRICS",
  GET_FACEBOOK_AD_TREND: "GET_FACEBOOK_AD_TREND",
  GET_FACEBOOK_ADS_INDIVIDUAL_METRICS_TREND:
    "GET_FACEBOOK_ADS_INDIVIDUAL_METRICS_TREND",
};

function useGetAdWordsData(
  dateWindow: string,
  options?: UseQueryOptions<GoogleAdResponse, AxiosError>
) {
  return useQuery(
    [MARKETING_QUERIES.GET_AD_WORDS_DATA, dateWindow],
    getAdWordsData,
    options
  );
}

function useGetAdWordsTrend(
  aggregation?: string,
  options?: UseQueryOptions<MarketingMetricChartResponseModel, AxiosError>
) {
  return useQuery(
    [MARKETING_QUERIES.GET_AD_WORDS_TREND, aggregation],
    getAdWordsTrend,
    options
  );
}

type GetAdWordsIndividualMetricsTrendArgs = {
  metricKeys?: string[];
  aggregation?: string;
  period?: string;
  options?: UseQueryOptions<MarketingMetricChartResponseModel[], AxiosError>;
};

function useGetAdWordsIndividualMetricsTrend({
  metricKeys,
  aggregation,
  period,
  options,
}: GetAdWordsIndividualMetricsTrendArgs) {
  return useQuery(
    [
      MARKETING_QUERIES.GET_AD_WORDS_INDIVIDUAL_METRICS_TREND,
      metricKeys,
      aggregation,
      period,
    ],
    getAdWordsIndividualMetricsTrend,
    options
  );
}

function useGetFacebookAdMetrics(
  dateWindow: string,
  options?: UseQueryOptions<FacebookAdResponse, AxiosError>
) {
  return useQuery(
    [MARKETING_QUERIES.GET_FACEBOOK_AD_METRICS, dateWindow],
    getFacebookAdMetricsData,
    options
  );
}

function useGetFacebookIndividualMetricsTrend({
  metricKeys,
  aggregation,
  period,
  options,
}: GetAdWordsIndividualMetricsTrendArgs) {
  return useQuery(
    [
      MARKETING_QUERIES.GET_FACEBOOK_ADS_INDIVIDUAL_METRICS_TREND,
      metricKeys,
      aggregation,
      period,
    ],
    getFacebookAdsIndividualMetricsTrend,
    options
  );
}

function useGetFacebookAdsTrend(
  aggregation?: string,
  options?: UseQueryOptions<MarketingMetricChartResponseModel, AxiosError>
) {
  return useQuery(
    [MARKETING_QUERIES.GET_FACEBOOK_AD_TREND, aggregation],
    getFacebookAdsTrend,
    options
  );
}

export {
  useGetAdWordsData,
  useGetAdWordsTrend,
  useGetAdWordsIndividualMetricsTrend,
  useGetFacebookAdMetrics,
  useGetFacebookAdsTrend,
  useGetFacebookIndividualMetricsTrend,
};
