import { useGetB2COrdersDataQuery } from "domain/interactors/analytics";
import { useFlags } from "launchdarkly-react-client-sdk";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { ReactElement } from "react";
import styled from "styled-components";

import { FixedSizeCard } from "@crstl/components/atoms/card";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { GenericSubHeading } from "@crstl/components/atoms/typography";
import { LegendPosition } from "@crstl/components/organisms/legends";

// import { DateDropdown } from "./DateDropdown";
import HighChartsLineGraph from "../../../../home/components/graphs/HighChartsLineGraph";
import { SelectedDateRange } from "../../common";
import { useDateRange } from "presentation/hooks/contexts";
import { DataSources } from "presentation/features/common/components/DataSources";
import {
  IExtendTooltipFormatter,
  PartialHighChartsOptions,
} from "globals/configs/highcharts";
import { formatDate, numberFormatter } from "presentation/utils";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";
import {
  CSV_CONFIG,
  CSV_DATE_FORMAT,
} from "../../common/ExcelExport/csv.config";
import moment from "moment";

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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const highChartsOptions: PartialHighChartsOptions = {
  xAxis: {
    type: "datetime",
    labels: {
      format: "{value:%b %e}",
    },
    tickPixelInterval: 150,
  },
  tooltip: {
    formatter: function (this: IExtendTooltipFormatter) {
      return `<div
        style="
          background-color: ${this.series?.color};
          color: white;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          line-height: 15px;
          box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.08);
          width: 200px;
          white-space: normal;
          word-wrap: break-word;
          text-align: center;"
        >
        ${formatDate(this.x, "MMM dd, yyyy")}
        <br/><br/>
          ${this.series.name}: ${numberFormatter(this.y)}
        </div>`;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const B2COrdersLineChart = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const { data, isLoading, isError } = useGetB2COrdersDataQuery(
    startDate,
    endDate
  );

  const loadCsvData = () => {
    const finalData: {
      date: string;
      orders: number;
      source: string;
    }[] = [];
    data?.data?.forEach((_data) =>
      _data?.data?.forEach((row) =>
        finalData.push({
          date: moment(row.x).format(CSV_DATE_FORMAT),
          orders: row.y,
          source: _data.id,
        })
      )
    );
    return JSON.parse(JSON.stringify(finalData));
  };

  const { ff1 } = useFlags();

  const HorizontallyCenteredPaperCard = (): ReactElement => {
    return (
      <HeaderContainer>
        <div>
          <HeaderWrapper>
            <span>Total orders (e-Commerce)</span>
          </HeaderWrapper>
          <SelectedDateRange />
        </div>
        <DownloadButtonContainer>
          <ExcelExport
            csvData={loadCsvData()}
            fileName={CSV_FILE_NAME.TOTAL_ORDERS}
            config={CSV_CONFIG.TOTAL_ORDERS}
            showDateSelection
          />
          {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
        </DownloadButtonContainer>
      </HeaderContainer>
    );
  };

  return (
    <FixedSizeCard title={<HorizontallyCenteredPaperCard />}>
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
                  <HighChartsLineGraph
                    data={data?.data}
                    isBarChart
                    options={highChartsOptions}
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
    </FixedSizeCard>
  );
};

export default B2COrdersLineChart;
