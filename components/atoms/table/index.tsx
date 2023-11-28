import { Table, TableProps } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

export const TableContainer = styled.div`
  tbody {
    font-size: 12px;
  }
  background-color: ${({ theme }) => theme.palette.background.PRIMARY};
  .ant-table-pagination.ant-pagination {
    margin-right: 16px;
  }
  .ant-table-cell {
    vertical-align: top;
  }
`;

export const StyledTableContainer = styled.div`
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.colors.ALMOST_BLACK};
  tbody,
  thead {
    font-size: 12px;
  }
  thead th,
  tbody td {
    padding: 12px 8px;
  }
  .ant-table-thead {
    .ant-table-cell {
      background-color: ${({ theme }) =>
        theme.palette.background.TABLE_HEADER_BG_COLOR};
    }
  }
`;

function StyedTable(props) {
  return (
    <StyledTableContainer>
      <Table {...props} />
    </StyledTableContainer>
  );
}

export type SimpleTableProps<RecordType> = TableProps<RecordType>;

export const SimpleTable = <T extends TableProps<T>>({
  ...rest
}: SimpleTableProps<T>): ReactElement => {
  return (
    <TableContainer>
      <Table
        pagination={{
          showSizeChanger: false,
        }}
        {...rest}
      />
    </TableContainer>
  );
};

export { StyedTable };
