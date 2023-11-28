import { ChartMetadata } from "../../domain/v1/Chart";

export interface ARAgingReportSeries {
  customer: string;
  current: number;
  due1to30: number;
  due31to60: number;
  due61to90: number;
  dueMoreThan90: number;
  total: number;
}

export interface ARAgingReportResponse {
  data: Array<ARAgingReportSeries>;
  lastUpdatedAt: string | undefined;
  metadata?: ChartMetadata;
}
