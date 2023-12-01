import { Table } from "antd";
import { usePurchaseOrderDetailsQuery } from "domain/interactors/orders";
import { currencyUSDFormatter } from "presentation/utils";
import { ReactElement } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { GenericError } from "components/atoms/error";

import {
  ORDER_DETAILS_PURCHASE_ORDER_TABLE_CONFIG,
  OrderItems,
} from "../../../../config/purchaseOrderTableConfig";

export const TableContainer = styled.div`
  tbody {
    font-size: 12px;
    font-weight: 400;
  }
  background-color: ${({ theme }) => theme.palette.background.PRIMARY};
  .ant-table-pagination.ant-pagination {
    margin-right: 16px;
  }
`;

const modTableData = (data: OrderItems[]): OrderItems[] => {
  if (data.length < 5) {
    const dataClone = [...data];
    const length = dataClone.length;
    for (let i = length; i < 5; i++) {
      dataClone.push({
        externalSku: "",
        productName: "",
        unitPrice: undefined,
        quantity: undefined,
      });
    }
    return dataClone;
  }
  return data;
};

export const OrderDetailsTablePoSummary = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data } = usePurchaseOrderDetailsQuery(id);

  const orderItemsData = ((data?.orderItems?.map((item) => ({
    ...item,
    key: item.externalSku,
  })) || []) as unknown) as OrderItems[];

  if (isError) {
    return <GenericError />;
  }

  return (
    <>
      <TableContainer>
        <Table
          pagination={false}
          size="large"
          dataSource={modTableData(orderItemsData)}
          loading={isLoading}
          style={{ height: "100%" }}
          columns={ORDER_DETAILS_PURCHASE_ORDER_TABLE_CONFIG}
        />
      </TableContainer>

      {data?.totalNotProvided ? (
        <div
          style={{
            display: "flex",
            height: "3.5rem",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <h4
            style={{
              margin: "0 1rem 0 0",
              fontWeight: 500,
              fontSize: "14px",
              color: "#0012A6",
            }}
          >
            Total Price:
          </h4>
          <h4
            style={{
              margin: "0 1rem 0 0",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            {data.channelName}&nbsp;does not provide this information for its
            Purchase Orders, data estimated by Crstl
          </h4>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "3.5rem",
            alignItems: "center",
            marginLeft: "62%",
          }}
        >
          <h4
            style={{
              margin: "0 1rem 0 0",
              fontWeight: 500,
              fontSize: "14px",
              color: "#0012A6",
            }}
          >
            Total Price:
          </h4>
          <b style={{ color: "#000000, 85%", fontWeight: 500 }}>
            {data?.totalAmount && currencyUSDFormatter(data?.totalAmount)}
          </b>
        </div>
      )}
    </>
  );
};
