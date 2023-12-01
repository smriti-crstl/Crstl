import { ReactElement } from "react";

import { CashAndCardReport } from "./components/reports";
import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";
import { WelcomeModal } from "../orders/components/common/WelcomeModal";

// import { Tabs } from "components/atoms/tabs";
// import { ANALYTICS_TABS_CONFIG } from "./config";

const CashAndCards = (): ReactElement => {
  return (
    <>
      <WelcomeModal />
      <HeaderShadowContainerWithoutTabs />
      <CashAndCardReport />
      {/* <Tabs defaultActiveKey={""} data={ANALYTICS_TABS_CONFIG} /> */}
    </>
  );
};

export default CashAndCards;
