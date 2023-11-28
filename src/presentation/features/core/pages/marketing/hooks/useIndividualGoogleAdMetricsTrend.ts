import {
  useGetAdWordsData,
  useGetAdWordsIndividualMetricsTrend,
} from "domain/interactors/marketing";

type IndividualAdMetricsTrendArgs = {
  dateRange: string;
  aggregation: string;
  period: string;
};

function useIndividualGoogleAdMetricsTrend({
  dateRange,
  aggregation,
  period,
}: IndividualAdMetricsTrendArgs) {
  const { data: response } = useGetAdWordsData(dateRange);
  const metricKeys = response?.data.map((item) => item.metricKey) ?? [];
  return useGetAdWordsIndividualMetricsTrend({
    metricKeys,
    aggregation,
    period,
  });
}

export { useIndividualGoogleAdMetricsTrend };
