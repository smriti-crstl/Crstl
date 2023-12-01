import { ReactElement, useContext, useState } from "react";

import { AnalyticsPaperCard } from "components/atoms/card";
import { SimpleCheckbox } from "components/atoms/checkbox";
import { GenericLoading } from "components/atoms/loading";
import { SALES_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import {
  useSalesBySkuB2BDataQuery,
  useSalesBySkuB2CDataQuery,
} from "@crstl/app/src/domain/interactors/analytics";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { SkuResponsiveBar } from "./SkuResponsiveBar";
import { CARD_HEIGHT } from "../../../config";
import { AnalyticsDateRangeContext } from "..";

export const SkuB2B = (): ReactElement => {
  const { startDate, endDate } = useContext(AnalyticsDateRangeContext);

  const {
    data: getSalesBySkuB2B,
    isFetching: isSalesBySkuB2BStatusFetching,
  } = useSalesBySkuB2BDataQuery(startDate, endDate);
  const {
    data: getSalesBySkuB2C,
    isFetching: isSalesBySkuB2CStatusFetching,
  } = useSalesBySkuB2CDataQuery(startDate, endDate);

  const [isFavorites, setIsFavorites] = useState(false);
  const [checkboxSelected, setCheckboxSelected] = useState("B2B");

  const onFavoriteChange = (): void => {
    setIsFavorites(!isFavorites);
  };

  const onCheckBoxChange = (checkedValue: CheckboxChangeEvent): void => {
    const isDefaultChecked = checkedValue.target.defaultChecked;
    if (isDefaultChecked) {
      setCheckboxSelected("B2B");
    } else {
      setCheckboxSelected("B2C");
    }
  };

  return (
    <AnalyticsPaperCard
      title={SALES_CHART_HEADER.SALES_BY_SKU}
      isFavorites={isFavorites}
      onFavoriteChange={onFavoriteChange}
    >
      <div style={{ height: CARD_HEIGHT }}>
        {(!isSalesBySkuB2BStatusFetching && getSalesBySkuB2B) ||
        (!isSalesBySkuB2CStatusFetching && getSalesBySkuB2C) ? (
          <>
            <span style={{ fontSize: 12, marginLeft: 24 }}>
              Top 10 SKUs / % Change in # of Sales
            </span>
            <div style={{ height: 195 }}>
              <SkuResponsiveBar
                getSalesBySkuB2B={getSalesBySkuB2B}
                getSalesBySkuB2C={getSalesBySkuB2C}
                checkboxSelected={checkboxSelected}
              />
            </div>
            <div style={{ marginLeft: 24 }}>
              <SimpleCheckbox
                checked={checkboxSelected === "B2B"}
                defaultChecked
                style={{ fontSize: "12px" }}
                onChange={onCheckBoxChange}
              >
                B2B
              </SimpleCheckbox>
              <SimpleCheckbox
                checked={checkboxSelected === "B2C"}
                style={{ fontSize: "12px" }}
                onChange={onCheckBoxChange}
              >
                B2C
              </SimpleCheckbox>
            </div>
          </>
        ) : (
          <GenericLoading type="spinner" />
        )}
      </div>
    </AnalyticsPaperCard>
  );
};
