import { Form } from "antd";
import { theme } from "globals/themes";
import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 425px;
  display: flex;
  flex-direction: column;
`;

export const FromItemContainer = styled(Form.Item)`
  .ant-form-item-control-input {
    width: 275px;
  }
  .ant-col {
    min-width: 150px;
  }

  &.date-field&.ant-form-item-has-error .ant-select-selector {
    border-color: ${theme.palette.colors.ALTO} !important;
  }

  &.date-field&.ant-form-item-has-error .ant-select:hover .ant-select-selector {
    border-color: ${theme.palette.colors.PERSIAN_BLUE} !important;
  }

  &.date-field&.ant-form-item-has-error
    .ant-select-focused
    .ant-select-selector {
    border-color: ${theme.palette.colors.PERSIAN_BLUE} !important;
    box-shadow: 0 0 0 2px ${theme.palette.colors.KLIEN_BLUE_BG} !important;
  }

  &.date-field .ant-form-item-explain {
    font-size: 12px;
    margin-top: 3px;
    margin-bottom: 15px;
  }

  &.date-field .ant-form-item-explain-error {
    color: ${theme.palette.colors.INDOCHINE};
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
