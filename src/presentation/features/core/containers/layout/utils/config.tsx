import {
  CORE_ANALYTICS_FINANCE_ACCOUNTING,
  CORE_ANALYTICS_FINANCE_CASH_AND_CARDS,
  CORE_ANALYTICS_FINANCE_EXPENSES,
  CORE_ANALYTICS_OPERATIONS,
  CORE_ANALYTICS_SALES,
  CORE_EDI_SEARCH_VIEW_PAGE,
  CORE_SETUP,
} from "globals/configs";
import { startCase } from "lodash";

import { HeaderIconProps } from "@crstl/components/molecules/icon-groups";

type CoreHeaderProps = {
  avatarText: string | undefined;
};

export const createHeaderIconsData = ({
  avatarText = "",
}: CoreHeaderProps): HeaderIconProps[] => [
  // {
  //   type: "search",
  //   onClick: () => console.log("clicked"),
  // },
  // {
  //   type: "question",
  //   onClick: () => console.log("clicked"),
  // },
  // {
  //   type: "bell",
  //   badgeCount: null,
  //   onClick: () => console.log("clicked"),
  // },
  {
    type: "avatar",
    imageSource: "https://i.postimg.cc/FHzJ8hHv/ODTLcjx-Afvqbx-Hn-VXCYX.jpg",
    name: avatarText,
  },
];

const pathnameToTitleMap: Record<string, string> = {
  [CORE_ANALYTICS_FINANCE_CASH_AND_CARDS]: "Cash & Cards",
  [CORE_ANALYTICS_FINANCE_EXPENSES]: "Finance / Expenses",
  [CORE_ANALYTICS_FINANCE_ACCOUNTING]: "Accounting",
  [CORE_ANALYTICS_SALES]: "Sales",
  [CORE_ANALYTICS_OPERATIONS]: "Operations",
  finance: "Integrations",
  edi: "Transactions",
  [CORE_SETUP]: "Help us learn more about you",
  [CORE_EDI_SEARCH_VIEW_PAGE]: "Search Results",
};

const getHeaderTitle = (url = "") => {
  const lowerCasedUrl = url.toLowerCase();
  const titleFromUrl = pathnameToTitleMap[lowerCasedUrl];

  if (titleFromUrl) {
    return titleFromUrl;
  }

  const pathname = url.split("/")[1];
  const lowerCasedPathname = pathname.toLowerCase();

  const title = pathnameToTitleMap[lowerCasedPathname] ?? startCase(pathname);
  return title;
};

export { getHeaderTitle };

