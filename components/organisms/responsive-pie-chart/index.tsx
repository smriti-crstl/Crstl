import { ReactElement, useState } from "react";
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
