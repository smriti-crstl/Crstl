/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from "react";
import styled from "styled-components";
import SankeyChart from "presentation/features/core/pages/home/components/graphs/Sankey";
import { LIVE_TABS } from "../../config";
import { CustomDateRangePicker } from "../common";
import { CarouselCard } from "./Finance/CarouselCard";
import { FINANCE_CHART_HEADER } from "../../config/ChartHeaders/ChartHeaders";
import { useGetCreditCardsDataQuery } from "domain/interactors/homepage";
import { useDateRange } from "presentation/hooks/contexts";
interface IAnalyticsTabWrapper {
  tabSelected?: string;
}

const AnalyticsTabWrapper = styled.div<IAnalyticsTabWrapper>`
  ${(props) =>
    props.tabSelected === LIVE_TABS.ALL
      ? `display: grid;
        grid-template-columns: 800px 400px;
        grid-template-rows: min-content min-content;`
      : `display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 1200px;`}
  margin: auto;
`;

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1200px;
  margin: 20px auto;
  padding: 0 12px;
`;

const CardReports = (): ReactElement => {
  const { datesSelected, changeDates } = useDateRange();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FiltersBar>
        <CustomDateRangePicker
          datesSelected={datesSelected}
          changeDates={changeDates}
        />
      </FiltersBar>
      <AnalyticsTabWrapper>
        <SankeyChart />
        <CarouselCard
          title={FINANCE_CHART_HEADER.CREDIT_CARDS}
          useQueryFn={useGetCreditCardsDataQuery}
        />
      </AnalyticsTabWrapper>
    </div>
  );
};

export { CardReports };
