import { Role } from "./User";
export interface InviteUserRequest {
  email: any[];
  role: Role;
}

export interface InviteUserResponse {
  status: string;
}

export interface PayloadToGenerateToken {
  email: string;
  role: string;
  organizationId: string;
  invited_by?: string;
}

export interface MailOptions {
  meta: {
    sendTo: string;
  };
  body: {
    role: string;
    token: string;
    organization: string;
    fullName: string;
    email: string;
    invitedBy: string;
    organizationId?: string;
  };
}

export enum InviteStatus {
  INVITED = "invited",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  CANCELLED = "cancelled"
}
