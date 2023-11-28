import { AMZAuthorizationSearchParams } from "domain/entity/integrations/models";
import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { useInitiateAmazonIntegrationQuery } from "domain/interactors/integrations";
import { ReactElement, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { parseSearchParams } from "presentation/utils";

import { IntegrationsListElement } from "../../components/integrations-list";
import { setIntegrationIdsToStorage } from "../../utils";
import { ReAuthQBO } from "../qbo/reAuthQBO";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
  onModalCancel: () => void;
};

export const AmazonIntegration = ({
  isServerIntegrationsLoading,
  needsReAuthorization,
  isConnected,
  onModalCancel,
  ...rest
}: Props): ReactElement => {
  const { search } = useLocation();
  const searchParams = useMemo(
    () => parseSearchParams<AMZAuthorizationSearchParams>(search),
    [search]
  );
  const { amazon_callback_uri, amazon_state } = searchParams;
  const { mutate, isLoading } = useInitiateAmazonIntegrationQuery({
    onSuccess: ({ data: { integrationLogId, uri } }) => {
      setIntegrationIdsToStorage({
        integrationSourceId: rest.id,
        integrationLogId,
      });
      window.open(uri, "_self");
    },
  });

  const handleQBOAddClick = useCallback(() => {
    mutate({
      amazon_callback_uri,
      amazon_state,
    });
  }, [mutate]);

  useEffect(() => {
    if (amazon_callback_uri && amazon_state) {
      onModalCancel();
      handleQBOAddClick();
    }
  }, [handleQBOAddClick, searchParams, onModalCancel]);

  return (
    <IntegrationsListElement
      isLoading={isServerIntegrationsLoading || isLoading}
      onAddButtonClick={handleQBOAddClick}
      key={rest.name}
      {...rest}
      isConnected={isConnected ? !needsReAuthorization : isConnected}
      CustomCallbackElement={
        <ReAuthQBO
          isconnected={isConnected}
          needsAuth={needsReAuthorization}
          onAddButtonClick={handleQBOAddClick}
        />
      }
    />
  );
};
