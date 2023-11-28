import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import { JetBridgeBoardDataRes } from "../model";

const ENDPOINTS = {
  GET_JETBRIDGE_BOARD_DATA: "edi-onboarding/tasks",
  GET_PENDING_ONBOARDING_TASKS_COUNT: "edi-onboarding/pending-tasks-count",
};

export const getJetBridgeBoardData = async function ({
  queryKey: [_id],
}: QueryFunctionContext<string[]>): Promise<JetBridgeBoardDataRes> {
  return await API_V1.get(ENDPOINTS.GET_JETBRIDGE_BOARD_DATA).then(
    (res) => res.data
  );
};

export const getPendingOnboardingTasksCount = async function ({
  queryKey: [_id],
}: QueryFunctionContext<string[]>): Promise<JetBridgeBoardDataRes> {
  return await API_V1.get(ENDPOINTS.GET_PENDING_ONBOARDING_TASKS_COUNT).then(
    (res) => res.data
  );
};

