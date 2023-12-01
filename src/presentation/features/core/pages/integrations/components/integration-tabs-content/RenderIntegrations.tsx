import { Skeleton } from "antd";
import {
  IntegrationKeyModelFE,
  IntegrationSourceModelExtended,
} from "domain/entity/integrations/models";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { Dispatch, ReactElement } from "react";

import { EmptyText } from "components/atoms/empty";

import { IntegrationStateActions } from "../../reducer";
import { OtherGenericIntegrations } from "../../sources/others";
import { QuickbooksOnlineIntegration } from "../../sources/qbo";
import { ShopifyIntegration } from "../../sources/shopify";
import { SPSIntegration } from "../../sources/sps";
import { AmazonIntegration } from "../../sources/amazon";
import { RailzIntegration } from "../../sources/railz";
import { SlackIntegrations } from "../../sources/slack";
import { RampIntegration } from "../../sources/ramp";

type Props = {
  isServerIntegrationsLoading: boolean;
  integrationList: IntegrationSourceModelExtended[];
  serverIntegrations: IntegrationSourceModelExtended[] | undefined;
  dispatchIntegrationsAction: Dispatch<IntegrationStateActions>;
  onModalCancel: () => void;
};

export const RenderIntegrations = ({
  isServerIntegrationsLoading,
  integrationList,
  serverIntegrations,
  dispatchIntegrationsAction,
  onModalCancel,
}: Props): ReactElement => {
  // UI
  if (isServerIntegrationsLoading) {
    return (
      <div data-testid="loading integrations">
        <Skeleton />
      </div>
    );
  }

  if (!isServerIntegrationsLoading && integrationList.length === 0) {
    return (
      <EmptyText text={CORE_INTEGRATIONS_TEXT_CONSTANTS.NO_INTEGRATIONS} />
    );
  }
  return (
    <>
      {integrationList.map((item) => {
        const commonProps = {
          ...item,
          isServerIntegrationsLoading,
          key: `${item.integrationKey}-${item.name}`,
        };
        switch (item.integrationKey) {
          case IntegrationKeyModelFE.Slack:
            return <SlackIntegrations {...commonProps} />;
          case IntegrationKeyModelFE.Railz:
            return <RailzIntegration {...commonProps} />;
          case IntegrationKeyModelFE.SPSCommerce:
            return (
              <SPSIntegration
                {...commonProps}
                {...{
                  dispatchIntegrationsAction,
                  serverIntegrations,
                }}
              />
            );
          case IntegrationKeyModelFE.Shopify:
            return <ShopifyIntegration {...commonProps} />;
          case IntegrationKeyModelFE.QuickbooksOnline:
            return <QuickbooksOnlineIntegration {...commonProps} />;
          case IntegrationKeyModelFE.Amazon:
            return (
              <AmazonIntegration
                {...commonProps}
                onModalCancel={onModalCancel}
              />
            );
          case IntegrationKeyModelFE.Ramp:
            return <RampIntegration {...commonProps} />;
          default:
            return <OtherGenericIntegrations {...commonProps} />;
        }
      })}
    </>
  );
};
