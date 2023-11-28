import { ReactElement, useEffect, useState, useContext } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";

import { PaperCard } from "@crstl/components/atoms/card";
import { ResponsiveLine } from "@nivo/line";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { linearGradientDef } from "@nivo/core";

import { GenericLoading } from "@crstl/components/atoms/loading";
import { SALES_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { useGetAverageOrderValueDataQuery } from "domain/interactors/analytics";

import { ThemeContext } from "styled-components";

export const AverageOrderValue = ({
  dateSelected,
}: {
  dateSelected: string;
}): ReactElement => {
  const windowWidth = window.screen.availWidth;
  const [isFavorites, setIsFavorites] = useState(false);
  const [customFontSize, setCustomFontSize] = useState(10);
  const [cardHeight, setCardHeight] = useState("19rem");
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (windowWidth >= 1300 && windowWidth < 1600) {
      setCustomFontSize(10);
      setCardHeight("19rem");
    }
    if (windowWidth >= 1600 && windowWidth < 1920) {
      setCustomFontSize(12);
      setCardHeight("24rem");
    }
    if (windowWidth >= 1920 && windowWidth < 2400) {
      setCustomFontSize(15);
      setCardHeight("29rem");
    }
    if (windowWidth >= 2400) {
      setCustomFontSize(18);
      setCardHeight("34rem");
    }
  }, [windowWidth]);

  const onFavoriteChange = (): void => {
    setIsFavorites(!isFavorites);
  };
  const { data, isFetching } = useGetAverageOrderValueDataQuery(dateSelected);
  return (
    <>
      <PaperCard
        title={SALES_CHART_HEADER.B2B_AVERAGE_ORDER_VALUE}
        removeBorderBottom
        isResponsiveCard
        removePadding
        extra={
          isFavorites ? (
            <StarFilled
              style={{ color: theme.palette.colors.CREAM_CAN }}
              onClick={onFavoriteChange}
            />
          ) : (
            <StarOutlined
              style={{ color: theme.palette.colors.SILVER }}
              onClick={onFavoriteChange}
            />
          )
        }
      >
        <div style={{ height: cardHeight }}>
          {!isFetching ? (
            <ResponsiveLine
              data={data ? data : []}
              margin={{ top: 30, right: 28, bottom: 90, left: 28 }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              enableArea={true}
              axisLeft={null}
              enableGridY={false}
              pointSize={0}
              defs={[
                linearGradientDef("gradientA", [
                  { offset: 0, color: "inherit" },
                  { offset: 100, color: "inherit", opacity: 0 },
                ]),
              ]}
              theme={{
                textColor: "#8F9FAE",
                fontSize: customFontSize,
                fontFamily: "Roboto",
              }}
              fill={[{ match: "*", id: "gradientA" }]}
              curve="linear"
              lineWidth={2}
              colors={{ datum: "color" }}
              useMesh={true}
              enableCrosshair={false}
              layers={[
                "grid",
                "markers",
                "axes",
                "crosshair",
                "areas",
                "lines",
                "points",
                "slices",
                "mesh",
                "legends",
              ]}
            />
          ) : (
            <GenericLoading type="spinner" />
          )}
        </div>
      </PaperCard>
    </>
  );
};
