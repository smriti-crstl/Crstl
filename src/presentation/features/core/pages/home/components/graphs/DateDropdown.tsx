import { Select } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

const { Option } = Select;

const StyledSelectWrapper = styled.div`
  margin-top: 12px;
  width: 130px;
`;

const DEFAULT_VALUE = "30";

export const DateDropdown = (): ReactElement => {
  return (
    <StyledSelectWrapper>
      <Select value={DEFAULT_VALUE} style={{ width: "100%" }}>
        <Option value={DEFAULT_VALUE}>Last 7 days</Option>
      </Select>
    </StyledSelectWrapper>
  );
};
