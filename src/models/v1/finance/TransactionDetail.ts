import { ChartMetadata } from "../../../../domain/v1/Chart";

export interface TransactionDetailModel {
  total: string | null;
  data: {
    id: number;
    type: string;
    key: string;
    amount: string | null;
    date: string | null;
    currency: string | null;
    counterparty: string | null;
  }[];
  metadata: ChartMetadata;
}
