import { IShopifyOnboardingTextConstants } from "./interface";

export const SHOPIFY_ONBOARDING_TEXT_CONSTANTS: IShopifyOnboardingTextConstants = {
  LABELS: {
    CONFIRM_PASSWORD: "Confirm Password",
    FULL_NAME: "Full Name",
    PASSWORD: "Password",
    TERMS_OF_SERVICE: {
      SENTENCE: "Creating an account means you agree to the",
      ANCHOR: "Terms of Service.",
    },
    ORG_NAME: "Organization Name",
    EMAIL: "Email",
  },
  TEXTS: {
    CREATE_ACCOUNT_BUTTON: "Create Account",
    HEADING: (orgName: string) => `Join ${orgName} on Crstl`,
  },
  VALIDATIONS: {
    FULL_NAME: "Full Name is required",
    TERMS_OF_SERVICE: "End User License Agreement must be accepted",
    CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
    PASSWORD_REQUIRED: "Password is required",
    ORG_NAME_REQUIRED: "Organization Name is required",
    EMAIL_IS_REQUIRED: "Email is required",
  },
};
