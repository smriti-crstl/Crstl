import { InputNumber } from "antd";
import styled from "styled-components";

export const TableContainer = styled.div`
  overflow: auto;
`;

export const RemoveButtonWrapper = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.base.PRIMARY};
`;
