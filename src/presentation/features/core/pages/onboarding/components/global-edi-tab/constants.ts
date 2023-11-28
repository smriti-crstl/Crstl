import { COUNTRIES, STATES } from "presentation/constants";

import { CommonSelectOptions } from "@crstl/components/atoms/selects";

import { EdiSetupFormConfigType, EdiSetupTabFieldConstants } from "./types";

const getUserCountries = (): CommonSelectOptions => {
  return COUNTRIES.map(({ name, code }) => ({
    label: name,
    value: code,
  }));
};

const getUserStates = (): CommonSelectOptions => {
  return STATES.map(({ name, abbreviation }) => ({
    label: name,
    value: abbreviation,
  }));
};

const EDI_SETUP_TEXT_CONSTANTS = {
  LABELS: {
    EDI_CONTACTS: "EDI Contacts",
    GS1_PREFIX: "GS1 Prefix",
    SHIP_FROM_ADDRESS: "Ship from Address",
    REMIT_TO_ADDRESS: "Remit to Address",
  },
  PLACEHOLDERS: {
    STREET_ADDRESS: "Street Address",
    APT_ADDRESS: "Apt, suite, etc. (optional)",
    CITY: "City",
    COUNTRY: "Country",
    STATE: "State",
    ZIP_CODE: "Zip Code",
    EDI_CONTACTS: "EDI Contacts",
    GS1_PREFIX: "GS1 Prefix, starting with a 0 - e.g. 012345678",
  },
  VALIDATION: {
    GS1_PREFIX_REQUIRED: "Field required",
    SHIP_FROM_ADDRESS_REQUIRED: "Field required",
  },
};

export const EDI_SETUP_FIELD_CONSTANTS: Record<
  keyof EdiSetupTabFieldConstants,
  string
> = {
  EDI_CONTACTS: "EDI_CONTACTS",
  COMPANY_CONTACTS: "COMPANY_CONTACTS",
  GS1_PREFIX: "GS1_PREFIX",
  SHIP_FROM_STREET_ADDRESS: "SHIP_FROM_STREET_ADDRESS",
  SHIP_FROM_APT_ADDRESS: "SHIP_FROM_APT_ADDRESS",
  SHIP_FROM_CITY: "SHIP_FROM_CITY",
  SHIP_FROM_COUNTRY: "SHIP_FROM_COUNTRY",
  SHIP_FROM_STATE: "SHIP_FROM_STATE",
  SHIP_FROM_ZIP_CODE: "SHIP_FROM_ZIP_CODE",
  REMIT_TO_STREET_ADDRESS: "REMIT_TO_STREET_ADDRESS",
  REMIT_TO_APT_ADDRESS: "REMIT_TO_APT_ADDRESS",
  REMIT_TO_CITY: "REMIT_TO_CITY",
  REMIT_TO_COUNTRY: "REMIT_TO_COUNTRY",
  REMIT_TO_STATE: "REMIT_TO_STATE",
  REMIT_TO_ZIP_CODE: "REMIT_TO_ZIP_CODE",
};

const EDI_SETUP_NAME_CONSTANTS: EdiSetupTabFieldConstants = {
  COMPANY_CONTACTS: "companyContacts",
  EDI_CONTACTS: "ediContacts",
  GS1_PREFIX: ["default", "gs1Id"],
  SHIP_FROM_STREET_ADDRESS: ["default", "shipFromAddress", "address1"],
  SHIP_FROM_APT_ADDRESS: ["default", "shipFromAddress", "address2"],
  SHIP_FROM_CITY: ["default", "shipFromAddress", "city"],
  SHIP_FROM_COUNTRY: ["default", "shipFromAddress", "countryCode"],
  SHIP_FROM_STATE: ["default", "shipFromAddress", "region"],
  SHIP_FROM_ZIP_CODE: ["default", "shipFromAddress", "postalCode"],
  REMIT_TO_STREET_ADDRESS: ["default", "remitToAddress", "address1"],
  REMIT_TO_APT_ADDRESS: ["default", "remitToAddress", "address2"],
  REMIT_TO_CITY: ["default", "remitToAddress", "city"],
  REMIT_TO_COUNTRY: ["default", "remitToAddress", "countryCode"],
  REMIT_TO_STATE: ["default", "remitToAddress", "region"],
  REMIT_TO_ZIP_CODE: ["default", "remitToAddress", "postalCode"],
};

