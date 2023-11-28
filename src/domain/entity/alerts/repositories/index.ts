import { AlertsRes } from "domain/entity/analytics/model";
import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

const ENDPOINTS = {
  GET_ALERTS: "alerts",
};

const getAlertsData = async function ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<AlertsRes> {
  return await API_V1.get(ENDPOINTS.GET_ALERTS, {
    params: { startDate, endDate },
  }).then((res) => res.data);
};

export { getAlertsData };

