import { InputNumber, InputNumberProps } from "antd";
import { ReactElement } from "react";

export type NumberInputProps = InputNumberProps;

export const NumberInput = (props: NumberInputProps): ReactElement => {
  return <InputNumber {...props} />;
};
