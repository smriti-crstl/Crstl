import { CreateFormProps } from "@crstl/components/organisms/create-form";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";

const SIGN_UP_FORM_CONFIG: CreateFormProps[] = [
  {
    componentType: "simple-input",
    formFields: {
      field: "fullName",
      label: TEXT_CONSTANTS.SIGN_UP.LABELS.FULL_NAME,
      name: "fullName",
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.SIGN_UP.VALIDATIONS.FULL_NAME,
        },
      ],
    },
  },
  {
    componentType: "email",
    formFields: {
      field: "email",
      label: TEXT_CONSTANTS.SIGN_UP.LABELS.EMAIL,
      name: "email",
      rules: [
        { required: true, message: TEXT_CONSTANTS.SIGN_UP.VALIDATIONS.EMAIL },
      ],
    },
  },
  {
    componentType: "simple-input",
    formFields: {
      field: "companyName",
      label: TEXT_CONSTANTS.SIGN_UP.LABELS.COMPANY_NAME,
      name: "companyName",
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.SIGN_UP.VALIDATIONS.COMPANY_NAME,
        },
      ],
    },
  },
  {
    componentType: "password",
    formFields: {
      field: "password",
      label: TEXT_CONSTANTS.SIGN_UP.LABELS.PASSWORD,
      name: "password",
      rules: [
        {
          required: true,
          message: TEXT_CONSTANTS.SIGN_UP.VALIDATIONS.PASSWORD,
        },
      ],
    },
  },
];

export { SIGN_UP_FORM_CONFIG };
