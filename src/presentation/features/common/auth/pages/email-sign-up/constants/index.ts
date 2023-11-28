// import { UserChangePasswordReq } from "domain/entity/auth/models";

type AuthEmailSignUpFieldConstants = {
  EMAIL: "email";
  NEW_PASSWORD: "password";
  CONFIRM_PASSWORD: "confirmPassword";
  FULL_NAME: "fullName";
  TERMS_AND_CONDITIONS: "termsAndConditions";
};

export type AuthEmailSignUpFormValuesContract = {
  password: string;
  confirmPassword: string;
  fullName: string;
  termsAndConditions: boolean;
};

const AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS: AuthEmailSignUpFieldConstants = {
  EMAIL: "email",
  NEW_PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  FULL_NAME: "fullName",
  TERMS_AND_CONDITIONS: "termsAndConditions",
};

export { AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS };
