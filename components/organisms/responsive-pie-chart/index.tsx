import { ReactElement, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { currencyFormatter } from "@crstl/app/src/presentation/utils";
import { LegendPosition } from "@crstl/components/organisms/legends";
import styled from "styled-components";
import { PieChartInfo } from "./PieChartInfo";

interface ChartDataItem {
  id: string;
  label: string;
  color: string;
  value: number;
  balance?: string;
  percent?: string;
}

interface ChartData {
  total: number;
  data: ChartDataItem[];
}

interface NivoNode {
  data: ChartDataItem;
}

const PieChartContainer = styled.div`
  height: 250px;
  position: relative;
`;

const getArcLinkLabel = (inputLabel: string | undefined): string => {
  if (!inputLabel) {
    return "";
  }
  if (inputLabel.length > 10) {
    return `${inputLabel.slice(0, 10)}...`;
  } else {
    return inputLabel;
  }
};

const getDisplayValue = ({
  currency,
  data = null,
  isNumber = false,
  isPercentage = false,
}: {
  currency?: string;
  data?: ChartDataItem | null;
  isNumber?: boolean;
  isPercentage?: boolean;
} = {}): string => {
  if (!data) {
    return "";
  }

  if (isNumber) {
    const balance = data.balance || data.value;
    const parsedBalance = parseFloat(balance.toString());
    const safeBalance = isNaN(parsedBalance) ? data.value : parsedBalance;
    return currencyFormatter(safeBalance, currency, true);
  }

  if (isPercentage) {
    const percentageValue = data.percent || data.value;
    return `${percentageValue}%`;
  }

  return data.value.toString();
};

const getDisplayLabel = ({
  currency,
  data = null,
  isPercentage = false,
}: {
  currency?: string;
  data?: ChartDataItem | null;
  isPercentage?: boolean;
} = {}): string => {
  if (!data) {
    return "";
  }

  if (isPercentage) {
    return `${data.label}: ${currencyFormatter(data.value, currency)}`;
  }

  return data.label;
};

const getTotalDisplayValue = ({
  currency,
  total = null,
  isNumber = false,
  isPercentage = false,
}: {
  currency?: string;
  total?: number | null;
  isNumber?: boolean;
  isPercentage?: boolean;
}): string | undefined | null => {
  if (!total) {
    return "";
  }

  if (isNumber) {
    return currencyFormatter(total, currency, true);
  }

  if (isPercentage) {
    return currencyFormatter(total, currency, true);
  }

  return total.toString();
};

export const ResponsivePieChart = ({
  currency,
  data,
  isNumber,
  isPercentage,
  getDefaultInfoLabel,
}: {
  currency?: string;
  data?: ChartData;
  isPercentage?: boolean;
  isNumber?: boolean;
  tooltipSecondLineKey?: string;
  getDefaultInfoLabel?: (value?: number) => string;
}): ReactElement => {
  const [segmentSummary, setSegmentSummary] = useState<ChartDataItem | null>(
    null
  );

  const onMouseEnter = (node: NivoNode): void => {
    setSegmentSummary(node.data);
  };

  const onMouseLeave = (_: NivoNode): void => {
    setSegmentSummary(null);
  };

  return (
    <>
      <PieChartContainer>
        <ResponsivePie
          id="id"
          data={data ? data.data : []}
          arcLinkLabel={(d) => getArcLinkLabel(d.data?.label)}
          cornerRadius={3}
          margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
          arcLinkLabelsDiagonalLength={10}
          enableArcLabels={false}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          arcLinkLabelsTextOffset={3}
          arcLinkLabelsStraightLength={10}
          arcLinkLabelsColor={{ from: "color" }}
          innerRadius={0.9}
          padAngle={2}
          colors={{ datum: "data.color" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={12}
          arcLinkLabelsTextColor="#000000"
          arcLinkLabelsThickness={2}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          tooltip={() => null}
          theme={{
            tooltip: {
              container: {
                background: "white",
              },
            },
            fontFamily: "Inter",
            labels: {
              text: {
                fontSize: "10px",
              },
            },
          }}
        />
        {segmentSummary ? (
          <PieChartInfo
            value={getDisplayValue({
              data: segmentSummary,
              isNumber,
              isPercentage,
              currency,
            })}
            label={getDisplayLabel({ data: segmentSummary, isPercentage })}
          />
        ) : (
          <PieChartInfo
            value={getTotalDisplayValue({
              total: data?.total,
              isNumber,
              isPercentage,
              currency,
            })}
            label={
              getDefaultInfoLabel ? getDefaultInfoLabel(data?.total) : null
            }
          />
        )}
      </PieChartContainer>
      <div style={{ padding: "0 24px 15px" }}>
        <LegendPosition data={data?.data} label={"label"} />
      </div>
    </>
  );
};
