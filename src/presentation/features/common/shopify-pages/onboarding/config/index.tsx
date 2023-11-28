import { SimpleCheckboxProps } from "@crstl/components/atoms/checkbox";
import { AuthBottomBar } from "@crstl/components/molecules/auth-bottom-bar";
import { CreateFormProps } from "@crstl/components/organisms/create-form";
import { AUTH_VALIDATIONS } from "@crstl/validations/config";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { SHOPIFY_ONBOARDING_TEXT_CONSTANTS } from "presentation/texts-reservoir/common/shopify";
import { SHOPIFY_ONBOARDING_FIELD_CONSTANTS } from "../constants";

const SHOPIFY_ONBOARDING_FORM_CONFIG: [
  CreateFormProps,
  CreateFormProps,
  CreateFormProps,
  CreateFormProps,
  CreateFormProps,
  CreateFormProps<SimpleCheckboxProps>
] = [
  {
    componentType: "simple-input",
    formFields: {
      field: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.FULL_NAME,
      name: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.FULL_NAME,
      label: SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.FULL_NAME,
      rules: [
        {
          required: true,
          message: SHOPIFY_ONBOARDING_TEXT_CONSTANTS.VALIDATIONS.FULL_NAME,
        },
      ],
    },
  },
  {
    componentType: "simple-input",
    formFields: {
      field: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.ORGANIZATION_NAME,
      name: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.ORGANIZATION_NAME,
      label: SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.ORG_NAME,
      rules: [
        {
          required: true,
          message:
            SHOPIFY_ONBOARDING_TEXT_CONSTANTS.VALIDATIONS.ORG_NAME_REQUIRED,
        },
      ],
    },
  },
  {
    componentType: "simple-input",
    formFields: {
      field: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.EMAIL,
      name: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.EMAIL,
      label: SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.EMAIL,
      rules: [
        {
          required: true,
          message:
            SHOPIFY_ONBOARDING_TEXT_CONSTANTS.VALIDATIONS.EMAIL_IS_REQUIRED,
        },
      ],
    },
  },
  {
    componentType: "password",
    formFields: {
      field: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.NEW_PASSWORD,
      label: SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.PASSWORD,
      name: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.NEW_PASSWORD,
      rules: [
        {
          required: true,
          message:
            SHOPIFY_ONBOARDING_TEXT_CONSTANTS.VALIDATIONS.PASSWORD_REQUIRED,
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
      dependencies: [SHOPIFY_ONBOARDING_FIELD_CONSTANTS.NEW_PASSWORD],
      field: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.CONFIRM_PASSWORD,
      label: SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.CONFIRM_PASSWORD,
      name: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.CONFIRM_PASSWORD,
      rules: [
        {
          required: true,
          message:
            SHOPIFY_ONBOARDING_TEXT_CONSTANTS.VALIDATIONS
              .CONFIRM_PASSWORD_REQUIRED,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              !value ||
              getFieldValue(SHOPIFY_ONBOARDING_FIELD_CONSTANTS.NEW_PASSWORD) ===
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
        text={
          SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.TERMS_OF_SERVICE.SENTENCE
        }
        buttonText={
          SHOPIFY_ONBOARDING_TEXT_CONSTANTS.LABELS.TERMS_OF_SERVICE.ANCHOR
        }
      />
    ),
    formFields: {
      field: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.TERMS_AND_CONDITIONS,
      valuePropName: "checked",
      name: SHOPIFY_ONBOARDING_FIELD_CONSTANTS.TERMS_AND_CONDITIONS,
      rules: [
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject(
                  new Error(
                    SHOPIFY_ONBOARDING_TEXT_CONSTANTS.VALIDATIONS.TERMS_OF_SERVICE
                  )
                ),
        },
      ],
    },
  },
];

export { SHOPIFY_ONBOARDING_FORM_CONFIG };
