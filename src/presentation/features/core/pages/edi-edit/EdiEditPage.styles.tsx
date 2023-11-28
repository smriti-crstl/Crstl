import { Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 28px;

  .form-group.has-error .error-detail {
    display: none;
  }

  .rjsf > div > button {
    display: none;
  }

  .ant-form-label .form-label {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;
  overflow: hidden;
  padding: 20px 32px;
`;

const ContainerBordered = styled(Container)`
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  padding: 28px;
  padding-top: 0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 22px;
  margin-bottom: 22px;
`;

const LoadingContainer = styled(ContainerBordered)`
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuickLinksContainer = styled.div`
  width: 324px;
  margin-top: 28px;
  display: flex;
`;

const QuickLinks = styled.div`
  display: flex;
  background-color: #edeff2;
  border-radius: 9px;
  overflow: hidden;
`;

const HighlightedButton = styled.div`
  font-size: 14px;
  line-height: 22px;
  padding: 10px 18px;
  color: white;
  background-color: #0012a6;
  border-radius: 9px;
`;

const QuickLinkButton = styled(Link)`
  font-size: 14px;
  line-height: 22px;
  padding: 10px 18px;
  color: black;
`;

const FormContainer = styled.div`
  grid-column-end: span 6;
`;
const DynamicFormContainer = styled.div`
  margin-top: 20px;
  .ant-col.form-group.field {
    margin-bottom: 0px;
  }
  grid-column-end: span 6;
  .no-display {
    display: none;
  }
  .grid-two-column {
    fieldset {
      display: grid;
      justify-content: start;
      grid-template-columns: 300px 300px;
      grid-column-gap: 32px;
    }
  }
  .grid-three-column {
    .field fieldset {
      display: grid;
      justify-content: start;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      // grid-template-columns: 300px 300px 300px;
      grid-column-gap: 32px;
    }

    .array-item-toolbox {
      width: 200px;
      margin-bottom: 40px;
      max-width: 100%;
    }
  }
  .array-item-move-up,
  .array-item-move-down {
    display: none;
  }
  // .array-item-add {
  //   left: 200px;
  // }
  // .array-item-remove {
  //   left: 400px;
  // }

  /* // * NOTE: Argo specific table styles */
  .ant-table {
    padding: 4px 0;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.palette.colors.BOTTICELLI};
    overflow-x: auto;

    table {
      border-collapse: collapse;

      .ant-table-tbody {
        td {
          border-left: 1px solid
            ${({ theme }) => theme.palette.colors.BOTTICELLI};

          &:first-of-type {
            border-left: none;
          }
        }
      }

      .ant-table-thead {
        th {
          background-color: ${({ theme }) => theme.palette.colors.POLAR};
          border-left: 1px solid
            ${({ theme }) => theme.palette.colors.BOTTICELLI};
          border-bottom: none;

          &:first-of-type {
            border-left: none;
            border-radius: 0;
          }

          &:last-of-type {
            border-radius: 0;
          }
        }
      }
    }
  }
`;

const OutputContainer = styled.div`
  grid-column: span 2;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 500px;
`;

const FullWidthFormControl = styled.div`
  .ant-picker {
    width: 100%;
  }
`;

const BorderedSubFormWrapper = styled.div`
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
  margin-bottom: 15px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SubFormFieldsWrapper = styled.div`
  padding: 20px;
`;

export const SubFormFieldsWrapperQE = styled.div`
  padding: 20px 24px 0px 20px;
`;

const SubFormRemoveButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.colors.POLAR};
  padding: 12px 22px;
  color: ${({ theme }) => theme.palette.base.PRIMARY};
  margin-top: 4px;
`;

const SubFormRemoveButtonWrapperQE = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.base.PRIMARY};
  position: absolute;
  top: 4px;
  right: 4px;
`;

const SubFormWrapper = styled.div``;

const SubFormContainer = styled.div`
  padding-top: 24px;
  border-top: 1px dashed grey;
  &:first-child {
    border-top: none;
  }
`;

const AlertContainer = styled.div`
  margin-bottom: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
    white-space: pre-line;
  }
