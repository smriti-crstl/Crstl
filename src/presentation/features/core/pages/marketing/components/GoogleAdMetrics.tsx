import React, { useEffect } from "react";
import { CardBody, FluidWidthCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { useGetAdWordsData } from "domain/interactors/marketing";
import { EmptyCardWrapper } from "../../analytics/components/common/common.styles";
import { MarketingCard, MarketingCardsGrid } from "../MarketingCard";
import { MetricDelta } from "../MetricDelta";
import { MarketingHeader } from "../MarketingHeader";
import { useDateRange } from "presentation/hooks/contexts";
import moment from "moment";
import { DATE_FORMAT } from "../../alerts/alerts.config";

function GoogleAdMetrics() {
  const [dateRange, setDateRange] = React.useState("d7");
  const { data: response, isLoading, isError } = useGetAdWordsData(dateRange);
  const data = response?.data;
  const { changeDates } = useDateRange();

  useEffect(() => {
    const now = moment();
    const before = moment().subtract(parseInt(dateRange.substring(1)), "d");
    const datesArray = [before, now];
    const datesStrings = [
      datesArray[0].format(DATE_FORMAT),
      datesArray[1].format(DATE_FORMAT),
    ];
    changeDates(datesArray, datesStrings);
  }, [dateRange]);

  return (
    <FluidWidthCard
      title={
        <MarketingHeader
          title="Google Ads Metrics"
          lastUpdatedAt={response?.lastUpdatedAt}
          metadata={response?.metadata}
          onDateRangeChange={setDateRange}
          data={data}
          source="Google"
        />
      }
    >
      <ErrorBoundary isError={isError}>
        <CardBody>
          {!isLoading && data ? (
            data.length ? (
              <MarketingCardsGrid>
                {data.map((item) => (
                  <MarketingCard
                    key={item.metricKey}
                    currency={response?.metadata?.currency}
                    {...item}
                  >
                    {item.value ? <MetricDelta change={item.change} /> : null}
                  </MarketingCard>
                ))}
              </MarketingCardsGrid>
            ) : (
              <EmptyCardWrapper>
                <EmptyData />
              </EmptyCardWrapper>
            )
          ) : (
            <GenericLoading
              type="spinner"
              spinnerProps={{ "aria-label": "Loading" }}
            />
          )}
        </CardBody>
      </ErrorBoundary>
    </FluidWidthCard>
  );
}

export { GoogleAdMetrics };
