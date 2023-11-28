import { useGetTopSalesBySKUQuery } from "domain/interactors/analytics";
import { currencyFormatter, EllipsedText } from "presentation/utils";
import { ReactElement } from "react";

import { FixedSizeCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";

import { CARD_HEIGHT } from "../../../config";
import { SALES_CHART_HEADER } from "../../../config/ChartHeaders/ChartHeaders";
import { EmptyCardWrapper } from "../../common/common.styles";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { SelectedDateRange } from "../../common";
import { useDateRange } from "presentation/hooks/contexts";
import styled from "styled-components";
import { DataSources } from "presentation/features/common/components/DataSources";
import { ColumnsType } from "antd/lib/table";
import { TableContainer } from "../Finance/Finance.styles";
import { TopSalesBySkuRes } from "domain/entity/analytics/model";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const columns: ColumnsType<any> = [
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
    render: (value: string) => {
      return EllipsedText(value, 20);
    },
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
    render: (value: number, tableRow: TopSalesBySkuRes["data"][0]) => {
      return currencyFormatter(Number(value), tableRow.currency);
    },
  },
];

export const TopSalesBySKUTable = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  const { data, isLoading, isError } = useGetTopSalesBySKUQuery(
    startDate,
    endDate
  );

  return (
    <FixedSizeCard
      title={
        <HeaderContainer>
          <div>
            <div>{SALES_CHART_HEADER.TOP_PRODUCTS}</div>
            <SelectedDateRange />
          </div>
          <DownloadButtonContainer>
            <ExcelExport
              csvData={data?.data}
              fileName={CSV_FILE_NAME.TOP_PRODUCTS}
              config={CSV_CONFIG.TOP_PRODUCTS}
              showDateSelection
            />
            {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
          </DownloadButtonContainer>
        </HeaderContainer>
      }
    >
      <ErrorBoundary isError={isError}>
        <div style={{ height: CARD_HEIGHT, padding: "5px", paddingTop: "0px" }}>
          {!isLoading && data?.data ? (
            data ? (
              <div style={{ height: "100%" }}>
                <div style={{ marginTop: "10px" }}>
                  <TableContainer
                    dataSource={data?.data}
                    columns={columns}
                    size="small"
                    style={{
                      fontSize: "10px !important",
                      padding: "0px !important",
                    }}
                    pagination={{
                      position: ["bottomRight"],
                      pageSize: 5,
                      size: "small",
                      showSizeChanger: false,
                    }}
                  />
                </div>
              </div>
            ) : (
              <EmptyCardWrapper>
                <EmptyData />
              </EmptyCardWrapper>
            )
          ) : (
            <GenericLoading type="spinner" />
          )}
        </div>
      </ErrorBoundary>
    </FixedSizeCard>
  );
};
