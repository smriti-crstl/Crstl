const TIMESTAMP_FORMAT = "MMMM D, YYYY, h:mm A";
const DATE_FORMAT = "YYYY-MM-DD";
const DAYS = "days";
const FILTER = "filter";

export interface Subtype {
  ALL: string;
  ALERTS: string;
  UPDATES: string;
  SUMMARY: string;
}

export type Alert = {
  id: string;
  createdAt: string;
  type: string;
  subtype: string;
  title: string;
  subtitle: string;
  headline: string;
  body: string[];
  ctaLabel?: string;
  ctaURL?: string;
};

const LIVE_TABS: Subtype = {
  ALL: "All",
  ALERTS: "Alerts",
  UPDATES: "Updates",
  SUMMARY: "Summary",
};

const PATH_NAMES = ["all", "alerts", "updates", "summary"];

const SUBTYPES: Subtype = {
  UPDATES: "update",
  ALERTS: "alert",
  SUMMARY: "summary",
  ALL: "all",
};

export {
  FILTER,
  DAYS,
  LIVE_TABS,
  TIMESTAMP_FORMAT,
  PATH_NAMES,
  SUBTYPES,
  DATE_FORMAT,
};
