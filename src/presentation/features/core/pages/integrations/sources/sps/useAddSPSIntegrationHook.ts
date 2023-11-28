import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import {
  usePostIntegrations,
  usePostOAuthIntegrationsClientQuery,
  usePurchaseOrderImportQuery,
} from "domain/interactors/integrations";
import {
  getItemFromSessionStorage,
  removeItemFromSessionStorage,
  setItemInSessionStorage,
} from "domain/services/sessionStorage";
import { parse } from "qs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { createIntegrationSourceState } from "../../deprecated-utils";

// TODO: Solve Organization id "" check in usePostIntegrations
const INTEGRATION_AUTH_STATE_KEY = "integrationAuthState";

// TODO: Beta test the code, made integrationSources optional
export const useAddSPSIntegrationHook = (
  integrationSources?: IntegrationSourceModelExtended[],
  organizationId?: string
): [
  {
    onAddButtonClick: (id: string) => void;
    currentIntegrationSource: IntegrationSourceModelExtended | null;
    isAddIntegrationsLoading: boolean;
    hasIntegrationFailed: boolean;
    isIntegrationSuccessful: boolean;
  }
] => {
  const { search } = useLocation();

  const [
    currentIntegrationSource,
    setCurrentIntegrationSource,
  ] = useState<IntegrationSourceModelExtended | null>(null);

  const [hasIntegrationFailed, setHasIntegrationFailed] = useState(false);

  const [isIntegrationSuccessful, setIsIntegrationSuccessful] = useState(false);

  const {
    mutate: mutatePurchaseOrderImportQuery,
    isLoading: isPurchaseOrderImportQueryLoading,
    isError: mutatePurchaseOrderImportQueryError,
  } = usePurchaseOrderImportQuery();

  const {
    mutate: mutatePostIntegrations,
    isLoading: isPostIntegrationsLoading,
    isError: mutatePostIntegrationsError,
  } = usePostIntegrations(organizationId || "");

  const {
    mutate: mutatePostOAuthIntegrationsClientQuery,
    isLoading: isOAuthPostIntegrationsLoading,
    isError: mutatePostOAuthIntegrationsClientQueryError,
  } = usePostOAuthIntegrationsClientQuery();

  const onAddButtonClick = (id: string): void => {
    const source = integrationSources?.find((item) => item.id === id);
    const oauthUrl = source?.props.oauthUrl;
    if (!oauthUrl) {
      setHasIntegrationFailed(true);
      // TODO:Logger Err
      return;
    }
    const state = createIntegrationSourceState(id);

    const callbackUrl = window.location.origin + window.location.pathname;
    const redirectionUrl = oauthUrl
      .replace("%%state%%", state)
      .replace("%%callbackUrlHost%%", callbackUrl);
    setItemInSessionStorage(INTEGRATION_AUTH_STATE_KEY, state);
    window.open(redirectionUrl, "_self");
  };

  useEffect(() => {
    // Slicing to remove ? of query string param
    const searchCleaned = search.slice(1);
    if (searchCleaned && integrationSources && integrationSources.length > 0) {
      try {
        // implementing if checking if query params exist
        const searchParams = parse(searchCleaned);
        if (searchParams.error) {
          setHasIntegrationFailed(true);
        }
        const sessionIntegrationAuthState = getItemFromSessionStorage(
          INTEGRATION_AUTH_STATE_KEY
        );
        const searchParamsState = searchParams.state;
        const areSentAndReceivedStatesEqual =
          searchParamsState === sessionIntegrationAuthState;
        if (
          areSentAndReceivedStatesEqual &&
          searchParamsState &&
          typeof searchParamsState === "string" &&
          typeof searchParams.code === "string"
        ) {
          const integrationSourceId = searchParamsState.split("|")[0];
          const integrationCode = searchParams.code;
          const source = integrationSources?.find(
            (item) => item.id === integrationSourceId
          );
          if (source) {
            setCurrentIntegrationSource(source);
            const callbackUrl =
              window.location.origin + window.location.pathname;
            const payload = JSON.parse(
              source.props.oauthTokenData
                .replace("%%callbackUrlHost%%", callbackUrl)
                .replace("%%code%%", integrationCode)
            );
            const url = source.props.oauthTokenUrl;
            mutatePostOAuthIntegrationsClientQuery(
              { payload, url },
              {
                onSuccess: (res) => {
                  const payload = {
                    integrationSourceId: integrationSourceId,
                    props: res,
                  };
                  mutatePostIntegrations(payload, {
                    onSuccess: () =>
                      // Mutate the on Success data here
                      mutatePurchaseOrderImportQuery(undefined, {
                        onSuccess: () => setIsIntegrationSuccessful(true),
                      }),
                  });
                },
              }
            );
          } else {
            throw new Error("Source is not valid");
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }, [
    integrationSources,
    mutatePostIntegrations,
    mutatePostOAuthIntegrationsClientQuery,
    mutatePurchaseOrderImportQuery,
    search,
  ]);

  useEffect(() => {
    return () => {
      removeItemFromSessionStorage(INTEGRATION_AUTH_STATE_KEY);
    };
  }, []);

  return [
    {
      onAddButtonClick,
      isAddIntegrationsLoading:
        isPurchaseOrderImportQueryLoading ||
        isPostIntegrationsLoading ||
        isOAuthPostIntegrationsLoading,
      currentIntegrationSource,
      hasIntegrationFailed:
        hasIntegrationFailed ||
        mutatePurchaseOrderImportQueryError ||
        mutatePostIntegrationsError ||
        mutatePostOAuthIntegrationsClientQueryError,
      isIntegrationSuccessful,
    },
  ];
};
