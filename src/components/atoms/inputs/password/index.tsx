import { Input, InputProps } from "antd";
import { ReactElement } from "react";

export type PasswordInputProps = InputProps;

export const PasswordInput = (props: PasswordInputProps): ReactElement => {
  return <Input.Password type="password" {...props} />;
};
