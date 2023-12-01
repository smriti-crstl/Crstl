import { ReactElement } from "react";

import { CoreAnalyticsReports } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";

// import { Tabs } from "components/atoms/tabs";
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
