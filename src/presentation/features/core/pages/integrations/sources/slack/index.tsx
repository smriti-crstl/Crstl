import { ReactElement, useEffect } from "react";
import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { SLACK_CONFIG } from "./slack.config";
import { SlackAuth } from "./slackAuth";
import { IntegrationsListElement } from "../../components/integrations-list";
import { useInitiateSlackIntegration } from "domain/interactors/integrations";
import { setIntegrationIdsToStorage } from "../../utils";
import { SlackChannel } from "./SlackChannel";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
};

export const SlackIntegrations = ({
  isServerIntegrationsLoading,
  needsReAuthorization,
  isConnected,
  ...rest
}: Props): ReactElement => {
  const {
    data: initSlackResponse,
    mutate: initateSlackInteg,
    isLoading: loadingInitSlackIntegrations,
  } = useInitiateSlackIntegration();

  useEffect(() => {
    if (!initSlackResponse) {
      return;
    }
    setIntegrationIdsToStorage({
      integrationSourceId: rest.id,
      integrationLogId: initSlackResponse?.data.integrationLogId || "",
    });
    window.open(initSlackResponse?.data.uri, SLACK_CONFIG.SELF);
  }, [initSlackResponse, rest.id]);

  return (
    <IntegrationsListElement
      isLoading={isServerIntegrationsLoading || loadingInitSlackIntegrations}
      onAddButtonClick={() => initateSlackInteg(null)}
      key={SLACK_CONFIG.SLACK_INTEGRATION}
      {...rest}
      isConnected={isConnected ? !needsReAuthorization : isConnected}
      CustomCallbackElement={
        <SlackAuth
          isConnected={isConnected}
          needsAuth={needsReAuthorization}
          onAddButtonClick={() => initateSlackInteg(null)}
        />
      }
    >
      {isConnected &&
        !(isServerIntegrationsLoading || loadingInitSlackIntegrations) && (
          <SlackChannel />
        )}
    </IntegrationsListElement>
  );
};

