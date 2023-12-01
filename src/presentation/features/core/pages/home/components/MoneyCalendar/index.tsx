import {
  useActualPaymentDetailQuery,
  usePaymentDetailQuery,
} from "domain/interactors/analytics";
import moment from "moment";
import { getEndDate } from "presentation/utils";
import { ReactElement, useState } from "react";
import styled, { CSSObject } from "styled-components";

import { FixedSizeCard } from "components/atoms/card";
import { Spinner } from "components/atoms/loading";

import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { DataSources } from "presentation/features/common/components/DataSources";
// import transactionDetailsData from "./transactionDetailsData.json";
import { ExpectedPaymentsCalendar } from "./ExpectedPaymentsCalendar";
import { ActualPaymentsCalendar } from "./ActualPaymentsCalendar";
import { ColoredButton } from "components/atoms/buttons";
import { ExcelExport } from "../../../analytics/components/common/ExcelExport";
import { csvConfig, TRANSACTION } from "./MoneyCalendar.enums";
import { DownloadButtonContainer } from "../../../analytics/components/common/ExcelExport/csv.styles";
import { CSV_DATE_FORMAT } from "../../../analytics/components/common/ExcelExport/csv.config";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -52px;
`;

const RadioButtonContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const StyledColoredButton = styled(ColoredButton)`
  margin-left: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const transparentButtonStyles: CSSObject = {
  background: "transparent",
  border: "none",
  boxShadow: "none",
  color: "#4F4F4F",
};

export const MoneyCalendar = (): ReactElement => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedFullDate, setSelectedFullDate] = useState(moment(currentDate));
  const startDate = `${selectedMonth}/01/${selectedYear}`;
  const endDate = `${selectedMonth}/${getEndDate(
    Number(selectedMonth),
    Number(selectedYear)
  )}/${selectedYear}`;

  const [transactionsType, setTransactionsType] = useState<
    TRANSACTION.ACTUAL | TRANSACTION.EXPECTED
  >(TRANSACTION.EXPECTED);

  // { data, isFetching, isError }
  const paymentDetailsQueryResult = usePaymentDetailQuery(startDate, endDate);
  const actualPaymentDetailQueryResult = useActualPaymentDetailQuery(
    startDate,
    endDate
  );

  function onPanelChange(value: moment.Moment) {
    setSelectedFullDate(value);
    setSelectedMonth(parseInt(value.format("MM")));
    setSelectedYear(parseInt(value.format("YYYY")));
  }

  const fullMonth = moment()
    .month(selectedMonth - 1)
    .format("MMM YYYY");

  const getCsvData = () => {
    let _data;
    let key: string;
    if (transactionsType === TRANSACTION.ACTUAL) {
      _data = actualPaymentDetailQueryResult?.data?.data;
      key = "date";
    } else {
      _data = paymentDetailsQueryResult?.data?.data;
      key = "dueDate";
    }
    if (!_data) {
      return;
    }
    _data = JSON.parse(JSON.stringify(_data));
    console.log();
    _data.forEach((row: any) => {
      row[key] = moment(row[key]).format(CSV_DATE_FORMAT);
    });
    return JSON.parse(JSON.stringify(_data));
  };

  const expectedPaymentsDataSource = (
    <>
      {paymentDetailsQueryResult.data?.metadata ? (
        <DataSources metadata={paymentDetailsQueryResult.data.metadata} />
      ) : null}
    </>
  );

  const actualPaymentsDataSource = (
    <>
      {actualPaymentDetailQueryResult.data?.metadata ? (
        <DataSources metadata={actualPaymentDetailQueryResult.data.metadata} />
      ) : null}
    </>
  );

  const header = (
    <HeaderContainer>
      <div>Money Calendar</div>
      <DownloadButtonContainer>
        <ExcelExport
          fileName={`${csvConfig[transactionsType].FILENAME}`}
          csvData={getCsvData()}
          config={csvConfig[transactionsType].CONFIG}
          customDate={fullMonth}
        />
        {transactionsType === TRANSACTION.EXPECTED
          ? expectedPaymentsDataSource
          : actualPaymentsDataSource}
      </DownloadButtonContainer>
    </HeaderContainer>
  );

  const expectedPayments = (
    <ErrorBoundary isError={paymentDetailsQueryResult.isError}>
      {paymentDetailsQueryResult.isFetching ? (
        <Spinner />
      ) : (
        <ExpectedPaymentsCalendar
          tableData={paymentDetailsQueryResult.data}
          calendarProps={{
            onPanelChange,
            defaultValue: moment(selectedFullDate),
          }}
        />
      )}
    </ErrorBoundary>
  );

  const actualPayments = (
    <ErrorBoundary isError={actualPaymentDetailQueryResult.isError}>
      {actualPaymentDetailQueryResult.isFetching ? (
        <Spinner />
      ) : (
        <ActualPaymentsCalendar
          tableData={actualPaymentDetailQueryResult.data}
          calendarProps={{
            onPanelChange,
            defaultValue: moment(selectedFullDate),
          }}
        />
      )}
    </ErrorBoundary>
  );

  return (
    <FixedSizeCard
      className={"left-section-cards"}
      title={header}
      style={{ minHeight: 640 }}
    >
      <RadioButtonWrapper>
        <RadioButtonContainer>
          <StyledColoredButton
            shape="round"
            onClick={() => setTransactionsType(TRANSACTION.EXPECTED)}
            style={
              transactionsType === TRANSACTION.EXPECTED
                ? {}
                : transparentButtonStyles
            }
          >
            Expected Payments
          </StyledColoredButton>
          <StyledColoredButton
            shape="round"
            onClick={() => setTransactionsType(TRANSACTION.ACTUAL)}
            style={
              transactionsType === TRANSACTION.ACTUAL
                ? {}
                : transparentButtonStyles
            }
          >
            Actual Transactions
          </StyledColoredButton>
        </RadioButtonContainer>
      </RadioButtonWrapper>
      {transactionsType === TRANSACTION.EXPECTED
        ? expectedPayments
        : actualPayments}
    </FixedSizeCard>
  );
};
