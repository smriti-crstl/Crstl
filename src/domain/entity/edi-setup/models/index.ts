import {
  EDIAddressModel,
  IntakeFormResponse,
  OrgDataModel,
  OrgDataResponse,
  UpdateOrgDataResponseModel,
} from "@crstl/api/src/apis/models/v1/edi/OrgData";

export type GetOrgDataRes = OrgDataResponse;

export type EDIAddressModelFE = EDIAddressModel;

export type PutOrgDataReq = OrgDataModel;
export type PutOrgDataRes = UpdateOrgDataResponseModel;

export type GetIntakeFormRes = IntakeFormResponse;
