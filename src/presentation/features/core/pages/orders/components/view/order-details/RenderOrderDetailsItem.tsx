import { Col, Row } from "antd";
import { Key, ReactElement } from "react";
import styled from "styled-components";

import { OrderDetailsDataSource } from "../../../config/orderDetails";

type Props = OrderDetailsDataSource & {
  key: Key;
};

const StyledLabelCol = styled(Col)`
  font-weight: ${({ theme }) => theme.typography.WEIGHTS.MEDIUM};
`;

export const RenderOrderDetailsItem = ({
  value,
  label,
  anchorUrl,
  isAnchor,
}: Props): ReactElement => {
  return (
    <Row style={{ width: "100%" }} gutter={24}>
      <Col span={10}>{label}</Col>
      <StyledLabelCol span={14}>
        {isAnchor ? (
          <a rel="noreferrer" href={anchorUrl} target="_blank">
            {value}
          </a>
        ) : value.length > 2 ? (
          value
        ) : (
          "-"
        )}
      </StyledLabelCol>
    </Row>
  );
};