`;

const ShipmentHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 24px;
  // width: 80vw;
`;

const ShipmentHeaderBottomRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderSummaryTable = styled.table`
  min-width: 550px;
  th {
    font-weight: normal;
  }
  padding: 2px;
  th,
  tr {
    padding: 12px 14px;
  }
  tr:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const FreightTable = styled.table`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  vertical-align: top;
  p {
    margin: 0;
  }
  td {
    border: 1px solid #f0f0f0;
    padding: 16px 16px;
    vertical-align: top;
  }
`;

const ItemTable = styled.table`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  vertical-align: top;
  p {
    margin: 0;
  }
  td {
    border: 1px solid #f0f0f0;
    padding: 16px 16px;
    vertical-align: top;
    font-family: Inter;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    height: 178px;
  }
  th {
    border: 1px solid #f0f0f0;
    padding: 16px 16px;
    vertical-align: top;
    font-family: Inter;
    font-size: 16px;
    // font-weight: 300;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
  thead {
    background-color: #f6f9fd;
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    height: 106px;
  }
`;

const ShipNoticeHeader = styled.div`
  margin-top: 18px;
`;

const FormHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  padding-top: 28px;
  margin-left: -28px;
  margin-right: -28px;

  .pinned-header & {
    box-shadow: 0 5px 10px -5px rgb(0 0 0 / 20%);
  }

  .ant-alert {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding-left: 28px;
  padding-right: 28px;
`;

const FormTitle = styled.h2`
  max-width: 440px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AddressContainer = styled.div`
  width: 300px; ;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const DebugContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;
`;

const DebugFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  textarea {
    width: 100%;
    height: 300px;
  }
`;

export const StyledSecondaryButton = styled(Button)`
  color: ${({ theme }) => theme.palette.colors.ALMOST_BLACK};
  box-shadow: none;
  box-shadow: none;

  &:hover {
    color: ${({ theme }) => theme.palette.colors.CORNFLOWER_BLUE};
    border-color: ${({ theme }) => theme.palette.colors.CORNFLOWER_BLUE};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.colors.MERCURY} !important;
    border-color: ${({ theme }) => theme.palette.colors.MERCURY} !important;
    background-color: ${({ theme }) =>
      theme.palette.background.PRIMARY} !important;
  }
`;

export const StyledPrimaryButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  border-color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  background-color: ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  text-shadow: none;
  box-shadow: none;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.text.SECONDARY};
    border-color: ${({ theme }) => theme.palette.colors.RHINO};
    background-color: ${({ theme }) => theme.palette.colors.RHINO};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.text.SECONDARY} !important;
    border-color: ${({ theme }) => theme.palette.colors.FOG} !important;
    background-color: ${({ theme }) => theme.palette.colors.FOG} !important;
  }
`;

export const StyledGhostButton = styled(Button)`
  color: ${({ theme }) => theme.palette.colors.CORNFLOWER_BLUE} !important;
  border-color: ${({ theme }) =>
    theme.palette.colors.CORNFLOWER_BLUE} !important;
  box-shadow: none;
  box-shadow: none;
`;

export {
  PageWrapper,
  Container,
  ContainerBordered,
  FormContainer,
  OutputContainer,
  TextArea,
  FullWidthFormControl,
  SubFormWrapper,
  SubFormContainer,
  AlertContainer,
  BorderedSubFormWrapper,
  SubFormRemoveButtonWrapper,
  SubFormRemoveButtonWrapperQE,
  HeaderContainer,
  ShipmentHeaderContainer,
  ShipmentHeaderBottomRowContainer,
  HeaderSummaryTable,
  FreightTable,
  ItemTable,
  ShipNoticeHeader,
  QuickLinksContainer,
  QuickLinks,
  FormHeader,
  FormHeaderContainer,
  LoadingContainer,
  HighlightedButton,
  QuickLinkButton,
  ButtonContainer,
  AddressContainer,
  DynamicFormContainer,
  ButtonsContainer,
  DebugContainer,
  DebugFormField,
  FormTitle,
};

