import { CoreRouteSettingsOptions } from "globals/configs/urls/constants";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";

import { TabsConfig } from "@crstl/components/atoms/tabs";

import { SettingsCompanyDetailsTab } from "../components/company-tab";
import { SettingsPasswordTab } from "../components/password-tab";
import { SettingsProfileTab } from "../components/profile-tab";
import CoreSettingsTeam from "../components/team-tab";
import { getConfig } from "../config";

type Props = {
  filterTeamsTab: boolean;
};

export const useSettingsTabsConfig = ({
  filterTeamsTab,
}: Props): [TabsConfig] => {
  const flags = useFlags();
  const [tabsConfig, setTabsConfig] = useState<TabsConfig>([]);

  useEffect(() => {
    setTabsConfig(() => {
      let config = getConfig(flags);
      if (filterTeamsTab) {
        config = config.filter(
          (item) => item.tabKey !== CoreRouteSettingsOptions.TEAM
        );
      }
      return config.map((item) => {
        switch (item.tabKey) {
          case CoreRouteSettingsOptions.PROFILE:
            return {
              ...item,
              children: <SettingsProfileTab />,
            };
          case CoreRouteSettingsOptions.PASSWORD:
            return {
              ...item,
              // Password form is made inside SettingsPasswordTab Component
              children: <SettingsPasswordTab />,
            };
          case CoreRouteSettingsOptions.TEAM:
            return {
              ...item,
              children: <CoreSettingsTeam />,
            };
          case CoreRouteSettingsOptions.COMPANY:
            return {
              ...item,
              children: <SettingsCompanyDetailsTab />,
            };
          case CoreRouteSettingsOptions.BILLING:
            return {
              ...item,
              children: <div>Billing tab</div>,
            };
          default:
            return item;
        }
      });
    });
  }, [filterTeamsTab, flags]);

  return [tabsConfig];
};

