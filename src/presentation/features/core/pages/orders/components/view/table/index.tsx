import { ReactElement, useCallback, useState } from "react";

import { BorderedTabs } from "@crstl/components/atoms/tabs/BorderedTabs";

import { ORDER_DETAILS_TABLE_TABS_CONFIG } from "../../../config/orderDetailsTable";
import { ORDER_DETAILS_TAB_KEYS } from "../../../constants";

export const OrderViewTable = (): ReactElement => {
  const [activeTab, setActiveTab] = useState(ORDER_DETAILS_TAB_KEYS.TAB_1);
  const onTabClick = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);
  return (
    <div style={{ minHeight: "500px", overflow: "auto" }}>
      <BorderedTabs
        activeKey={activeTab}
        data={ORDER_DETAILS_TABLE_TABS_CONFIG()}
        onTabClick={onTabClick}
      />
    </div>
  );
};
