import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { useInitiateQBOIntegrationQuery } from "domain/interactors/integrations";
import { ReactElement, useCallback } from "react";

import { IntegrationsListElement } from "../../components/integrations-list";
import { setIntegrationIdsToStorage } from "../../utils";
import { ReAuthQBO } from "./reAuthQBO";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
};

export const QuickbooksOnlineIntegration = ({
  isServerIntegrationsLoading,
  needsReAuthorization,
  isConnected,
  ...rest
}: Props): ReactElement => {
  const { mutate, isLoading } = useInitiateQBOIntegrationQuery({
    onSuccess: ({ data: { integrationLogId, uri } }) => {
      setIntegrationIdsToStorage({
        integrationSourceId: rest.id,
        integrationLogId,
      });
      window.open(uri, "_self");
    },
  });

  const handleQBOAddClick = useCallback(() => {
    mutate();
  }, [mutate]);
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
