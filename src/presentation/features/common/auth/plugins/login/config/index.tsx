import { EULA, PRIVACY_POLICY } from "globals/configs";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { SimpleCheckboxProps } from "components/atoms/checkbox";
import { AuthBottomBar } from "components/molecules/auth-bottom-bar";
import { CreateFormProps } from "components/organisms/create-form";

const AUTH_PLUGINS_LOGIN_FORM_CONFIG: [
  CreateFormProps,
  CreateFormProps,
  CreateFormProps<SimpleCheckboxProps>
] = [
  {
    componentType: "email",
    formFields: {
      field: "email",
      label: TEXT_CONSTANTS.PLUGINS.LOGIN.LABELS.EMAIL,
      name: "email",
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.PLUGINS.LOGIN.VALIDATIONS.EMAIL_REQUIRED,
        },
      ],
    },
  },
  {
    componentType: "password",
    formFields: {
      field: "password",
      label: TEXT_CONSTANTS.PLUGINS.LOGIN.LABELS.PASSWORD,
      name: "password",
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.PLUGINS.LOGIN.VALIDATIONS.PASSWORD_REQUIRED,
        },
      ],
    },
  },
  {
    componentType: "checkbox",
    children: (
      <AuthBottomBar
        redirectionUrl={EULA}
        text={"By checking the box, you agree to our"}
        buttonText={"End User License Agreement"}
        showSecondaryLink
        secondaryLinkProps={{
          redirectionUrl: PRIVACY_POLICY,
          buttonText: "Privacy Policy.",
          prefix: "and acknowledge that you have read our",
        }}
      />
    ),
    formFields: {
      field: "tos",
      valuePropName: "checked",
      name: "tos",
      rules: [
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject(
                  new Error(
                    "End User License Agreement & Privacy Policy must be accepted"
                  )
                ),
        },
      ],
    },
  },
];

export { AUTH_PLUGINS_LOGIN_FORM_CONFIG };
