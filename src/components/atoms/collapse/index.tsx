import { Collapse, CollapseProps } from "antd";
import styled from "styled-components";

type StyledCollapseProps = CollapseProps & {
  $isActive?: boolean;
};

export const StyledCollapse = styled(Collapse)<StyledCollapseProps>`
  margin-bottom: 16px;
  &&.ant-collapse {
    border: solid 1px #f0f0f0;
  }

  .ant-collapse-item {
    border: 0;
  }

  .ant-collapse-content {
    border-top: 1px solid #f0f0f0;
  }

  .ant-collapse-header {
    font-size: 1rem;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
  }

  .ant-collapse-arrow {
    margin-top: 6px;
    svg {
      font-weight: 700;
      font-size: 14px;
    }
  }
`;
