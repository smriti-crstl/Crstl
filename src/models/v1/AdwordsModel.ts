import { ChartMetadata } from "../../../domain/v1/Chart";

export interface AdwordsModel {
  metricKey: string;
  label: string;
  value: number | null;
  change: number | string;
  borderColor: string;
  format?: string;
  currency?: string;
}

export interface MarketingMetricModel {
  metricKey: string;
  label: string;
  value: number | null;
  change: number | string;
  borderColor: string;
  format?: string;
  currency?: string;
}

export interface MarketingMetricChartResponseModel {
  lastUpdatedAt: string | null;
  data: Array<MarketingMetricChartModel>;
  metadata?: ChartMetadata;
}

export interface MarketingMetricChartModel {
  id: string;
  color: string;
  data: Array<{ x: string; y: number }>;
  format: string;
}

export interface GoogleAdResponse {
  data: Array<AdwordsModel>;
  metadata?: ChartMetadata;
  lastUpdatedAt: string | null;
}

export interface FacebookAdResponse {
  data: Array<AdwordsModel>;
  metadata?: ChartMetadata;
  lastUpdatedAt: string | null;
}

export enum dateWindowValues {
  d1 = "d1",
  d7 = "d7",
  d30 = "d30",
  d60 = "d60",
  d90 = "d90"
}

export enum aggregationValues {
  monthly = "monthly",
  daily = "daily"
}
