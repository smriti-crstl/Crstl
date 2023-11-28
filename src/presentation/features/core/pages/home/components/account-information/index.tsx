import {
  useGetBanksDataQuery,
  useGetCreditCardsDataQuery,
} from "domain/interactors/homepage";
import { ReactElement } from "react";
import styled from "styled-components";

import { HomeAccountDetails } from "./account-details";

const AccountInformationWrapper = styled.div`
  box-sizing: border-box;
  padding: 2rem 1rem;
  height: 100%;
  & > div {
    height: 50%;
  }
`;

export const HomeAccountInformation = (): ReactElement => {
  const {
    data: banksData,
    isLoading: isBanksDataLoading,
    isError: isBanksDataError,
  } = useGetBanksDataQuery();
  const {
    data: creditCardsData,
    isLoading: isCreditCardsDataLoading,
    isError: isCreditCardsDataError,
  } = useGetCreditCardsDataQuery();

  return (
    <AccountInformationWrapper>
      <HomeAccountDetails
        isLoading={isBanksDataLoading}
        isError={isBanksDataError}
        text="Bank Accounts"
        slideData={banksData?.data}
      />
      <br />
      <HomeAccountDetails
        text="Credit Cards Spend"
        isLoading={isCreditCardsDataLoading}
        isError={isCreditCardsDataError}
        slideData={creditCardsData?.data}
      />
    </AccountInformationWrapper>
  );
};
