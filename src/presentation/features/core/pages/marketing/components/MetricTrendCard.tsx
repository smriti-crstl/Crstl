import ReactDOMServer from "react-dom/server";
import { MarketingMetricChartResponseModel } from "@crstl/api/src/apis/models/v1/AdwordsModel";
import { FluidWidthCard } from "@crstl/components/atoms/card";
import {
  IExtendTooltipFormatter,
  PartialHighChartsOptions,
} from "globals/configs/highcharts";
import { AxisLabelsFormatterContextObject } from "highcharts";
import moment from "moment";
import { DataSources } from "presentation/features/common/components/DataSources";
import styled from "styled-components";
import HighChartsLineGraph from "../../home/components/graphs/HighChartsLineGraph";
import { ChartTooltip } from "./ChartTooltip";
import { formatValue } from "../utils/formatValue";
import { formatDate } from "presentation/utils";
import { DownloadButtonContainer } from "../../analytics/components/common/ExcelExport/csv.styles";
import { ExcelExport } from "../../analytics/components/common/ExcelExport";
import {
  CSV_CONFIG,
  CSV_DATE_FORMAT,
} from "../../analytics/components/common/ExcelExport/csv.config";

const Content = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  min-height: 385px;
  padding: 0 24px;
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

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  margin-top: 2px;
  color: ${(props) => props.theme.palette.text.HINT};
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
    enabled: false,
  },
};

interface Props {
  metricData: MarketingMetricChartResponseModel;
  source: string;
}

function MetricTrendCard({ metricData, source }: Props) {
  const { data, metadata, lastUpdatedAt } = metricData;

  if (!data.length) {
    return null;
  }

  const [series] = data;
  series.data = series.data.map((item) => ({
    ...item,
    format: series.format,
  }));

  function yAxisFormatter(ctx: AxisLabelsFormatterContextObject) {
    const value = Number(ctx.value);
    if (value === 0) {
      return "";
    }
    return formatValue(value, series.format, metadata?.currency, true);
  }

  function tooltipFormatter(this: IExtendTooltipFormatter) {
    const formattedDate = formatDate(this.x, "MMM dd, yyyy");
    return ReactDOMServer.renderToString(
      <ChartTooltip
        seriesName={this.series.name}
        seriesColor={this.series.color}
        format={this.point.format}
        formattedDate={formattedDate}
        x={this.x}
        y={this.y}
        currency={metadata?.currency}
      />
    );
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

  const getCsvConfig = (label: string) => {
    const config = CSV_CONFIG.ADS_INDIVIDUAL_METRICS;
    config[1].label = label;
    return JSON.parse(JSON.stringify(config));
  };

  const getCustomDateRange = () => {
    const now = moment();
    const before = moment().subtract(30, "d");
    const datesArray = [before, now];
    const datesStrings = [
      datesArray[0].format(CSV_DATE_FORMAT),
      datesArray[1].format(CSV_DATE_FORMAT),
    ];
    return datesStrings;
  };

  const loadCsvData = () => {
    const _data = JSON.parse(JSON.stringify(data[0]?.data));
    _data.forEach((row: { x: string; y: number }) => {
      row.x = moment(row.x).format(CSV_DATE_FORMAT);
    });
    return JSON.parse(JSON.stringify(_data));
  };

  const cardTitle = (
    <HeaderContainer>
      <div>
        <HeaderWrapper>
          <span>{series.id}</span>
          <StyledTimeSpan>
            Last updated {moment(lastUpdatedAt).fromNow()}
          </StyledTimeSpan>
        </HeaderWrapper>
      </div>
      <DownloadButtonContainer>
        <ExcelExport
          fileName={series.id}
          csvData={loadCsvData()}
          config={getCsvConfig(series.id)}
          defaultValue={source}
          showDateSelection
          customDateRange={getCustomDateRange()}
        />
        {metadata ? <DataSources metadata={metadata} /> : null}
      </DownloadButtonContainer>
    </HeaderContainer>
  );
  return (
    <FluidWidthCard title={cardTitle}>
      <Content>
        <HighChartsLineGraph data={data} options={options} />
      </Content>
    </FluidWidthCard>
  );
}

export { MetricTrendCard };
