import { FormItemProps, Rule } from "antd/lib/form";
import { NamePath } from "antd/lib/form/interface";
import { ReactNode } from "react";

export interface FormFields extends FormItemProps {
  name: NamePath;
  label?: ReactNode;
  rules?: Rule[];
  field: string;
  initialValue?: unknown;
}
