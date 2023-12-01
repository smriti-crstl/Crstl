import moment from "moment";
import { ReactElement } from "react";
import { FixedSizeCard } from "components/atoms/card";
import { useOrderDeliveryStatusChartDataOperations } from "../../../hooks/useGetAnalyticsChartData";
import { OPERATIONS_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { GenericLoading } from "components/atoms/loading";
import { ResponsivePieChart } from "components/organisms/responsive-pie-chart";
import { EmptyData } from "components/atoms/empty";
import { EmptyCardWrapper } from "../../common/common.styles";
import styled from "styled-components";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { useDateRange } from "presentation/hooks/contexts";
import { DataSources } from "presentation/features/common/components/DataSources";

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.palette.text.HINT};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const getDefaultInfoLabel = (value?: number): string => {
  if (!value) {
    return "";
  }
  return value === 1 ? "Order" : "Orders";
};

export const DeliveryStatusReports = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const [
    getOrderDeliveryStatus,
    { isOrderDeliveryStatusFetching, error },
  ] = useOrderDeliveryStatusChartDataOperations(startDate, endDate);

  const HorizontallyCenteredPaperCard = (): ReactElement => {
    return (
      <HeaderContainer>
        <HeaderWrapper>
          <span>{OPERATIONS_CHART_HEADER.DELIVERY_STATUS}</span>
          <StyledTimeSpan>
            Last updated{" "}
            {moment(getOrderDeliveryStatus?.lastUpdatedAt).fromNow()}
          </StyledTimeSpan>
        </HeaderWrapper>
        {getOrderDeliveryStatus?.metadata ? (
          <DataSources metadata={getOrderDeliveryStatus.metadata} />
        ) : null}
      </HeaderContainer>
    );
  };
  return (
    <FixedSizeCard
      title={<HorizontallyCenteredPaperCard />}
      style={{ flex: "1" }}
    >
      <ErrorBoundary error={error}>
        {!isOrderDeliveryStatusFetching && getOrderDeliveryStatus ? (
          getOrderDeliveryStatus.data.length > 0 ? (
            <ResponsivePieChart
              data={getOrderDeliveryStatus}
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
