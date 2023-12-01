import { ReactElement } from "react";
import { FixedSizeCard } from "components/atoms/card";
import { useRevenueByRetailerChartDataSales } from "../../../hooks/useGetAnalyticsChartData";
import { GenericLoading } from "components/atoms/loading";
import { SALES_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { ResponsivePieChart } from "components/organisms/responsive-pie-chart";
import { EmptyData } from "components/atoms/empty";
import {
  EmptyCardWrapper,
  PieChartHeader,
  TotalBoard,
} from "../../common/common.styles";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { SelectedDateRange } from "../../common";
import { currencyFormatter } from "presentation/utils";
import { useDateRange } from "presentation/hooks/contexts";

export const RevenueByRetailer = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const [
    getRevenueByRetailer,
    { isRevenueByRetailerStatusFetching, error },
  ] = useRevenueByRetailerChartDataSales(startDate, endDate);

  return (
    <FixedSizeCard
      title={
        <>
          <PieChartHeader>
            <div>{SALES_CHART_HEADER.SALES_BY_RETAILER_ORDER}</div>
            <TotalBoard>
              {currencyFormatter(
                getRevenueByRetailer?.total,
                getRevenueByRetailer?.metadata?.currency
              )}
            </TotalBoard>
          </PieChartHeader>
          <SelectedDateRange />
        </>
      }
    >
      <ErrorBoundary error={error}>
        {!isRevenueByRetailerStatusFetching && getRevenueByRetailer ? (
          getRevenueByRetailer.data.length > 0 ? (
            <ResponsivePieChart
              data={getRevenueByRetailer}
              isPercentage
              tooltipSecondLineKey={"value"}
              currency={getRevenueByRetailer?.metadata?.currency}
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
