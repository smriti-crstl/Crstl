import { ReactComponent as ShoppingCart } from "globals/assets/svgs/add_shopping_cart.svg";
import { ReactComponent as Alerts } from "globals/assets/svgs/alerts.svg";
import { ReactComponent as Money } from "globals/assets/svgs/attach_money.svg";
import { ReactComponent as BarChart } from "globals/assets/svgs/bar_chart.svg";
import { ReactComponent as Integration } from "globals/assets/svgs/integration_purple_21px.svg";
import { ReactComponent as MailOutLined } from "globals/assets/svgs/mail_outline.svg";
import { ReactComponent as Monitors } from "globals/assets/svgs/monitors.svg";
import { ReactComponent as Settings } from "globals/assets/svgs/setting.svg";
import { ReactComponent as Wrench } from "globals/assets/svgs/wrench.svg";
import {
  CORE_ALERTS_ALL,
  CORE_ANALYTICS_ALL,
  CORE_ANALYTICS_FINANCE_CASH_AND_CARDS,
  CORE_ANALYTICS_FINANCE_EXPENSES,
  CORE_ANALYTICS_OPERATIONS,
  CORE_ANALYTICS_SALES,
  CORE_EDI_LIST_PAGE,
  CORE_INTEGRATIONS_ALL,
  CORE_MARKETING,
  CORE_MARKETING_FACEBOOK,
  CORE_MARKETING_GOOGLE,
  CORE_ORDERS_ALL,
  CORE_ORDERS_AMAZON_LANDING,
  CORE_ORDERS_B2B_LANDING,
  CORE_ORDERS_SHOPIFY_LANDING,
  CORE_SETTINGS,
} from "globals/configs";
import { CoreRouteSettingsOptions } from "globals/configs/urls/constants";
import { compact } from "lodash";
import { amplitude } from "presentation/utils";
import { generatePath } from "react-router";
import styled from "styled-components";

import Icon, { RocketOutlined } from "@ant-design/icons";
import { SideMenuPropsElementProps } from "components/molecules/side-menu";

const IconWithMarginTop = styled(Icon)`
  margin-top: 6px;
`;

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

export const CORE_SIDE_MENU_SETTINGS_CONFIG: SideMenuPropsElementProps[] = [
  {
    route: generatePath(CORE_SETTINGS, {
      tabName: CoreRouteSettingsOptions.PROFILE,
    }),
    title: "Settings",
    icon: <Icon component={Settings} />,
    key: "/settings",
    onClick,
  },
];

const alertsNavItem: SideMenuPropsElementProps = {
  route: CORE_ALERTS_ALL,
  title: "Alerts",
  icon: <IconWithMarginTop component={Alerts} />,
  key: "/alerts",
  onClick,
};

const cashAndCardsNavItem: SideMenuPropsElementProps = {
  route: CORE_ANALYTICS_FINANCE_CASH_AND_CARDS,
  title: "Cash & Cards",
  onClick,
};

const expensesNavItem: SideMenuPropsElementProps = {
  route: CORE_ANALYTICS_FINANCE_EXPENSES,
  title: "Expenses",
  onClick,
};

const moneyCalendarNavItem: SideMenuPropsElementProps = {
  route: "/analytics/finance/accounting",
  title: "Money Calendar",
  onClick,
};

const marketingGoogleNavItem: SideMenuPropsElementProps = {
  route: CORE_MARKETING_GOOGLE,
  title: "Google",
  onClick,
};

const marketingFacebookNavItem: SideMenuPropsElementProps = {
  route: CORE_MARKETING_FACEBOOK,
  title: "Facebook",
  onClick,
};

const shopifyOrdersNavItem: SideMenuPropsElementProps = {
  route: CORE_ORDERS_SHOPIFY_LANDING,
  title: "Shopify",
  key: "/orders/shopify/list/all",
};

const amazonOrdersNavItem: SideMenuPropsElementProps = {
  route: CORE_ORDERS_AMAZON_LANDING,
  title: "Amazon",
  key: "/orders/amazon/list/all",
};

const b2bNavItem: SideMenuPropsElementProps = {
  route: CORE_ORDERS_B2B_LANDING,
  title: "B2B",
  key: "/orders/b2b/list/all",
};

function getSideMenuConfig(flags: Record<string, boolean>) {
  const alertNavItemWithFlags = getNavItem(alertsNavItem, flags.navL1Alerts);
  const alertsNav = flags.alertsTab ? [alertNavItemWithFlags] : [];

  const cashAndCardsNavItemWithFlags = getNavItem(
    cashAndCardsNavItem,
    flags.navL2CashAndCards
  );

  const expensesNavItemWithFlags = getNavItem(
    expensesNavItem,
    flags.navL2Expenses
  );

  const moneyCalendarNavItemWithFlags = getNavItem(
    moneyCalendarNavItem,
    flags.navL2MoneyCalendar
  );

  const marketingGoogleNavItemWithFlags = getNavItem(
    marketingGoogleNavItem,
    flags.navL2GoogleAds
  );

  const marketingFacebookNavItemWithFlags = getNavItem(
    marketingFacebookNavItem,
    flags.navL2FacebookAds
  );

  const shopifyOrdersNavItemWithFlags = getNavItem(
    shopifyOrdersNavItem,
    flags.navL2ShopifyOrders
  );

  const amazonOrdersNavItemWithFlags = getNavItem(
    amazonOrdersNavItem,
    flags.navL2AmazonOrders
  );

  const b2bNavItemWithFlags = getNavItem(b2bNavItem, flags.navL2B2BOrders);

  const menuItems = [
    getNavItem(
      {
        route: CORE_EDI_LIST_PAGE,
        title: "EDI",
        icon: <Icon style={{ color: "transparent" }} component={Monitors} />,
        key: "edi",
        onClick,
      },
      flags.navL1Edi
    ),
    getNavItem(
      {
        route: CORE_ANALYTICS_ALL,
        title: "Finance",
        icon: <Icon component={Money} />,
        children: compact([
          cashAndCardsNavItemWithFlags,
          expensesNavItemWithFlags,
          moneyCalendarNavItemWithFlags,
        ]),
      },
      flags.navL1Finance
    ),
    getNavItem(
      {
        route: CORE_ANALYTICS_SALES,
        title: "Sales",
        icon: <Icon component={BarChart} />,
        onClick,
      },
      flags.navL1Sales
    ),
    getNavItem(
      {
        route: CORE_MARKETING,
        title: "Marketing",
        icon: <Icon component={ShoppingCart} />,
        key: "/marketing",
        children: compact([
          marketingGoogleNavItemWithFlags,
          marketingFacebookNavItemWithFlags,
        ]),
      },
      flags.navL1Marketing
    ),
    getNavItem(
      {
        route: CORE_ANALYTICS_OPERATIONS,
        title: "Operations",
        icon: <Icon component={Wrench} />,
        onClick,
      },
      flags.navL1Operations
    ),
    getNavItem(
      {
        route: CORE_ORDERS_ALL,
        title: "Orders",
        icon: <Icon component={MailOutLined} />,
        children: compact([
          shopifyOrdersNavItemWithFlags,
          amazonOrdersNavItemWithFlags,
          b2bNavItemWithFlags,
        ]),
      },
      flags.navL1Orders
    ),
    ...alertsNav,
    getNavItem(
      {
        route: CORE_INTEGRATIONS_ALL,
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
