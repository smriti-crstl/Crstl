type ShopifyOnboardingFieldConstants = {
  NEW_PASSWORD: "password";
  CONFIRM_PASSWORD: "confirmPassword";
  FULL_NAME: "fullName";
  TERMS_AND_CONDITIONS: "termsAndConditions";
  ORGANIZATION_NAME: "organizationName";
  EMAIL: "email";
};

export type ShopifyOnboardingFormValuesContract = {
  password: string;
  confirmPassword: string;
  fullName: string;
  termsAndConditions: boolean;
  organizationName: string;
  email: string;
};

export const SHOPIFY_ONBOARDING_FIELD_CONSTANTS: ShopifyOnboardingFieldConstants = {
  NEW_PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  FULL_NAME: "fullName",
  TERMS_AND_CONDITIONS: "termsAndConditions",
  ORGANIZATION_NAME: "organizationName",
  EMAIL: "email",
};
