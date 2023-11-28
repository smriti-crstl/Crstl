import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { ReactElement } from "react";

import { IntegrationsListElement } from "../../components/integrations-list";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
  lastReAuthedAt: string;
  lastReAuthedBy: string;
};

export const OtherGenericIntegrations = ({
  isServerIntegrationsLoading,
  ...rest
}: Props): ReactElement => {
  return (
    <IntegrationsListElement
      isLoading={isServerIntegrationsLoading}
      onAddButtonClick={() => console.log("Add clicked")}
      key={rest.name}
      id={rest.id}
      imageUrl={rest.imageUrl}
      integrationType={rest.integrationType}
      isConnected={rest.isConnected}
      name={rest.name}
      lastReAuthedAt={rest.lastReAuthedAt}
      lastReAuthedBy={rest.lastReAuthedBy}
      assistedIntegration={rest.assistedIntegration}
    />
  );
};
