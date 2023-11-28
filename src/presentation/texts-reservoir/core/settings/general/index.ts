import {
  ICoreSettingsTextConstants,
  OnboardingCoreSettingsTextConstants,
} from "./interface";

export const CORE_SETTINGS_TEXT_CONSTANTS: ICoreSettingsTextConstants = {
  TAB_NAMES: {
    PASSWORD: "Password",
    PROFILE: "My Profile",
    COMPANY: "Company",
    EDI: "EDI Setup",
    BILLING: "Billing",
    TEAM: "Team",
  },
  PROFILE_TAB: {
    TEXTS: {
      SAVE_BUTTON_TEXT: "Save",
      CANCEL_BUTTON_TEXT: "Cancel",
      COMPANY_DETAILS_HEADING: "Company Details",
      MY_PROFILE_HEADING: "My Profile",
      IMAGE_HEADING_TEXT: "Photo",
      REMOVE_IMAGE_BUTTON_TEXT: "Remove",
      UPLOAD_IMAGE_BUTTON_TEXT: "Upload",
    },
    LABELS: {
      EMAIL: "Email",
      FULL_NAME: "Full Name",
      JOB_FUNCTION: "Job Function",
      LAST_LOG_IN: "Last Log In",
      LAST_ACTIVE: "Last Active",
      ROLE: "Role",
      BILLING_ADDRESS: "Billing Address",
      COMPANY_NAME: "Company Name",
      TIMEZONE: "Timezone",
    },
    PLACEHOLDERS: {
      APT_ADDRESS: "Apt, suite, etc. (optional)",
      COUNTRY: "Country",
      STATE: "State",
      STREET_ADDRESS: "Street Address",
      ZIP_CODE: "Zip Code",
    },
    VALIDATIONS: {
      FULL_NAME_REQUIRED: "Full Name is required",
    },
  },
  PASSWORD_TAB: {
    TEXTS: {
      CHANGE_PASSWORD_HEADING: "Change your Password",
      SAVE_BUTTON_TEXT: "Save",
    },
    SUCCESS_MESSAGES: {
      PASSWORD_CHANGE: {
        MODULE_NAME: "Success",
        MESSAGE: "Password change successful",
      },
    },
  },
  TEAM_TAB: {
    TEXTS: {
      INVITE_BUTTON_TEXT: "Invite Teammates",
      INVITE_CANCEL_BUTTON_TEXT: "Cancel",
      INVITE_SEND_BUTTON_TEXT: "Send",
    },
    TABLE_COLUMNS: {
      EMAIL: "Email Address",
      IMAGE_URL: "",
      JOB_FUNCTION: "Job Function",
      LAST_SIGN_IN_TIME: "Last login",
      NAME: "Name",
      ROLE: "Role",
      STATUS: "Status",
    },
    STATUS_DROPDOWN_LABELS: {
      ACTIVE: "Active",
      DEACTIVATED: "Inactive",
    },
    STATUS_CHANGE_MODAL: {
      HEADING: "Are you sure you want to deactivate account for ",
      USER_NAME_NOT_PRESENT_FALLBACK: "this user",
      SUB_HEADING:
        "When a user is deactivated, they will not be able to login to Crstl, until they are reactivated by an Admin.",
      CANCEL_BUTTON_TEXT: "Cancel",
      DEACTIVATE_BUTTON_TEXT: "Deactivate",
    },
  },
};

export const CORE_ONBOARDING_TEXT_CONSTANTS: OnboardingCoreSettingsTextConstants = {
  TAB_NAMES: {
    TASKS: "Tasks",
    EDI_SETUP: "Trading Partner EDI Setup",
    ALERTS_SETUP: "Alerts Setup",
    GLOBAL_EDI_SETUP: "Global EDI Setup",
    CONNECTIONS: "Connections",
  },
};

