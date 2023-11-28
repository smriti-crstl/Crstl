import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { ActionMap } from "globals/types";

type InitialIntegrationsStateType = {
  isLoading: boolean;
  isFailure: boolean;
  isSuccess: boolean;
  currentIntegrationSource: IntegrationSourceModelExtended | null;
};

// Actions that can be called on User Details
export enum IntegrationActionTypes {
  SetIsLoading = "SET_IS_LOADING",
  SetIsFailure = "SET_IS_FAILURE",
  SetIsSuccess = "SET_IS_SUCCESS",
  SetCurrentIntegrationSource = "SET_CURRENT_INTEGRATION_SOURCE",
}
// Type of Payload response that an action can receive
type IntegrationActionPayloads = {
  [IntegrationActionTypes.SetIsSuccess]: boolean;
  [IntegrationActionTypes.SetIsFailure]: boolean;
  [IntegrationActionTypes.SetIsLoading]: boolean;
  [IntegrationActionTypes.SetCurrentIntegrationSource]: IntegrationSourceModelExtended | null;
};

export type IntegrationStateActions = ActionMap<IntegrationActionPayloads>[keyof ActionMap<IntegrationActionPayloads>];

export const InitialIntegrationState: InitialIntegrationsStateType = {
  // Failure state flag used to display Error messages
  isFailure: false,
  // Loading state flag used to display loaders
  isLoading: false,
  // Success state flag used to display Success messages
  isSuccess: false,
  // Current Integration selected instance to display the name and details of integration source
  currentIntegrationSource: null,
};

export const IntegrationsReducer = (
  state: InitialIntegrationsStateType,
  action: IntegrationStateActions
): InitialIntegrationsStateType => {
  switch (action.type) {
    case IntegrationActionTypes.SetIsLoading:
      return { ...state, isLoading: action.payload };
    case IntegrationActionTypes.SetIsSuccess:
      return { ...state, isSuccess: action.payload };
    case IntegrationActionTypes.SetIsFailure:
      return { ...state, isFailure: action.payload };
    case IntegrationActionTypes.SetCurrentIntegrationSource:
      return { ...state, currentIntegrationSource: action.payload };
    default:
      return state;
  }
};
