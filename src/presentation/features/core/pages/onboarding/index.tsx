import { CORE_ONBOARDING } from "globals/configs";
import { ICoreRouteSettingsOptions } from "globals/configs/urls/constants";
import { ValueOf } from "globals/types";
import { ReactElement } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { Tabs } from "components/atoms/tabs";

import { useOnboardingTabsConfig } from "./hooks/useOnboardingTabsConfig";

const CoreOnboarding = (): ReactElement => {
  const history = useHistory();
  const { tabName } = useParams<{
    tabName: ValueOf<ICoreRouteSettingsOptions>;
  }>();

  const onSettingsTabClick = (tabKey: string): void => {
    history.replace(generatePath(CORE_ONBOARDING, { tabName: tabKey }));
  };

  const [settingsTabsConfig] = useOnboardingTabsConfig();

  return (
    <Tabs
      activeKey={tabName}
      data={settingsTabsConfig}
      onTabClick={onSettingsTabClick}
    />
  );
};

export default CoreOnboarding;

