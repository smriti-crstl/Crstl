import styled from "styled-components";
import { MetricTrendCard } from "../components";
import { useIndividualGoogleAdMetricsTrend } from "../hooks/useIndividualGoogleAdMetricsTrend";

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

function IndividualGoogleAdMetricsSection() {
  const { data, isLoading, isError } = useIndividualGoogleAdMetricsTrend({
    dateRange: "d7",
    aggregation: "daily",
    period: "30",
  });

  if (isLoading || isError || !data) {
    return null;
  }

  return (
    <SectionContainer>
      {data.map((item, index) => (
        <MetricTrendCard key={index} metricData={item} source="Google" />
      ))}
    </SectionContainer>
  );
}

export { IndividualGoogleAdMetricsSection };
