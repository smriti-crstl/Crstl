/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CustomDateRangePicker } from "../common";
import { useDateRange } from "presentation/hooks/contexts";
import { EditableTransactions } from "@crstl/app/src/presentation/features/core/pages/home/components/transactions/EditableTransactions";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Accounts, ExpensesTableContainer, PageHeader } from "../expenses";
import { useTransactionsQuery } from "domain/interactors/transactions";
import { DataSources } from "presentation/features/common/components/DataSources";
import { DownloadButtonContainer } from "../common/ExcelExport/csv.styles";
import { ExcelExport } from "../common/ExcelExport";
import { CSV_FILE_NAME } from "../../../orders/constants";
import { CSV_CONFIG, CSV_DATE_FORMAT } from "../common/ExcelExport/csv.config";
import moment from "moment";
import { TransactionDetail } from "domain/entity/transactions/models";

const GlobalStyle = createGlobalStyle`
  main.ant-layout-content {
    display: flex;
    flex-direction: column;
  }
`;

const PageWrapper = styled.div`
  flex: 1;
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 100%;

  @media (min-width: 1800px) {
    grid-template-columns: 320px minmax(0, 1fr);
  }
`;

const AnalyticsTabWrapper = styled.div`
  max-width: 100%;
  margin: auto;
  margin-bottom: 56px;
`;

const FiltersBar = styled.div`
  margin: 20px auto;
  padding: 0 42px;
`;

const FullWidthContainer = styled.div`
  grid-column: auto / span 4;
  @media (min-width: 1600px) {
    grid-column: auto / span 3;
  }
`;

const PageSidebar = styled.div`
  background-color: #eff3fc;
`;
const PageContent = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const ExpensesReport = (): ReactElement => {
  const [activeAccountId, setActiveAccountId] = React.useState<string | null>(
    null
  );
  const { datesSelected, changeDates } = useDateRange();

  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();
  const { data: transactionsData, isLoading, isError } = useTransactionsQuery(
    startDate,
    endDate
  );

  const loadCsvData = () => {
    if (!transactionsData?.data) {
      return;
    }
    const _data = JSON.parse(JSON.stringify(transactionsData?.data));
    _data?.forEach((row: TransactionDetail) => {
      row.dateOfTransaction = moment(row.dateOfTransaction).format(
        CSV_DATE_FORMAT
      );
    });
    return JSON.parse(JSON.stringify(_data));
  };

  const flags = useFlags();

  return (
    <PageWrapper>
      <GlobalStyle />
      <PageContainer>
        <PageSidebar>
          <Accounts
            activeAccountId={activeAccountId}
            onChange={setActiveAccountId}
          />
        </PageSidebar>
        <PageContent>
          <FiltersBar>
            <HeaderContainer>
              <PageHeader>Expenses</PageHeader>
              <DownloadButtonContainer>
                <ExcelExport
                  csvData={loadCsvData()}
                  fileName={CSV_FILE_NAME.EXPENSES}
                  config={CSV_CONFIG.EXPENSES}
                  showDateSelection
                />
                {transactionsData?.metadata ? (
                  <DataSources metadata={transactionsData.metadata} />
                ) : null}
              </DownloadButtonContainer>
            </HeaderContainer>
            <CustomDateRangePicker
              datesSelected={datesSelected}
              changeDates={changeDates}
            />
          </FiltersBar>
          <AnalyticsTabWrapper>
            {flags.transactionsTable && (
              <ExpensesTableContainer>
                <EditableTransactions
                  activeAccountId={activeAccountId}
                  transactionsData={transactionsData}
                  isLoading={isLoading}
                  isError={isError}
                />
              </ExpensesTableContainer>
            )}
          </AnalyticsTabWrapper>
        </PageContent>
      </PageContainer>
    </PageWrapper>
  );
};

export { ExpensesReport };
