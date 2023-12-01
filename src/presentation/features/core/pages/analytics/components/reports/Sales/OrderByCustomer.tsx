import { ReactElement, useContext, useState } from "react";
import { AnalyticsPaperCard } from "components/atoms/card";
import { useOrderByCustomerChartDataSales } from "../../../hooks/useGetAnalyticsChartData";
import { GenericLoading } from "components/atoms/loading";
import { SALES_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { ResponsivePieChart } from "components/organisms/responsive-pie-chart";
import { AnalyticsDateRangeContext } from "..";
import { EmptyData } from "components/atoms/empty";
import { EmptyCardWrapper } from "../../common/common.styles";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";

export const OrderByCustomer = (): ReactElement => {
  const [isFavorites, setIsFavorites] = useState(false);

  const onFavoriteChange = (): void => {
    setIsFavorites(!isFavorites);
  };

  const { startDate, endDate } = useContext(AnalyticsDateRangeContext);

  const [
    getOrderByCustomer,
    { isOrderByCustomerStatusFetching, error },
  ] = useOrderByCustomerChartDataSales(startDate, endDate);
  return (
    <AnalyticsPaperCard
      title={SALES_CHART_HEADER.ORDER_BY_CUSTOMER}
      isFavorites={isFavorites}
      onFavoriteChange={onFavoriteChange}
    >
      <ErrorBoundary error={error}>
        {!isOrderByCustomerStatusFetching && getOrderByCustomer ? (
          getOrderByCustomer.data.length > 0 ? (
            <ResponsivePieChart data={getOrderByCustomer} isPercentage />
          ) : (
            <EmptyCardWrapper>
              <EmptyData />
            </EmptyCardWrapper>
          )
        ) : (
          <GenericLoading type="spinner" />
        )}
      </ErrorBoundary>
    </AnalyticsPaperCard>
  );
};
