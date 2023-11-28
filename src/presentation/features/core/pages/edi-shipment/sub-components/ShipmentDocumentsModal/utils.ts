import { ServiceType } from "domain/entity/edi/models/v2";
import { carriers, SHIPMENT_DOCUMENTS_SORT_CONFIG } from "./constants";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "domain/services/localStorage";

export const setShipmentDocsSortConfigInLocalStorage = (config: any) => {
  try {
    setItemInLocalStorage(
      SHIPMENT_DOCUMENTS_SORT_CONFIG,
      JSON.stringify(config)
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const getShipmentDocsSortConfigFromLocalStorage = () => {
  try {
    const configString =
      getItemFromLocalStorage(SHIPMENT_DOCUMENTS_SORT_CONFIG) || "{}";

    return JSON.parse(configString);
  } catch (error) {
    return {};
  }
};

const checkDecimal = (_: any, value: string) => {
  const regex = /^\d+(\.\d)?$/;
  const pass = regex.test(value);
  if (pass) return Promise.resolve();
  else {
    return Promise.reject(
      new Error("Please enter a number upto 1 decimal place only")
    );
  }
};

interface ServiceTypeOption {
  label: string;
  value: ServiceType;
}

export const getCarrierLabelFormConfig = (
  serviceTypeOptions: ServiceTypeOption[]
) => [
  {
    componentType: "single-select",
    options: carriers,
    loading: false,
    colProps: { span: 12, style: { paddingRight: "10px" } },
    formFields: {
      field: "carrier_type",
      label: "Carrier",
      name: "carrier_type",

      rules: [
        {
          required: true,
          message: "",
        },
      ],
    },
  },
  {
    colProps: { span: 12 },
    componentType: "single-select",
    options: serviceTypeOptions,
    loading: false,
    formFields: {
      field: "service_type",
      label: "Service",
      name: "service_type",

      rules: [
        {
          required: true,
          message: "",
        },
      ],
    },
  },
  {
    colProps: { span: 8, style: { paddingRight: "10px" } },
    componentType: "simple-input",
    formFields: {
      field: "parcel_length",
      name: "parcel_length",
      label: "Parcel length (inches)",
      rules: [
        {
          required: true,
          message: "",
        },
        {
          validator: checkDecimal,
        },
      ],
      id: "parcel_length",
    },
    placeholder: "Parcel length",
  },
  {
    colProps: { span: 8, style: { paddingRight: "10px" } },
    componentType: "simple-input",
    formFields: {
      field: "parcel_width",
      name: "parcel_width",
      label: "Parcel width (inches)",
      rules: [
        {
          required: true,
          message: "",
        },
        {
          validator: checkDecimal,
        },
      ],
      id: "parcel_width",
    },
    placeholder: "Parcel width",
  },
  {
    colProps: { span: 8 },
    componentType: "simple-input",
    formFields: {
      field: "parcel_height",
      name: "parcel_height",
      label: "Parcel height (inches)",
      rules: [
        {
          required: true,
          message: "",
        },
        {
          validator: checkDecimal,
        },
      ],
      id: "parcel_height",
    },
    placeholder: "Parcel height",
  },
  {
    colProps: { span: 24 },
    componentType: "simple-input",
    formFields: {
      field: "parcel_weight",
      name: "parcel_weight",
      label: "Parcel weight (ounces)",
      rules: [
        {
          required: true,
          message: "",
        },
        {
          validator: checkDecimal,
        },
      ],
      id: "parcel_weight",
    },
    placeholder: "Parcel weight",
  },
];

