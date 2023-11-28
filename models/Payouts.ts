import { ChartMetadata } from "../../domain/v1/Chart";

export interface PayoutData {
  amount: number;
  source: string;
  status: string;
  currency?: string;
}

export interface PayoutsResponse {
  data: PayoutData[];
  metadata?: ChartMetadata;
}
