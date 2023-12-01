import styled from "styled-components";
import { ReactElement } from "react";
import {
  FixedSizeCard,
  StyledFullWidthCard,
} from "components/atoms/card";
import { Spinner } from "components/atoms/loading";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import Sankey from "./Sankey";
import { useGetSankeyDataQuery } from "domain/interactors/homepage";
import { TITLE } from "./Sankey.config";
import { SelectedDateRange } from "presentation/features/core/pages/analytics/components/common";
import { EmptyData } from "components/atoms/empty";
import { EmptyCardWrapper } from "presentation/features/core/pages/analytics/components/common/common.styles";
import { useDateRange } from "presentation/hooks/contexts";
import { DataSources } from "presentation/features/common/components/DataSources";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SankeyChart = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();
  const { data: sankeyData, isLoading, isError } = useGetSankeyDataQuery(
    startDate,
    endDate
  );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <FixedSizeCard
      cardSize="large"
      title={
        <HeaderContainer>
          <div>
            {TITLE.BANK_TRANSACTIONS_BY_CATEGORY}
            <SelectedDateRange />
          </div>
          {sankeyData?.metadata ? (
            <DataSources metadata={sankeyData.metadata} />
          ) : null}
        </HeaderContainer>
      }
    >
      <ErrorBoundary isError={isError}>
        {sankeyData?.data.length ? (
          <Sankey
            sankeyData={sankeyData?.data}
            startDate={startDate}
            endDate={endDate}
          />
        ) : (
          <EmptyCardWrapper>
            <EmptyData />
          </EmptyCardWrapper>
        )}
      </ErrorBoundary>
    </FixedSizeCard>
  );
};

export default SankeyChart;
