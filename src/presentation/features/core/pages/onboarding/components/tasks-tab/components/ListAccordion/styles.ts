import { Collapse, Space } from "antd";
import styled from "styled-components";

import { OnboardingTaskData } from "models/v1/edi/OnboardingTaskList";

const { Panel } = Collapse;

interface WrapperProps {
  extraStyle: {
    borderColor: string;
    backgroundColor: string;
    borderStyle: string;
    borderWidth: number;
  };
}

export const LaneHeader = styled.div`
  display: flex;
  gap: 10px;
  font-weight: 700;
  align-items: center;
`;

export const ColorCircle = styled.div<WrapperProps>`
  border: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 6px;
  background-color: ${(props) => props.extraStyle.borderColor};
`;

export const StyledSpacer = styled(Space)<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  margin-bottom: 12px;

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px 16px;
  }

  .ant-collapse-content {
    border-top-color: ${(props) => props.extraStyle.borderColor};
    border-top-width: ${(props) => props.extraStyle.borderWidth}px;
    border-top-style: ${(props) => props.extraStyle.borderStyle};
  }
`;

export const StyledCollapse = styled(Collapse)`
  border-radius: 4px;
`;

export const StyledPanel = styled(Panel)`
  border-bottom: none !important;
`;

interface TableContainerProps {
  styleProp: OnboardingTaskData["style"];
}

export const TableContainer = styled.div<TableContainerProps>`
  overflow: auto;

  .ant-table-cell {
    background: transparent;
  }

  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th {
    border-bottom-color: ${({ styleProp }) => styleProp.borderColor};

    /* background-color: ${({ styleProp }) => styleProp.backgroundColor}; */
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }
`;
