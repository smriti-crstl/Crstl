import { Input, InputProps } from "antd";
import { ReactElement } from "react";

export type EmailInputProps = InputProps;

export const EmailInput = (props: EmailInputProps): ReactElement => {
  return <Input type="email" {...props} />;
};
