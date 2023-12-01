import {
  getUserCrstlRoleOptions,
  getUserJobFunctionsOptions,
} from "presentation/constants";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { ISingleSelectProps } from "components/atoms/selects";
import { CreateFormProps } from "components/organisms/create-form";

import {
  COMPANY_DETAILS_FIELD_CONSTANTS,
  COMPANY_DETAILS_NAME_CONSTANTS,
  PROFILE_TAB_FIELD_CONSTANTS,
} from "../../constants";

const PROFILE_TAB_MY_PROFILE_FORM_CONFIG: Array<
  CreateFormProps | CreateFormProps<ISingleSelectProps>
> = [
  {
    componentType: "simple-input",
    formFields: {
      field: PROFILE_TAB_FIELD_CONSTANTS.FULL_NAME,
      name: PROFILE_TAB_FIELD_CONSTANTS.FULL_NAME,
      label: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.FULL_NAME,
      rules: [
        {
          required: true,
          message:
            CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.VALIDATIONS
              .FULL_NAME_REQUIRED,
        },
      ],
    },
  },
  {
    componentType: "single-select",
    style: { width: "80%" },
    options: getUserJobFunctionsOptions(),
    formFields: {
      field: PROFILE_TAB_FIELD_CONSTANTS.JOB_FUNCTION,
      name: PROFILE_TAB_FIELD_CONSTANTS.JOB_FUNCTION,
      label: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.JOB_FUNCTION,
    },
  },
  {
    componentType: "single-select",
    options: getUserCrstlRoleOptions(),
    style: { width: "80%" },
    disabled: true,
    formFields: {
      field: PROFILE_TAB_FIELD_CONSTANTS.CRSTL_ROLE,
      name: PROFILE_TAB_FIELD_CONSTANTS.CRSTL_ROLE,
      label: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.ROLE,
    },
  },
];

const PROFILE_TAB_COMPANY_DETAILS_FORM_CONFIG: Array<
  CreateFormProps | CreateFormProps<ISingleSelectProps>
> = [
  {
    componentType: "single-select",
    style: { width: "80%" },
    formFields: {
      field: COMPANY_DETAILS_FIELD_CONSTANTS.TIMEZONE,
      name: COMPANY_DETAILS_NAME_CONSTANTS.TIMEZONE,
      label: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.TIMEZONE,
    },
  },
  {
    componentType: "simple-input",
    formFields: {
      field: COMPANY_DETAILS_FIELD_CONSTANTS.COMPANY_NAME,
      name: COMPANY_DETAILS_NAME_CONSTANTS.COMPANY_NAME,
      label: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.COMPANY_NAME,
    },
  },

  /*
    * Note: Hiding this temp, needs to be moved to billing tab
  // {
  //   componentType: "simple-input",
  //   formFields: {
  //     field: COMPANY_DETAILS_FIELD_CONSTANTS.STREET_ADDRESS,
  //     name: COMPANY_DETAILS_NAME_CONSTANTS.STREET_ADDRESS,
  //     label: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.LABELS.BILLING_ADDRESS,
  //   },
  //   placeholder:
  //     CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.PLACEHOLDERS.STREET_ADDRESS,
  // },
  // {
  //   componentType: "simple-input",
  //   formFields: {
  //     field: COMPANY_DETAILS_FIELD_CONSTANTS.APT_ADDRESS,
  //     name: COMPANY_DETAILS_NAME_CONSTANTS.APT_ADDRESS,
  //   },
  //   placeholder:
  //     CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.PLACEHOLDERS.APT_ADDRESS,
  // },
  // {
  //   componentType: "single-select",
  //   formFields: {
  //     field: COMPANY_DETAILS_FIELD_CONSTANTS.COUNTRY,
  //     name: COMPANY_DETAILS_NAME_CONSTANTS.COUNTRY,
  //   },
  //   colProps: { span: 8 },
  //   placeholder: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.PLACEHOLDERS.COUNTRY,
  //   options: getUserCountries(),
  //   showSearch: true,
  // },
  // {
  //   componentType: "single-select",
  //   formFields: {
  //     field: COMPANY_DETAILS_FIELD_CONSTANTS.STATE,
  //     name: COMPANY_DETAILS_NAME_CONSTANTS.STATE,
  //   },
  //   colProps: { span: 8 },
  //   placeholder: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.PLACEHOLDERS.STATE,
  //   options: getUserStates(),
  //   showSearch: true,
  // },
  // {
  //   componentType: "simple-input",
  //   formFields: {
  //     field: COMPANY_DETAILS_FIELD_CONSTANTS.ZIP_CODE,
  //     name: COMPANY_DETAILS_NAME_CONSTANTS.ZIP_CODE,
  //   },
  //   colProps: { span: 8 },
  //   placeholder: CORE_SETTINGS_TEXT_CONSTANTS.PROFILE_TAB.PLACEHOLDERS.ZIP_CODE,
  // },
  */
];

export {
  PROFILE_TAB_MY_PROFILE_FORM_CONFIG,
  PROFILE_TAB_COMPANY_DETAILS_FORM_CONFIG,
};

