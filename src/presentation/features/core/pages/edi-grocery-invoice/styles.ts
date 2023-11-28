import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 0 28px;
`;

export const Container = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-top: 22px;
  margin-bottom: 22px;
  border: 1px solid ${({ theme }) => `${theme.palette.colors.ULTRAMARINE_BLUE}`};
  border-radius: 4px;
  padding: 20px 32px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

export const HeaderSummaryContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => `${theme.palette.colors.WHITE_SMOKE}`};
  padding: 0px 12px;
`;

export const HeaderSummaryTable = styled.table`
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

export const AddressContainer = styled.div`
  display: flex;
  gap: 60px;
  margin-top: 30px;
`;

export const ItemTable = styled.table`
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

export const ScrollableTableContainer = styled.div`
  overflow: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  ${ItemTable} {
    margin: 0;
  }
`;
