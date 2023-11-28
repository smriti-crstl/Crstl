import Highcharts, { TooltipFormatterContextObject } from "highcharts";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsReact from "highcharts-react-official";
import { ReactElement } from "react";
import { currencyUSDFormatter } from "presentation/utils";
import { colorPalette } from "./Sankey.config";
import { theme } from "globals/themes";

HighchartsSankey(Highcharts);

const Sankey = ({ sankeyData }: any): ReactElement => {
  const sankeyDataObject = {
    credits: {
      enabled: false,
    },
    colors: colorPalette,
    chart: {
      zoomType: "x",
      style: {
        fontFamily: "Inter,Regular",
      },
    },
    title: {
      text: "",
    },
    plotOptions: {
      sankey: {
        dataLabels: {
          style: {
            fontSize: "12px",
            fontWeight: 400,
            textOutline: 0,
            color: theme.palette.colors.BLACK,
          },
        },
      },
    },
    tooltip: {
      useHTML: true,
      backgroundColor: null,
      borderWidth: 0,
      formatter: function (this: TooltipFormatterContextObject): string {
        return `<div
          style="
            background: ${this.color};
            color: ${theme.palette.colors.BLACK};
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            font-family: Inter,Regular;
            box-shadow: ${theme.shadows[0]}px ${theme.shadows[0]}px ${
          theme.shadows[24]
        }px ${theme.palette.actions.SELECTED};
            width: auto;
            height: 42px;
            word-wrap: break-word;
            display: ${this.point.options.from ? "flex" : "none"};
            justify-content: center;
            align-items: center;"
          >
            ${this.point.options.from} -> ${
          this.point.options.to
        } : ${currencyUSDFormatter(this.point.options.weight || 0)}
          </div>`;
      },
    },
    series: [
      {
        keys: ["from", "to", "weight"],
        data: sankeyData || [],
        type: "sankey",
        curveFactor: 0.33,
        dataLabels: {
          color: `${theme.palette.colors.BLACK}`,
          shadow: false,
        },
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={sankeyDataObject} />;
};

export default Sankey;
