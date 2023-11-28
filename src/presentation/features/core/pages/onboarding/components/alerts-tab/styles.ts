import styled from "styled-components";

export const Container = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
`;

export const AddEmailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const TitleContainer = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

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

