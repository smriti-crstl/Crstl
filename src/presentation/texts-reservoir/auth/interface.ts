/* eslint-disable prettier/prettier */
export interface IAuthTextReservoirConstants {
  GENERIC_VALIDATIONS: {
    INVALID_PASSWORD: string;
    WHITESPACE: string;
    PASSWORDS_DO_NOT_MATCH: string;
  };
  PLUGINS: {
    CHANGE_PASSWORD: {
      VALIDATIONS: {
        NEW_PASSWORD_REQUIRED: string;
        CONFIRM_PASSWORD_REQUIRED: string;
      };
      LABELS: {
        NEW_PASSWORD: string;
        CONFIRM_PASSWORD: string;
      };
      TEXTS: {
        CHANGE_PASSWORD_HEADING: string;
        CHANGE_PASSWORD_BUTTON_TEXT: string;
      };
    };

    LOGIN: {
      VALIDATIONS: {
        EMAIL_REQUIRED: string;
        PASSWORD_REQUIRED: string;
      };
      LABELS: {
        EMAIL: string;
        PASSWORD: string;
      };
      TEXTS: {
        LOG_IN_HEADING: string;
        LOGIN_BUTTON: string;
        SIGN_UP_BUTTON: string;
        BOTTOM_BAR_TEXT: string;
      };
    };

    INVITE_USERS: {
      TEXTS: {
        INVITE_USERS_HEADING: string;
        SKIP_BUTTON: string;
        SEND_BUTTON: string;
      };
      LABELS: {
        INVITE_EMAILS: string;
        ROLES: {
          ADMIN: string;
          MEMBER: string;
          THIRD_PARTY_LOGISTICS: string;
        };
      };
      VALIDATIONS: {
        INVITE_EMAILS_REQUIRED: string;
        ROLE_REQUIRED: string;
      };
      SUCCESS_MODAL: {
        SUCCESS_TEXT: string;
        SUCCESS_BUTTON_TEXT: string;
      };
    };
  };
  ROUTER: {
    PAGE_NOT_FOUND: string;
    UNAUTHORIZED: string;
    SOMETHING_WENT_WRONG: string;
  };
  SIGN_UP: {
    LOG_IN_BUTTON: string;
    SIGN_UP_TEXT: string;
    BOTTOM_BAR_TEXT: string;
    VALIDATIONS: {
      EMAIL: string;
      PASSWORD: string;
      COMPANY_NAME: string;
      FULL_NAME: string;
    };
    LABELS: {
      EMAIL: string;
      PASSWORD: string;
      COMPANY_NAME: string;
      FULL_NAME: string;
    };
  };
  PREMIER_ADMIN_SIGN_UP: {
    STEPS: {
      LOG_IN: string;
      CHANGE_PASSWORD: string;
      INVITE_TEAMMATES: string;
      GET_STARTED: string;
    };
  };
  EMAIL_SIGN_UP: {
    TEXTS: {
      HEADING: (p: string) => string;
      CREATE_ACCOUNT_BUTTON: string;
      PRIVACY_POLICY: string;
    };
    LABELS: {
      FULL_NAME: string;
      PASSWORD: string;
      CONFIRM_PASSWORD: string;
      TERMS_OF_SERVICE: {
        SENTENCE: string;
        ANCHOR: string;
        ACKNOWLEDGE: string;
      };
      EMAIL: string;
    };
    VALIDATIONS: {
      FULL_NAME: string;
      TERMS_OF_SERVICE: string;
      PASSWORD_REQUIRED: string;
      CONFIRM_PASSWORD_REQUIRED: string;
      EMAIL: string;
    };
    MESSAGES: {
      ACCOUNT: {
        ERROR: string;
      };
    };
  };
  RESET_PASSWORD: {
    TEXTS: {
      HEADING: string;
      RESET_PASSWORD_BUTTON: string;
    };
    LABELS: {
      EMAIL: string;
    };
    VALIDATIONS: {
      EMAIL: string;
    };
    MESSAGES: {
      PASSWORD: {
        ERROR: string;
        SUCCESS: string;
      };
    };
  };
}
