import { ReactElement } from "react";

import { SalesReport } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "@crstl/components/molecules/headers";

// import { Tabs } from "@crstl/components/atoms/tabs";
// import { ANALYTICS_TABS_CONFIG } from "./config";

const Sales = (): ReactElement => {
  return (
    <>
      <HeaderShadowContainerWithoutTabs />
      <SalesReport />
      {/* <Tabs defaultActiveKey={""} data={ANALYTICS_TABS_CONFIG} /> */}
    </>
  );
};

export default Sales;
