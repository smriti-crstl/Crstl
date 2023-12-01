import { INTEGRATION_QUERY_KEYS } from "domain/interactors/integrations";
import { useUserDetails } from "presentation/hooks/common";
import { ReactElement, useCallback, useReducer } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

import { PaperCard } from "components/atoms/card";
import { ResultModal } from "components/molecules/modals";

import { usePlaidIntegrationsListQuery } from "domain/interactors/integrations/plaid";
import { usePostIntegrationSearchParams } from "../../hooks/usePostIntegrationSearchParams";
import {
  InitialIntegrationState,
  IntegrationActionTypes,
  IntegrationsReducer,
} from "../../reducer";
import { generateIntegrationResultModalTextConstants } from "../../utils";
import { RenderIntegrations } from "./RenderIntegrations";
import { useIntegrationsList } from "./useIntegrationsList";
import { useViewResultModal } from "./useViewResultModal";

export const IntegrationsTabContent = (): ReactElement => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [{ data }] = useUserDetails();
  const isMyIntegrations = history.location.pathname.includes(
    "my-integrations"
  );
  const {
    data: plaidIntegrations,
    isLoading: isPlaidIntegrationLoading,
  } = usePlaidIntegrationsListQuery();

  const [
    { serverIntegrations, isServerIntegrationsLoading },
    integrationList,
  ] = useIntegrationsList(data?.organizationId);

  const [
    { isFailure, isLoading, isSuccess, currentIntegrationSource },
    dispatchIntegrationsAction,
  ] = useReducer(IntegrationsReducer, InitialIntegrationState);

  const resultProps = {
    isFailure: isFailure,
    isSuccess: isSuccess,
    isLoading: history.location.search
      ? isLoading || isServerIntegrationsLoading
      : isLoading,
  };

  const [isModalVisible, setIsModalVisible] = useViewResultModal({
    ...resultProps,
  });

  usePostIntegrationSearchParams({
    dispatchIntegrationsAction,
    serverIntegrations,
    organizationId: data?.organizationId,
  });

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
      data?.organizationId,
    ]);
    history.replace(history.location.pathname);
  }, [data?.organizationId, history, queryClient, setIsModalVisible]);
  return (
    <PaperCard className="animate">
      <ResultModal
        maskClosable={false}
        showPartyPopper
        closable={false}
        texts={generateIntegrationResultModalTextConstants(
          currentIntegrationSource?.name || ""
        )}
        {...resultProps}
        visible={isModalVisible}
        cancelCallback={onModalCancel}
      />
      <RenderIntegrations
        {...{
          dispatchIntegrationsAction,
          serverIntegrations,
          integrationList,
          plaidIntegrations,
          isMyIntegrations,
          isServerIntegrationsLoading,
          isPlaidIntegrationLoading,
          onModalCancel,
        }}
      />
    </PaperCard>
  );
};
