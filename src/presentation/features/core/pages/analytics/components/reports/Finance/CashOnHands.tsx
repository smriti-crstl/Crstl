import { ReactElement } from "react";

import { FixedSizeCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { ResponsivePieChart } from "@crstl/components/organisms/responsive-pie-chart";

import { FINANCE_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { useGetAnalyticsChartDataFinance } from "../../../hooks/useGetAnalyticsChartData";
import { EmptyCardWrapper, PieChartHeader } from "../../common/common.styles";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { useDateRange } from "presentation/hooks/contexts";
import { DataSources } from "presentation/features/common/components/DataSources";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";

export const CashOnHandsReports = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const [
    getCashOnHands,
    { cashOnHandsIsFetching, error },
  ] = useGetAnalyticsChartDataFinance(startDate, endDate);

  return (
    <FixedSizeCard
      cardSize="small"
      title={
        <PieChartHeader>
          <div>{FINANCE_CHART_HEADER.CASH_ON_HANDS}</div>
          <DownloadButtonContainer>
            <ExcelExport
              fileName={CSV_FILE_NAME.CASH_ON_HANDS}
              config={CSV_CONFIG.CASH_ON_HANDS}
              csvData={getCashOnHands?.data}
            />
            {getCashOnHands?.metadata ? (
              <DataSources metadata={getCashOnHands.metadata} />
            ) : null}
          </DownloadButtonContainer>
        </PieChartHeader>
      }
      style={{ flex: "1" }}
    >
      <ErrorBoundary error={error}>
        {!cashOnHandsIsFetching && getCashOnHands ? (
          getCashOnHands.data.length > 0 ? (
            <ResponsivePieChart
              data={getCashOnHands}
              currency={getCashOnHands.metadata.currency}
              isNumber
            />
          ) : (
            <EmptyCardWrapper>
              <EmptyData />
            </EmptyCardWrapper>
          )
        ) : (
          <GenericLoading type="spinner" />
        )}
      </ErrorBoundary>
    </FixedSizeCard>
  );
};
