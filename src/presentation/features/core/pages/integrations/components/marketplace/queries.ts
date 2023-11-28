// This query contains code recommended by Prismatic folks
export const getIntegrationQuery = async () => {
  const query = `query instances {
    authenticatedUser {
      customer {
        instances(isSystem: false) {
          nodes {
            id
            name
            labels
            integration {
              marketplaceConfiguration
              labels
              name
              id
            }
          }
        }
      }
    }
  }
  `;
  const result = await prismatic.graphqlRequest({ query });
  const integrationLabels =
    result?.data?.authenticatedUser?.customer?.instances?.nodes?.reduce(
      (prev: any, instance: any) => {
        const integrationLabels =
          instance.integration.marketplaceConfiguration ===
          "NOT_AVAILABLE_IN_MARKETPLACE"
            ? instance.integration.labels
            : [];
        return [...prev, ...integrationLabels];
      },
      []
    ) ?? [];
  return {
    instances: result?.data?.authenticatedUser?.customer?.instances?.nodes,
    labelsToFilter: integrationLabels,
  };
};

