/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from "react";
import styled from "styled-components";
import { CustomDateRangePicker } from "../common";
import HomePageLineGraph from "@crstl/app/src/presentation/features/core/pages/home/components/graphs/LineGraph";
import SankeyChart from "presentation/features/core/pages/home/components/graphs/Sankey";
import { CashOnHandsReports } from "./Finance/CashOnHands";
import { CarouselCard } from "./Finance/CarouselCard";
import { useDateRange } from "presentation/hooks/contexts";
import {
  useGetBanksDataQuery,
  useGetCreditCardsDataQuery,
} from "domain/interactors/homepage";
import { FINANCE_CHART_HEADER } from "../../config/ChartHeaders/ChartHeaders";
import { SpendByMerchantCategory } from "./Finance/SpendByMerchantCategory";
import { EditableTransactions } from "@crstl/app/src/presentation/features/core/pages/home/components/transactions/EditableTransactions";
import { useFlags } from "launchdarkly-react-client-sdk";

const PageWrapper = styled.div`
  padding: 0 28px;
`;

const AnalyticsTabWrapper = styled.div`
  width: 1444px;
  max-width: 100%;
  margin: auto;
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 17px;
  grid-row-gap: 28px;

  @media (min-width: 1600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
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

const GraphContainer = styled.div`
  grid-column: auto / span 4;

  @media (min-width: 1600px) {
    grid-column: auto / span 2;
  }
`;

const GridContainer = styled.div`
  grid-column: auto / span 2;

  @media (min-width: 1600px) {
    display: flex;
    grid-column: auto / span 1;
  }
`;

const GridContainerWithFlexbox = styled(GridContainer)`
  display: flex;
  flex-direction: column;
`;

const CreditCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: auto / span 2;

  @media (min-width: 1600px) {
    grid-column: auto / span 1;
  }
`;

const FullWidthContainer = styled.div`
  grid-column: auto / span 4;
  @media (min-width: 1600px) {
    grid-column: auto / span 3;
  }
`;

const CashAndCardReport = (): ReactElement => {
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
        {flags.totalCashBalanceAcrossBankAccounts && (
          <FullWidthContainer>
            <HomePageLineGraph showHighChartsGraph />
          </FullWidthContainer>
        )}
        {flags.cashOnHand && (
          <GridContainer>
            <CashOnHandsReports />
          </GridContainer>
        )}
        {flags.bankCreditCardSpendByMerchantCategory && (
          <GridContainerWithFlexbox>
            <SpendByMerchantCategory />
          </GridContainerWithFlexbox>
        )}
        {flags.bankAccounts && (
          <GridContainerWithFlexbox>
            <CarouselCard
              title={FINANCE_CHART_HEADER.BANK_ACCOUNTS}
              useQueryFn={useGetBanksDataQuery}
            />
          </GridContainerWithFlexbox>
        )}
        {flags.creditCards && (
          <CreditCardContainer>
            <CarouselCard
              title={FINANCE_CHART_HEADER.CREDIT_CARDS}
              useQueryFn={useGetCreditCardsDataQuery}
            />
          </CreditCardContainer>
        )}
        {flags.bankCreditCardTransactionsBySpendCategory && (
          <FullWidthContainer>
            <SankeyChart />
          </FullWidthContainer>
        )}
      </AnalyticsTabWrapper>
    </PageWrapper>
  );
};

export { CashAndCardReport };
