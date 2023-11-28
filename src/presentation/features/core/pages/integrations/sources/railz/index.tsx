import { IntegrationSourceModelExtended } from "domain/entity/integrations/models";
import {
  useGetBusinessNameQuery,
  useGetRailzIntegrationQuery,
  useUpdateRailzIntegrationQuery,
} from "domain/interactors/integrations";
import { CORE_INTEGRATIONS_ACCOUNTING } from "globals/configs";
import { parseSearchParams } from "presentation/utils";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { IntegrationsListElement } from "../../components/integrations-list";
import { RAILS_CONFIG } from "./railz.config";
import { RailzAuth } from "./railzAuth";

type Props = IntegrationSourceModelExtended & {
  isServerIntegrationsLoading: boolean;
};

export const RailzIntegration = ({
  isServerIntegrationsLoading,
  needsReAuthorization,
  isConnected,
  ...rest
}: Props): ReactElement => {
  const {
    data: businessNameResponse,
    isLoading: getBusinessNameLoading,
  } = useGetBusinessNameQuery();

  const {
    data: railzIntegrationResponse,
    isLoading: railzIntegrationLoading,
  } = useGetRailzIntegrationQuery();

  const {
    mutate: updateRailzIntegrations,
    isLoading: loadingRailzIntegrations,
  } = useUpdateRailzIntegrationQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const _search = parseSearchParams(search);
    if (_search.railz_connect) {
      updateRailzIntegrations(null);
      setTimeout(async () => {
        history.push(CORE_INTEGRATIONS_ACCOUNTING);
      }, 1000);
    }
  }, [search]);

  isConnected = railzIntegrationResponse?.connections.length ? true : false;
  const businessName = businessNameResponse?.businessName;

  const mountRails = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const widget = new RailzConnect();
    widget.mount({
      parentElement: document.getElementById(RAILS_CONFIG.RAILS_CONNECT_DIV),
      widgetId: RAILS_CONFIG.WIDGET_ID,
      // Add additional Railz Connect configuration  paramaters here
      redirectUrl: RAILS_CONFIG.REDIRECT_URL,
      businessName: businessName,
      removeRailzWatermark: RAILS_CONFIG.REMOVE_RAILZ_WATERMARK,
      headerEnabled: RAILS_CONFIG.HEADER_ENABLED,
    });
  };

  const handleRailzAddClick = (): void => {
    setIsModalOpen(true);
    setTimeout(async () => {
      mountRails();
    }, 500);
  };

  if (!businessName) {
    return <div />;
  }
  return (
    <IntegrationsListElement
      isLoading={
        isServerIntegrationsLoading ||
        getBusinessNameLoading ||
        railzIntegrationLoading ||
        loadingRailzIntegrations
      }
      onAddButtonClick={handleRailzAddClick}
      key={RAILS_CONFIG.RAILZ_INTEGRATION}
      {...rest}
      isConnected={isConnected}
      CustomCallbackElement={
        <RailzAuth
          isconnected={isConnected}
          needsAuth={needsReAuthorization}
          onAddButtonClick={handleRailzAddClick}
          businessName={businessNameResponse?.businessName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      }
    />
  );
};
