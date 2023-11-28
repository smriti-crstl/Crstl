import styled from "styled-components";

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 56px;
  margin-bottom: 56px;
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


const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

const HeaderSummaryTable = styled.table`
  min-width: 450px;
  strong {
    font-weight: 600;
  }
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

const ShipToContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
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
  strong {
    font-weight: 600;
  }
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
  }
  thead {
    background-color: #f6f9fd;
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
`;

const InvoiceViewContainer = styled(Container)`
  grid-column-end: span 4;
  strong {
    font-weight: 600;
  }
`;

const FormContainer = styled(Container)``;

const FormInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  height: 900px;
`;

const FormSelect = styled.select`
  width: 100%;
  margin-bottom: 20px;
`;

const SubFormContainer = styled.div`
  border: 2px solid #dedede;
  border-radius: 8px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  .subform-grid-container {
    grid-column: span 4;
  }
`;

const FieldContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  .label {
    margin: 0;
    font-size: 12px;
    line-height: 18px;
  }

  .value {
    margin: 0;
  }
`;
const InvoiceReadHeader = styled.div`
  margin: 18px 0px;
  font-weight: 600;
`;

const PageWrapper = styled.div`
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  padding: 0 28px;
  margin: 28px;
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
`;

export {
  Container,
  HeaderContainer,
  HeaderSummaryTable,
  ShipToContainer,
  FreightTable,
  ItemTable,
  FormContainer,
  FormInput,
  FormTextArea,
  GridContainer,
  InvoiceViewContainer,
  FormSelect,
  FieldContainer,
  SubFormContainer,
  InvoiceReadHeader,
  PageWrapper,
  LoadingContainer
};
