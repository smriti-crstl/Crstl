import { Select } from "antd";
import styled from "styled-components";

export const TableContainer = styled.div`
  overflow: auto;
`;

export const StyledSelect = styled(Select)``;

export const RemoveButtonWrapper = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.base.PRIMARY};
`;
