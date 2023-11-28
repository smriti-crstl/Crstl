/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from "react";
import styled from "styled-components";
import { useFlags } from "launchdarkly-react-client-sdk";
import { MoneyCalendar } from "@crstl/app/src/presentation/features/core/pages/home/components/MoneyCalendar";
import { UpcomingPayouts } from "./Finance/UpcomingPayouts";
import { AccountsPayableAgingReport } from "./Finance/AccountsPayableAgingReport";
import { AccountsReceivableAgingReport } from "./Finance/AccountsReceivableAgingReport";
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
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

const TwoThirdsContainer = styled.div`
  grid-column-end: span 3;
`;

const HalfContainer = styled.div`
  grid-column-end: span 2;
`;

const AccountingReports = (): ReactElement => {
  const flags = useFlags();
  return (
    <PageWrapper>
      <FiltersBar />
      <AnalyticsTabWrapper>
        {flags.moneyCalendar && (
          <TwoThirdsContainer>
            <MoneyCalendar />
          </TwoThirdsContainer>
        )}
        {flags.upcomingPayouts && (
          <div>
            <UpcomingPayouts />
          </div>
        )}
        {flags.accountsPayableAgingReport && (
          <HalfContainer>
            <AccountsPayableAgingReport />
          </HalfContainer>
        )}
        {flags.accountsReceivableAgingReport && (
          <HalfContainer>
            <AccountsReceivableAgingReport />
          </HalfContainer>
        )}
      </AnalyticsTabWrapper>
    </PageWrapper>
  );
};

export { AccountingReports };
