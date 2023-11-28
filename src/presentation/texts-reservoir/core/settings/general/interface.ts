export interface ICoreSettingsTextConstants {
  TAB_NAMES: {
    PROFILE: string;
    COMPANY: string;
    TEAM: string;
    PASSWORD: string;
    EDI: string;
    BILLING: string;
  };
  PROFILE_TAB: {
    TEXTS: {
      SAVE_BUTTON_TEXT: string;
      CANCEL_BUTTON_TEXT: string;
      MY_PROFILE_HEADING: string;
      COMPANY_DETAILS_HEADING: string;
      UPLOAD_IMAGE_BUTTON_TEXT: string;
      REMOVE_IMAGE_BUTTON_TEXT: string;
      IMAGE_HEADING_TEXT: string;
    };
    LABELS: {
      FULL_NAME: string;
      JOB_FUNCTION: string;
      ROLE: string;
      EMAIL: string;
      LAST_LOG_IN: string;
      LAST_ACTIVE: string;
      TIMEZONE: string;
      COMPANY_NAME: string;
      BILLING_ADDRESS: string;
    };
    PLACEHOLDERS: {
      STREET_ADDRESS: string;
      APT_ADDRESS: string;
      COUNTRY: string;
      STATE: string;
      ZIP_CODE: string;
    };
    VALIDATIONS: {
      FULL_NAME_REQUIRED: string;
    };
  };
  PASSWORD_TAB: {
    TEXTS: {
      CHANGE_PASSWORD_HEADING: string;
      SAVE_BUTTON_TEXT: string;
    };
    SUCCESS_MESSAGES: {
      PASSWORD_CHANGE: {
        MODULE_NAME: string;
        MESSAGE: string;
      };
    };
  };
  // REFER PROFILE TAB FOR MISSING COMPANY DETAILS TAB REFERENCES
  TEAM_TAB: {
    TEXTS: {
      INVITE_BUTTON_TEXT: string;
      INVITE_CANCEL_BUTTON_TEXT: string;
      INVITE_SEND_BUTTON_TEXT: string;
    };
    TABLE_COLUMNS: {
      NAME: string;
      EMAIL: string;
      ROLE: string;
      JOB_FUNCTION: string;
      LAST_SIGN_IN_TIME: string;
      STATUS: string;
      IMAGE_URL: string;
    };
    STATUS_DROPDOWN_LABELS: {
      ACTIVE: "Active";
      DEACTIVATED: "Inactive";
    };
    STATUS_CHANGE_MODAL: {
      HEADING: string;
      SUB_HEADING: string;
      CANCEL_BUTTON_TEXT: string;
      DEACTIVATE_BUTTON_TEXT: string;
      USER_NAME_NOT_PRESENT_FALLBACK: string;
    };
  };
}

export interface OnboardingCoreSettingsTextConstants {
  TAB_NAMES: {
    TASKS: string;
    EDI_SETUP: string;
    ALERTS_SETUP: string;
    GLOBAL_EDI_SETUP: string;
    CONNECTIONS: string;
  };
}

