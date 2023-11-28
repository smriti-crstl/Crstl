import styled from "styled-components";

const PageWrapper = styled.div`
  margin: 28px;
  border-radius: 4px;
`;

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 42px;
  margin-bottom: 42px;
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
    font-size: 14px;
  }
`;

const ItemTableContainer = styled.div`
  overflow: auto;
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
    font-size: 12px;
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
  }

  .no-wrap {
    white-space: nowrap;
  }
`;

const ScrollableTableContainer = styled.div`
  overflow: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  ${ItemTable},
  ${FreightTable} {
    margin: 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
`;

const OrderViewContainer = styled(Container)`
  grid-column-end: span 4;
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

const NoWrapDataCell = styled.td`
  white-space: nowrap;
`;

const TitleContainer = styled.h2`
  margin-top: 18px;
`;

const BorderContainer = styled.div`
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  padding: 0px 12px;
`;

export {
  PageWrapper,
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
  OrderViewContainer,
  FormSelect,
  ScrollableTableContainer,
  ItemTableContainer,
  NoWrapDataCell,
  TitleContainer,
  BorderContainer,
};
