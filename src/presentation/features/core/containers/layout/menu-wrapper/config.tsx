import { DATA_TOUR_IDS } from "boot/wrappers/react-joyride/constants";
import { ReactComponent as Alerts } from "globals/assets/svgs/alert_nav_icon.svg";
import { ReactComponent as AuditLog } from "globals/assets/svgs/auditlog_nav_icon.svg";
import { ReactComponent as Integration } from "globals/assets/svgs/integrations_nav_icon.svg";
import { ReactComponent as LogOut } from "globals/assets/svgs/logout_nav_icon.svg";
import { ReactComponent as OnBoarding } from "globals/assets/svgs/onboarding_nav_icon.svg";
import { ReactComponent as Settings } from "globals/assets/svgs/settings_nav_icon.svg";
import { ReactComponent as Setup } from "globals/assets/svgs/setup_nav_icon.svg";
import { ReactComponent as Smile } from "globals/assets/svgs/smile_nav_icon.svg";
import { ReactComponent as Transactions } from "globals/assets/svgs/transactions_nav_icon.svg";
import {
  CORE_ALERTS_ALL,
  CORE_EDI_EVENT_LOG,
  CORE_EDI_LIST_PAGE,
  CORE_INTEGRATIONS_BASE,
  CORE_ONBOARDING,
  CORE_SETTINGS,
  CORE_SETUP,
} from "globals/configs";
import {
  CoreRouteOnboardingOptions,
  CoreRouteSettingsOptions,
} from "globals/configs/urls/constants";
import { compact } from "lodash";
import { amplitude } from "presentation/utils";
import { generatePath } from "react-router";

import Icon from "@ant-design/icons";
import { SideMenuPropsElementProps } from "@crstl/components/molecules/side-menu";

import { MenuTabKey } from "./types";

function onClick(menuItem: SideMenuPropsElementProps) {
  amplitude.logClickEvent(menuItem.title);
}

function getNavItem(
  navItem: SideMenuPropsElementProps,
  flagState: boolean | "Visible" | "Clickable" | "Hidden"
): SideMenuPropsElementProps | null {
  if (!flagState) {
    return null;
  }
  if (flagState === "Hidden") {
    return null;
  }
  const disabled = flagState === "Visible";
  return {
    ...navItem,
    disabled,
  };
}

export const getSideMenuTriggerConfig = ({
  userName,
  flags,
}: {
  userName: string;
  flags: Record<string, boolean>;
}): SideMenuPropsElementProps[] => {
  const menuItems: Array<SideMenuPropsElementProps | null> = [
    {
      route: generatePath(CORE_SETTINGS, {
        tabName: CoreRouteSettingsOptions.PROFILE,
      }),
      title: userName,
      icon: <Icon component={Smile} />,
      key: "profile",
      onClick,
      disabled: true,
      hideTooltip: true,
    },
    getNavItem(
      {
        route: generatePath(CORE_SETTINGS, {
          tabName: CoreRouteSettingsOptions.PROFILE,
        }),
        title: "Settings",
        icon: <Icon component={Settings} />,
        key: "/settings",
        onClick,
        id: DATA_TOUR_IDS.SETTINGS,
      },
      flags.navL1Settings
    ),
    getNavItem(
      {
        route: CORE_SETUP,
        title: "Get Started",
        icon: <Icon component={Setup} />,
        key: "/setup",
        onClick,
        id: DATA_TOUR_IDS.GET_STARTED,
      },
      flags.navL1IntakeForm
    ),
  ];
  return compact(menuItems);
};

export const getLogoutMenuConfig = ({
  handleLogoutClick,
}: {
  handleLogoutClick: () => void;
}): SideMenuPropsElementProps[] => [
  {
    route: "",
    title: "Logout",
    icon: <Icon component={LogOut} />,
    key: "/logout",
    onClick: (menuItem) => {
      onClick(menuItem);
      handleLogoutClick();
    },
  },
];

function getSideMenuConfig(
  flags: Record<string, boolean>,
  counts: Record<MenuTabKey, number>
) {
  const menuItems = [
    getNavItem(
      {
        route: CORE_EDI_LIST_PAGE,
        title: "Transactions",
        icon: <Icon component={Transactions} />,
        key: "edi",
        onClick,
        count: counts.transactions,
        id: DATA_TOUR_IDS.TRANSACTIONS,
      },
      flags.navL1Edi
    ),
    getNavItem(
      {
        route: generatePath(CORE_ONBOARDING, {
          tabName: CoreRouteOnboardingOptions.TASKS,
        }),
        title: "Onboarding",
        icon: <Icon component={OnBoarding} />,
        key: "/onboarding",
        onClick,
        count: counts.onboarding,
        id: DATA_TOUR_IDS.ONBOARDING,
      },
      flags.navL1JetBridge
    ),
    getNavItem(
      {
        route: CORE_EDI_EVENT_LOG,
        title: "Event Log",
        icon: <Icon component={AuditLog} />,
        id: DATA_TOUR_IDS.EVENT_LOG,
      },
      flags.navL1EventLog
    ),
    getNavItem(
      {
        route: CORE_ALERTS_ALL,
        title: "Alerts",
        icon: <Icon component={Alerts} />,
        key: "/alerts",
        onClick,
      },
      flags.navL1Alerts
    ),
    getNavItem(
      {
        route: CORE_INTEGRATIONS_BASE,
        title: "Integrations",
        icon: <Icon component={Integration} />,
        key: "/integrations",
        onClick,
      },
      flags.navL1Integrations
    ),
  ];

  return compact(menuItems);
}

export { getSideMenuConfig };

