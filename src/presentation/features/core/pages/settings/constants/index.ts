import {
  AddressModelFE,
  UserGetOrganizationDetailsRes,
} from "domain/entity/profile/models";
import { UserDetailsRes } from "domain/entity/shared/models";

type ProfileTabFieldConstants = {
  [P in
    | "FULL_NAME"
    | "JOB_FUNCTION"
    | "CRSTL_ROLE"
    | "EMAIL"
    | "LAST_LOG_IN"]: keyof UserDetailsRes;
};

type CompanyDetailsTabFieldConstants = {
  [P in
    | "TIMEZONE"
    | "COMPANY_NAME"
    | "STREET_ADDRESS"
    | "APT_ADDRESS"
    | "COUNTRY"
    | "STATE"
    | "ZIP_CODE"]:
    | keyof UserGetOrganizationDetailsRes
    | Array<keyof UserGetOrganizationDetailsRes | keyof AddressModelFE>;
};

const PROFILE_TAB_FIELD_CONSTANTS: ProfileTabFieldConstants = {
  FULL_NAME: "fullName",
  JOB_FUNCTION: "jobFunction",
  CRSTL_ROLE: "role",
  EMAIL: "email",
  LAST_LOG_IN: "lastSignInTime",
};

const COMPANY_DETAILS_NAME_CONSTANTS: CompanyDetailsTabFieldConstants = {
  TIMEZONE: "timezoneId",
  STREET_ADDRESS: ["address", "address1"],
  APT_ADDRESS: ["address", "address2"],
  COMPANY_NAME: "name",
  COUNTRY: ["address", "country"],
  STATE: ["address", "region"],
  ZIP_CODE: ["address", "postalCode"],
};

const COMPANY_DETAILS_FIELD_CONSTANTS = {
  APT_ADDRESS: "APT_ADDRESS",
  COMPANY_NAME: "COMPANY_NAME",
  COUNTRY: "COUNTRY",
  STATE: "STATE",
  STREET_ADDRESS: "STREET_ADDRESS",
  TIMEZONE: "TIMEZONE",
  ZIP_CODE: "ZIP_CODE",
};

const TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES = {
  ACTIVATED: "true",
  DEACTIVATED: "false",
};

export {
  PROFILE_TAB_FIELD_CONSTANTS,
  COMPANY_DETAILS_FIELD_CONSTANTS,
  COMPANY_DETAILS_NAME_CONSTANTS,
  TEAM_USERS_IS_ACTIVE_API_PAYLOAD_VALUES,
};
