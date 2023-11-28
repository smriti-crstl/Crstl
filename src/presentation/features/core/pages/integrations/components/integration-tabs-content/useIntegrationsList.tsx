import { IntegrationTypeModel } from "@crstl/api/src/apis/models/Integration";
import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { useGetAllIntegrationsQuery } from "domain/interactors/integrations";
import { CoreRouteIntegrationsOptions } from "globals/configs/urls/constants";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

/*
function convertPlaidIntegrationToCombinedIntegration(
  plaidIntegration: SinglePlaidIntegrationModel
): CombinedIntegrationSourceModel {
  return {
    id: plaidIntegration.integrationId,
    name: plaidIntegration.institutionName,
    integrationType: IntegrationTypeModel.Finance,
    integrationKey: IntegrationKeyModel.Plaid,
    description: "",
    imageUrl: "",
    isConnected: !plaidIntegration.needsReAuthorization,
    isEnabled: plaidIntegration.isEnabled,
    isActive: true,
    props: null,
    ownerId: "",
    createdBy: plaidIntegration.createdBy,
    createdAt: plaidIntegration.createdAt,
    needsReAuthorization: plaidIntegration.needsReAuthorization,
  };
}

function replaceFinanceIntegrationWithPlaidList(
  integrations: CombinedIntegrationSourceModel[],
  plaidIntegrations: SinglePlaidIntegrationModel[] | undefined
): CombinedIntegrationSourceModel[] {
  const transformedPlaidIntegrations =
    plaidIntegrations?.map(convertPlaidIntegrationToCombinedIntegration) || [];

  const indexOfFinanceIntegration = findIndex(integrations, {
    integrationType: IntegrationTypeModel.Finance,
  });

  Array.prototype.splice.apply(integrations, [
    indexOfFinanceIntegration,
    1,
    ...transformedPlaidIntegrations,
  ]);

  return integrations;
}
*/

export const useIntegrationsList = (
  organizationId: string | undefined
): [
  {
    serverIntegrations: IntegrationSourceModelExtended[] | undefined;
    isServerIntegrationsLoading: boolean;
  },
  IntegrationSourceModelExtended[]
] => {
  const [integrationsList, setIntegrationsList] = useState<
    IntegrationSourceModelExtended[]
  >([]);

  // "" is added to suppress the TS error as organizationId will always be present as the hook is enabled by presence of it
  const {
    data: serverIntegrations,
    isLoading: isServerIntegrationsLoading,
  } = useGetAllIntegrationsQuery(organizationId || "", {
    staleTime: Infinity,
    enabled: !!organizationId,
  });

  /*
  const {
    data: financeIntegrationData,
    isLoading: isPlaidIntegrationLoading,
  } = usePlaidIntegrationsListQuery();
  */

  const { type } = useParams<{ type: string }>();

  useLayoutEffect(() => {
    const filterIntegrations = (): IntegrationSourceModelExtended[] => {
      // * NOTE: currently showing "Slack" i.e. "Collaborations" type integrations on ALL pages outside of /integrations
      return (
        serverIntegrations?.filter(
          ({ integrationType }) =>
            integrationType === CoreRouteIntegrationsOptions.COLLABORATION
        ) ?? []
      );

      // TODO: remove code above this to start using integrations as usual
      switch (type) {
        case CoreRouteIntegrationsOptions.ALL:
          return serverIntegrations || [];

        case CoreRouteIntegrationsOptions.EDI:
        case CoreRouteIntegrationsOptions.SHIPPING_AND_FULFILLMENT:
        case CoreRouteIntegrationsOptions.ACCOUNTING:
        case CoreRouteIntegrationsOptions.E_COMMERCE:
        case CoreRouteIntegrationsOptions.INVENTORY:
        case CoreRouteIntegrationsOptions.PAYOUTS:
        case CoreRouteIntegrationsOptions.COLLABORATION:
        case CoreRouteIntegrationsOptions.FINANCIAL:
        case CoreRouteIntegrationsOptions.MARKETING:
          return serverIntegrations
            ? serverIntegrations.filter(
                ({ integrationType }) => integrationType === type
              )
            : [];
        case CoreRouteIntegrationsOptions.MY_INTEGRATIONS: {
          const filteredIntegrations = serverIntegrations
            ? serverIntegrations.filter((item) => {
                const isFinance =
                  item.integrationType === IntegrationTypeModel.Finance;
                return item.isConnected && !isFinance;
              })
            : [];

          /*
          const isFinanceIntegrationConnected = filteredIntegrations?.find(
            (item) => item.integrationType === IntegrationTypeModel.Finance
          )?.isConnected;

          if (isFinanceIntegrationConnected) {
            const result = replaceFinanceIntegrationWithPlaidList(
              filteredIntegrations,
              financeIntegrationData
            );
            return result;
          }
          */

          return filteredIntegrations;
        }

        default:
          // Occurs when a user redirects to /integrations
          return serverIntegrations || [];
      }
    };
    setIntegrationsList(() =>
      filterIntegrations().sort((a, b) =>
        a.isConnected === b.isConnected ? 0 : a.isConnected ? -1 : 1
      )
    );
  }, [serverIntegrations, type]);

  return [
    {
      serverIntegrations,
      isServerIntegrationsLoading:
        isServerIntegrationsLoading || !organizationId,
    },
    integrationsList,
  ];
};

