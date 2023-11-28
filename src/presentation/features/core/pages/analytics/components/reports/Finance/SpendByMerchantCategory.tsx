import { ReactElement, useState, useEffect } from "react";
import { FixedSizeCard } from "@crstl/components/atoms/card";
import { EmptyData } from "@crstl/components/atoms/empty";
import { GenericLoading } from "@crstl/components/atoms/loading";
import { TransactionByMerchant } from "domain/entity/analytics/model";
import { useGetSpendByMerchantCategory } from "domain/interactors/analytics";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { currencyFormatter } from "presentation/utils";

import { EmptyCardWrapper } from "../../common/common.styles";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

import {
  TableContainer,
  HeaderContainer,
  CardContainer,
  StyledDropdown,
  StyledHeader,
  DropdownContainer,
  SelectedItem,
} from "./Finance.styles";
import { DataSources } from "presentation/features/common/components/DataSources";
import styled from "styled-components";
import { useDateRange } from "presentation/hooks/contexts";
import { SelectedDateRange } from "../../../components/common";
import { MERCHANT, TITLE } from "./Finance.enums";
import { ColumnsType } from "antd/lib/table";
import { ExcelExport } from "../../common/ExcelExport";
import { CSV_CONFIG } from "../../common/ExcelExport/csv.config";

const columns: ColumnsType<any> = [
  {
    title: "Merchant",
    dataIndex: "merchantName",
    key: "merchantName",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Account",
    dataIndex: "accountName",
    key: "accountName",
  },
  {
    title: "Amount",
    dataIndex: "estimatedSpendInGivenPeriod",
    key: "estimatedSpendInGivenPeriod",
    render: (value: number | string, tableRow: TransactionByMerchant) => {
      return currencyFormatter(Number(value), tableRow.currency);
    },
  },
];

const StyledHeaderContainer = styled(HeaderContainer)`
  margin-bottom: 4px;
`;

const UpcomingPayoutsData = ({
  data,
}: {
  data?: TransactionByMerchant[];
}): ReactElement => {
  const isDataAvailable = Boolean(data && data.length > 0);

  return isDataAvailable ? (
    <TableContainer
      dataSource={data}
      columns={columns}
      size="small"
      pagination={{
        position: ["bottomRight"],
        pageSize: 5,
        size: "small",
        showSizeChanger: false,
        showLessItems: true,
      }}
    />
  ) : (
    <EmptyCardWrapper>
      <EmptyData />
    </EmptyCardWrapper>
  );
};

const SpendByMerchantCategory = (): ReactElement => {
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();
  const { data, isError, isFetching } = useGetSpendByMerchantCategory(
    startDate,
    endDate
  );

  const [accountSubTypes, setAccountSubTypes] = useState<string[]>([]);
  const [selectedSubType, setSelectedSubType] = useState<string>(
    MERCHANT.FILTER.ALL
  );

  useEffect(() => {
    const getSubtypesFromData = (): void => {
      const transactions = data?.data;
      const subTypes: string[] = [];
      transactions?.forEach((tx) => subTypes.push(tx.accountSubtype));
      const uniqueSubTypes: string[] = Array.from(new Set(subTypes));
      uniqueSubTypes.unshift(MERCHANT.FILTER.ALL);
      setAccountSubTypes(uniqueSubTypes);
    };
    getSubtypesFromData();
  }, [data?.data]);

  const getTableData = (): TransactionByMerchant[] | undefined => {
    if (selectedSubType === MERCHANT.FILTER.ALL) {
      return data?.data;
    }
    return data?.data.filter((row) => row.accountSubtype === selectedSubType);
  };

  return (
    <FixedSizeCard
      cardSize="small"
      title={
        <StyledHeaderContainer>
          <div>
            <StyledHeader>
              {TITLE.BANK_AND_CREDIT_CARD_SPEND_BY_MERCHANT_CATEGORY}
            </StyledHeader>
            <SelectedDateRange />
          </div>
          <DropdownContainer>
            <ExcelExport
              style={{
                marginRight: "12px",
              }}
              csvData={data?.data}
              fileName={TITLE.BANK_AND_CREDIT_CARD_SPEND_BY_MERCHANT_CATEGORY}
              config={
                CSV_CONFIG.BANK_AND_CREDIT_CARD_SPEND_BY_MERCHANT_CATEGORY
              }
              showDateSelection
            />
            <StyledDropdown
              overlay={() => (
                <Menu>
                  {accountSubTypes.map((t: string, index: number) => (
                    <Menu.Item
                      key={index}
                      onClick={() => setSelectedSubType(t)}
                    >
                      {t}
                    </Menu.Item>
                  ))}
                </Menu>
              )}
              trigger={["click"]}
            >
              <SelectedItem>
                {selectedSubType} <DownOutlined style={{ marginLeft: "8px" }} />
              </SelectedItem>
            </StyledDropdown>
            {data?.metadata ? <DataSources metadata={data.metadata} /> : null}
          </DropdownContainer>
        </StyledHeaderContainer>
      }
      style={{ flex: "1" }}
    >
      <ErrorBoundary isError={isError}>
        <CardContainer>
          {!isFetching ? (
            <UpcomingPayoutsData data={getTableData()} />
          ) : (
            <GenericLoading type="spinner" />
          )}
        </CardContainer>
      </ErrorBoundary>
    </FixedSizeCard>
  );
};

export { SpendByMerchantCategory };
