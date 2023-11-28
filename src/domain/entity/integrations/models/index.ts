import {
  CombinedIntegrationSourceModel,
  InitiateShopifyRequest,
  InitiateShopifyResponse,
  IntegrateShopifyQueryRequest,
  IntegrateShopifyResponse,
  IntegrationModel,
  BusinessNameResponse,
  RailzIntegrationResponse,
  GenericQueryStringRequest,
} from "@crstl/api/src/apis/models/Integration";
import {
  QBOCreateIntegrationModel,
  QBOInitiateIntegrationModel,
} from "@crstl/api/src/apis/models/qbo/QBOIntegration";
import { AMZInitiateIntegrationModel } from "@crstl/api/src/apis/models/amz/AMZIntegration";
import { SlackInitiateIntegrationModel } from "@crstl/api/src/apis/models/Slack";
// ! TODO: TAMAN / BACKEND : Add id in IntegrationSourceModel
// ! TODO: TAMAN / BACKEND : PostIntegrationsRes verify the response model
// ! TODO: TAMAN / BACKEND : PostPurchaseOrderImportRes verify the response model
export type IntegrationSourceModelExtended = CombinedIntegrationSourceModel & {
  lastReAuthedAt: string;
  lastReAuthedBy: string;
  assistedIntegration: boolean;
};

export type GetIntegrationSourcesRes = IntegrationSourceModelExtended;
export type GetBusinessNameRes = BusinessNameResponse;
export type GetRailzIntegrationRes = RailzIntegrationResponse;
export type PostOAuthIntegrationsClient = Record<string, unknown>;
export type PostOAuthIntegrationsReq = {
  url: string;
  payload: Record<string, unknown>;
};

export type PostIntegrationsReq = IntegrationModel;
export type PostIntegrationsRes = IntegrationSourceModelExtended;

export type PostPurchaseOrderImportRes = Record<string, unknown>;

export {
  IntegrationTypeModel as IntegrationTypes,
  IntegrationKeyModel as IntegrationKeyModelFE,
} from "@crstl/api/src/apis/models/Integration";

// new

export type InitiateShopifyReq = InitiateShopifyRequest & {
  integrationSourceId: string;
};
export type InitiateShopifyRes = InitiateShopifyResponse;

export type IntegrateShopifyRes = IntegrateShopifyResponse;
// type IntegrateShopifyReq = IntegrateShopifyRequest;
type IntegrateShopifyReq = {
  integrationSourceId: string;
};

export type IntegrateShopifyQueryReq = IntegrateShopifyQueryRequest;

export type PostRedirectionUrlQueryParametersReq = {
  payload: IntegrateShopifyReq;
  queryParams: IntegrateShopifyQueryReq;
};

export type QBOInitiateIntegrationResponse = QBOInitiateIntegrationModel;
export type QBOCreateIntegrationModelResponse = QBOCreateIntegrationModel;
export type QBOCreateIntegrationReq = {
  code: string;
  state: string;
  realmId: string;
  integrationLogId: string;
  integrationSourceId: string;
};
export type QBOCreateIntegrationReqQueryParams = Omit<
  QBOCreateIntegrationReq,
  "integrationLogId"
>;

export type AMZInitiateIntegrationResponse = AMZInitiateIntegrationModel;
export type AMZCreateIntegrationModelResponse = AMZInitiateIntegrationModel;
export type AMZCreateIntegrationReq = {
  spapi_oauth_code: string;
  state: string;
  selling_partner_id: string;
  integrationLogId: string;
};
export type AMZCreateIntegrationReqQueryParams = Omit<
  AMZCreateIntegrationReq,
  "integrationLogId"
>;
export type AMZAuthorizationSearchParams = {
  amazon_callback_uri?: string;
  amazon_state?: string;
};

export type RailzConnectSearchParams = {
  railz_connect?: boolean;
};

export type SlackIntegrationSearchParams = {
  code: string;
  state: string;
};

export type RampIntegrationSearchParams = {
  code: string;
  state: string;
  integrationLogId: string | undefined;
};

export type SlackInitResponse = SlackInitiateIntegrationModel;
export type GenericQueryStringReq = GenericQueryStringRequest;
export type SlackRecipientData = {
  id: string;
  name: string;
};
export type SlackRecipientResponse = {
  code: string;
  data: SlackRecipientData[];
};

export * from "./plaid";
export type {
  SlackChannelModel,
  SlackChannelItemModel,
} from "@crstl/api/src/apis/models/v1/slack/SlackIntegration";

export type { ReAuthIntegrationListModel } from "@crstl/api/src/apis/models/v1/integration/ReAuthIntegrationList";

export interface IntegrationStatusModelRes {
  addedBy: string;
  currentStatus: "NotOK" | "OK";
  firstAddedAt: string;
  imageUrl: string;
  integrationType: string;
  lastReAuthorizedAt: string;
  lastReAuthorizedBy: string;
  lastUpdatedAt: string;
  source: string;
}
