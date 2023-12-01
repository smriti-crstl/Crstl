import moment from "moment";
import { HomeAccountCarousal } from "presentation/features/core/pages/home/components/account-information/carousal";
import { ReactElement } from "react";

import { FixedSizeCard } from "components/atoms/card";
import { GenericLoading } from "components/atoms/loading";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { CarouselContainer } from "./Finance.styles";
import styled from "styled-components";
import { DataSources } from "presentation/features/common/components/DataSources";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.palette.text.HINT};
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  useQueryFn: any;
  title: string;
};

export const CarouselCard = ({ useQueryFn, title }: Props): ReactElement => {
  const { data, isLoading, isError } = useQueryFn();
  const getConfig = () => {
    if (title === CSV_FILE_NAME.BANK_ACCOUNTS) {
      return CSV_CONFIG.BANK_ACCOUNTS;
    } else {
      return CSV_CONFIG.CREDIT_CARDS;
    }
  };

  const HorizontallyCenteredPaperCard = (): ReactElement => {
    return (
      <HeaderContainer>
        <HeaderWrapper>
          <span>{title}</span>
          <StyledTimeSpan>
            {data?.lastUpdatedAt
              ? `Last updated ${moment(data?.lastUpdatedAt).fromNow()}`
              : null}
          </StyledTimeSpan>
        </HeaderWrapper>
        <DownloadButtonContainer>
          <ExcelExport
            fileName={title}
            config={getConfig()}
            csvData={data?.data}
          />
          {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
        </DownloadButtonContainer>
      </HeaderContainer>
    );
  };
  return (
    <FixedSizeCard
      cardSize="small"
      title={<HorizontallyCenteredPaperCard />}
      style={{ flex: "1" }}
    >
      <ErrorBoundary isError={isError}>
        <CarouselContainer>
          {isLoading ? (
            <GenericLoading type="spinner" />
          ) : (
            <HomeAccountCarousal slideData={data?.data} />
          )}
        </CarouselContainer>
      </ErrorBoundary>
    </FixedSizeCard>
  );
};
