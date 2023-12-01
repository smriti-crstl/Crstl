import { CoreRouteOnboardingOptions } from "globals/configs/urls/constants";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";

import { TabsConfig } from "components/atoms/tabs";

import {
  OnboardingAlertsTab,
  OnboardingEdiSetupTab,
  OnboardingGlobalEdiSetupTab,
  OnboardingTasksTab,
  ConnectionsTab,
} from "../components";
import { getConfig } from "../config";

export const useOnboardingTabsConfig = (): [TabsConfig] => {
  const flags = useFlags();
  const [tabsConfig, setTabsConfig] = useState<TabsConfig>([]);

  useEffect(() => {
    setTabsConfig(() => {
      const config = getConfig(flags);
      return config.map((item) => {
        switch (item.tabKey) {
          case CoreRouteOnboardingOptions.TASKS:
            return {
              ...item,
              children: <OnboardingTasksTab />,
            };
          case CoreRouteOnboardingOptions.EDI:
            return {
              ...item,
              children: <OnboardingEdiSetupTab />,
            };
          case CoreRouteOnboardingOptions.ALERTS:
            return {
              ...item,
              children: <OnboardingAlertsTab />,
            };
          case CoreRouteOnboardingOptions.GLOBAL_EDI:
            return {
              ...item,
              children: <OnboardingGlobalEdiSetupTab />,
            };
          case CoreRouteOnboardingOptions.CONNECTIONS:
            return {
              ...item,
              children: <ConnectionsTab />,
            };
          default:
            return item;
        }
      });
    });
  }, [flags]);

  return [tabsConfig];
};

