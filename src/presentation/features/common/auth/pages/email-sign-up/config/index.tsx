import { TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { SimpleCheckboxProps } from "components/atoms/checkbox";
import { AuthBottomBar } from "components/molecules/auth-bottom-bar";
import { CreateFormProps } from "components/organisms/create-form";
import { AUTH_VALIDATIONS } from "validations/config";

import { AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS } from "../constants";
import { PRIVACY_POLICY } from "globals/configs";

const AUTH_EMAIL_SIGNUP_FORM_CONFIG: [
  CreateFormProps,
  CreateFormProps,
  CreateFormProps,
  CreateFormProps,
  CreateFormProps<SimpleCheckboxProps>
] = [
  {
    componentType: "simple-input",
    disabled: true,
    formFields: {
      field: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.EMAIL,
      name: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.EMAIL,
      label: TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.EMAIL,
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.EMAIL_SIGN_UP.VALIDATIONS.EMAIL,
        },
      ],
      id: "email-field",
    },
  },
  {
    componentType: "simple-input",
    formFields: {
      field: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.FULL_NAME,
      name: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.FULL_NAME,
      label: TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.FULL_NAME,
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.EMAIL_SIGN_UP.VALIDATIONS.FULL_NAME,
        },
      ],
    },
  },
  {
    componentType: "password",
    formFields: {
      field: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.NEW_PASSWORD,
      label: TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.PASSWORD,
      name: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.NEW_PASSWORD,
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.EMAIL_SIGN_UP.VALIDATIONS.PASSWORD_REQUIRED,
        },
        {
          pattern: AUTH_VALIDATIONS.PASSWORD_VALIDATION,
          message: TEXT_CONSTANTS.GENERIC_VALIDATIONS.INVALID_PASSWORD,
        },
      ],
    },
  },
  {
    componentType: "password",
    formFields: {
      dependencies: [AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.NEW_PASSWORD],
      field: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.CONFIRM_PASSWORD,
      label: TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.CONFIRM_PASSWORD,
      name: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.CONFIRM_PASSWORD,
      rules: [
        {
          required: true,
          message:
            TEXT_CONSTANTS.EMAIL_SIGN_UP.VALIDATIONS.CONFIRM_PASSWORD_REQUIRED,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              !value ||
              getFieldValue(AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.NEW_PASSWORD) ===
                value
            ) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error(
                TEXT_CONSTANTS.GENERIC_VALIDATIONS.PASSWORDS_DO_NOT_MATCH
              )
            );
          },
        }),
      ],
    },
  },
  {
    componentType: "checkbox",
    children: (
      <AuthBottomBar
        redirectionUrl=""
        text={TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.TERMS_OF_SERVICE.SENTENCE}
        buttonText={TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.TERMS_OF_SERVICE.ANCHOR}
        showSecondaryLink
        secondaryLinkProps={{
          redirectionUrl: PRIVACY_POLICY,
          buttonText: `${TEXT_CONSTANTS.EMAIL_SIGN_UP.TEXTS.PRIVACY_POLICY}`,
          prefix: `${TEXT_CONSTANTS.EMAIL_SIGN_UP.LABELS.TERMS_OF_SERVICE.ACKNOWLEDGE}`,
        }}
      />
    ),
    formFields: {
      field: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.TERMS_AND_CONDITIONS,
      valuePropName: "checked",
      name: AUTH_EMAIL_SIGNUP_FIELD_CONSTANTS.TERMS_AND_CONDITIONS,
      rules: [
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject(
                  new Error(
                    TEXT_CONSTANTS.EMAIL_SIGN_UP.VALIDATIONS.TERMS_OF_SERVICE
                  )
                ),
        },
      ],
    },
  },
];

export { AUTH_EMAIL_SIGNUP_FORM_CONFIG };

