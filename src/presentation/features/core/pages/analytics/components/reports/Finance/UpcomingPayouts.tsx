import { ReactElement } from "react";
import { FixedSizeCard } from "components/atoms/card";
import { EmptyData } from "components/atoms/empty";
import { GenericLoading } from "components/atoms/loading";
import { PayoutData } from "domain/entity/analytics/model";
import { useGetUpcomingPayoutsQuery } from "domain/interactors/analytics";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { currencyUSDFormatter } from "presentation/utils";

import { FINANCE_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { EmptyCardWrapper } from "../../common/common.styles";

import {
  TableContainer,
  HeaderContainer,
  TitleContainer,
  CardContainer,
} from "./Finance.styles";
import { DataSources } from "presentation/features/common/components/DataSources";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";

const columns = [
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (value: number | string) => currencyUSDFormatter(Number(value)),
  },
];

const UpcomingPayoutsData = ({
  data,
}: {
  data?: PayoutData[];
}): ReactElement => {
  const isDataAvailable = Boolean(data && data.length > 0);

  return isDataAvailable ? (
    <TableContainer
      dataSource={data}
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
  ) : (
    <EmptyCardWrapper>
      <EmptyData />
    </EmptyCardWrapper>
  );
};

export const UpcomingPayouts = (): ReactElement => {
  const { data, isError, isFetching } = useGetUpcomingPayoutsQuery();

  return (
    <FixedSizeCard
      title={
        <HeaderContainer>
          <TitleContainer>
            {FINANCE_CHART_HEADER.UPCOMING_PAYOUTS}
          </TitleContainer>
          <DownloadButtonContainer>
            <ExcelExport
              csvData={data?.data}
              fileName={CSV_FILE_NAME.UPCOMING_PAYOUTS}
              config={CSV_CONFIG.UPCOMING_PAYOUTS}
              showText
            />
            {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
          </DownloadButtonContainer>
        </HeaderContainer>
      }
    >
      <ErrorBoundary isError={isError}>
        <CardContainer>
          {!isFetching ? (
            <UpcomingPayoutsData data={data?.data} />
          ) : (
            <GenericLoading type="spinner" />
          )}
        </CardContainer>
      </ErrorBoundary>
    </FixedSizeCard>
  );
};
