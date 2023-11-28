import { AxiosError } from "axios";
import { getAlertsData } from "domain/entity/alerts/repositories";
import { AlertsRes } from "domain/entity/analytics/model";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

const ALERTS_QUERIES = {
  GET_ALERTS: "GET_ALERTS",
};

const useAlertsQuery = <TData = AlertsRes>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<AlertsRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [ALERTS_QUERIES.GET_ALERTS, startDate, endDate],
    getAlertsData,
    options
  );
};

export { useAlertsQuery };
