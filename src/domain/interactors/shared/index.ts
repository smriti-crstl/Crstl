import { AxiosError } from "axios";
import {
  AdvancedSearchDocsRes,
  AdvancedSearchDocsType,
  InvitedUserFe,
  OrgTradingPartnerDocsRes,
  OrgTradingPartnerRes,
  SearchTradingPartnerRes,
  UserDetailsRes,
} from "domain/entity/shared/models";
import {
  getAdvancedSearchDocuments,
  getSearchTradingPartners,
  getTradingPartnerDocuments,
  getTradingPartners,
  getUserDetails,
  getUserInvitees,
  getUserTeam,
} from "domain/entity/shared/repositories";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

const SHARED_QUERY_KEYS = {
  USER_DETAILS: "USER_DETAILS",
  USER_TEAM: "USER_TEAM",
  USER_INVITEES: "USER_INVITEES",
  ORG_TRADING_PARTNERS: "ORG_TRADING_PARTNERS",
  SEARCH_TRADING_PARTNERS: "SEARCH_TRADING_PARTNERS",
  ADVANCED_SEARCH_DOCUMENTS: "ADVANCED_SEARCH_DOCUMENTS",
};

const useUserDetailsQuery = <TData = UserDetailsRes>(
  options?: UseQueryOptions<UserDetailsRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(SHARED_QUERY_KEYS.USER_DETAILS, getUserDetails, options);
};

const useUserTeamQuery = <TData = UserDetailsRes[]>(
  organizationId: string,
  options?: UseQueryOptions<UserDetailsRes[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [SHARED_QUERY_KEYS.USER_TEAM, organizationId],
    getUserTeam,
    options
  );
};

const useUserInviteesQuery = <TData = InvitedUserFe[]>(
  options?: UseQueryOptions<InvitedUserFe[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery([SHARED_QUERY_KEYS.USER_INVITEES], getUserInvitees, options);
};

export const useGetTradingPartners = <TData = OrgTradingPartnerRes>(
  options?: UseQueryOptions<OrgTradingPartnerRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    SHARED_QUERY_KEYS.ORG_TRADING_PARTNERS,
    getTradingPartners,
    options
  );
};

export const useGetSearchTradingPartners = <TData = SearchTradingPartnerRes>(
  params?: {
    searchKey: string;
  },
  options?: UseQueryOptions<SearchTradingPartnerRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [SHARED_QUERY_KEYS.SEARCH_TRADING_PARTNERS, params?.searchKey],
    getSearchTradingPartners,
    options
  );
};

export const useGetTradingPartnerDocuments = <TData = OrgTradingPartnerDocsRes>(
  tradingPartnerId: string,
  options?: UseQueryOptions<OrgTradingPartnerDocsRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [SHARED_QUERY_KEYS.ORG_TRADING_PARTNERS, tradingPartnerId],
    getTradingPartnerDocuments,
    options
  );
};

export const useGetAdvancedSearchDocuments = <TData = AdvancedSearchDocsRes>(
  searchData?: AdvancedSearchDocsType,
  options?: UseQueryOptions<AdvancedSearchDocsRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [SHARED_QUERY_KEYS.ADVANCED_SEARCH_DOCUMENTS, searchData],
    getAdvancedSearchDocuments,
    options
  );
};

export {
  useUserDetailsQuery,
  SHARED_QUERY_KEYS,
  useUserTeamQuery,
  useUserInviteesQuery,
};

