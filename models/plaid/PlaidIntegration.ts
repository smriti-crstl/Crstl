import { ChartMetadata } from "../../../domain/v1/Chart";

export interface PlaidLinkTokenModel {
  code: string;
  data: {
    expiration: string;
    link_token: string;
    request_id: string;
  }; // {uri: string, integrationLogId: string}
}

export interface PlaidCreateIntegrationModel {
  code: string;
  data: boolean;
}

export interface PlaidIntegrationsModel {
  code: string;
  data: SinglePlaidIntegrationModel[];
}

export interface SinglePlaidIntegrationModel {
  integrationId: string;
  createdBy: string;
  createdAt: string;
  isEnabled: boolean;
  institutionId: string;
  institutionName: string;
  needsReAuthorization: boolean;
}

export interface PlaidUpdateIntegrationModel {
  code: string;
  data: boolean;
}
export interface HomepageChartResponseModel {
  lastUpdatedAt?: string;
  total?: number;
  color?: string;
  bgColor?: string;
  id: string;
  data: Array<{ x: any; y: any }>;
}

// export interface HomepageCardResponseModel {
//   bgColor: string;
//   color: string;
//   accountNumber: string;
//   name: string;
//   accountName: string;
//   balance: number;
// }

export interface HomepageCardResponseModel {
  bgColor: string;
  color: string;
  accountNumber: string;
  name: string;
  accountName: string;
  balance: number;
}

export interface HomepageCreditCardResponseModel {
  bgColor: string;
  color: string;
  accountNumber: string;
  name: string;
  accountName: string;
  balance: number;
  limit: number;
}

export interface ChartResponseModel {
  lastUpdatedAt: any;
  data: Array<{
    lastUpdatedAt?: string;
    total?: number;
    color?: string;
    bgColor?: string;
    id: string;
    data: Array<{ x: any; y: any }>;
  }>;
}

export interface CardResponseModel {
  lastUpdatedAt: any;
  data: Array<{
    bgColor: string;
    color: string;
    accountNumber: string;
    name: string;
    accountName: string;
    balance: number;
    currency?: string;
  }>;
  metadata?: ChartMetadata;
}

export interface CreditCardResponseModel {
  lastUpdatedAt: any;
  data: Array<{
    bgColor: string;
    color: string;
    name: string;
    balance?: number;
    accountName?: string;
    accountNumber?: string;
    limit?: number;
    countOfRampCards?: number;
    message?: string;
    currency?: string;
  }>;
  metadata?: ChartMetadata;
}
export interface HomepageChartQueryModel {
  startDate?: string;
  endDate?: string;
}
