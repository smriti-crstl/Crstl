import moment from "moment";
import { FixedSizeCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { EmptyCardWrapper } from "../../common/common.styles";
import styled from "styled-components";
import { useGetShopifyInventoryData } from "domain/interactors/analytics";
import { ShopifyInventorySkuLocationSeries } from "domain/entity/analytics/model";
import { difference, uniq } from "lodash";
import { TableCellTooltip } from "./TableCellTooltip";
import { DataSources } from "presentation/features/common/components/DataSources";
import { TableContainer } from "../Finance/Finance.styles";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSVColumn } from "../../common/ExcelExport/csv.config";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";

const commonColumns = ["channel", "extUpdatedAt", "location", "sku", "value"];

function getAllColumns(data: ShopifyInventorySkuLocationSeries[]) {
  return data.reduce(
    (acc: string[], current: ShopifyInventorySkuLocationSeries) => {
      const keys = Object.keys(current);
      const allKeys = uniq([...acc, ...keys]);
      return allKeys;
    },
    []
  );
}

function buildColumns(data: ShopifyInventorySkuLocationSeries[]) {
  const allColumns = getAllColumns(data);
  const extraColumns = difference(allColumns, commonColumns);
  if (extraColumns.indexOf("productName") !== -1) {
    extraColumns.splice(extraColumns.indexOf("productName"), 1);
  }
  const extraColumnsData = extraColumns.map((columnName) => ({
    title: columnName,
    dataIndex: columnName,
    key: columnName,
    render: TableCellTooltip,
  }));
  return [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    ...extraColumnsData,
  ];
}

const StyledCardBody = styled.div`
  padding: 5px;
  padding-top: 10px;
`;

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.palette.text.HINT};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ShopifyInventoryTable(): JSX.Element {
  const {
    data,
    lastUpdatedAt,
    isLoading,
    isError,
  } = useGetShopifyInventoryData();

  const columns = data?.data ? buildColumns(data.data) : [];

  const loadCsvData = () => {
    if (!data) {
      return;
    }
    const _data = JSON.parse(JSON.stringify(data));
    _data?.data.forEach((row: any) => {
      Object.keys(row).forEach((key) => {
        if (row[key as keyof ShopifyInventorySkuLocationSeries]) {
          let { quantity }: any = row[
            key as keyof ShopifyInventorySkuLocationSeries
          ];
          const { estValue }: any = row[
            key as keyof ShopifyInventorySkuLocationSeries
          ];
          if (!quantity && !estValue) {
            return;
          }
          let finalValue = "";
          if (!quantity || (quantity && quantity === "NA")) {
            quantity = null;
          }
          if (estValue && quantity) {
            finalValue = `${quantity} (${estValue})`;
          } else if (estValue) {
            finalValue = `Est. ${estValue}`;
          } else if (quantity) {
            finalValue = `${quantity}`;
          }
          row[key as keyof ShopifyInventorySkuLocationSeries] = finalValue;
        }
        return row;
      });
    });
    return _data.data;
  };

  const getCustomConfig = () => {
    const config: CSVColumn[] = [];
    columns.forEach((c, index) => {
      config.push({
        label: c.title,
        key: c.key,
        hidden: false,
      });
    });
    return JSON.parse(JSON.stringify(config));
  };

  return (
    <FixedSizeCard
      title={
        <HeaderContainer>
          <div>
            <span>Shopify Inventory Levels</span>
            {lastUpdatedAt ? (
              <StyledTimeSpan>
                Last updated {moment(lastUpdatedAt).fromNow()}
              </StyledTimeSpan>
            ) : null}
          </div>
          <DownloadButtonContainer>
            <ExcelExport
              csvData={loadCsvData()}
              fileName={CSV_FILE_NAME.SHOPIFY_INVENTORY_LEVELS}
              config={getCustomConfig()}
            />
            {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
          </DownloadButtonContainer>
        </HeaderContainer>
      }
      style={{ flex: "1" }}
    >
      <ErrorBoundary isError={isError}>
        <StyledCardBody>
          {!isLoading && data ? (
            data?.data.length ? (
              <TableContainer
                dataSource={data?.data}
                columns={columns}
                size="small"
                rowKey="sku"
                pagination={{
                  position: ["bottomRight"],
                  pageSize: 5,
                  size: "small",
                  showSizeChanger: false,
                }}
              />
            ) : (
              <EmptyCardWrapper>
                <EmptyData />
              </EmptyCardWrapper>
            )
          ) : (
            <GenericLoading
              type="spinner"
              spinnerProps={{ "aria-label": "Loading" }}
            />
          )}
        </StyledCardBody>
      </ErrorBoundary>
    </FixedSizeCard>
  );
}

export { ShopifyInventoryTable };
