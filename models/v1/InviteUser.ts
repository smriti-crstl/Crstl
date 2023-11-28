import { Role } from "../User";

export interface InvitedUserResponse {
  status: number;
  code: string;
  data: InvitedUser[];
}

export interface InvitedUser {
  email: string;
  organizationId: string;
  role: Role;
  status: string;
  invitedBy: string;
  inviteLink: string;
  intakeLink?: boolean;
}
