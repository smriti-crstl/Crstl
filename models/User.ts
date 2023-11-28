//import { AddressModel } from "./ValueTypes";

export enum JobFunctions {
  Operations = "Operations",
  Finance = "Finance",
  Accounting = "Accounting",
  Customer_Service = "Customer Service",
  Sales = "Sales",
  Other = "Other"
}
export enum Role {
  Member = "Member",
  Admin = "Admin",
  Third_Party_Logistics = "Third_Party_Logistics",
  Intake = "Intake"
}

export enum Status {
  Active = "Active",
  Deactivated = "Deactivated"
}
export interface UserModel {
  fullName: string;
  email: string;
  // readonly username: string;
  readonly createdAt: Date;
  readonly id: string;
  organizationId: string;
  organizationName: string;
  emailDomain: string;
  jobFunction: JobFunctions;
  role: Role;
  isActive: boolean;
  isRegistered: boolean;
  timezone: string;
  altLabel: string;
  timezoneId: string;
  lastSignInTime: string;
  imageUrl: string;
  lastActiveAt: string;
}

export interface UserUpdate {
  fullName: string;
  password: string;
  confirmPassword: string;
  jobFunction: JobFunctions;
  jobRole?: Role;
}

export interface UserUpdateJobFunctionRequest {
  jobFunction?: JobFunctions;
  jobRole?: Role;
}

export interface UserUpdateJobFunctionResponse {
  message: string;
}

export interface UserActivateQueryRequest {
  isActive: string;
}

export interface UserActivateResponse {
  message: string;
}

export interface UserUpdateRequest {
  fullName?: string;
  jobFunction?: string;
}

export interface UserUpdateResponse {
  message: string;
}

export interface UserCreate {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationId: string;
  role: Role;
  isRegistered: boolean;
  jobFunction?: JobFunctions;
  isActive: boolean;
}

export interface InternalUserCreateFromInviteRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationId: string;
  role: Role;
  jobFunction?: JobFunctions;
  isActive: boolean;
}

export interface UserCreateFromInviteSSORequest {
  fullName: string;
  email: string;
  imageUrl: string;
  //password: string;
  //confirmPassword: string;
  organizationId: string;
  role: Role;
  jobFunction?: JobFunctions;
  isActive: boolean;
}

export interface UserCreateFromInviteRequest {
  fullName: string;
  email?: string;
  password: string;
  confirmPassword: string;
}
export interface UserCreateFromInviteResponse {
  token: string;
}

export interface UserLogin {
  email: string;
  password: string;
  tos: boolean;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface InvitedUserSignupResponse {
  token: string;
  refreshToken: string;
  isMultiOrg: boolean;
  role: Role;
  organizationId: string;
}
