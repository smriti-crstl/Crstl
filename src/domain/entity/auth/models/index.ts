import { InviteUserRequest } from "@crstl/api/src/apis/models/Invitation";
import {
  UserCreateFromInviteRequest,
  UserLogin,
  UserUpdate,
} from "@crstl/api/src/apis/models/User";

export type UserLoginReq = UserLogin;

// TODO: Ask backend for UserLoginRes interface

export type UserLoginRes = {
  access_token: string;
  refresh_token: string;
  role?: string;
  is_multi_org: boolean;
  organization_id?: string;
};

// Making change password model using UserUpdate
export type UserChangePasswordReq = Pick<
  UserUpdate,
  "confirmPassword" | "password"
>;

export type UserResetPasswordReq = {
  email: string;
};

export type UserInvitationReq = InviteUserRequest;

export type CreateUserFromInviteReq = UserCreateFromInviteRequest;

export interface UserCreateFromInviteResponse {
  token: string;
  refreshToken: string;
  isMultiOrg: boolean;
  role: string;
  organizationId: string;
}

export type CreateUserFromInviteRes = UserCreateFromInviteResponse;

export type CreateUserFromInviteReqPayload = {
  payload: UserCreateFromInviteRequest;
  params: {
    token: string;
  };
};

export type GetOrganizationsRes = {
  status: string;
  code: number;
  data: Array<{
    name: string;
    id: string;
  }>;
};

