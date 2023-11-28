import { API_V1 } from "domain/network";

import {
  PlaidAccessTokenReq,
  PlaidAccessTokenRes,
  PlaidIntegrationModelRes,
  PlaidLinkTokenRes,
  PlaidReAuthReq,
  PlaidUpdateAccessTokenReq,
} from "../../models/plaid";

const REPLACE_PARAMS = {
  ownerId: ":ownerId",
  INTEGRATION_ID: ":integrationId",
};

const ENDPOINTS = {
  PLAID_LINK_TOKEN: "/finance/link/token",
  PLAID_ACCESS_TOKEN: "/finance/access/token",
  PLAID_INTEGRATIONS_LIST: `/organization/finance_integration`,
  PLAID_UPDATE_TOKEN_LINK: `/finance/link/token/update/${REPLACE_PARAMS.INTEGRATION_ID}`,
  PLAID_RE_AUTH: `/finance/reauthorize/${REPLACE_PARAMS.INTEGRATION_ID}`,
};

const postPlaidLinkToken = async (): Promise<PlaidLinkTokenRes> => {
  return await API_V1.post(ENDPOINTS.PLAID_LINK_TOKEN).then((res) => res.data);
};

const postPlaidAccessToken = async (
  payload: PlaidAccessTokenReq
): Promise<PlaidAccessTokenRes> => {
  return await API_V1.post(ENDPOINTS.PLAID_ACCESS_TOKEN, payload).then(
    (res) => res.data
  );
};

const getPlaidIntegrationsList = async (): Promise<
  PlaidIntegrationModelRes[]
> => {
  return await API_V1.get(ENDPOINTS.PLAID_INTEGRATIONS_LIST).then(
    (res) => res.data.data
  );
};

const postPlaidUpdateAccessToken = async ({
  integrationId,
  ...payload
}: PlaidUpdateAccessTokenReq): Promise<PlaidAccessTokenRes> => {
  return await API_V1.post(
    ENDPOINTS.PLAID_UPDATE_TOKEN_LINK.replace(
      REPLACE_PARAMS.INTEGRATION_ID,
      integrationId || ""
    ),
    payload
  ).then((res) => res.data);
};

const postPlaidReAuth = async ({
  integrationId,
  ...payload
}: PlaidReAuthReq): Promise<any> => {
  return await API_V1.put(
    ENDPOINTS.PLAID_RE_AUTH.replace(
      REPLACE_PARAMS.INTEGRATION_ID,
      integrationId || ""
    ),
    payload
  ).then((res) => res.data);
};

export {
  ENDPOINTS,
  postPlaidLinkToken,
  postPlaidAccessToken,
  getPlaidIntegrationsList,
  postPlaidUpdateAccessToken,
  postPlaidReAuth,
};

