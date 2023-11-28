export interface IShopifyOnboardingTextConstants {
  TEXTS: {
    HEADING: (p: string) => string;
    CREATE_ACCOUNT_BUTTON: string;
  };
  LABELS: {
    FULL_NAME: string;
    PASSWORD: string;
    CONFIRM_PASSWORD: string;
    TERMS_OF_SERVICE: {
      SENTENCE: string;
      ANCHOR: string;
    };
    ORG_NAME: string;
    EMAIL: string;
  };
  VALIDATIONS: {
    FULL_NAME: string;
    TERMS_OF_SERVICE: string;
    PASSWORD_REQUIRED: string;
    CONFIRM_PASSWORD_REQUIRED: string;
    ORG_NAME_REQUIRED: string;
    EMAIL_IS_REQUIRED: string;
  };
}
