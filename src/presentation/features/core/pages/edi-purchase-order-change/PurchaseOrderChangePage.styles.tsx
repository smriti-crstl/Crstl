import styled from "styled-components";

const PageWrapper = styled.div``;

const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 22px;
  margin-bottom: 56px;
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

const POChangeDocsListContainer = styled.div`
  margin-bottom: 20px;
  height: 135px;
  border-radius: 16px;
`;

const POChangeDocsPaginationContainer = styled.div`
  width: 150px;
  float: right;
  margin-top: -3.8em;
`;

const POChangeDocMetadataContainer = styled.div`
  border-radius: 16px;
`;

const POChangeDocNewStateContainer = styled.div`
  height: 135px;
  background: rgba(246, 249, 253, 1);
  border-radius: 16px;
  text-align: center;
`;

const POEmojiContainer = styled.div`
  font-size: 20px;
`;

const POChangeDocInvalidStateContainer = styled(POChangeDocNewStateContainer)`
  height: auto;
  min-height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 40px;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
  }
`;

interface StateContainerProps {
  isPOChangeAckSupported?: boolean;
}

const POChangeDocAcceptedStateContainer = styled.div<StateContainerProps>`
  height: ${({ isPOChangeAckSupported }) =>
    isPOChangeAckSupported ? "135px" : "83px"};
  background: rgba(52, 168, 83, 0.1);
  text-align: center;
  border-radius: 16px;
`;

const POChangeDocRejectedStateContainer = styled.div<StateContainerProps>`
  height: ${({ isPOChangeAckSupported }) =>
    isPOChangeAckSupported ? "135px" : "83px"};
  background: rgba(255, 239, 239, 1);
  text-align: center;
  border-radius: 16px;
`;

const POChangeDocStateLabel = styled.label<StateContainerProps>`
  position: relative;
  top: ${({ isPOChangeAckSupported }) =>
    isPOChangeAckSupported ? "15%" : "35%"};
`;

const POChangeDocNewStateTextPrompt = styled.label`
  position: relative;
  top: 15%;
`;

const POChangeDocNewStateButtonsContainer = styled.div`
  position: relative;
  top: 30%;
  margin-left: 200px;
  margin-right: 200px;
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
  POChangeDocsListContainer,
  POChangeDocsPaginationContainer,
  POChangeDocMetadataContainer,
  POChangeDocNewStateContainer,
  POChangeDocAcceptedStateContainer,
  POChangeDocRejectedStateContainer,
  POChangeDocStateLabel,
  POChangeDocNewStateTextPrompt,
  POChangeDocNewStateButtonsContainer,
  ScrollableTableContainer,
  POChangeDocInvalidStateContainer,
  POEmojiContainer,
};

