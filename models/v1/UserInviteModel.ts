import { Role } from "../User";

export interface SetupFirstUserInviteModel {
  email: string;
  organizationId: string;
  role: Role;
  intakeLink?: boolean;
}

export class FirstUserInvite {
  email: string;
  role: Role;
  organizationId: string;

  constructor(email: string, role: Role, organizationId: string) {
    this.email = email;
    this.role = role;
    this.organizationId = organizationId;
  }
}

export interface MailOptions {
  meta: {
    sendTo: string;
  };
  body: {
    role: Role;
    token: string;
    organization: string;
    email: string;
  };
}
