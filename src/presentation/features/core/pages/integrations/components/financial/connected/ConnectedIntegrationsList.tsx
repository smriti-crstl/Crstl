import {
  IntegrationSourceModelExtended,
  PlaidIntegrationModelRes,
} from "domain/entity/integrations/models";
import { ReactElement } from "react";

import { IntegrationTypeModel } from "@crstl/api/src/apis/models/Integration";

import { IntegrationsListElement } from "../../integrations-list";
import { ReAuthPlaid } from "../re-auth plaid";

type Props = {
  plaidIntegrations?: PlaidIntegrationModelRes[] | undefined;
  otherIntegrations?: IntegrationSourceModelExtended[] | undefined;
};

export const ConnectedIntegrationsList = ({
  plaidIntegrations,
  otherIntegrations,
}: Props): ReactElement => {
  if (plaidIntegrations) {
    return (
      <>
        {otherIntegrations?.map((item) => (
          <IntegrationsListElement
            {...item}
            onAddButtonClick={() => {
              // this is intentional
            }}
            isLoading={false}
            key={item.id}
          />
        ))}
        {plaidIntegrations.map((item) => {
          return (
            <IntegrationsListElement
              imageUrl={""}
              createdBy={item.createdBy}
              createdAt={item.createdAt}
              id={item.integrationId}
              integrationType={IntegrationTypeModel.Finance}
              isConnected={!item.needsReAuthorization}
              isLoading={false}
              name={item.institutionName}
              onAddButtonClick={() => {
                console.log("Clicked");
              }}
              key={item.integrationId}
              customSpanValues={{ text: 15, ctaButton: 5 }}
              CustomCallbackElement={
                <ReAuthPlaid
                  integrationId={item.integrationId}
                  isConnected={!item.needsReAuthorization}
                />
              }
              lastReAuthedAt={item.lastReAuthedAt}
              lastReAuthedBy={item.lastReAuthedBy}
              assistedIntegration={false}
            />
          );
        })}
      </>
    );
  }
  return <div />;
};
