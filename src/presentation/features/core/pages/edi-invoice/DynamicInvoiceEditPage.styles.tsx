import { Link } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 28px;
`

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;
`

const ContainerBordered = styled(Container)`
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  padding: 28px;
  padding-top: 0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 22px;
  margin-bottom: 22px;
`

const LoadingContainer = styled(ContainerBordered)`
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const QuickLinksContainer = styled.div`
  margin-top: 28px;
  display: flex;
`

const QuickLinks = styled.div`
  display: flex;
  background-color: #edeff2;
  border-radius: 9px;
  overflow: hidden;
`

const HighlightedButton = styled.div`
  font-size: 14px;
  line-height: 22px;
  padding: 10px 18px;
  color: white;
  background-color: #0012a6;
  border-radius: 9px;
`

const QuickLinkButton = styled(Link)`
  font-size: 14px;
  line-height: 22px;
  padding: 10px 18px;
  color: black;
`

const FormContainer = styled.div`
  .no-display {
    display: none;
  }

  grid-column-end: span 6;
  .grid-two-column {
    fieldset {
      display: grid;
      justify-content: start;
      grid-template-columns: 300px 300px;
      grid-column-gap: 32px;
    }
  }
  .grid-three-column {
    fieldset {
      display: grid;
      justify-content: start;
      grid-template-columns: 300px 300px 300px;
      grid-column-gap: 32px;
    }
  }
  .array-item-move-up,
  .array-item-move-down {
    display: none;
  }
`

const DebugContainer = styled(Container)`
  grid-template-columns: repeat(6, minmax(0, 1fr));
`

const OutputContainer = styled.div`
  grid-column: span 2;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 500px;
`

const FullWidthFormControl = styled.div`
  .ant-picker {
    width: 100%;
  }
`

const BorderedSubFormWrapper = styled.div`
  padding: 20px;
  border: 2px solid #dfdfdf;
  margin-bottom: 20px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`

const SubFormRemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`

const SubFormWrapper = styled.div``

const SubFormContainer = styled.div`
  padding-top: 24px;
  border-top: 1px dashed grey;
  &:first-child {
    border-top: none;
  }
`

const AlertContainer = styled.div`
  margin-bottom: 24px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
    white-space: pre-line;
  }
`

const ShipmentHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 24px;
  width: 80vw;
`

const ShipmentHeaderBottomRowContainer = styled.div`
  display: flex;
  grid-column-gap: 418px;
`

const HeaderSummaryTable = styled.table`
  min-width: 450px;
  th {
    font-weight: normal;
  }
  th,
  td {
    white-space: pre-line;
    border: 1px solid #f0f0f0;
    padding: 4px 8px;
  }
`

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
`

const ItemTable = styled.table`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  vertical-align: top;
  p {
    margin: 0;
  }
  thead {
    background-color: #fafafa;
  }
  td {
    border: 1px solid #f0f0f0;
    padding: 16px 16px;
    vertical-align: top;
  }
`

const ShipNoticeHeader = styled.div`
  margin-top: 18px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`

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
`

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding-left: 28px;
  padding-right: 28px;
`

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
  SubFormRemoveButton,
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
  ButtonsContainer,
  DebugContainer,
}
