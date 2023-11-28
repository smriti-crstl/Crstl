import { DatePicker, Input, Select } from "antd";
import styled from "styled-components";

export const TableContainer = styled.div`
  overflow: auto;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 130px;
`;

export const StyledSelect = styled(Select)`
  width: 250px;
`;

export const StyledInput = styled(Input)`
  width: 130px;
`;

export const RemoveButtonWrapper = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.base.PRIMARY};
`;
