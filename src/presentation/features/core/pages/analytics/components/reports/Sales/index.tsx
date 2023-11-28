import { ReactElement } from "react";

import { LIVE_TABS } from "../../../config";
import { BreakElement } from "../Finance/Finance.styles";
import { Operations } from "../Operations";
import { BottomContainer } from "../ReportsView/Reports.styles";
// import B2BOrdersLineChart from "./B2BOrdersLineChart";
import B2COrdersLineChart from "./B2COrdersLineChart";
import { RetailerOrders } from "./RetailerOrders";
import { RevenueByRetailer } from "./RevenueByRetailer";
import { TopSalesBySKUTable } from "./TopSalesBySkuTable";

type Props = {
  tabSelected?: string;
};

export const Sales = ({ tabSelected }: Props): ReactElement => {
  return (
    <>
      {/* <OrderByCustomer /> */}
      {tabSelected === LIVE_TABS.SALES && (
        <>
          {/* <B2BOrdersLineChart /> */}
          <B2COrdersLineChart />
          <RetailerOrders />
          <BreakElement>.</BreakElement>
          <RevenueByRetailer />
          <BreakElement>.</BreakElement>
          <TopSalesBySKUTable />
        </>
      )}

      {tabSelected === LIVE_TABS.ALL && (
        <>
          <BottomContainer>
            {/* <B2BOrdersLineChart /> */}
            <B2COrdersLineChart />
            <Operations />
            <TopSalesBySKUTable />
            <RetailerOrders />
          </BottomContainer>
        </>
      )}
      {/* <AverageOrderValue /> */}
      {/* <SkuB2B /> */}
      {/* <EmptyPaperCard /> */}
    </>
  );
};
