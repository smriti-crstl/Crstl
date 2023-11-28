import moment from "moment";
import styled from "styled-components";
import ReactDOMServer from "react-dom/server";
import { FixedSizeCard } from "@crstl/components/atoms/card";
import { GenericLoading } from "@crstl/components/atoms/loading";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import HighChartsLineGraph from "../../home/components/graphs/HighChartsLineGraph";
import { DataSources } from "presentation/features/common/components/DataSources";
import { useGetAdWordsTrend } from "domain/interactors/marketing";
import { buildTrendMetricsConfig } from "../utils/buildTrendMetricsConfig";
import { ChartTooltip } from "./ChartTooltip";
import { formatDate } from "presentation/utils";
import { IExtendTooltipFormatter } from "globals/configs/highcharts";

const CashBalanceContainer = styled.div`
  padding: 1rem;
`;

const LineGraphWrapper = styled.div`
  height: 385px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    line-height: 24px;
  }
`;

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  margin-top: 2px;
  color: ${(props) => props.theme.palette.text.HINT};
`;

function GoogleAdMetricsTrend() {
  const { data, isLoading, isError } = useGetAdWordsTrend();
  const { series, options } = buildTrendMetricsConfig(
    data?.data,
    data?.metadata?.currency
  );

  function tooltipFormatter(this: IExtendTooltipFormatter) {
    const formattedDate = formatDate(this.x, "MMM dd, yyyy");
    return ReactDOMServer.renderToString(
      <ChartTooltip
        seriesName={this.series.name}
        seriesColor={this.series.color}
        format={this.point.format}
        formattedDate={formattedDate}
        x={this.x}
        y={this.y}
        currency={data?.metadata?.currency}
      />
    );
  }

  options.tooltip = {
    formatter: tooltipFormatter,
  };

  const cardTitle = (
    <HeaderContainer>
      <div>
        <HeaderWrapper>
          <span>Google Ads key metrics</span>
          <StyledTimeSpan>
            Last updated {moment(data?.lastUpdatedAt).fromNow()}
          </StyledTimeSpan>
        </HeaderWrapper>
      </div>
      {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
    </HeaderContainer>
  );

  return (
    <FixedSizeCard
      title={cardTitle}
      cardSize="medium"
      style={{ minHeight: 500 }}
    >
      <ErrorBoundary isError={isError}>
        <CashBalanceContainer>
          {isLoading && <GenericLoading type="spinner" />}
          {!isLoading && (
            <LineGraphWrapper>
              {series ? (
                <HighChartsLineGraph data={series} options={options} />
              ) : null}
            </LineGraphWrapper>
          )}
        </CashBalanceContainer>
      </ErrorBoundary>
    </FixedSizeCard>
  );
}

export { GoogleAdMetricsTrend };
