import { Button, ButtonProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

const UnderlinedButtonComponent = (props: ButtonProps): ReactElement => {
  return (
    <Button type="link" {...props}>
      {props.children}
    </Button>
  );
};

export const UnderlinedButton = styled(UnderlinedButtonComponent)`
  :hover {
    > span {
      text-decoration: underline;
    }
  }
  :disabled {
    cursor: default !important;
  }
`;
