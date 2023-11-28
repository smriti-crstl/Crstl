import { currencyFormatter, formatDate } from "presentation/utils";
import { ReactElement } from "react";
import styled from "styled-components";

import { FixedSizeCard } from "@crstl/components/atoms/card";
import { GenericLoading } from "@crstl/components/atoms/loading";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
// import { DateDropdown } from "./DateDropdown";
import HighChartsLineGraph from "presentation/features/core/pages/home/components/graphs/HighChartsLineGraph";
import { SelectedDateRange } from "presentation/features/core/pages/analytics/components/common";
import {
  IExtendTooltipFormatter,
  PartialHighChartsOptions,
} from "globals/configs/highcharts";
import { useDateRange } from "presentation/hooks/contexts";
import { DataSources } from "presentation/features/common/components/DataSources";
import { useGetAverageOrderValueB2C } from "domain/interactors/analytics";
import { AxisLabelsFormatterContextObject } from "highcharts";
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

const LineGraphWrapper = styled.div`
  height: 385px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    line-height: 24px;
  }
`;

const highChartsOptions: PartialHighChartsOptions = {
  xAxis: {
    type: "datetime",
    labels: {
      format: "{value:%b %e}",
    },
    tickPixelInterval: 150,
  },
  legend: {
    enabled: true,
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    itemMarginTop: 4,
    itemMarginBottom: 4,
    itemStyle: {
      fontWeight: "normal",
      textOverflow: "",
    },
    width: "200px",
  },
};

function getTooltipMarkup({
  seriesColor,
  formattedDate,
  text,
}: {
  seriesColor?: string;
  formattedDate: string;
  text: string;
}) {
  const html = `<div
  style="
    background-color: ${seriesColor};
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
  ${formattedDate}
  <br/><br/>
    ${text}
  </div>`;

  return html;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AverageOrderValueGraph = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const { data, isLoading, isError } = useGetAverageOrderValueB2C(
    startDate,
    endDate
  );

  const loadCsvData = () => {
    const finalData: {
      date: string;
      orderValue: string;
      source: string;
    }[] = [];
    data?.data?.forEach((_data) =>
      _data?.data?.forEach((row) =>
        finalData.push({
          date: moment(row.x).format(CSV_DATE_FORMAT),
          orderValue: row.y,
          source: _data.id,
        })
      )
    );
    return JSON.parse(JSON.stringify(finalData));
  };

  function yAxisFormatter(ctx: AxisLabelsFormatterContextObject) {
    const value = Number(ctx.value);
    if (value === 0) {
      return "";
    }
    return currencyFormatter(value, data?.metadata.currency, true);
  }

  function tooltipFormatter(this: IExtendTooltipFormatter) {
    const seriesColor = this.series?.color;
    const formattedDate = formatDate(this.x, "MMM dd, yyyy");
    const formattedValue = currencyFormatter(this.y, data?.metadata.currency);
    const text = `${this.series.name}: ${formattedValue}`;
    return getTooltipMarkup({ seriesColor, formattedDate, text });
  }

  const options: PartialHighChartsOptions = {
    ...highChartsOptions,
    yAxis: {
      labels: {
        style: {
          "text-transform": "lowercase",
        },
        formatter: yAxisFormatter,
      },
    },
    tooltip: {
      formatter: tooltipFormatter,
    },
  };

  const HorizontallyCenteredPaperCard = (): ReactElement => {
    return (
      <HeaderContainer>
        <div>
          <HeaderWrapper>
            <span>Average Order Value</span>
          </HeaderWrapper>
          <SelectedDateRange />
        </div>
        <DownloadButtonContainer>
          <ExcelExport
            csvData={loadCsvData()}
            fileName={CSV_FILE_NAME.AVERAGE_ORDER_VALUE}
            config={CSV_CONFIG.AVERAGE_ORDER_VALUE}
            showDateSelection
          />
          {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
        </DownloadButtonContainer>
      </HeaderContainer>
    );
  };

  return (
    <FixedSizeCard
      title={<HorizontallyCenteredPaperCard />}
      cardSize="medium"
      style={{ minHeight: 500 }}
    >
      <ErrorBoundary isError={isError}>
        <CashBalanceContainer>
          {isLoading && <GenericLoading type="spinner" />}
          {!isLoading && (
            <LineGraphWrapper>
              <HighChartsLineGraph data={data?.data} options={options} />
            </LineGraphWrapper>
          )}
        </CashBalanceContainer>
      </ErrorBoundary>
    </FixedSizeCard>
  );
};

export { AverageOrderValueGraph };
