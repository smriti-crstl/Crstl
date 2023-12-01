import { AxiosResponse } from "axios";
import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  GenericApiResponse,
  SlackRecipientRequest,
} from "models/Integration";
import { RampInitiateIntegrationResponseModel } from "models/v1/RampIntegrationModel";

import {
  AMZAuthorizationSearchParams,
  AMZCreateIntegrationModelResponse,
  AMZCreateIntegrationReq,
  AMZInitiateIntegrationResponse,
  GenericQueryStringReq,
  GetBusinessNameRes,
  GetIntegrationSourcesRes,
  GetRailzIntegrationRes,
  InitiateShopifyReq,
  InitiateShopifyRes,
  IntegrateShopifyRes,
  IntegrationStatusModelRes,
  PostIntegrationsReq,
  PostIntegrationsRes,
  PostOAuthIntegrationsClient,
  PostOAuthIntegrationsReq,
  PostPurchaseOrderImportRes,
  PostRedirectionUrlQueryParametersReq,
  QBOCreateIntegrationModelResponse,
  QBOCreateIntegrationReq,
  QBOInitiateIntegrationResponse,
  RampIntegrationSearchParams,
  ReAuthIntegrationListModel,
  SlackChannelItemModel,
  SlackChannelModel,
  SlackInitResponse,
  SlackRecipientData,
  SlackRecipientResponse,
} from "../models";

const REPLACE_PARAMS = {
  ownerId: ":ownerId",
  integrationSourceId: "integrationSourceId",
};

const ENDPOINTS = {
  GET_ALL_INTEGRATIONS: `/organization/${REPLACE_PARAMS.ownerId}/integration_source`,
  GET_INTEGRATION_SOURCES: "/integration_source",
  GET_BUSINESS_NAME: "rz/business",
  GET_RAILZ_INTEGRATIONS: "rz/integrations",
  UPDATE_RAILZ_INTEGRATIONS: "rz/integrations/update",
  POST_INTEGRATIONS: "/integration",
  POST_PURCHASE_ORDER_IMPORT: "/purchase_order_import",
  // new
  POST_INITIATE_INTEGRATION: `/integration/initiate/${REPLACE_PARAMS.integrationSourceId}`,
  POST_REDIRECTION_URL_QUERY_PARAMETERS: `/integration/finalize/${REPLACE_PARAMS.integrationSourceId}`,
  INITIATE_QBO_INTEGRATION: `/qbo/initiate`,
  CREATE_QBO_INTEGRATION: `/qbo/create`,
  INITIATE_AMZ_INTEGRATION: `/amz/integration/initiate`,
  CREATE_AMZ_INTEGRATION: `/amz/integration/complete`,
  INITIATE_SLACK_INTEGRATION: `/slk/initiate`,
  CREATE_SLACK_INTEGRATION: `/slk/create`,
  SLACK_RECIPIENTS: `/slk/recipient`,
  SLACK_CHANNEL_LIST: `/slk/channels`,
  INTEGRATION_STATUS: `/integration/status`,
  GET_RE_AUTH_LIST: `/integration/needs_reauthorization`,
  INITIATE_RAMP_INTEGRATION: `/ramp/initiate`,
  CREATE_RAMP_INTEGRATION: `/ramp/finalize`,
};

const getAllIntegrations = async ({
  queryKey: [_id, ownerId],
}: QueryFunctionContext<string[]>): Promise<GetIntegrationSourcesRes[]> => {
  return await API_V1.get(
    ENDPOINTS.GET_ALL_INTEGRATIONS.replace(REPLACE_PARAMS.ownerId, ownerId)
  ).then((res) => res.data);
};

const getIntegrationSources = async (): Promise<GetIntegrationSourcesRes[]> => {
  return await API_V1.get(ENDPOINTS.GET_INTEGRATION_SOURCES).then(
    (res) => res.data
  );
};

const getBusinessName = async (): Promise<GetBusinessNameRes> => {
  return await API_V1.get(ENDPOINTS.GET_BUSINESS_NAME).then(
    (res) => res.data.business.data
  );
};

const getRailzIntegrations = async (): Promise<GetRailzIntegrationRes> => {
  return await API_V1.get(ENDPOINTS.GET_RAILZ_INTEGRATIONS).then(
    (res) => res.data
  );
};

const updateRailzIntegrations = async (): Promise<GenericApiResponse> => {
  return await API_V1.post(ENDPOINTS.UPDATE_RAILZ_INTEGRATIONS).then(
    (res) => res.data
  );
};

const initateSlackIntegration = async (): Promise<SlackInitResponse> => {
  return await API_V1.post(ENDPOINTS.INITIATE_SLACK_INTEGRATION).then(
    (res) => res.data
  );
};

const createSlackIntegration = async ({
  queryString,
}: GenericQueryStringReq): Promise<GenericApiResponse> => {
  return await API_V1.post(
    `${ENDPOINTS.CREATE_SLACK_INTEGRATION}${queryString}`
  ).then((res) => res.data);
};

const getSlackRecipients = async (): Promise<SlackRecipientData[]> => {
  return await API_V1.get(ENDPOINTS.SLACK_RECIPIENTS).then(
    (res: AxiosResponse<SlackRecipientResponse>) => res.data.data
  );
};

