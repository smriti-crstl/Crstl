import { Input, InputProps } from "antd";
import { ReactElement } from "react";

export type SimpleInputProps = InputProps;

export const SimpleInput = (props: SimpleInputProps): ReactElement => {
  return <Input type="text" {...props} />;
};
