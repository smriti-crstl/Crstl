import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 20px 35px;
  /* border: 1px solid ${({ theme }) => theme.palette.colors.ALTO}; */
  border: 1px solid ${({ theme }) => theme.palette.colors.ULTRAMARINE_BLUE};
  border-radius: 10px;
  margin-top: 20px;

  .ant-table {
    overflow-x: auto;
  }
  .ant-table-cell {
    padding-left: 0px;
    background: transparent;
  }
`;

export const TableTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const TitleContainer = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

export const ImageWrapper = styled.div`
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const TradingPartnetBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 8px;
  div {
    display: flex;
    flex-direction: column;
  }
  span:nth-child(2) {
    color:  ${({ theme }) => theme.palette.colors.GRAY};
`;

export const ActiveIntegrationsBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  cursor: pointer;
`;

