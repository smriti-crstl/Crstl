// import { TabsConfig } from "components/atoms/tabs";

// import { CoreAnalyticsReports } from "../components/reports";

export interface AnalyticsChartConfig {
  label: string;
  value: string;
}

// const ANALYTICS_TABS_CONFIG: TabsConfig = [
//   {
//     tab: "Live View",
//     tabKey: "Live View",
//     children: <CoreAnalyticsReports />,
//   },
//   {
//     tab: "Favorites",
//     tabKey: "Favorites",
//     children: "",
//   },
//   {
//     tab: "Data Health",
//     tabKey: "Data Health",
//     children: "",
//   },
// ];

const LIVE_TABS = {
  ALL: "All",
  SALES: "Sales",
  FINANCE: "Finance",
  OPERATIONS: "Operations",
};

const PATH_NAMES = ["all", "sales", "operations", "finance"];

const RESULT_CONSTANTS: {
  TODAY: string;
  SEVEN_DAYS: string;
  THIRTY_DAYS: string;
  SIXTY_DAYS: string;
  NINETY_DAYS: string;
  CUSTOM: string;
} = {
  TODAY: "Today",
  SEVEN_DAYS: "Last 7 days",
  THIRTY_DAYS: "Last 30 days",
  SIXTY_DAYS: "Last 60 days",
  NINETY_DAYS: "Last 90 days",
  CUSTOM: "Custom",
};

const RESULTS_LIST_CONFIG: AnalyticsChartConfig[] = [
  {
    label: "Today",
    value: RESULT_CONSTANTS.TODAY,
  },
  {
    label: "Last 7 days",
    value: RESULT_CONSTANTS.SEVEN_DAYS,
  },
  {
    label: "Last 30 days",
    value: RESULT_CONSTANTS.THIRTY_DAYS,
  },
  {
    label: "Last 60 days",
    value: RESULT_CONSTANTS.SIXTY_DAYS,
  },
  {
    label: "Last 90 days",
    value: RESULT_CONSTANTS.NINETY_DAYS,
  },
  {
    label: "Custom",
    value: RESULT_CONSTANTS.CUSTOM,
  },
];

const CARD_HEIGHT = 200;

export {
  // ANALYTICS_TABS_CONFIG,
  LIVE_TABS,
  RESULTS_LIST_CONFIG,
  PATH_NAMES,
  RESULT_CONSTANTS,
  CARD_HEIGHT,
};

export const X_AXIS_LABEL_COL_COUNT = 8;
