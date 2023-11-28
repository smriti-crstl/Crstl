import { ReactElement } from "react";

import { TabPaneChildrenWrapper } from "@crstl/components/atoms/tabs";
import { HeaderShadowContainerWithoutTabs } from "@crstl/components/molecules/headers";

import { NewOrdersAll } from "./All";
import { WelcomeModal } from "../orders/components/common/WelcomeModal";

const CoreOrders = (): ReactElement => {
  return (
    <>
      <WelcomeModal />
      <HeaderShadowContainerWithoutTabs />
      <TabPaneChildrenWrapper>
        <NewOrdersAll />
      </TabPaneChildrenWrapper>
    </>
  );
};

export default CoreOrders;
