import { API_V1, API_V2 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  AdvancedSearchDocsRes,
  AdvancedSearchDocsType,
  InvitedUserFe,
  OrgTradingPartnerDocsRes,
  OrgTradingPartnerRes,
  SearchTradingPartnerRes,
  UserDetailsRes,
  UserResponse,
} from "../models";

const REPLACEABLE_CONSTANTS = {
  organizationId: "organizationId",
};

const ENDPOINTS = {
  GET_USER_DETAILS: "/user",
  GET_USER_TEAM: `/user/team/${REPLACEABLE_CONSTANTS.organizationId}`,
  GET_USER_INVITEES: "/user/invitees",
  GET_TRADING_PARTNERS: "/edi/trading-partners",
  GET_SEARCH_TRADING_PARTNERS: "/edi/search/trading-partners",
  GET_TRADING_PARTNER_DOCUMENTS: "/edi/trading-partner-documents",
  GET_ADVANCED_SEARCH_DOCUMENTS: "/edi/search/documents",
};

const getUserDetails = async (): Promise<any> => {
  return await API_V2.get(ENDPOINTS.GET_USER_DETAILS).then((res) => {
    const item = res.data.data as UserResponse;
    return {
      fullName: item.full_name,
      email: item.email,
      id: item.id,
      organizationId: item.organization_id,
      organizationName: item.organization_name,
      role: item.role,
      jobFunction: item.job_function,
      createdAt: item.created_at,
      isRegistered: item.is_registered,
      isActive: item.is_active,
      emailDomain: item.email_domain,
      lastSignInTime: item.last_sign_in_time,
      lastActiveAt: item.last_active_at,
      timezone: item.timezone,
      altLabel: item.alt_label,
      timezoneId: item.timezone_id,
      authAppId: item.auth_app_id,
      deletedAt: item.deleted_at,
    };
  });
};

const getTradingPartners = async (): Promise<OrgTradingPartnerRes> => {
  return await API_V1.get(ENDPOINTS.GET_TRADING_PARTNERS).then(
    (res) => res.data
  );
};

const getSearchTradingPartners = async ({
  queryKey: [_id, searchKey],
}: QueryFunctionContext<string[]>): Promise<SearchTradingPartnerRes> => {
  return await API_V1.get(ENDPOINTS.GET_SEARCH_TRADING_PARTNERS, {
    params: {
      searchKey,
    },
  }).then((res) => res.data);
};

const getTradingPartnerDocuments = async ({
  queryKey: [_id, tradingPartnerId],
}: QueryFunctionContext<string[]>): Promise<OrgTradingPartnerDocsRes> => {
  return await API_V1.get(ENDPOINTS.GET_TRADING_PARTNER_DOCUMENTS, {
    params: {
      tradingPartnerId,
    },
  }).then((res) => res.data);
};

const getUserTeam = async ({
  queryKey: [_id, organizationId],
}: QueryFunctionContext<string[]>): Promise<UserDetailsRes[]> => {
  return await API_V1.get(
    ENDPOINTS.GET_USER_TEAM.replace(
      REPLACEABLE_CONSTANTS.organizationId,
      organizationId
    )
  ).then((res) => res.data);
};

const getUserInvitees = async ({
  queryKey: [_id],
}: QueryFunctionContext<string[]>): Promise<InvitedUserFe[]> => {
  return await API_V1.get(ENDPOINTS.GET_USER_INVITEES).then(
    (res) => res.data?.data
  );
};

const getAdvancedSearchDocuments = async ({
  queryKey: [_id, searchData],
}: QueryFunctionContext<
  [string, AdvancedSearchDocsType]
>): Promise<AdvancedSearchDocsRes> => {
  return await API_V1.post(
    ENDPOINTS.GET_ADVANCED_SEARCH_DOCUMENTS,
    searchData
  ).then((res) => res.data.data);
};

export {
  getUserDetails,
  getUserTeam,
  getUserInvitees,
  getTradingPartners,
  getSearchTradingPartners,
  getTradingPartnerDocuments,
  getAdvancedSearchDocuments,
};

