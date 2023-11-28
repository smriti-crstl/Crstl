import { ChartMetadata } from "../../domain/v1/Chart";

export interface APAgingReportSeries {
  vendor: string;
  current: number;
  due1to30: number;
  due31To60: number;
  due61To90: number;
  dueMoreThan90: number;
  total: number;
}

export interface APAgingReportResponse {
  data: Array<APAgingReportSeries>;
  lastUpdatedAt: string | undefined;
  metadata?: ChartMetadata;
}