const updateSlackRecipient = async ({
  recipient,
}: SlackRecipientRequest): Promise<GenericApiResponse> => {
  return await API_V1.post(ENDPOINTS.SLACK_RECIPIENTS, {
    recipient,
  }).then((res) => res.data);
};

const getSlackChannelList = async (): Promise<SlackChannelItemModel[]> => {
  return await API_V1.get(ENDPOINTS.SLACK_CHANNEL_LIST).then(
    (res: AxiosResponse<SlackChannelModel>) => res.data.data
  );
};

const postOAuthIntegrationsClient = async ({
  url,
  payload,
}: PostOAuthIntegrationsReq): Promise<PostOAuthIntegrationsClient> => {
  return await API_V1.post(url, payload).then((res) => res.data);
};

const postIntegrations = async (
  payload: PostIntegrationsReq
): Promise<PostIntegrationsRes> => {
  return await API_V1.post(ENDPOINTS.POST_INTEGRATIONS, payload).then(
    (res) => res.data
  );
};

const postPurchaseOrderImport = async (): Promise<PostPurchaseOrderImportRes> => {
  return await API_V1.post(ENDPOINTS.POST_PURCHASE_ORDER_IMPORT).then(
    (res) => res.data
  );
};

// new

const postInitiateIntegration = async ({
  integrationSourceId,
  shop,
  isCustom,
}: InitiateShopifyReq): Promise<InitiateShopifyRes> => {
  return await API_V1.post(
    ENDPOINTS.POST_INITIATE_INTEGRATION.replace(
      REPLACE_PARAMS.integrationSourceId,
      integrationSourceId
    ),
    { shop, isCustom }
  ).then((res) => res.data);
};

const postRedirectionUrlQueryParameters = async ({
  payload,
  queryParams,
}: PostRedirectionUrlQueryParametersReq): Promise<IntegrateShopifyRes> => {
  return await API_V1.post(
    ENDPOINTS.POST_REDIRECTION_URL_QUERY_PARAMETERS.replace(
      REPLACE_PARAMS.integrationSourceId,
      payload.integrationSourceId
    ),
    // Body Params are undefined
    undefined,
    {
      params: queryParams,
    }
  ).then((res) => res.data);
};

const initiateRampIntegration = async () => {
  return API_V1.post<RampInitiateIntegrationResponseModel>(
    ENDPOINTS.INITIATE_RAMP_INTEGRATION
  ).then((res) => res.data);
};

const createRampIntegration = async (params: RampIntegrationSearchParams) => {
  // return new Promise<boolean>((resolve) =>
  //   setTimeout(() => resolve(true), 1000)
  // );
  return API_V1.post<boolean>(ENDPOINTS.CREATE_RAMP_INTEGRATION, null, {
    params,
  }).then((res) => res.data);
};

const initiateQBOIntegration = async (): Promise<QBOInitiateIntegrationResponse> => {
  return await API_V1.post(ENDPOINTS.INITIATE_QBO_INTEGRATION).then(
    (res) => res.data
  );
};

const createQBOIntegration = async ({
  integrationSourceId,
  ...params
}: QBOCreateIntegrationReq): Promise<QBOCreateIntegrationModelResponse> => {
  return await API_V1.post(
    ENDPOINTS.CREATE_QBO_INTEGRATION,
    // Body Params are undefined
    undefined,
    {
      params,
    }
  ).then((res) => res.data);
};

const initiateAMZIntegration = async ({
  amazon_callback_uri,
  amazon_state,
}: AMZAuthorizationSearchParams): Promise<AMZInitiateIntegrationResponse> => {
  return await API_V1.post(ENDPOINTS.INITIATE_AMZ_INTEGRATION, {
    amazon_callback_uri,
    amazon_state,
  }).then((res) => res.data);
};

const createAMZIntegration = async ({
  ...params
}: AMZCreateIntegrationReq): Promise<AMZCreateIntegrationModelResponse> => {
  return await API_V1.post(
    ENDPOINTS.CREATE_AMZ_INTEGRATION,
    // Body Params are undefined
    undefined,
    {
      params,
    }
  ).then((res) => res.data);
};

const getIntegrationStatus = () =>
  API_V1.get<IntegrationStatusModelRes[]>(ENDPOINTS.INTEGRATION_STATUS).then(
    (res) => res.data
  );

const getReAuthList = () =>
  API_V1.get<ReAuthIntegrationListModel>(ENDPOINTS.GET_RE_AUTH_LIST).then(
    (res) => res.data
  );

export {
  ENDPOINTS,
  getIntegrationSources,
  postOAuthIntegrationsClient,
  postIntegrations,
  postPurchaseOrderImport,
  getAllIntegrations,
  //new
  postInitiateIntegration,
  postRedirectionUrlQueryParameters,
  // QBO
  initiateQBOIntegration,
  createQBOIntegration,
  //AMazon
  initiateAMZIntegration,
  createAMZIntegration,
  //Railz
  getBusinessName,
  getRailzIntegrations,
  updateRailzIntegrations,
  //Slack
  initateSlackIntegration,
  createSlackIntegration,
  getSlackRecipients,
  updateSlackRecipient,
  getSlackChannelList,
  getIntegrationStatus,
  getReAuthList,
  //Ramp
  initiateRampIntegration,
  createRampIntegration,
};

export * from "./plaid";

