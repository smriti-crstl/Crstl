import { ReactElement } from "react";

import { UploadOutlined } from "@ant-design/icons";

import { ColoredButton, ColoredButtonProps } from "../";

export const UploadButton = ({
  children,
  ...rest
}: ColoredButtonProps): ReactElement => {
  return (
    <ColoredButton $spaceTop="SMALL" type="default" {...rest}>
      <UploadOutlined /> {children}
    </ColoredButton>
  );
};
