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
`;

export const OrderContainer = styled.div`
  margin-top: 17px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

export const HeaderSummaryWrapper = styled.div`
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
    border-bottom: 1px solid
      ${({ theme }) => `${theme.palette.colors.WHITE_SMOKE}`};
  }
`;

export const AddressContainer = styled.div`
  display: flex;
  gap: 60px;
  margin-top: 30px;
`;

export const TabsAndVersionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;

  .ant-tabs-nav:before {
    content: none;
  }
`;

