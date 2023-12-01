import { Table } from "antd";
import {
  useOrganizationConfigQuery,
  usePurchaseOrderDetailsQuery,
} from "domain/interactors/orders";
import { ReactElement } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { GenericError } from "components/atoms/error";

import { ORDER_DETAILS_TABLE_CONFIG } from "../../../../config/orderDetailsTable";
import {
  StatusTableConfig,
  useStatusTableConfig,
} from "./hooks/useStatusTableConfig";

export const TableContainer = styled.div`
  tbody {
    font-size: 14px;
    font-weight: 400;
  }
  background-color: ${({ theme }) => theme.palette.background.PRIMARY};
  .ant-table-pagination.ant-pagination {
    margin-right: 16px;
  }
`;

export const OrderDetailsTableSection = (): ReactElement => {
  // Fetch Organization Config
  const {
    data: organizationConfigData,
    isLoading: isOrganizationConfigLoading,
  } = useOrganizationConfigQuery({ staleTime: Infinity });

  const { id } = useParams<{ id: string }>();

  const {
    isLoading: userDetailsLoading,
    isError,
    data: purchaseOrderDetails,
    isFetching: userDetailsFetching,
  } = usePurchaseOrderDetailsQuery(id);

  const tableDataSource = useStatusTableConfig({
    orderDetails: purchaseOrderDetails,
    config: organizationConfigData,
  }) as StatusTableConfig[];

  if (isError) {
    return <GenericError />;
  }
  return (
    <TableContainer>
      <Table
        pagination={false}
        size="large"
        dataSource={tableDataSource}
        loading={
          isOrganizationConfigLoading ||
          userDetailsLoading ||
          userDetailsFetching
        }
        style={{ height: "100%" }}
        columns={ORDER_DETAILS_TABLE_CONFIG}
      />
    </TableContainer>
  );
};
