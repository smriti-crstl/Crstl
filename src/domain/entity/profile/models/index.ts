import {
  OrganizationModel,
  OrganizationUpdateRequest,
  OrganizationUpdateResponse,
} from "@crstl/api/src/apis/models/Organization";
import {
  UserActivateQueryRequest,
  UserActivateResponse,
  UserUpdateJobFunctionRequest,
  UserUpdateJobFunctionResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from "@crstl/api/src/apis/models/User";
import { USTimezoneModelResponse } from "@crstl/api/src/apis/models/UsTimezones";
import { AddressModel } from "@crstl/api/src/apis/models/ValueTypes";

// Profile Details Update
export type UserUpdateProfileDetailsReq = UserUpdateRequest;
export type UserUpdateProfileDetailsRes = UserUpdateResponse;

// Company Details GET
export type UserGetOrganizationDetailsRes = OrganizationModel;
// Common Address Model
export type AddressModelFE = AddressModel;
// Update Company Details
export type UserUpdateOrganizationDetailsReq = OrganizationUpdateRequest;
export type UserUpdateOrganizationDetailsReqTransformed = {
  payload: OrganizationUpdateRequest;
  organizationId: string;
};
export type UserUpdateOrganizationDetailsRes = OrganizationUpdateResponse;

// GET Timezones

export type USTimezoneModelRes = Array<USTimezoneModelResponse>;
// Transform Timezones
export type USTimezoneModelTransformed = {
  label: string;
  value: string;
  altLabel: string;
}[];

export type ActivateOrDeactivateTeamUsersReq = UserActivateQueryRequest & {
  userId: string;
  organizationId: string;
};
export type ActivateOrDeactivateTeamUsersRes = UserActivateResponse;

export type UserUpdateTeamUserDetailsReq = UserUpdateJobFunctionRequest & {
  userId: string;
  organizationId: string;
};
export type UserUpdateTeamUserDetailsRes = UserUpdateJobFunctionResponse;

