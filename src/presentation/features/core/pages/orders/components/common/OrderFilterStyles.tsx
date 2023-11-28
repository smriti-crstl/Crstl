import { Col, Row, Tooltip } from "antd";
import styled from "styled-components";

export const OrderFilterContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  min-height: 45px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const CheckBoxContainer = styled.span`
  margin-left: 12px;
`;

export const StyledTooltip = styled(Tooltip)`
  font-size: 16px;
`;

export const StyledRow = styled(Row)`
  margin-top: 46px;
  margin-bottom: 24px;
`;

export const StyledCol = styled(Col)`
  margin-right: 8px;
`;
