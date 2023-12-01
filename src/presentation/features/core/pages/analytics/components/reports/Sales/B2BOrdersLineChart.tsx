import { useGetB2BOrdersDataQuery } from "domain/interactors/analytics";
import { useFlags } from "launchdarkly-react-client-sdk";
import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";

import { AnalyticsPaperCard } from "components/atoms/card";
import { GenericLoading } from "components/atoms/loading";
import { GenericSubHeading } from "components/atoms/typography";
import { LegendPosition } from "components/organisms/legends";

import { AnalyticsDateRangeContext } from "../";
// import { DateDropdown } from "./DateDropdown";
import { MyResponsiveLine } from "../../../../home/components/graphs/RenderLine";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { SelectedDateRange } from "../../common";

const CashBalanceContainer = styled.div`
  padding: 1rem;
`;

const BalanceWrapper = styled.div`
  /* margin-top: 8px; */
  display: flex;
  justify-content: space-between;
  margin-left: 8px;
`;

const StyledBalanceRow = styled.div`
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledGenericSubHeading = styled(GenericSubHeading)`
  font-size: 30px;
  display: flex;
  flex-direction: column;
`;
const LineGraphWrapper = styled.div`
  height: 280px;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const B2BOrdersLineChart = (): ReactElement => {
  const [isFavorites, setIsFavorites] = useState(false);
  const onFavoriteChange = (): void => {
    setIsFavorites(!isFavorites);
  };

  const { startDate, endDate } = useContext(AnalyticsDateRangeContext);

  const { data, isLoading, isError } = useGetB2BOrdersDataQuery(
    startDate,
    endDate
  );

  const HorizontallyCenteredPaperCard = (): ReactElement => {
    return (
      <>
        <HeaderWrapper>
          <span>Total orders (B2B)</span>
        </HeaderWrapper>
        <SelectedDateRange />
      </>
    );
  };
  const { ff1 } = useFlags();

  return (
    <AnalyticsPaperCard
      title={<HorizontallyCenteredPaperCard />}
      isFavorites={isFavorites}
      onFavoriteChange={onFavoriteChange}
    >
      <ErrorBoundary isError={isError}>
        <CashBalanceContainer>
          {isLoading && <GenericLoading type="spinner" />}
          {ff1 ? (
            !isLoading &&
            !isError && (
              <>
                <BalanceWrapper>
                  <StyledGenericSubHeading isGreyDisabled>
                    {/* {findTotal(data?.data[0].total)} */}
                  </StyledGenericSubHeading>
                  {/* <DateDropdown /> */}
                </BalanceWrapper>
                <LineGraphWrapper>
                  <MyResponsiveLine
                    data={data?.data}
                    isCount={true}
                    colCount={4}
                    minYScale={0}
                  />
                </LineGraphWrapper>
                <LegendPosition data={data?.data} label={"id"} padding />
              </>
            )
          ) : (
            <StyledBalanceRow>
              <span>Not displayed for this user</span>
            </StyledBalanceRow>
          )}
        </CashBalanceContainer>
      </ErrorBoundary>
    </AnalyticsPaperCard>
  );
};

export default B2BOrdersLineChart;
