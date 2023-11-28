export interface InvoiceReadViewResponse {
  metadata: Metadata;
  data: InvoiceField[];
}

export interface InvoiceField {
  id: string;
  name: string;
  type: Type;
  label: string;
  rules?: Rule[];
  dataType?: DataType;
  placeholder?: string;
  options?: Option[];
  columns?: Column[];
  emptyRow?: { [key: string]: EmptyRow };
  children?: InvoiceFieldChild[];
  maxLength?: number;
}

export interface InvoiceFieldChild {
  id: string;
  label: string;
  name: string;
  type: Type;
  dataType?: DataType;
  placeholder: string;
  rules: Rule[];
  options?: Option[];
  children?: InvoiceFieldChild[];
}

export interface InvoiceFieldNestedChild {
  id: string;
  name: string;
  label: string;
  type: Type;
  requirement: Requirement;
  options?: Option[];
}

export interface Option {
  code: string;
  description: string;
}

export enum Requirement {
  Conditional = "Conditional",
  Mandatory = "Mandatory",
  Optional = "Optional",
}

export enum Type {
  Datepicker = "datepicker",
  Dropdown = "dropdown",
  Input = "input",
  Subform = "subform",
  Table = "table",
  Textarea = "textarea",
}

export enum DataType {
  An = "AN",
  Dt = "DT",
  ID = "ID",
  N0 = "N0",
  N2 = "N2",
}

export interface Rule {
  requirement?: Requirement;
  message?: string;
  min?: number;
  max?: number;
  note?: string;
  required?: boolean;
}

export interface Column {
  title?: string;
  dataIndex: string;
  requirement?: Requirement;
  editable?: boolean;
  options?: Option[];
  type?: string;
  dataType?: string;
  placeholder?: string;
  rules?: Rule[];
  tile?: string;
  maxLength?: number;
}

export enum EmptyRow {
  EnterAValue = "Enter a value",
}

export interface Metadata {
  key: string;
  onSubmit: OnSubmit;
}

export interface OnSubmit {
  endpoint: string;
}

export interface InvoiceData {
  [key: string]: unknown;
  detail_IT1: DetailIT1[];
  heading_N1: { [key: string]: string }[];
  heading_N9: { [key: string]: string }[];
  summary_SAC: { [key: string]: string }[];
  summary_ISS: { [key: string]: string }[];
}

export interface DetailIT1 {
  [key: string]: unknown;
  detail_PID_subform: { [key: string]: string }[];
  detail_SAC_subform: { [key: string]: string }[];
  detail_SLN_subform: { [key: string]: string }[];
}
