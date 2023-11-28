// import { AppContext } from "contexts";
import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { Dispatch, ReactElement } from "react";

import { IntegrationsListElement } from "../../components/integrations-list";
import { IntegrationStateActions } from "../../reducer";

// import { useAddSPSIntegrationHook } from "./useAddSPSIntegrationHook";

type Props = IntegrationSourceModelExtended & {
  serverIntegrations: IntegrationSourceModelExtended[] | undefined;
  isServerIntegrationsLoading: boolean;
  dispatchIntegrationsAction: Dispatch<IntegrationStateActions>;
};

export const SPSIntegration = ({
  serverIntegrations,
  isServerIntegrationsLoading,
  ...rest
}: Props): ReactElement => {
  // const {
  //   state: {
  //     userDetails: { data },
  //   },
  // } = useContext(AppContext);

  // const [
  //   {
  //     onAddButtonClick,
  //     //   isAddIntegrationsLoading,
  //     //   hasIntegrationFailed,
  //     //   currentIntegrationSource,
  //     //   isIntegrationSuccessful,
  //   },
  // ] = useAddSPSIntegrationHook(serverIntegrations, data?.organizationId);

  // TODO: Add new success and error states

  //   const resultProps = {
  //     isFailure: hasIntegrationFailed,
  //     isSuccess: !hasIntegrationFailed && isIntegrationSuccessful,
  //     isLoading: history.location.search
  //       ? isAddIntegrationsLoading || isServerIntegrationsLoading
  //       : isAddIntegrationsLoading,
  //   };

  return (
    <IntegrationsListElement
      isLoading={isServerIntegrationsLoading}
      onAddButtonClick={() => console.log("SPS Add clicked")}
      key={rest.name}
      {...rest}
    />
  );
};
