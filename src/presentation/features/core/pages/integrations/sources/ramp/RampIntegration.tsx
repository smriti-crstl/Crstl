import { useCallback } from "react";
import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { useInitiateRampIntegrationQuery } from "domain/interactors/integrations";
import { IntegrationsListElement } from "../../components/integrations-list";
import { setIntegrationIdsToStorage } from "../../utils";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
};

function RampIntegration({
  isServerIntegrationsLoading,
  needsReAuthorization,
  isConnected,
  ...rest
}: Props) {
  const { mutate, isLoading } = useInitiateRampIntegrationQuery({
    onSuccess: (data) => {
      const { uri, integrationLogId } = data;
      if (uri && integrationLogId) {
        setIntegrationIdsToStorage({
          integrationSourceId: rest.id,
          integrationLogId,
        });
        window.open(uri, "_self");
      }
    },
  });

  const onAddClick = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <IntegrationsListElement
      isLoading={isServerIntegrationsLoading || isLoading}
      onAddButtonClick={onAddClick}
      key={rest.name}
      {...rest}
      isConnected={isConnected ? !needsReAuthorization : isConnected}
      // CustomCallbackElement={
      //   <ReAuthQBO
      //     isconnected={isConnected}
      //     needsAuth={needsReAuthorization}
      //     onAddButtonClick={handleQBOAddClick}
      //   />
      // }
    />
  );
}

export { RampIntegration };
