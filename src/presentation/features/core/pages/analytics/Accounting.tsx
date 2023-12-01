import { ReactElement } from "react";

import { AccountingReports } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";

// import { Tabs } from "components/atoms/tabs";
// import { ANALYTICS_TABS_CONFIG } from "./config";

const Accounting = (): ReactElement => {
  return (
    <>
      <HeaderShadowContainerWithoutTabs />
      <AccountingReports />
      {/* <Tabs defaultActiveKey={""} data={ANALYTICS_TABS_CONFIG} /> */}
    </>
  );
};

export default Accounting;
