import { Tooltip } from "antd";
import styled from "styled-components";

export const EmptyCardWrapper = styled.div`
  margin-top: 70px;
`;

export const SelectedDateRangeWrapper = styled.div`
  font-size: 12px;
  font-weight: 100;
`;

export const PieChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalBoard = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

export const StyledPopover = styled(Tooltip)`
  && .ant-tooltip-content > .ant-tooltip-arrow {
    display: none;
  }
`;
