import { ReactElement } from "react";

import { OperationsReport } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";

// import { Tabs } from "components/atoms/tabs";
// import { ANALYTICS_TABS_CONFIG } from "./config";

const Operations = (): ReactElement => {
  return (
    <>
      <HeaderShadowContainerWithoutTabs />
      <OperationsReport />
      {/* <Tabs defaultActiveKey={""} data={ANALYTICS_TABS_CONFIG} /> */}
    </>
  );
};

export default Operations;
