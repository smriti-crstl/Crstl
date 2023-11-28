import Highcharts, {
  Point,
  Series,
  TooltipFormatterContextObject,
} from "highcharts";
import { get, merge } from "lodash";
import { theme } from "globals/themes";

interface IExtendSeries extends Series {
  color?: string;
}

interface TooltipPoint extends Point {
  format?: string;
}

export interface IExtendTooltipFormatter extends TooltipFormatterContextObject {
  series: IExtendSeries;
  point: TooltipPoint;
}

export type PartialHighChartsOptions = Partial<Highcharts.Options>;

const defaultHighChartsColor = get(
  Highcharts.getOptions(),
  "colors[0]",
  "transparent"
);

export const defaultOptions: PartialHighChartsOptions = {
  credits: {
    enabled: false,
  },
  chart: {
    style: {
      fontFamily: "Inter,sans-serif,Roboto",
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    labels: {
      style: {
        fontSize: "12px",
        color: theme.palette.colors.BALI_HAI,
      },
    },
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      style: {
        textTransform: "uppercase",
        fontSize: "12px",
        color: theme.palette.colors.BALI_HAI,
      },
    },
    allowDecimals: false,
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, theme.palette.colors.LIGHT_KLIEN_BLUE],
          [
            1,
            Highcharts.color(defaultHighChartsColor)
              .setOpacity(0)
              .get("rgba")
              .toString(),
          ],
        ],
      },
      marker: {
        radius: 2,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
    column: {
      stacking: "normal",
      animation: false,
    },
    series: {
      animation: false,
    },
  },
  tooltip: {
    useHTML: true,
    backgroundColor: "",
    borderWidth: 0,
    shadow: false,
  },
};

export function buildHighChartsOptions(
  overrides: PartialHighChartsOptions = {}
): Highcharts.Options {
  const baseOptions = Highcharts.getOptions();
  const result = merge({}, baseOptions, defaultOptions, overrides);
  return result;
}
