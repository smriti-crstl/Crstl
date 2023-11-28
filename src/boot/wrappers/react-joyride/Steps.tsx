import {
  CORE_EDI_EVENT_LOG,
  CORE_EDI_LIST_PAGE,
  CORE_ONBOARDING,
  CORE_SETTINGS,
  CORE_SETUP,
  CoreRouteOnboardingOptions,
  CoreRouteSettingsOptions
} from "globals/configs";
import { compact } from "lodash";
import { generatePath } from "react-router-dom";

import { DATA_TOUR_IDS } from "./constants";
import { StepItem } from "./types";

function getTourStepItem({
  title,
  selector,
  message,
  flagState,
  route,
}: StepItem) {
  if (flagState === "Clickable") {
    return {
      title,
      target: `#${selector}`,
      content: <p>{message}</p>,
      disableBeacon: true,
      route,
    };
  }
  return null;
}

export const getTourSteps = (flags: Record<string, boolean>) => {
  const tourItems: StepItem[] = [
    {
      title: "Transactions",
      selector: DATA_TOUR_IDS.TRANSACTIONS,
      flagState: flags.navL1Edi,
      message: "You can see all purchase orders and related info here",
      route: CORE_EDI_LIST_PAGE,
    },
    {
      title: "Transactions Filter",
      selector: DATA_TOUR_IDS.TRANSACTION_FILTER,
      flagState: flags.navL1Edi,
      message:
        "You can click on these cards and filter the orders shown in the table",
      route: CORE_EDI_LIST_PAGE,
    },
    {
      title: "Onboarding",
      selector: DATA_TOUR_IDS.ONBOARDING,
      flagState: flags.navL1JetBridge,
      message:
        "You can see all ongoing integrations with trading partners and update EDI setup related information here",
      route: generatePath(CORE_ONBOARDING, {
        tabName: CoreRouteOnboardingOptions.TASKS,
      }),
    },
    {
      title: "Event Log",
      selector: DATA_TOUR_IDS.EVENT_LOG,
      flagState: flags.navL1EventLog,
      message: "You can check all the logs here",
      route: CORE_EDI_EVENT_LOG,
    },
    {
      title: "Settings",
      selector: DATA_TOUR_IDS.SETTINGS,
      flagState: flags.navL1Settings,
      message:
        "You can update your profile, company info, passwords and manage users (with privileges), etc. here",
      route: generatePath(CORE_SETTINGS, {
        tabName: CoreRouteSettingsOptions.PROFILE,
      }),
    },
    {
      title: "Get Started",
      selector: DATA_TOUR_IDS.GET_STARTED,
      flagState: flags.navL1IntakeForm,
      message: "You can complete setting up your account here",
      route: CORE_SETUP,
    },
  ];

  const items = tourItems.map(getTourStepItem);

  return compact(items);
};

