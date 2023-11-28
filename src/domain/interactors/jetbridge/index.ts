import { AxiosError } from "axios";
import {
  getJetBridgeBoardData,
  getPendingOnboardingTasksCount,
} from "domain/entity/jetbridge/repositories";
import {
  JetBridgeBoardDataRes,
  OnboardingPendingCountsFe,
} from "domain/entity/jetbridge/model";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

const JETBRIDGE_QUERIES = {
  GET_JETBRIDGE_BOARD_DATA: "GET_JETBRIDGE_BOARD_DATA",
  GET_PENDING_ONBOARDING_TASKS_COUNT: "GET_PENDING_ONBOARDING_TASKS_COUNT",
};

export const useGetJetBridgeBoardDataQuery = <TData = JetBridgeBoardDataRes>(
  options?: UseQueryOptions<JetBridgeBoardDataRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [JETBRIDGE_QUERIES.GET_JETBRIDGE_BOARD_DATA],
    getJetBridgeBoardData,
    options
  );
};

export const useGetPendingOnboardingTasksCountQuery = <
  TData = OnboardingPendingCountsFe
>(
  options?: UseQueryOptions<OnboardingPendingCountsFe, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [JETBRIDGE_QUERIES.GET_PENDING_ONBOARDING_TASKS_COUNT],
    getPendingOnboardingTasksCount,
    options
  );
};

