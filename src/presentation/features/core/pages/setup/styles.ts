import { Input, Select } from "antd";
import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 0 40px 40px;
`;

export const SectionContainer = styled.div`
  padding: 40px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  border-radius: 6px;
`;

export const LeftSection = styled.div`
  width: 40%;

  .ant-spin-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  padding-right: 40px;
`;

export const RightSection = styled.div`
  width: 60%;

  .ant-spin-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  border-left: 1px solid ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  padding-left: 40px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Question = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const Note = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.HINT};
`;

export const VendorFieldContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledSelect = styled(Select)`
  width: 40%;
`;

export const StyledInput = styled(Input)`
  width: 40%;
`;

