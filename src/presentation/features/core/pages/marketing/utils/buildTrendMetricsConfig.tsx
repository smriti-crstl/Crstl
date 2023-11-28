import ReactDOMServer from "react-dom/server";
import {
  IExtendTooltipFormatter,
  PartialHighChartsOptions,
} from "globals/configs/highcharts";
import { ChartTooltip } from "../components/ChartTooltip";
import { MarketingMetricChartModel } from "@crstl/api/src/apis/models/v1/AdwordsModel";
import { groupBy } from "lodash";
import { AxisLabelsFormatterContextObject, YAxisOptions } from "highcharts";
import {
  currencyFormatter,
  formatDate,
  numberFormatter,
} from "presentation/utils";

const listFormatter = new Intl.ListFormat("en-US", {
  style: "long",
  type: "conjunction",
});

const highChartsOptions: PartialHighChartsOptions = {
  xAxis: {
    type: "datetime",
    labels: {
      format: "{value:%b %Y}",
    },
    tickPixelInterval: 150,
  },
  yAxis: {
    labels: {
      style: {
        "text-transform": "lowercase",
      },
    },
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
    width: "auto",
  },
};

function transformData(data?: MarketingMetricChartModel[], currency?: string) {
  if (!data) {
    return {};
  }

  const axisTypes = Array.from(new Set(data.map((series) => series.format)));

  const groupedSeries = groupBy(data, "format");

  const seriesTitleMap = Object.entries(groupedSeries).reduce(
    (acc, [key, value]) => {
      const itemTitles = value.map((item) => item.id);
      const formattedTitle = listFormatter.format(itemTitles);
      acc[key] = formattedTitle;
      return acc;
    },
    {} as Record<string, string>
  );

  const yAxisOptions = axisTypes.map<Partial<YAxisOptions>>((type, index) => {
    const titleText = seriesTitleMap[type];
    const opposite = (index + 1) % 2 === 0;
    if (type === "currency") {
      return {
        opposite,
        title: { text: titleText },
        labels: {
          style: {
            "text-transform": "lowercase",
          },
          formatter(ctx: AxisLabelsFormatterContextObject) {
            const value = Number(ctx.value);
            if (value === 0) {
              return "";
            }
            const formattedValue = currencyFormatter(value, currency, true);
            return formattedValue;
          },
        },
      };
    }

    return {
      opposite,
      title: { text: titleText },
      labels: {
        formatter(ctx: AxisLabelsFormatterContextObject) {
          const value = Number(ctx.value);
          if (value === 0) {
            return "";
          }
          const formattedValue = numberFormatter(value);
          return formattedValue;
        },
      },
    };
  });

  const series = data.map((series) => {
    const yAxis = axisTypes.indexOf(series.format);

    series.data = series.data.map((item) => ({
      ...item,
      format: series.format,
    }));

    return {
      ...series,
      yAxis,
    };
  });

  return {
    series,
    yAxis: yAxisOptions,
  };
}

function buildTrendMetricsConfig(
  data?: MarketingMetricChartModel[],
  currency?: string
) {
  const { series, yAxis } = transformData(data, currency);

  const options: PartialHighChartsOptions = {
    ...highChartsOptions,
    yAxis,
  };

  return { options, series };
}

export { buildTrendMetricsConfig };
