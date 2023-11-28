import { ChartMetadata } from "../../../domain/v1/Chart";

export interface PaymentDetailModel {
  total: string | null;
  data: {
    type: string;
    key: string;
    totalAmount: string | null;
    dueDate: string | null;
    currency: string | null;
    customer: string | null;
  }[];
  metadata: ChartMetadata;
}
