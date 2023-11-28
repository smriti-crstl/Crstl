import { Empty } from "antd";
import {
  buildHighChartsOptions,
  PartialHighChartsOptions,
} from "globals/configs/highcharts";
import Highcharts, { TooltipOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ReactElement } from "react";

interface ISingleApiDataItem {
  x: string;
  y: string | number;
}

interface ISingleSeriesFunctionInput {
  id: string;
  yAxis?: number;
  color?: string;
  tooltip?: TooltipOptions;
  data: Array<ISingleApiDataItem>;
}

type SeriesType = "line" | "column" | "area";

export const getSingleSeries = (
  { id, yAxis, tooltip, color, data }: ISingleSeriesFunctionInput,
  isBarChart?: boolean
):
  | Highcharts.SeriesLineOptions
  | Highcharts.SeriesColumnOptions
  | Highcharts.SeriesAreaOptions => {
  const isAreaPlot = id === "Total balance";
  let type: SeriesType = "line";
  if (isBarChart) {
    type = "column";
  } else if (isAreaPlot) {
    type = "area";
  }

  return {
    type: type,
    yAxis,
    tooltip,
    marker: {
      enabled: false,
    },
    name: id,
    color: color,
    data: data.map(({ x, y, ...rest }) => {
      return {
        x: Date.parse(x),
        y: +y,
        ...rest,
      };
    }),
  };
};

const getFullSeriesData = (
  data?: Array<ISingleSeriesFunctionInput>,
  isBarChart?: boolean
): Array<Highcharts.SeriesOptionsType> => {
  if (!data) {
    return [];
  }
  return data.map(
    (singleSeries: ISingleSeriesFunctionInput): Highcharts.SeriesOptionsType =>
      getSingleSeries(singleSeries, isBarChart)
  );
};

const HighChartsLineGraph = ({
  data,
  isBarChart,
  options = {},
}: {
  data?: Array<ISingleSeriesFunctionInput>;
  isBarChart?: boolean;
  options?: PartialHighChartsOptions;
}): ReactElement => {
  if (!data || !data[0] || data[0].data.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const series = getFullSeriesData(data, isBarChart);

  const chartOptions = buildHighChartsOptions({ series, ...options });

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{ style: { height: "100%" } }}
    />
  );
};

export default HighChartsLineGraph;
