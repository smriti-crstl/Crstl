import {
  CardResponseModel,
  HomepageChartQueryModel,
  ChartResponseModel,
  CreditCardResponseModel,
} from "@crstl/api/src/apis/models/plaid/PlaidIntegration";
import { LiveBlocksTokenResponse } from "@crstl/api/src/apis/models/LiveBlock";
import { SankeyDataResponseModel } from "@crstl/api/src/apis/models/v1/Sankey";
import { Metadata } from "domain/entity/shared/models/metadata";

export type CollectiveBalanceChartRes = ChartResponseModel & Metadata;
export type CollectiveBalanceChartDataSetModel = any;
export type CollectiveBalanceChartTransformedData = {
  total?: number;
  lastUpdatedAt?: string;
  chartData?: Array<{
    id: string;
    data: CollectiveBalanceChartDataSetModel;
  }>;
};
export type CollectiveBalanceChartQueryReq = HomepageChartQueryModel;

export type BanksDataRes = CardResponseModel;
export type CreditCardsData = CreditCardResponseModel;
export type LiveBlocksTokenRes = LiveBlocksTokenResponse;
export type SankeyDataRes = SankeyDataResponseModel & Metadata;
