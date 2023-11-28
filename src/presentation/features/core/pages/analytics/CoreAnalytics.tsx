import { ReactElement } from "react";

import { CoreAnalyticsReports } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "@crstl/components/molecules/headers";

// import { Tabs } from "@crstl/components/atoms/tabs";
// import { ANALYTICS_TABS_CONFIG } from "./config";

const CoreAnalytics = (): ReactElement => {
  return (
    <>
      <HeaderShadowContainerWithoutTabs />
      <CoreAnalyticsReports />
      {/* <Tabs defaultActiveKey={""} data={ANALYTICS_TABS_CONFIG} /> */}
    </>
  );
};

export default CoreAnalytics;
