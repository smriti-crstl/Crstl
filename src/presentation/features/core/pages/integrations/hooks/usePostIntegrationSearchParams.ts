import {
  AMZAuthorizationSearchParams,
  AMZCreateIntegrationReqQueryParams,
  IntegrateShopifyQueryReq,
  IntegrationSourceModelExtended,
  QBOCreateIntegrationReq,
  QBOCreateIntegrationReqQueryParams,
  RailzConnectSearchParams,
  RampIntegrationSearchParams,
  SlackIntegrationSearchParams,
} from "domain/entity/integrations/models";
import {
  useCreateAMZIntegrationQuery,
  useCreateQBOIntegrationQuery,
  useCreateRampIntegrationQuery,
  useCreateSlackIntegration,
  usePostRedirectionUrlQueryParametersQuery,
} from "domain/interactors/integrations";
import { IntegrationsRedirectionUrlConstants } from "globals/configs";
import { parseSearchParams } from "presentation/utils";
import { Dispatch, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

import {
  DOCUMENT_TYPE_SEARCH_KEY,
  TRADING_PARTNER_ID_SEARCH_KEY,
} from "../../onboarding/components/edi-tab/constants";
import { EdiSetupParams } from "../../onboarding/components/edi-tab/types";
import { IntegrationActionTypes, IntegrationStateActions } from "../reducer";
import { getQueryString } from "../sources/slack/slack.utils";
import { getIntegrationIdsFromStorage } from "../utils";

type SearchParams = IntegrateShopifyQueryReq &
  QBOCreateIntegrationReqQueryParams &
  AMZCreateIntegrationReqQueryParams &
  AMZAuthorizationSearchParams & {
    error?: string;
  } & RailzConnectSearchParams &
  SlackIntegrationSearchParams &
  RampIntegrationSearchParams &
  EdiSetupParams;

type Props = {
  serverIntegrations: IntegrationSourceModelExtended[] | undefined;
  dispatchIntegrationsAction: Dispatch<IntegrationStateActions>;
  organizationId: string | undefined;
};

export const useRampIntegrationSearchParams = ({
  serverIntegrations,
  dispatchIntegrationsAction,
  organizationId = "",
}: Props) => {
  const { search } = useLocation();
  const { code, state } = parseSearchParams<Partial<SearchParams>>(search);
  const { mutate } = useCreateRampIntegrationQuery(organizationId);

  useEffect(() => {
    if (
      !(
        search &&
        organizationId &&
        serverIntegrations &&
        serverIntegrations.length > 0 &&
        code &&
        state
      )
    ) {
      return;
    }

    const integrationIds = getIntegrationIdsFromStorage();

    mutate(
      { code, state, integrationLogId: integrationIds?.integrationLogId },
      {
        onSuccess: () => {
          dispatchIntegrationsAction({
            type: IntegrationActionTypes.SetIsSuccess,
            payload: true,
          });
          const currentIntegrationSource = serverIntegrations.find(
            (item) => item.id === integrationIds?.integrationSourceId
          );
          if (currentIntegrationSource) {
            dispatchIntegrationsAction({
              type: IntegrationActionTypes.SetCurrentIntegrationSource,
              payload: currentIntegrationSource,
            });
          }
        },
        onError: () => {
          dispatchIntegrationsAction({
            type: IntegrationActionTypes.SetIsFailure,
            payload: true,
          });
        },
      }
    );
  }, [
    mutate,
    code,
    state,
    dispatchIntegrationsAction,
    search,
    organizationId,
    serverIntegrations,
  ]);
};

export const usePostIntegrationSearchParams = ({
  dispatchIntegrationsAction,
  serverIntegrations,
  organizationId,
}: Props): null => {
  const { search, state: locationState } = useLocation<{
    isCustom?: boolean;
  }>();
  const { mutate, isLoading } = usePostRedirectionUrlQueryParametersQuery(
    organizationId || ""
  );

  const {
    mutate: mutateQBOCreate,
    isError,
    isLoading: isCreateQBOLoading,
  } = useCreateQBOIntegrationQuery(organizationId || "");

  const {
    mutate: mutateAMZCreate,
    isLoading: isCreateAMZLoading,
  } = useCreateAMZIntegrationQuery();

  const {
    mutate: createSlackInteg,
    isLoading: loadingCreateSlackIntegrations,
  } = useCreateSlackIntegration("");

  const [serverIntegrationsLength, setServerIntegrationsLength] = useState(0);

  const { redirectionType } = useParams<{
    type?: string;
    redirectionType?: IntegrationsRedirectionUrlConstants;
  }>();

  useEffect(() => {
    if (isError) {
      // clearIntegrationIdsFromStorage();
      dispatchIntegrationsAction({
        type: IntegrationActionTypes.SetIsFailure,
        payload: true,
      });
    }
  }, [dispatchIntegrationsAction, isError]);

  useEffect(() => {
    dispatchIntegrationsAction({
      type: IntegrationActionTypes.SetIsLoading,
      payload:
        isLoading ||
        isCreateQBOLoading ||
        isCreateAMZLoading ||
        loadingCreateSlackIntegrations,
    });
  }, [
    dispatchIntegrationsAction,
    isLoading,
    isCreateQBOLoading,
    isCreateAMZLoading,
    loadingCreateSlackIntegrations,
  ]);

  useEffect(() => {
    setServerIntegrationsLength(serverIntegrations?.length || 0);
  }, [serverIntegrations]);

  useEffect(() => {
    if (
      !(
        search &&
        organizationId &&
        serverIntegrations &&
        serverIntegrations.length > 0
      )
    ) {
      return;
    }

    const handleFailure = (): void => {
      // clearIntegrationIdsFromStorage();
      dispatchIntegrationsAction({
        type: IntegrationActionTypes.SetIsFailure,
        payload: true,
      });
    };

    const handleSuccess = (): void => {
      // clearIntegrationIdsFromStorage();
      dispatchIntegrationsAction({
        type: IntegrationActionTypes.SetIsSuccess,
        payload: true,
      });
    };
    // Only run when we have search params

    const searchParams = parseSearchParams<Partial<SearchParams>>(search);
    const {
      code,
      hmac,
      shop,
      state,
      timestamp,
      host,
      error,
      realmId,
      selling_partner_id,
      spapi_oauth_code,
      amazon_callback_uri,
      amazon_state,
      railz_connect,
      [TRADING_PARTNER_ID_SEARCH_KEY]: tradingPartnerId,
      [DOCUMENT_TYPE_SEARCH_KEY]: documentType,
    } = searchParams;
    const integrationIds = getIntegrationIdsFromStorage();
    if (error) {
      handleFailure();
      // TODO:Logger Log the error received
      // Add error handling code
      return;
    }

    // Case when we need Amazon authorization
    if (amazon_callback_uri && amazon_state) {
      return;
    }

    if (railz_connect) {
      handleSuccess();
      return;
    }

    // Success Scenario
    // ADD QBO CASE

    if (
      redirectionType &&
      redirectionType === IntegrationsRedirectionUrlConstants.QBO
    ) {
      if (
        code &&
        state &&
        realmId &&
        integrationIds?.integrationLogId &&
        integrationIds?.integrationSourceId
      ) {
        const createQBOPayload: QBOCreateIntegrationReq = {
          integrationSourceId: integrationIds.integrationSourceId,
          integrationLogId: integrationIds.integrationLogId,
          code,
          realmId,
          state,
        };
        mutateQBOCreate(createQBOPayload, {
          onSuccess: (_data) => {
            const currentIntegrationSource = serverIntegrations.find(
              (item) => item.id === integrationIds.integrationSourceId
            );
            if (currentIntegrationSource) {
              dispatchIntegrationsAction({
                type: IntegrationActionTypes.SetCurrentIntegrationSource,
                payload: currentIntegrationSource,
              });
            }
            handleSuccess();
          },
          onError: () => {
            handleFailure();
          },
        });
        return;
      } else {
        console.log("Error in integrations", searchParams, integrationIds);
        handleFailure();
      }
    } else {
      // NORMAL INTEGRATION CREATE REQUEST CASE
      if (
        code &&
        hmac &&
        shop &&
        state &&
        timestamp &&
        // should be optional
        host &&
        integrationIds
      ) {
        mutate(
          {
            payload: {
              integrationSourceId: integrationIds.integrationSourceId,
            },
            queryParams: {
              code,
              hmac,
              shop,
              state,
              timestamp,
              host,
              integrationLogId: integrationIds.integrationLogId,
              isCustom: locationState?.isCustom ? "true" : undefined,
            },
          },
          {
            onSuccess: (_data) => {
              const currentIntegrationSource = serverIntegrations.find(
                (item) => item.id === integrationIds.integrationSourceId
              );
              if (currentIntegrationSource) {
                dispatchIntegrationsAction({
                  type: IntegrationActionTypes.SetCurrentIntegrationSource,
                  payload: currentIntegrationSource,
                });
              }
              handleSuccess();
            },
            onError: () => {
              handleFailure();
            },
          }
        );
      } else if (code && state) {
        createSlackInteg(
          {
            queryString: getQueryString(code, state),
          },
          {
            onSuccess: () => handleSuccess(),
            onError: () => handleFailure(),
          }
        );
        return;
      } else if (documentType || tradingPartnerId) {
        // do nothing when trading-partner-id or document-type search key present
        return;
      } else {
        // Not all required values are present
        // Deliberately fail the request
        // TODO:Logger Log all the search params received
        if (state && selling_partner_id && spapi_oauth_code && integrationIds) {
          mutateAMZCreate(
            {
              state: state,
              selling_partner_id: selling_partner_id,
              spapi_oauth_code: spapi_oauth_code,
              integrationLogId: integrationIds.integrationLogId,
            },
            {
              onSuccess: (_data) => {
                const currentIntegrationSource = serverIntegrations.find(
                  (item) => item.id === integrationIds.integrationSourceId
                );
                if (currentIntegrationSource) {
                  dispatchIntegrationsAction({
                    type: IntegrationActionTypes.SetCurrentIntegrationSource,
                    payload: currentIntegrationSource,
                  });
                }
                handleSuccess();
              },
              onError: () => {
                handleFailure();
              },
            }
          );
        } else {
          // Not all required values are present
          // Deliberately fail the request
          // TODO:Logger Log all the search params received
          console.log("Error in integrations", searchParams, integrationIds);
          handleFailure();
        }
      }
    }

    // TODO: Solve this Server Integrations dependency error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatchIntegrationsAction,
    mutate,
    organizationId,
    search,
    serverIntegrationsLength,
  ]);

  return null;
};

