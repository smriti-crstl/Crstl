import { CoreRouteOnboardingOptions } from "globals/configs/urls/constants";
import { compact } from "lodash";
import { CORE_ONBOARDING_TEXT_CONSTANTS } from "presentation/texts-reservoir";

import { TabsConfig } from "components/atoms/tabs";

interface Tab {
  tab: string;
  tabKey: string;
  disabled?: boolean;
}

const tasksTab: Tab = {
  tab: CORE_ONBOARDING_TEXT_CONSTANTS.TAB_NAMES.TASKS,
  tabKey: CoreRouteOnboardingOptions.TASKS,
};

const globalEdiTab: Tab = {
  tab: CORE_ONBOARDING_TEXT_CONSTANTS.TAB_NAMES.GLOBAL_EDI_SETUP,
  tabKey: CoreRouteOnboardingOptions.GLOBAL_EDI,
};

const alertsTab: Tab = {
  tab: CORE_ONBOARDING_TEXT_CONSTANTS.TAB_NAMES.ALERTS_SETUP,
  tabKey: CoreRouteOnboardingOptions.ALERTS,
};

const ediTab: Tab = {
  tab: CORE_ONBOARDING_TEXT_CONSTANTS.TAB_NAMES.EDI_SETUP,
  tabKey: CoreRouteOnboardingOptions.EDI,
};

const connectionsTab: Tab = {
  tab: CORE_ONBOARDING_TEXT_CONSTANTS.TAB_NAMES.CONNECTIONS,
  tabKey: CoreRouteOnboardingOptions.CONNECTIONS,
};

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

  return { ...tab, disabled: flagState === "Visible" };
}

const getConfig = (flags: Record<string, boolean>): TabsConfig => {
  const taskTabWithFlags = getConfigItem(tasksTab, flags.navL2OnboardingTasks);
  const ediWithFlags = getConfigItem(ediTab, flags.navL2EdiSetup);
  const alertsWithFlags = getConfigItem(alertsTab, flags.navL2Alerts);
  const globalEdiWithFlags = getConfigItem(
    globalEdiTab,
    flags.navL2GlobalEdiSetup
  );

  const connectionsTabWithFlags = getConfigItem(
    connectionsTab,
    flags.navL2OnboardingConnections
  );

  return compact([
    taskTabWithFlags,
    globalEdiWithFlags,
    alertsWithFlags,
    ediWithFlags,
    connectionsTabWithFlags,
  ]);
};

export { getConfig };

