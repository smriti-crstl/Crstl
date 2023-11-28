import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import { useInitiateIntegrationQuery } from "domain/interactors/integrations";
import { ReactElement, useState } from "react";

import { IntegrationsListElement } from "../../components/integrations-list";
import { setIntegrationIdsToStorage } from "../../utils";
import { ShopifyInputModal } from "./InputModal";
import { ShopifyAuth } from "./ShopifyAuth";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
};

export const ShopifyIntegration = ({
  isServerIntegrationsLoading,
  needsReAuthorization,
  isConnected,
  ...rest
}: Props): ReactElement => {
  const [isShopNameModalOpen, setIsShopNameModalOpen] = useState(false);

  const { mutate, isLoading } = useInitiateIntegrationQuery({
    onSuccess: ({ authUrl, integrationLogId }) => {
      setIntegrationIdsToStorage({
        integrationSourceId: rest.id,
        integrationLogId,
      });
      window.open(authUrl, "_self");
    },
  });

  const handleModalSuccess = (shopName: null | string): void => {
    if (shopName) {
      if (shopName) {
        mutate({ shop: shopName, integrationSourceId: rest.id });
      }
    }
  };
  return (
    <>
      <ShopifyInputModal
        {...{
          handleModalSuccess,
          setIsShopNameModalOpen,
          isShopNameModalOpen,
          isLoading,
        }}
      />
      <IntegrationsListElement
        isLoading={isServerIntegrationsLoading}
        onAddButtonClick={() => {
          setIsShopNameModalOpen(true);
        }}
        key={rest.name}
        isConnected={isConnected ? !needsReAuthorization : isConnected}
        CustomCallbackElement={
          <ShopifyAuth
            isConnected={isConnected}
            needsAuth={needsReAuthorization}
            onAddButtonClick={() => setIsShopNameModalOpen(true)}
          />
        }
        {...rest}
      />
    </>
  );
};
