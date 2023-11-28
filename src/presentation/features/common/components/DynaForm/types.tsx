import { Rule } from "antd/lib/form";
import { FIELD_TYPES } from "./config";

export type FieldType =
  | FIELD_TYPES.INPUT
  | FIELD_TYPES.TEXTAREA
  | FIELD_TYPES.DROPDOWN
  | FIELD_TYPES.DATEPICKER
  | FIELD_TYPES.TABLE;

export type FieldConfig = {
  id: number;
  label: string;
  name: string;
  type: FieldType;
  defaultValue?: string;
  placeholder?: string;
  rules?: Rule[] | undefined;
  columns: Column[];
  emptyRow: any;
};

export type Column = {
  title: string;
  dataIndex: string;
  width?: string;
  editable?: boolean;
  render?: (_: any, record: any) => JSX.Element | null;
};
