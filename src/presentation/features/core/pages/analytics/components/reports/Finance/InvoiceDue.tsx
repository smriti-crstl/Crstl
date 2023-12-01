import { Select, Tooltip } from "antd";
import { usePaymentDetailQuery } from "domain/interactors/analytics";
import moment from "moment";
import { currencyUSDFormatter } from "presentation/utils";
import { ReactElement, useState, useEffect } from "react";

import { AnalyticsPaperCard } from "components/atoms/card";
import { EmptyData } from "components/atoms/empty";
import { GenericLoading } from "components/atoms/loading";

import { FINANCE_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { EmptyCardWrapper } from "../../common/common.styles";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";

import {
  InvoiceDueTableContainer,
  TotalAmount,
  TotalAmountContainer,
  TotalAmountPrefix,
  HeaderContainer,
  TitleContainer,
  FullHeightDiv,
  MarginTopDiv,
  CardContainer,
  StyledSelect,
  // StyledMenuItem,
} from "./Finance.styles";
import { theme } from "globals/themes";
import { MenuKeys } from "./Finance.enums";
import { CheckOutlined } from "@ant-design/icons";
export const InvoiceDue = (): ReactElement => {
  const todayDate = new Date();
  const start = moment(todayDate).format("YYYY-MM-DD");
  const myDate = moment(
    new Date(todayDate.getTime() + 90 * 24 * 60 * 60 * 1000)
  ).format("YYYY-MM-DD");

  const { data, isFetching, isError } = usePaymentDetailQuery(start, myDate);

  const [tableData, setTableData] = useState<any>();
  const [isFavorites, setIsFavorites] = useState(false);
  const { Option } = Select;

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
      render: (value: string) => {
        const fullValue = value;
        if (value.length > 20) {
          value = `${value.slice(0, 17)}...`;
        }
        return {
          children: <Tooltip title={fullValue}>{value}</Tooltip>,
        };
      },
    },
    {
      title: "Date Due",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (value: string) => moment(value).format("L"),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value: number, record: any) => {
        const sign = record.type === "receivable" ? "+" : "-";
        return {
          props: {
            style: {
              color:
                sign === "+"
                  ? theme.palette.colors.CHATEAU_GREEN
                  : theme.palette.colors.NEGATIVE_RED,
            },
          },
          children: <>{sign + " " + currencyUSDFormatter(Number(value))}</>,
        };
      },
    },
  ];

  const handleMenuClick = (e: any): void => {
    const newData =
      e === MenuKeys.ALL
        ? data?.data
        : data?.data.filter((d: any) => d.type === e);

    const total =
      e === MenuKeys.ALL
        ? data?.total
        : newData
            ?.map((d: any) => parseFloat(d.totalAmount))
            .reduce((a: number, b: number) => a + b, 0)
            .toString();

    setTableData({
      total: e === MenuKeys.PAYABLE ? `-${total}` : total, // Adding a '-' sign for payables
      data: newData,
    });
  };

  const getTotalAmount = (): string => {
    if (!parseFloat(tableData?.total)) {
      return `${currencyUSDFormatter(tableData?.total)}`;
    }
    return `${
      parseFloat(tableData?.total) > 0 ? "+" : "-"
    } ${currencyUSDFormatter(Number(Math.abs(parseFloat(tableData?.total))))}`;
  };

  const totalAmount = getTotalAmount();

  const onFavoriteChange = (): void => {
    setIsFavorites(!isFavorites);
  };

  return (
    <AnalyticsPaperCard
      title={
        <HeaderContainer>
          <TitleContainer>{FINANCE_CHART_HEADER.INVOICE_DUE}</TitleContainer>
          <StyledSelect
            onSelect={handleMenuClick}
            defaultValue={MenuKeys.ALL}
            menuItemSelectedIcon={<CheckOutlined />}
          >
            <Option value={MenuKeys.ALL}>All</Option>
            <Option value={MenuKeys.RECEIVABLE}>Receivables</Option>
            <Option value={MenuKeys.PAYABLE}>Payables</Option>
          </StyledSelect>
        </HeaderContainer>
      }
      isFavorites={isFavorites}
      onFavoriteChange={onFavoriteChange}
    >
      <ErrorBoundary isError={isError}>
        <CardContainer>
          {!isFetching && tableData ? (
            tableData?.data.length > 0 ? (
              <FullHeightDiv>
                <MarginTopDiv>
                  <InvoiceDueTableContainer
                    dataSource={tableData?.data}
                    columns={columns}
                    size="small"
                    pagination={{
                      position: ["bottomRight"],
                      pageSize: 5,
                      size: "small",
                      showSizeChanger: false,
                      showLessItems: true,
                    }}
                  />
                  <TotalAmountContainer>
                    <TotalAmountPrefix>Total:{"  "}</TotalAmountPrefix>
                    <TotalAmount sign={totalAmount[0]}>
                      {totalAmount}
                    </TotalAmount>
                  </TotalAmountContainer>
                </MarginTopDiv>
              </FullHeightDiv>
            ) : (
              <EmptyCardWrapper>
                <EmptyData />
              </EmptyCardWrapper>
            )
          ) : (
            <GenericLoading type="spinner" />
          )}
        </CardContainer>
      </ErrorBoundary>
    </AnalyticsPaperCard>
  );
};
