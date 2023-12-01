import { tokenManagement } from "domain/interactors/auth/service";
import { useGetAppMarketplaceTokenQuery } from "domain/interactors/edi";
import { useEffect, useState } from "react";

import { Spinner } from "components/atoms/loading";

import { ErrorMessage } from "./ErrorMessage";
import { getIntegrationQuery } from "./queries";

const integrationNamesToSetRefreshTokenIn = [
  "Cin7 Core",
  "NetSuite",
  "Shopify",
];

export const Marketplace = () => {
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [isUnavlToCustomer, setIsUnavlToCustomer] = useState(false);

  const { isFetching, isError, refetch } = useGetAppMarketplaceTokenQuery({
    onSuccess: async (data) => {
      prismatic.init({
        fontConfiguration: {
          google: {
            families: ["Inter"],
          },
        },
      });
      prismatic
        .authenticate({
          token: data?.token,
        })
        .then(async () => {
          let filterQuery;
          const response = await getIntegrationQuery();
          // Create the list of filters to provide
          const filters = response.labelsToFilter.map((label: string[]) => [
            prismatic.TermOperator.notEqual,
            "name",
            label,
          ]);
          if (filters.length <= 1) {
            //Single filter
            //E.G. [prismatic.TermOperator.notEqual, "name", "shopify"]
            filterQuery = filters[0];
          } else {
            //Multiple filters grouped under an or
            //E.G. [prismatic.BooleanOperator.or, [[prismatic.TermOperator.notEqual, "name", "shopify"], [prismatic.TermOperator.notEqual, "name", "salesforce"]]]
            filterQuery = [[prismatic.BooleanOperator.or, ...filters]];
          }

          setShowMarketplace(true);

          prismatic.showMarketplace({
            selector: `#integration-marketplace-placeholder`,
            usePopover: false,
            theme: "LIGHT",
            screenConfiguration: {
              marketplace: {
                includeActiveIntegrations: true,
              },
              instance: {
                hideTabs: ["Test", "Executions", "Monitors", "Logs"],
              },
              configurationWizard: {
                isInModal: true,
              },
            },
            filters: {
              filterQuery,
            },
          });
        })
        .catch((error: { message: string }) => {
          if (error.message.includes("Invalid organization/customer.")) {
            setIsUnavlToCustomer(true);
          } else if (error.message.includes("Invalid token was provided.")) {
            refetch();
          } else {
            throw error;
          }
        });
    },
    staleTime: 50 * 60 * 1000, // 50 minutes in milliseconds - since the token is valid for 1hr
  });

  useEffect(() => {
    const listener = (message: MessageEvent) => {
      const { event, data } = message.data;
      if (
        event === prismatic.PrismaticMessageEvent.INSTANCE_CONFIGURATION_LOADED
      ) {
        const iframe = prismatic.getMessageIframe(message);
        if (
          integrationNamesToSetRefreshTokenIn.includes(data.integrationName)
        ) {
          const refreshToken = tokenManagement.getRefreshToken();

          prismatic.setConfigVars({
            iframe,
            configVars: {
              "Crstl Refresh Token": {
                value: refreshToken,
              },
              "Organization Id": {
                value: tokenManagement.getOrg(),
              },
            },
          });
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  return isUnavlToCustomer ? (
    <ErrorMessage message="Please reach out to the Crstl team to activate the integrations marketplace" />
  ) : (
    <Spinner spinning={!showMarketplace && !isFetching}>
      {isError || isUnavlToCustomer ? (
        <ErrorMessage />
      ) : (
        <div
          id="integration-marketplace-placeholder"
          style={{ height: "calc(100vh - 90px)" }}
        />
      )}
    </Spinner>
  );
};

