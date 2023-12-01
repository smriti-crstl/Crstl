import moment from "moment";
import { useGetCollectiveBalanceChartDataQuery } from "domain/interactors/homepage";
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { currencyFormatter, formatDate } from "presentation/utils";
import { ReactElement } from "react";
import styled from "styled-components";

import { FixedSizeCard } from "components/atoms/card";
import { GenericLoading } from "components/atoms/loading";
import { GenericSubHeading } from "components/atoms/typography";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { FINANCE_CHART_HEADER } from "../../../analytics/config/ChartHeaders/ChartHeaders";
// import { DateDropdown } from "./DateDropdown";
import { MyResponsiveLine } from "./RenderLine";
import HighChartsLineGraph from "./HighChartsLineGraph";
import { SelectedDateRange } from "../../../analytics/components/common";
import {
  IExtendTooltipFormatter,
  PartialHighChartsOptions,
} from "globals/configs/highcharts";
import { useDateRange } from "presentation/hooks/contexts";
import { DataSources } from "presentation/features/common/components/DataSources";
import { AxisLabelsFormatterContextObject } from "highcharts";

const CashBalanceContainer = styled.div`
  padding: 1rem;
`;

const BalanceWrapper = styled.div`
  /* margin-top: 8px; */
  display: flex;
  justify-content: space-between;
  margin-left: 8px;
`;

const findTotal = (num?: number, currency?: string): string => {
  if (num) {
    return currencyFormatter(num, currency);
  } else {
    return "-";
  }
};

const StyledBalanceRow = styled.div`
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledGenericSubHeading = styled(GenericSubHeading)`
  font-size: 30px;
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  text-align: center;
  display: block;
  font-size: 12px;
  margin-top: 10px;
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

const highChartsOptions: PartialHighChartsOptions = {
  xAxis: {
    type: "datetime",
    labels: {
      format: "{value:%b %e}",
    },
    tickPixelInterval: 150,
  },
  legend: {
    enabled: true,
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    itemMarginTop: 4,
    itemMarginBottom: 4,
    itemStyle: {
      fontWeight: "normal",
      textOverflow: "",
    },
    width: "200px",
  },
};

function getTooltipMarkup({
  seriesColor,
  formattedDate,
  text,
}: {
  seriesColor?: string;
  formattedDate: string;
  text: string;
}) {
  const html = `<div
  style="
    background-color: ${seriesColor};
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 15px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.08);
    width: 200px;
    white-space: normal;
    word-wrap: break-word;
    text-align: center;"
  >
  ${formattedDate}
  <br/><br/>
    ${text}
  </div>`;

  return html;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomePageLineGraph = ({
  flags,
  showHighChartsGraph,
}: {
  flags?: any;
  showHighChartsGraph?: boolean;
}): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const { data, isLoading, isError } = useGetCollectiveBalanceChartDataQuery(
    startDate,
    endDate
  );
  const lastUpdatedAt = data?.data[0]?.lastUpdatedAt;
  const { getZonedTime } = useTimestamp();

  function yAxisFormatter(ctx: AxisLabelsFormatterContextObject) {
    const value = Number(ctx.value);
    if (value === 0) {
      return "";
    }
    return currencyFormatter(value, data?.metadata.currency, true);
  }

  function tooltipFormatter(this: IExtendTooltipFormatter) {
    const seriesColor = this.series?.color;
    const formattedDate = formatDate(this.x, "MMM dd, yyyy");
    const formattedValue = currencyFormatter(this.y, data?.metadata.currency);
    const text = `${this.series.name}: ${formattedValue}`;
    return getTooltipMarkup({ seriesColor, formattedDate, text });
  }

  const options: PartialHighChartsOptions = {
    ...highChartsOptions,
    yAxis: {
      labels: {
        style: {
          "text-transform": "lowercase",
        },
        formatter: yAxisFormatter,
      },
    },
    tooltip: {
      formatter: tooltipFormatter,
    },
  };

  const HorizontallyCenteredPaperCard = (): ReactElement => {
    return (
      <HeaderContainer>
        <div>
          <HeaderWrapper>
            <span>{FINANCE_CHART_HEADER.TOTAL_CASH_BALANCE}</span>
            <StyledTimeSpan>
              Last updated {moment(data?.lastUpdatedAt).fromNow()}
            </StyledTimeSpan>
          </HeaderWrapper>
          <SelectedDateRange />
        </div>
        {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
      </HeaderContainer>
    );
  };

  return (
    <FixedSizeCard
      title={data?.lastUpdatedAt && <HorizontallyCenteredPaperCard />}
      cardSize="medium"
      style={{ minHeight: 500 }}
    >
      <ErrorBoundary isError={isError}>
        <CashBalanceContainer>
          {isLoading && <GenericLoading type="spinner" />}
          {flags.ff1 ? (
            !isLoading &&
            !isError && (
              <>
                <BalanceWrapper>
                  <StyledGenericSubHeading isGreyDisabled>
                    {findTotal(data?.data[0]?.total, data?.metadata.currency)}
                  </StyledGenericSubHeading>
                  {/* <DateDropdown /> */}
                </BalanceWrapper>
                <LineGraphWrapper>
                  {showHighChartsGraph ? (
                    <HighChartsLineGraph data={data?.data} options={options} />
                  ) : (
                    <MyResponsiveLine data={data?.data} />
                  )}
                </LineGraphWrapper>
                {/* <LegendPosition data={data?.data} label={"id"} padding /> */}
                {lastUpdatedAt && (
                  <StyledSpan>
                    Estimated as of&nbsp;
                    {getZonedTime({
                      ISODateString: lastUpdatedAt,
                      withAltLabel: true,
                    })}
                  </StyledSpan>
                )}
              </>
            )
          ) : (
            <StyledBalanceRow>
              <span>Not displayed for this user</span>
            </StyledBalanceRow>
          )}
        </CashBalanceContainer>
      </ErrorBoundary>
    </FixedSizeCard>
  );
};

export default withLDConsumer()(HomePageLineGraph);
