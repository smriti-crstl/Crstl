import { Button, Collapse } from "antd";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  height: 45px;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.palette.colors.HAWKES_BLUE};
  color: ${({ theme }) => theme.palette.base.PRIMARY};
  border: 1px solid ${({ theme }) => theme.palette.base.PRIMARY};
  padding: 0 90px;

  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.palette.colors.HAWKES_BLUE};
  }
`;

export const SectionTitleLineContainer = styled.div`
  text-align: center;
  border-bottom: 1px dashed ${({ theme }) => theme.palette.colors.DUSTY_GRAY};
  line-height: 0.1em;
  margin: 44px 0;

  span {
    padding: 0 46px;
    font-weight: 500;
    font-size: 20px;
    background-color: ${({ theme }) => theme.palette.background.PRIMARY};
  }
`;

export const StyledCollapse = styled(Collapse)`
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  border-radius: 4px;

  .ant-collapse-item {
    border-bottom: none;
  }

  .ant-collapse-header {
    background-color: ${({ theme }) => theme.palette.colors.POLAR};
    border-radius: 4px !important;
    color: ${({ theme }) => theme.palette.base.PRIMARY} !important;
    position: relative;

    .ant-collapse-arrow {
      position: absolute;
      left: calc(100% - 40px) !important;
    }
  }

  .ant-collapse-content {
    border-top: 1px solid
      ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  }
`;

export const SubFormContainer = styled.div`
  padding-top: 15px;
`;
