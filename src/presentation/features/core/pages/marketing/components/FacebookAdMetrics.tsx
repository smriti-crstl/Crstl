import React, { useEffect } from "react";
import { CardBody, FluidWidthCard } from "components/atoms/card";
import { EmptyData } from "components/atoms/empty";
import { GenericLoading } from "components/atoms/loading";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { EmptyCardWrapper } from "../../analytics/components/common/common.styles";
import { MarketingCard, MarketingCardsGrid } from "../MarketingCard";
import { MetricDelta } from "../MetricDelta";
import { MarketingHeader } from "../MarketingHeader";
import { useGetFacebookAdMetrics } from "domain/interactors/marketing";
import { useDateRange } from "presentation/hooks/contexts";
import moment from "moment";
import { CSV_DATE_FORMAT } from "../../analytics/components/common/ExcelExport/csv.config";

function FacebookAdMetrics() {
  const [dateRange, setDateRange] = React.useState("d7");
  const { data: response, isLoading, isError } = useGetFacebookAdMetrics(
    dateRange
  );
  const data = response?.data;

  const { changeDates } = useDateRange();

  useEffect(() => {
    const now = moment();
    const before = moment().subtract(parseInt(dateRange.substring(1)), "d");
    const datesArray = [before, now];
    const datesStrings = [
      datesArray[0].format(CSV_DATE_FORMAT),
      datesArray[1].format(CSV_DATE_FORMAT),
    ];
    changeDates(datesArray, datesStrings);
  }, [dateRange]);

  return (
    <FluidWidthCard
      title={
        <MarketingHeader
          title="Facebook Ads Metrics"
          lastUpdatedAt={response?.lastUpdatedAt}
          metadata={response?.metadata}
          onDateRangeChange={setDateRange}
          data={data}
          source="Facebook"
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

export { FacebookAdMetrics };
