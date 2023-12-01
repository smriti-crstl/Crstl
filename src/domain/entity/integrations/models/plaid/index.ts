import {
  PlaidIntegrationsModel,
  PlaidLinkTokenModel,
  SinglePlaidIntegrationModel,
} from "models/plaid/PlaidIntegration";

export type PlaidLinkTokenRes = PlaidLinkTokenModel;
export type PlaidAccessTokenRes = unknown;
export type PlaidAccessTokenReq = {
  publicToken: string;
  metadata: any;
};

export type PlaidUpdateAccessTokenReq = {
  integrationId: string;
};

export type PlaidReAuthReq = {
  integrationId: string;
  publicToken: string;
  metadata: any;
};

export type PlaidIntegrationsRes = PlaidIntegrationsModel;
export type PlaidIntegrationModelRes = SinglePlaidIntegrationModel & {
  lastReAuthedAt: string;
  lastReAuthedBy: string;
};