export const EDI_SETUP_FORM_CONFIG: EdiSetupFormConfigType = [
  // Edi Contacts
  {
    componentType: "common-select",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.EDI_CONTACTS,
      name: EDI_SETUP_NAME_CONSTANTS.EDI_CONTACTS,
      label: EDI_SETUP_TEXT_CONSTANTS.LABELS.EDI_CONTACTS,
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.EDI_CONTACTS,
    mode: "multiple",
  },
  // GS1 prefix
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.GS1_PREFIX,
      name: EDI_SETUP_NAME_CONSTANTS.GS1_PREFIX,
      label: EDI_SETUP_TEXT_CONSTANTS.LABELS.GS1_PREFIX,
      rules: [
        {
          required: true,
          message: EDI_SETUP_TEXT_CONSTANTS.VALIDATION.GS1_PREFIX_REQUIRED,
        },
      ],
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.GS1_PREFIX,
  },
  // Ship from address
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.SHIP_FROM_STREET_ADDRESS,
      name: EDI_SETUP_NAME_CONSTANTS.SHIP_FROM_STREET_ADDRESS,
      label: EDI_SETUP_TEXT_CONSTANTS.LABELS.SHIP_FROM_ADDRESS,
      rules: [
        {
          required: true,
          message:
            EDI_SETUP_TEXT_CONSTANTS.VALIDATION.SHIP_FROM_ADDRESS_REQUIRED,
        },
      ],
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.STREET_ADDRESS,
  },
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.SHIP_FROM_APT_ADDRESS,
      name: EDI_SETUP_NAME_CONSTANTS.SHIP_FROM_APT_ADDRESS,
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.APT_ADDRESS,
  },
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.SHIP_FROM_CITY,
      name: EDI_SETUP_NAME_CONSTANTS.SHIP_FROM_CITY,
      rules: [
        {
          required: true,
          message:
            EDI_SETUP_TEXT_CONSTANTS.VALIDATION.SHIP_FROM_ADDRESS_REQUIRED,
        },
      ],
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.CITY,
  },
  {
    componentType: "single-select",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.SHIP_FROM_COUNTRY,
      name: EDI_SETUP_NAME_CONSTANTS.SHIP_FROM_COUNTRY,
      rules: [
        {
          required: true,
          message:
            EDI_SETUP_TEXT_CONSTANTS.VALIDATION.SHIP_FROM_ADDRESS_REQUIRED,
        },
      ],
    },
    colProps: { span: 8 },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.COUNTRY,
    options: getUserCountries(),
    showSearch: true,
  },
  {
    componentType: "single-select",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.SHIP_FROM_STATE,
      name: EDI_SETUP_NAME_CONSTANTS.SHIP_FROM_STATE,
      rules: [
        {
          required: true,
          message:
            EDI_SETUP_TEXT_CONSTANTS.VALIDATION.SHIP_FROM_ADDRESS_REQUIRED,
        },
      ],
    },
    colProps: { span: 8 },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.STATE,
    options: getUserStates(),
    showSearch: true,
  },
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.SHIP_FROM_ZIP_CODE,
      name: EDI_SETUP_NAME_CONSTANTS.SHIP_FROM_ZIP_CODE,
      rules: [
        {
          required: true,
          message:
            EDI_SETUP_TEXT_CONSTANTS.VALIDATION.SHIP_FROM_ADDRESS_REQUIRED,
        },
      ],
    },
    colProps: { span: 8 },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.ZIP_CODE,
  },
  // Remit to address
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.REMIT_TO_STREET_ADDRESS,
      name: EDI_SETUP_NAME_CONSTANTS.REMIT_TO_STREET_ADDRESS,
      label: EDI_SETUP_TEXT_CONSTANTS.LABELS.REMIT_TO_ADDRESS,
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.STREET_ADDRESS,
  },
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.REMIT_TO_APT_ADDRESS,
      name: EDI_SETUP_NAME_CONSTANTS.REMIT_TO_APT_ADDRESS,
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.APT_ADDRESS,
  },
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.REMIT_TO_CITY,
      name: EDI_SETUP_NAME_CONSTANTS.REMIT_TO_CITY,
    },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.CITY,
  },
  {
    componentType: "single-select",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.REMIT_TO_COUNTRY,
      name: EDI_SETUP_NAME_CONSTANTS.REMIT_TO_COUNTRY,
    },
    colProps: { span: 8 },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.COUNTRY,
    options: getUserCountries(),
    showSearch: true,
  },
  {
    componentType: "single-select",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.REMIT_TO_STATE,
      name: EDI_SETUP_NAME_CONSTANTS.REMIT_TO_STATE,
    },
    colProps: { span: 8 },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.STATE,
    options: getUserStates(),
    showSearch: true,
  },
  {
    componentType: "simple-input",
    formFields: {
      field: EDI_SETUP_FIELD_CONSTANTS.REMIT_TO_ZIP_CODE,
      name: EDI_SETUP_NAME_CONSTANTS.REMIT_TO_ZIP_CODE,
    },
    colProps: { span: 8 },
    placeholder: EDI_SETUP_TEXT_CONSTANTS.PLACEHOLDERS.ZIP_CODE,
  },
];

