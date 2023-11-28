import { API_V1, API_V2, API_V2_WITHOUT_INTERCEPTORS } from "domain/network";

import {
  CreateUserFromInviteReqPayload,
  CreateUserFromInviteRes,
  UserChangePasswordReq,
  UserInvitationReq,
  UserLoginReq,
  UserLoginRes,
  UserResetPasswordReq,
} from "../models";

const ENDPOINTS = {
  LOGIN: "/auth/token",
  CHANGE_PASSWORD: "/user/change_password",
  INVITE_USER: "/invite_user",
  INVITEE_SIGN_UP: "/user/invitee/signup",
  VERIFY_USER: "/support/verify-user",
  RESET_PASSWORD: "/user/password/reset",
  GET_ORGANIZATIONS: "/user/organizations",
  POST_ORGANIZATION: "/user/org-token",
};

const postUserLogin = async (payload: UserLoginReq): Promise<UserLoginRes> => {
  return await API_V2_WITHOUT_INTERCEPTORS.post(ENDPOINTS.LOGIN, payload).then(
    (res) => res.data
  );
};

const putUserChangePassword = async (
  payload: UserChangePasswordReq
): Promise<unknown> => {
  return await API_V1.put(ENDPOINTS.CHANGE_PASSWORD, payload).then(
    (res) => res.data
  );
};

const postInviteUser = async (payload: UserInvitationReq): Promise<unknown> => {
  return await API_V1.post(ENDPOINTS.INVITE_USER, payload).then(
    (res) => res.data
  );
};

const postCreateUserFromInviteRequest = async ({
  payload,
  params,
}: CreateUserFromInviteReqPayload): Promise<CreateUserFromInviteRes> => {
  return await API_V1.post(ENDPOINTS.INVITEE_SIGN_UP, payload, { params }).then(
    (res) => res.data
  );
};

const verifyUser = async () => {
  return await API_V1.post(ENDPOINTS.VERIFY_USER).then((res) => res.data);
};

const putUserResetPassword = async (
  payload: UserResetPasswordReq
): Promise<unknown> => {
  return await API_V1.put(ENDPOINTS.RESET_PASSWORD, payload).then(
    (res) => res.data
  );
};

// it takes org-less token and returns orgs
const getOrganizations = async () => {
  return await API_V2.get(ENDPOINTS.GET_ORGANIZATIONS).then((res) => res.data);
};

const switchOrganization = async (payload: any) => {
  return await API_V2.post(ENDPOINTS.POST_ORGANIZATION, payload).then(
    (res) => res.data
  );
};

export {
  postUserLogin,
  putUserChangePassword,
  postInviteUser,
  postCreateUserFromInviteRequest,
  verifyUser,
  putUserResetPassword,
  getOrganizations,
  switchOrganization,
};

