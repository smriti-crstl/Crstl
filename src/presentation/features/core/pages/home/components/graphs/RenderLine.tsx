// https://www.google.com/search?q=nivo+line+storybook+examples&oq=nivo+line+storybook+examples&aqs=chrome..69i57.5487j0j4&sourceid=chrome&ie=UTF-8
// https://nivo.rocks/storybook/?path=/story/line--area-gradients
// https://www.google.com/search?q=nivo+area+gradient+line&spell=1&sa=X&ved=2ahUKEwjIncHbgI3xAhUGumMGHd5KAEYQBSgAegQIARAw&biw=1294&bih=637
// https://nivo.rocks/line/
// https://nivo.rocks/guides/gradients/
// https://stackoverflow.com/questions/53361961/how-to-add-gradient-css-to-nivo-rocks-line-chart-area
// https://github.com/plouc/nivo/issues/40
// https://nivo.rocks/line/
// https://nivo.rocks/storybook/?path=/story/line--custom-layers
// https://nivo.rocks/storybook/?path=/story/line--custom-min-max-y
// https://apexcharts.com/react-chart-demos/line-charts/stepline/

import { Empty } from "antd";
import {
  currencyUSDFormatter,
  formatDate,
  getTickValues,
  numberFormatter,
} from "presentation/utils";
// install (please make sure versions match peerDependencies)
import { ReactElement, useContext } from "react";
import styled from "styled-components";

import { Defs } from "@nivo/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

import { AnalyticsDateRangeContext } from "../../../analytics/components/reports";
import { X_AXIS_LABEL_COL_COUNT } from "../../../analytics/config";

import { ThemeContext } from "styled-components";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const StyledToolTip = styled.div`
  padding: 4px 8px;
  background-color: ${(props) => props.color};
  border-radius: 3px;
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  border: 1px solid rgba(225, 225, 225, 1);
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  font-family: "Inter";
`;

const MonthsMapping: Record<string, string> = {
  "1": "Jan",
  "2": "Feb",
  "3": "Mar",
  "4": "Apr",
  "5": "May",
  "6": "Jun",
  "7": "Jul",
  "8": "Aug",
  "9": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const formatDateByMonth = (date: string): string => {
  const customDateFormat = "M/dd";
  const updatedDate = formatDate(date, customDateFormat).toUpperCase();
  const [month, day] = updatedDate.split("/");
  return MonthsMapping[Number(month)] + " " + day;
};

const formatNumber = (value: number): number | string => {
  if (!Number.isInteger(value)) {
    return "";
  }
  return value > 1000 ? `${value / 1000}k` : value;
};

const Tooltip = ({
  date,
  balance,
  color,
  isCount,
}: {
  balance: string;
  date: string;
  color: string;
  isCount: boolean;
}): ReactElement => {
  return (
    <StyledToolTip color={color}>
      {formatDateByMonth(date)}
      <br />
      {isCount
        ? numberFormatter(Number(balance))
        : currencyUSDFormatter(Number(balance))}
    </StyledToolTip>
  );
};

export const MyResponsiveLine = ({
  data /* see data tab */,
  isCount,
  colCount,
  minYScale,
}: {
  data: any;
  isCount?: boolean;
  colCount?: number;
  minYScale?: number;
}): ReactElement => {
  const theme = useContext(ThemeContext);
  const { startDate, endDate } = useContext(AnalyticsDateRangeContext);
  if (!data || !data[0] || data[0].data.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const tickValues = getTickValues(
    startDate,
    endDate,
    colCount || X_AXIS_LABEL_COL_COUNT
  );

  const styleById = {
    TotalBalance: {
      strokeWidth: 1,
    },
    default: {
      strokeDasharray: "6, 2",
      strokeWidth: 1,
    },
  };

  const DashedLine = ({ series, lineGenerator, xScale, yScale }: any): any => {
    return series.map(({ id, data, color }: any) => (
      <path
        key={id}
        d={lineGenerator(
          data.map((d: any) => ({
            x: xScale(d.data.x),
            y: yScale(d.data.y),
          }))
        )}
        fill="none"
        stroke={color}
        style={
          id === "TotalBalance" || id === "Total balance"
            ? styleById.TotalBalance
            : styleById.default
        }
      />
    ));
  };

  const Areas = ({ series, areaGenerator, xScale, yScale }: any): any =>
    series.map(({ id, data }: any) => (
      <>
        {id === "TotalBalance" && (
          <>
            <Defs
              defs={[
                {
                  id: "GradientA",
                  type: "linearGradient",
                  colors: [
                    { offset: 0, color: "inherit" },
                    { offset: 100, color: "inherit", opacity: 0 },
                  ],
                },
              ]}
            />
            <path
              key={id}
              d={areaGenerator(
                data.map((d: any) => ({
                  x: xScale(d.data.x),
                  y: yScale(d.data.y),
                }))
              )}
              fill="url(#GradientA)"
              fillOpacity={0.25}
            />
          </>
        )}
      </>
    ));

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 20, bottom: 70, left: 20 }}
      yScale={{
        type: "linear",
        min: typeof minYScale !== "undefined" ? minYScale : "auto",
        max: "auto",
      }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      enableArea={true}
      tooltip={({ point }) => {
        return (
          <Tooltip
            balance={point.data.yFormatted as string}
            date={point.data.xFormatted as string}
            color={point.serieColor as string}
            isCount={isCount || false}
          />
        );
      }}
      axisBottom={{
        tickRotation: 0,
        format: (value) => formatDateByMonth(value),
        tickValues: tickValues,
      }}
      axisLeft={{
        format: (value) => formatNumber(value),
      }}
      pointColor={data.color}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointSize={0}
      curve="linear"
      lineWidth={2}
      colors={{ datum: "color" }}
      useMesh={true}
      enableCrosshair={false}
      theme={{
        textColor: "#8F9FAE",
        fontSize: 12,
        fontFamily: "Inter",
        grid: {
          line: {
            stroke: theme.palette.colors.WHITE_SMOKE,
          },
        },
      }}
      layers={[
        "grid",
        "markers",
        "axes",
        "crosshair",
        DashedLine,
        Areas,
        "points",
        "slices",
        "mesh",
        "legends",
      ]}
    />
  );
};
