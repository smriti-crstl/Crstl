import { ReactElement } from "react";
import { FixedSizeCard } from "@crstl/components/atoms/card";
import { useGetRetailerOrdersAnalyticsChartDataSales } from "../../../hooks/useGetAnalyticsChartData";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { SALES_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { ResponsivePieChart } from "@crstl/components/organisms/responsive-pie-chart";
import { EmptyData } from "@crstl/components/atoms/empty";
import {
  EmptyCardWrapper,
  PieChartHeader,
  TotalBoard,
} from "../../common/common.styles";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { SelectedDateRange } from "../../common";
import { useDateRange } from "presentation/hooks/contexts";

const getDefaultInfoLabel = (value?: number): string => {
  if (!value) {
    return "";
  }
  return value === 1 ? "Order" : "Orders";
};

export const RetailerOrders = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const [
    getRetailerOrders,
    { isRetailerOrdersFetching, error },
  ] = useGetRetailerOrdersAnalyticsChartDataSales(startDate, endDate);

  return (
    <FixedSizeCard
      title={
        <>
          <PieChartHeader>
            <div> {SALES_CHART_HEADER.SALES_RETAILER_ORDERS}</div>
            <TotalBoard>{getRetailerOrders?.total || 0}</TotalBoard>
          </PieChartHeader>
          <SelectedDateRange />
        </>
      }
    >
      <ErrorBoundary error={error}>
        {!isRetailerOrdersFetching && getRetailerOrders ? (
          getRetailerOrders.data.length > 0 ? (
            <ResponsivePieChart
              data={getRetailerOrders}
              getDefaultInfoLabel={getDefaultInfoLabel}
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
