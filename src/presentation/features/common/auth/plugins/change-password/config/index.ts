import { TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { CreateFormProps } from "@crstl/components/organisms/create-form";
import { AUTH_VALIDATIONS } from "@crstl/validations/config";

import { UserChangePasswordReq } from "../../../../../../../domain/entity/auth/models/index";

const AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS: Record<
  string,
  keyof UserChangePasswordReq
> = {
  NEW_PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};

const AUTH_PLUGIN_CHANGE_PASSWORD_FORM_CONFIG: CreateFormProps[] = [
  {
    componentType: "password",
    formFields: {
      field: AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS.NEW_PASSWORD,
      label: TEXT_CONSTANTS.PLUGINS.CHANGE_PASSWORD.LABELS.NEW_PASSWORD,
      name: AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS.NEW_PASSWORD,
      rules: [
        {
          required: true,
          message:
            TEXT_CONSTANTS.PLUGINS.CHANGE_PASSWORD.VALIDATIONS
              .NEW_PASSWORD_REQUIRED,
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
      field: AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS.CONFIRM_PASSWORD,
      label: TEXT_CONSTANTS.PLUGINS.CHANGE_PASSWORD.LABELS.CONFIRM_PASSWORD,
      name: AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS.CONFIRM_PASSWORD,
      dependencies: [AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS.NEW_PASSWORD],
      rules: [
        {
          required: true,
          message:
            TEXT_CONSTANTS.PLUGINS.CHANGE_PASSWORD.VALIDATIONS
              .CONFIRM_PASSWORD_REQUIRED,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              !value ||
              getFieldValue(
                AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS.NEW_PASSWORD
              ) === value
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
];

export {
  AUTH_PLUGIN_CHANGE_PASSWORD_FORM_CONFIG,
  AUTH_PLUGIN_CHANGE_PASSWORD_FIELD_CONSTANTS,
};
