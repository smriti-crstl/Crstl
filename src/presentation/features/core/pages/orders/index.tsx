import { ReactElement } from "react";

import { TabPaneChildrenWrapper } from "@crstl/components/atoms/tabs";
import { HeaderShadowContainerWithoutTabs } from "@crstl/components/molecules/headers";

import { OrdersAll } from "./components/all";
import { WelcomeModal } from "./components/common/WelcomeModal";

const CoreOrders = (): ReactElement => {
  return (
    <>
      <WelcomeModal />
      <HeaderShadowContainerWithoutTabs />
      <TabPaneChildrenWrapper>
        <OrdersAll />
      </TabPaneChildrenWrapper>
    </>
  );
};

export default CoreOrders;
