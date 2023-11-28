import { DatePicker, Dropdown, Input, Table } from "antd";
const { TextArea } = Input;

export enum FIELD_TYPES {
  INPUT = "input",
  TEXTAREA = "textarea",
  DROPDOWN = "dropdown",
  DATEPICKER = "datepicker",
  TABLE = "table",
  SUB_FORM = "subForm",
}

export const DY_FORM = {
  FIELDS: {
    [FIELD_TYPES.INPUT]: Input,
    [FIELD_TYPES.TEXTAREA]: TextArea,
    [FIELD_TYPES.DROPDOWN]: Dropdown,
    [FIELD_TYPES.DATEPICKER]: DatePicker,
    [FIELD_TYPES.TABLE]: Table,
  },
};
