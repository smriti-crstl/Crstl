import { Checkbox, CheckboxProps } from "antd";
import { ReactElement } from "react";

export type SimpleCheckboxProps = CheckboxProps;
export const SimpleCheckbox = (props: SimpleCheckboxProps): ReactElement => {
  return <Checkbox {...props} />;
};
