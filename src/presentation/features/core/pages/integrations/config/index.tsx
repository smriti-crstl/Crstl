import { CoreRouteIntegrationsOptions } from "globals/configs/urls/constants";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { TabsConfig } from "components/atoms/tabs";

import { IntegrationsFinancialTab } from "../components/financial";
import {
  IntegrationsTabContent,
  MyIntegrationsTabContent,
  IntegrationsDashboard,
} from "../components/integration-tabs-content";
import { Marketplace } from "../components/marketplace";

export const INTEGRATIONS_TABS_CONFIG: TabsConfig = [
  {
    tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.ALL,
    tabKey: CoreRouteIntegrationsOptions.ALL,
    children: <IntegrationsTabContent />,
  },
  {
    tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.MARKETPLACE,
    tabKey: CoreRouteIntegrationsOptions.MARKETPLACE,
    children: <Marketplace />,
  },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.EDI,
  //   tabKey: CoreRouteIntegrationsOptions.EDI,
  //   children: <IntegrationsTabContent />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.E_COMMERCE,
  //   tabKey: CoreRouteIntegrationsOptions.E_COMMERCE,
  //   children: <IntegrationsTabContent />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.MARKETING,
  //   tabKey: CoreRouteIntegrationsOptions.MARKETING,
  //   children: <IntegrationsTabContent />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.INVENTORY,
  //   tabKey: CoreRouteIntegrationsOptions.INVENTORY,
  //   children: <IntegrationsTabContent />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.SHIPPING_AND_FULFILLMENT,
  //   tabKey: CoreRouteIntegrationsOptions.SHIPPING_AND_FULFILLMENT,
  //   children: <IntegrationsTabContent />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.FINANCIAL,
  //   tabKey: CoreRouteIntegrationsOptions.FINANCIAL,
  //   children: <IntegrationsFinancialTab />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.ACCOUNTING,
  //   tabKey: CoreRouteIntegrationsOptions.ACCOUNTING,
  //   children: <IntegrationsTabContent />,
  // },
  // {
  //   tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.COLLABORATION,
  //   tabKey: CoreRouteIntegrationsOptions.COLLABORATION,
  //   children: <IntegrationsTabContent />,
  // },
  {
    tab: CORE_INTEGRATIONS_TEXT_CONSTANTS.TAB_NAMES.MY_INTEGRATIONS,
    tabKey: CoreRouteIntegrationsOptions.MY_INTEGRATIONS,
    // children: <MyIntegrationsTabContent />,
    children: <IntegrationsDashboard />,
  },
];

