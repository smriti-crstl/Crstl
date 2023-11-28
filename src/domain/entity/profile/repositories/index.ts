import { AxiosResponse } from "axios";
import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  ActivateOrDeactivateTeamUsersReq,
  ActivateOrDeactivateTeamUsersRes,
  UserGetOrganizationDetailsRes,
  UserUpdateOrganizationDetailsReqTransformed,
  UserUpdateOrganizationDetailsRes,
  UserUpdateProfileDetailsReq,
  UserUpdateProfileDetailsRes,
  UserUpdateTeamUserDetailsReq,
  UserUpdateTeamUserDetailsRes,
  USTimezoneModelRes,
  USTimezoneModelTransformed,
} from "../models";

const REPLACE_PARAMS = {
  organizationId: ":orgId",
  userId: "userId",
};

const ENDPOINTS = {
  UPDATE_USER: "/user",
  GET_ORGANIZATION_DETAILS: `/organization/${REPLACE_PARAMS.organizationId}`,
  GET_USER_TIMEZONES: "/timezone",
  PUT_ORGANIZATION_DETAILS: `/organization/${REPLACE_PARAMS.organizationId}`,
  PUT_ACTIVATE_OR_DEACTIVATE_TEAM_USER: `/user/activate/${REPLACE_PARAMS.userId}`,
  PUT_UPDATE_TEAM_USERS_DETAILS: `/user/user-details/${REPLACE_PARAMS.userId}`,
};

const putUserProfileDetails = async (
  payload: UserUpdateProfileDetailsReq
): Promise<UserUpdateProfileDetailsRes> => {
  return await API_V1.put(ENDPOINTS.UPDATE_USER, payload).then(
    (res) => res.data
  );
};

const getUserOrganizationDetails = async ({
  queryKey: [_id, organizationId],
}: QueryFunctionContext<string[]>): Promise<UserGetOrganizationDetailsRes> => {
  return await API_V1.get(
    ENDPOINTS.GET_ORGANIZATION_DETAILS.replace(
      REPLACE_PARAMS.organizationId,
      organizationId
    )
  ).then((res) => res.data);
};

const getUserTimezones = async (
  _args: QueryFunctionContext<string[]>
): Promise<USTimezoneModelTransformed> => {
  return await API_V1.get(ENDPOINTS.GET_USER_TIMEZONES).then(
    ({ data }: AxiosResponse<USTimezoneModelRes>) => {
      return data.map((item) => ({
        label: item.timezone,
        value: item.id,
        altLabel: item.altLabel,
      }));
    }
  );
};

const putOrganizationDetailsQuery = async ({
  organizationId,
  payload,
}: UserUpdateOrganizationDetailsReqTransformed): Promise<UserUpdateOrganizationDetailsRes> => {
  return await API_V1.put(
    ENDPOINTS.PUT_ORGANIZATION_DETAILS.replace(
      REPLACE_PARAMS.organizationId,
      organizationId
    ),
    payload
  ).then((res) => res.data);
};

const putActivateDeactivateTeamUser = async ({
  userId,
  organizationId,
  ...queryParams
}: ActivateOrDeactivateTeamUsersReq): Promise<ActivateOrDeactivateTeamUsersRes> => {
  return await API_V1.put(
    ENDPOINTS.PUT_ACTIVATE_OR_DEACTIVATE_TEAM_USER.replace(
      REPLACE_PARAMS.userId,
      userId
    ),
    // No body param to be passed
    undefined,
    {
      params: queryParams,
    }
  ).then((res) => res.data);
};

const putUpdateTeamUserDetails = async ({
  userId,
  organizationId,
  ...bodyPayload
}: UserUpdateTeamUserDetailsReq): Promise<UserUpdateTeamUserDetailsRes> => {
  return await API_V1.put(
    ENDPOINTS.PUT_UPDATE_TEAM_USERS_DETAILS.replace(
      REPLACE_PARAMS.userId,
      userId
    ),
    bodyPayload
  ).then((res) => res.data);
};

export {
  putUserProfileDetails,
  getUserOrganizationDetails,
  getUserTimezones,
  putOrganizationDetailsQuery,
  // Teams APIs
  putActivateDeactivateTeamUser,
  putUpdateTeamUserDetails,
};

