import moment from "moment";
import { numberFormatter } from "presentation/utils";
import { FixedSizeCard } from "components/atoms/card";
import { EmptyData } from "components/atoms/empty";
import { GenericLoading } from "components/atoms/loading";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { EmptyCardWrapper } from "../../common/common.styles";
import styled from "styled-components";
import { useGetAmazonInventoryData } from "domain/interactors/analytics";
import { TableContainer } from "../Finance/Finance.styles";
import { DataSources } from "presentation/features/common/components/DataSources";
import { DownloadButtonContainer } from "../../common/ExcelExport/csv.styles";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";
import { CSV_FILE_NAME } from "presentation/features/core/pages/orders/constants";

const SingleLine = styled.div`
  overflow: hidden;
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  /* max-width: 200px; */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const columns = [
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Product name",
    dataIndex: "productName",
    key: "productName",
    render(value: string) {
      return <SingleLine title={value}>{value}</SingleLine>;
    },
  },
  {
    title: "Availability",
    dataIndex: "quantity",
    key: "quantity",
    render: (quantity: string) => {
      const parsedQuantity = parseInt(quantity);
      const formattedQuantity = isNaN(parsedQuantity)
        ? ""
        : numberFormatter(parsedQuantity);
      return formattedQuantity;
    },
  },
];

const StyledCardBody = styled.div`
  padding: 5px;
  padding-top: 10px;
`;

const StyledTimeSpan = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.palette.text.HINT};
`;

function AmazonInventoryTable(): JSX.Element {
  const {
    data,
    lastUpdatedAt,
    isLoading,
    isError,
  } = useGetAmazonInventoryData();

  return (
    <FixedSizeCard
      title={
        <HeaderContainer>
          <div>
            <span>Amazon Inventory Levels</span>
            {lastUpdatedAt ? (
              <StyledTimeSpan>
                Last updated {moment(lastUpdatedAt).fromNow()}
              </StyledTimeSpan>
            ) : null}
          </div>
          <DownloadButtonContainer>
            <ExcelExport
              csvData={data?.data}
              fileName={CSV_FILE_NAME.AMAZON_INVENTORY_LEVELS}
              config={CSV_CONFIG.AMAZON_INVENTORY_LEVELS}
            />
            {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
          </DownloadButtonContainer>
        </HeaderContainer>
      }
      style={{ flex: "1" }}
    >
      <ErrorBoundary isError={isError}>
        <StyledCardBody>
          {!isLoading && data?.data ? (
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

export { AmazonInventoryTable };
