import { useContext } from "react";
import moment from "moment";
import { currencyUSDFormatter, EllipsedText } from "presentation/utils";
import { FixedSizeCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
// import { SelectedDateRange } from "../../common";
import { EmptyCardWrapper } from "../../common/common.styles";
import styled from "styled-components";
import { AnalyticsDateRangeContext } from "../";
import { useGetAccountsReceivableAgingQuery } from "domain/interactors/analytics";
import { FINANCE_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { DataSources } from "presentation/features/common/components/DataSources";
import { TableContainer } from "./Finance.styles";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";

const columns = [
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (value: string) => {
      return EllipsedText(value, 30);
    },
  },
  {
    title: "Current",
    dataIndex: "current",
    key: "current",
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
  {
    title: "1-30 days",
    dataIndex: "due1to30",
    key: "due1to30",
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
  {
    title: "31-60 days",
    dataIndex: "due31to60",
    key: "due31to60",
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
  {
    title: "61-90 days",
    dataIndex: "due61to90",
    key: "due61to90",
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
  {
    title: "90+ days",
    dataIndex: "dueMoreThan90",
    key: "dueMoreThan90",
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
];

const StyledCardBody = styled.div`
  padding: 5px;
  padding-top: 10px;
`;

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.palette.text.HINT};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function AccountsReceivableAgingReport(): JSX.Element {
  const { startDate, endDate } = useContext(AnalyticsDateRangeContext);

  const {
    data,
    lastUpdatedAt,
    isLoading,
    isError,
  } = useGetAccountsReceivableAgingQuery(startDate, endDate);

  return (
    <FixedSizeCard
      title={
        <HeaderContainer>
          <div>
            <span>{FINANCE_CHART_HEADER.ACCOUNTS_RECEIVABLE}</span>
            {lastUpdatedAt ? (
              <StyledTimeSpan>
                Last updated {moment(lastUpdatedAt).fromNow()}
              </StyledTimeSpan>
            ) : null}
          </div>
          <DownloadButtonContainer>
            <ExcelExport
              csvData={data?.data}
              fileName={CSV_FILE_NAME.ACCOUNTS_RECEIVABLE}
              config={CSV_CONFIG.ACCOUNTS_RECEIVABLE}
            />
            {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
          </DownloadButtonContainer>
        </HeaderContainer>
      }
    >
      <ErrorBoundary isError={isError}>
        <StyledCardBody>
          {!isLoading && data ? (
            data?.data.length ? (
              <TableContainer
                dataSource={data.data}
                columns={columns}
                size="small"
                pagination={{
                  position: ["bottomRight"],
                  pageSize: 5,
                  size: "small",
                  showSizeChanger: false,
                }}
              />
            ) : (
              <EmptyCardWrapper>
                <EmptyData />
              </EmptyCardWrapper>
            )
          ) : (
            <GenericLoading type="spinner" />
          )}
        </StyledCardBody>
      </ErrorBoundary>
    </FixedSizeCard>
  );
}

export { AccountsReceivableAgingReport };
