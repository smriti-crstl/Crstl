/* eslint-disable prettier/prettier */
import { IAuthTextReservoirConstants } from "./interface";

export const TEXT_CONSTANTS: IAuthTextReservoirConstants = {
  GENERIC_VALIDATIONS: {
    INVALID_PASSWORD:
      "Your password must have: \n8 or more characters \nupper and lower case letters \na number \na special character",
    //INVALID_PASSWORD:
    //  "Your password must have: 8 or more characters, upper and lower case letters, a number and a special character",
    WHITESPACE: "This field cannot start with a whitespace",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  },
  PLUGINS: {
    CHANGE_PASSWORD: {
      LABELS: {
        NEW_PASSWORD: "New Password",
        CONFIRM_PASSWORD: "Confirm Password",
      },
      TEXTS: {
        CHANGE_PASSWORD_BUTTON_TEXT: "Submit",
        CHANGE_PASSWORD_HEADING: "Change Password",
      },
      VALIDATIONS: {
        CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
        NEW_PASSWORD_REQUIRED: "New Password is required",
      },
    },
    LOGIN: {
      LABELS: {
        EMAIL: "Email Address",
        PASSWORD: "Password",
      },
      TEXTS: {
        BOTTOM_BAR_TEXT: "Don't have an account?",
        LOG_IN_HEADING: "Log in",
        SIGN_UP_BUTTON: "Sign up",
        LOGIN_BUTTON: "Log in",
      },
      VALIDATIONS: {
        EMAIL_REQUIRED: "Email is required",
        PASSWORD_REQUIRED: "Password is required",
      },
    },
    INVITE_USERS: {
      LABELS: {
        INVITE_EMAILS: "To",
        ROLES: {
          ADMIN: "Admin",
          MEMBER: "Member",
          THIRD_PARTY_LOGISTICS: "3PL",
        },
      },
      TEXTS: {
        INVITE_USERS_HEADING: "Invite teammates to Crstl",
        SEND_BUTTON: "Send",
        SKIP_BUTTON: "Skip",
      },
      VALIDATIONS: {
        INVITE_EMAILS_REQUIRED: "Invitee emails are required",
        ROLE_REQUIRED: "Role is required",
      },
      SUCCESS_MODAL: {
        SUCCESS_BUTTON_TEXT: "Done",
        SUCCESS_TEXT: "Invite Sent Successfully",
      },
    },
  },
  ROUTER: {
    PAGE_NOT_FOUND: "Error 404 Page Not found",
    UNAUTHORIZED: "You are not authorized to view this page",
    SOMETHING_WENT_WRONG: "Oops something went wrong",
  },
  SIGN_UP: {
    LOG_IN_BUTTON: "Log in",
    SIGN_UP_TEXT: "Create an Account",
    BOTTOM_BAR_TEXT: "Already have an account?",
    VALIDATIONS: {
      EMAIL: "Email is required",
      PASSWORD: "Password is required",
      COMPANY_NAME: "Company Name is required",
      FULL_NAME: "Full Name is required",
    },
    LABELS: {
      EMAIL: "Email Address",
      PASSWORD: "Password",
      COMPANY_NAME: "Company Name",
      FULL_NAME: "Full Name",
    },
  },
  PREMIER_ADMIN_SIGN_UP: {
    STEPS: {
      LOG_IN: "Log in",
      CHANGE_PASSWORD: "Change Password",
      GET_STARTED: "Get Started",
      INVITE_TEAMMATES: "Invite Teammates",
    },
  },
  EMAIL_SIGN_UP: {
    LABELS: {
      CONFIRM_PASSWORD: "Confirm Password",
      FULL_NAME: "Full Name",
      PASSWORD: "Password",
      TERMS_OF_SERVICE: {
        SENTENCE: "By checking the box, you agree to our",
        ANCHOR: "End User License Agreement ",
        ACKNOWLEDGE: "and acknowledge that you have read our",
      },
      EMAIL: "Email Address",
    },
    TEXTS: {
      CREATE_ACCOUNT_BUTTON: "Create Account",
      HEADING: (orgName) => `Join ${orgName} on Crstl`,
      PRIVACY_POLICY: "Privacy Policy",
    },
    VALIDATIONS: {
      FULL_NAME: "Full Name is required",
      TERMS_OF_SERVICE: "End User License Agreement must be accepted",
      CONFIRM_PASSWORD_REQUIRED: "Confirm Password is required",
      PASSWORD_REQUIRED: "Password is required",
    },
    MESSAGES: {
      ACCOUNT: {
        ERROR: "Couldn't create account",
      },
    },
  },
  RESET_PASSWORD: {
    TEXTS: {
      HEADING: "Reset Password",
      RESET_PASSWORD_BUTTON: "Reset Password",
    },
    LABELS: {
      EMAIL: "Email Address",
    },
    VALIDATIONS: {
      EMAIL: "Email is required",
    },
    MESSAGES: {
      PASSWORD: {
        ERROR: "Something went wrong",
        SUCCESS: "Check your email for instructions to reset your password",
      },
    },
  },
};
