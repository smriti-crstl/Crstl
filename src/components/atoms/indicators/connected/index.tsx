import { ReactElement } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Row } from "antd";

const SuccessIcon = styled(CheckCircleFilled)`
  font-size: 16px;
  svg {
    color: ${({ theme }) => theme.palette.base.SUCCESS};
  }
`;

const TextWrapper = styled.span`
  color: ${({ theme }) => theme.palette.base.SUCCESS};
  font-weight: 500;
`;

export const ConnectedIndicator = (): ReactElement => {
  return (
    <Row align="middle" justify="end">
      <SuccessIcon />
      &nbsp;&nbsp;
      <TextWrapper>Connected</TextWrapper>
    </Row>
  );
};
