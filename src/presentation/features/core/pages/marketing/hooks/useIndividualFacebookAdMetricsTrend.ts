import {
  useGetFacebookAdMetrics,
  useGetFacebookIndividualMetricsTrend,
} from "domain/interactors/marketing";

type IndividualAdMetricsTrendArgs = {
  dateRange: string;
  aggregation: string;
  period: string;
};

function useIndividualFacebookAdMetricsTrend({
  dateRange,
  aggregation,
  period,
}: IndividualAdMetricsTrendArgs) {
  const { data: response } = useGetFacebookAdMetrics(dateRange);
  const metricKeys = response?.data.map((item) => item.metricKey) ?? [];
  return useGetFacebookIndividualMetricsTrend({
    metricKeys,
    aggregation,
    period,
  });
}

export { useIndividualFacebookAdMetricsTrend };
