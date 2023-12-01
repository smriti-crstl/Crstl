import { CreateFormProps } from "components/organisms/create-form";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";

export const AUTH_RESET_PASSWORD_FORM_CONFIG: [CreateFormProps] = [
  {
    componentType: "email",
    formFields: {
      field: "email",
      label: TEXT_CONSTANTS.RESET_PASSWORD.LABELS.EMAIL,
      name: "email",
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.RESET_PASSWORD.VALIDATIONS.EMAIL,
        },
      ],
    },
  },
];

