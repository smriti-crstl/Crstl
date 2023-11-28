import { CoreRouteSettingsOptions } from "globals/configs/urls/constants";
import { compact } from "lodash";
import { CORE_SETTINGS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { TabsConfig } from "@crstl/components/atoms/tabs";

interface Tab {
  tab: string;
  tabKey: string;
}

const profileTab: Tab = {
  tab: CORE_SETTINGS_TEXT_CONSTANTS.TAB_NAMES.PROFILE,
  tabKey: CoreRouteSettingsOptions.PROFILE,
};

const companyTab: Tab = {
  tab: CORE_SETTINGS_TEXT_CONSTANTS.TAB_NAMES.COMPANY,
  tabKey: CoreRouteSettingsOptions.COMPANY,
};

const teamTab: Tab = {
  tab: CORE_SETTINGS_TEXT_CONSTANTS.TAB_NAMES.TEAM,
  tabKey: CoreRouteSettingsOptions.TEAM,
};

const passwordTab: Tab = {
  tab: CORE_SETTINGS_TEXT_CONSTANTS.TAB_NAMES.PASSWORD,
  tabKey: CoreRouteSettingsOptions.PASSWORD,
};

const billingTab: Tab = {
  tab: CORE_SETTINGS_TEXT_CONSTANTS.TAB_NAMES.BILLING,
  tabKey: CoreRouteSettingsOptions.BILLING,
};

const SETTINGS_PROFILE_CONFIG: TabsConfig = [
  profileTab,
  companyTab,
  teamTab,
  passwordTab,
];

function getConfigItem(
  tab: Tab,
  flagState: boolean | "Visible" | "Clickable" | "Hidden"
): Tab | null {
  if (!flagState) {
    return null;
  }

  if (flagState === "Hidden") {
    return null;
  }

  return tab;
}

function getConfig(flags: Record<string, boolean>) {
  const profileTabWithFlags = getConfigItem(
    profileTab,
    flags.profileTab ?? true
  );

  const companyTabWithFlags = getConfigItem(
    companyTab,
    flags.companyTab ?? true
  );

  const teamTabWithFlags = getConfigItem(teamTab, flags.teamTab ?? true);

  const passwordWithFlags = getConfigItem(
    passwordTab,
    flags.passwordTab ?? true
  );

  const billingWithFlags = getConfigItem(billingTab, flags.billingTab ?? true);

  return compact([
    profileTabWithFlags,
    passwordWithFlags,
    teamTabWithFlags,
    companyTabWithFlags,
    billingWithFlags,
  ]);
}

export { getConfig, SETTINGS_PROFILE_CONFIG };

