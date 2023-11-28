import {
  useGetBanksDataQuery,
  useGetCreditCardsDataQuery,
} from "domain/interactors/homepage";
import { ReactElement } from "react";

import HomePageLineGraph from "@crstl/app/src/presentation/features/core/pages/home/components/graphs/LineGraph";
import { MoneyCalendar } from "@crstl/app/src/presentation/features/core/pages/home/components/MoneyCalendar";

import { LIVE_TABS } from "../../../config";
import { FINANCE_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { RevenueByRetailer } from "../Sales/RevenueByRetailer";
import { CarouselCard } from "./CarouselCard";
import { CashOnHandsReports } from "./CashOnHands";
import { BreakElement, LeftSection, RightSection } from "./Finance.styles";
import { InvoiceDue } from "./InvoiceDue";
import { UpcomingPayouts } from "./UpcomingPayouts";
import SankeyChart from "presentation/features/core/pages/home/components/graphs/Sankey";
import { AccountsPayableAgingReport } from "./AccountsPayableAgingReport";
import { AccountsReceivableAgingReport } from "./AccountsReceivableAgingReport";

type Props = {
  tabSelected?: string;
};

export const Finance = ({ tabSelected }: Props): ReactElement => {
  return (
    <>
      <LeftSection>
        <HomePageLineGraph showHighChartsGraph />
        <MoneyCalendar />
        <SankeyChart />
        <AccountsPayableAgingReport />
        <AccountsReceivableAgingReport />
      </LeftSection>
      <RightSection tabSelected={tabSelected}>
        <CarouselCard
          title={FINANCE_CHART_HEADER.BANK_ACCOUNTS}
          useQueryFn={useGetBanksDataQuery}
        />
        <BreakElement>.</BreakElement>
        <CarouselCard
          title={FINANCE_CHART_HEADER.CREDIT_CARDS}
          useQueryFn={useGetCreditCardsDataQuery}
        />
        <BreakElement>.</BreakElement>
        <CashOnHandsReports />
        <BreakElement>.</BreakElement>
        <InvoiceDue />
        <UpcomingPayouts />
        <BreakElement>.</BreakElement>
        {tabSelected === LIVE_TABS.ALL && (
          <>
            <RevenueByRetailer />
          </>
        )}
      </RightSection>
    </>
  );
};
