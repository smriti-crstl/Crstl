/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from "react";
import styled from "styled-components";
import { useFlags } from "launchdarkly-react-client-sdk";

import { CustomDateRangePicker } from "../common";
import { useDateRange } from "presentation/hooks/contexts";
import B2COrdersLineChart from "./Sales/B2COrdersLineChart";
import { RetailerOrders } from "./Sales/RetailerOrders";
import { RevenueByRetailer } from "./Sales/RevenueByRetailer";
import { TopSalesBySKUTable } from "./Sales/TopSalesBySkuTable";
import { AverageOrderValueGraph } from "./Sales/AverageOrderValueGraph";
interface IAnalyticsTabWrapper {
  tabSelected?: string;
}

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const AnalyticsTabWrapper = styled.div<IAnalyticsTabWrapper>`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;
`;

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1444px;
  max-width: 100%;
  margin: 20px auto;
  padding: 0;
`;

const AverageOrderValueGraphContainer = styled.div`
  grid-column: 1 / span 2;
`;

const SalesReport = (): ReactElement => {
  const { datesSelected, changeDates } = useDateRange();

  const flags = useFlags();

  return (
    <PageWrapper>
      <FiltersBar>
        <CustomDateRangePicker
          datesSelected={datesSelected}
          changeDates={changeDates}
        />
      </FiltersBar>
      <AnalyticsTabWrapper>
        {flags.averageOrderValue && (
          <AverageOrderValueGraphContainer>
            <AverageOrderValueGraph />
          </AverageOrderValueGraphContainer>
        )}
        {flags.chartSalesByRetailerRevenue && <RevenueByRetailer />}
        {flags.totalOrdersECommerce && <B2COrdersLineChart />}
        {flags.topProductsBySales && <TopSalesBySKUTable />}
        {flags.chartSalesByRetailerOrders && <RetailerOrders />}
      </AnalyticsTabWrapper>
    </PageWrapper>
  );
};

export { SalesReport };
