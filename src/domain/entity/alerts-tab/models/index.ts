import {
  ContactEmailResponse,
  UpdateContactEmailRequest,
  UpdateContactEmailResponse,
} from "models/v1/edi/OrgData";

export type ContactEmail = UpdateContactEmailRequest;

export type GetContactEmailRes = ContactEmailResponse;

export type PutContactEmailReq = UpdateContactEmailRequest;
export type PutContactEmailRes = UpdateContactEmailResponse;

