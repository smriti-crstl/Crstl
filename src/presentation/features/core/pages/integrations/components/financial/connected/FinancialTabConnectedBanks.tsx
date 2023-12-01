import { ReactElement, useCallback, useReducer } from "react";

import { GenericLoading } from "components/atoms/loading";

import { useIntegrationsList } from "../../integration-tabs-content/useIntegrationsList";
import { useUserDetails } from "presentation/hooks/common";
import { useRampIntegrationSearchParams } from "../../../hooks/usePostIntegrationSearchParams";
import {
  InitialIntegrationState,
  IntegrationActionTypes,
  IntegrationsReducer,
} from "../../../reducer";
import { ResultModal } from "components/molecules/modals";
import { generateIntegrationResultModalTextConstants } from "../../../utils";
import { useViewResultModal } from "../../integration-tabs-content/useViewResultModal";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { INTEGRATION_QUERY_KEYS } from "domain/interactors/integrations";
import { RenderIntegrations } from "../../integration-tabs-content/RenderIntegrations";

export const FinancialTabConnectedBanks = (): ReactElement => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [{ data: userData }] = useUserDetails();

  const [
    { isServerIntegrationsLoading, serverIntegrations },
    financeIntegrationList,
  ] = useIntegrationsList(userData?.organizationId);

  const [
    {
      isFailure,
      isLoading: isIntegrationLoading,
      isSuccess,
      currentIntegrationSource,
    },
    dispatchIntegrationsAction,
  ] = useReducer(IntegrationsReducer, InitialIntegrationState);

  const resultProps = {
    isFailure: isFailure,
    isSuccess: isSuccess,
    isLoading: history.location.search ? isIntegrationLoading : false,
  };

  const [isModalVisible, setIsModalVisible] = useViewResultModal({
    ...resultProps,
  });

  useRampIntegrationSearchParams({
    serverIntegrations,
    dispatchIntegrationsAction,
    organizationId: userData?.organizationId,
  });

  const rampIntegration = financeIntegrationList.filter(
    (integrationItem) => integrationItem.integrationKey.toLowerCase() === "ramp"
  );

  const onModalCancel = useCallback((): void => {
    setIsModalVisible(false);
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetCurrentIntegrationSource,
      payload: null,
    });
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsFailure,
      payload: false,
    });
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsSuccess,
      payload: false,
    });
    queryClient.invalidateQueries([
      INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
      userData?.organizationId,
    ]);
    history.replace(history.location.pathname);
  }, [userData?.organizationId, history, queryClient, setIsModalVisible]);

  if (isServerIntegrationsLoading) {
    return (
      <div data-testid="Loading">
        <GenericLoading type="skeleton" />
      </div>
    );
  }

  return (
    <GenericLoading
      type="spinner"
      spinnerProps={{ spinning: isServerIntegrationsLoading }}
    >
      <ResultModal
        maskClosable={false}
        showPartyPopper
        closable={false}
        texts={generateIntegrationResultModalTextConstants(
          currentIntegrationSource?.name || ""
        )}
        {...resultProps}
        open={isModalVisible}
        cancelCallback={onModalCancel}
      />
      <RenderIntegrations
        {...{
          dispatchIntegrationsAction,
          serverIntegrations,
          integrationList: rampIntegration,
          isServerIntegrationsLoading,
          onModalCancel,
        }}
      />
    </GenericLoading>
  );
};
