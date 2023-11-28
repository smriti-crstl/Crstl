import { Divider } from "antd";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";
import styled from "styled-components";

import { PaperCard } from "@crstl/components/atoms/card";
import { GenericHeading } from "@crstl/components/atoms/typography";

import { FinancialTabConnectedBanks } from "../connected";
import { FinancialTabPlaidIntegration } from "../plaid";
import { ConnectedAccountsSection } from "./ConnectedAccountsSection";

const SectionOne = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.LARGE};
`;

const SectionTwo = styled.div`
  margin-left: ${({ theme }) => theme.spacing.LARGE};
  margin-bottom: ${({ theme }) => theme.spacing.LARGE};
`;
export const FinancialTabSections = (): ReactElement => {
  return (
    <>
      <SectionOne>
        <PaperCard
          $removeBorderRadius
          $isWidthDynamic="auto"
          title={
            <GenericHeading size="SM" weight="MEDIUM" $removeMargin>
              {CORE_INTEGRATIONS_TEXT_CONSTANTS.FINANCIAL_TAB.SELECT_BANK}
            </GenericHeading>
          }
        >
          <FinancialTabPlaidIntegration />
        </PaperCard>
      </SectionOne>
      <SectionTwo>
        <GenericHeading size="SM" weight="MEDIUM">
          Additional accounts
        </GenericHeading>
        <Divider style={{ margin: "1rem 0 0.5rem 0" }} />
        <FinancialTabConnectedBanks />
      </SectionTwo>
      <ConnectedAccountsSection />
    </>
  );
};
