import { Calendar, CalendarProps, Tooltip } from "antd";
import moment from "moment";
import { currencyUSDFormatter, EllipsedText } from "presentation/utils";
import { ReactElement, useContext } from "react";
import { ThemeContext } from "styled-components";
import { DueListCard } from "./DueList";
// import { MoneyCalendarInvoice } from "./Invoice";
import {
  CalendarCellWrapper,
  CalendarWrapper,
  ListItemWrapper,
  StyledAmountSpan,
  StyledFirmName,
  StyledList,
  TotalAmountText,
} from "./MoneyCalendar.style";
import { getColor, getType } from "./MoneyCalendar.utils";
import { FlowType, mainConfig, PaymentType } from "./MoneyCalendar.enums";
import { CalendarItem } from "./MoneyCalendar.types";
import { ActualPaymentDetailResponse } from "domain/entity/analytics/model";
// import transactionDetailsData from "./transactionDetailsData.json";

type Props = {
  tableData: ActualPaymentDetailResponse | undefined;
  calendarProps?: Partial<CalendarProps<moment.Moment>>;
};

type ListData = {
  content: string;
  customer: string;
  date: string;
  amount: string;
  type: string;
};

const getSignedAmount = (item: CalendarItem): string =>
  item.type === FlowType.OUTFLOW
    ? `- ${currencyUSDFormatter(parseFloat(item.amount))}`
    : `+ ${currencyUSDFormatter(parseFloat(item.amount.replace("-", "")))}`;

const ActualPaymentsCalendar = ({
  calendarProps,
  tableData,
}: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  const getListData = (value: moment.Moment) => {
    let listData: ListData[] = [];
    tableData?.data.forEach((item) => {
      const date = moment(item.date).format("MM/DD/YYYY");
      switch (value.format("MM/DD/YYYY")) {
        case date:
          listData = [
            ...listData,
            {
              content: `$${item.amount}`,
              customer: item.counterparty,
              date: date,
              amount: item.amount,
              type: item.type,
            },
          ];
          break;
      }
    });
    return listData;
  };

  const getTotalDueAmount = (listData: ListData[]) => {
    const total = listData.reduce((total: number, item) => {
      return item.type === FlowType.OUTFLOW
        ? total - Number(item.amount)
        : total + Number(item.amount.replace("-", ""));
    }, 0);

    return Number(total.toFixed(2));
  };

  const getFilteredDueAmount = (
    listData: ListData[],
    filter: string
  ): number => {
    let total = listData
      .map((item) => {
        if (item.type === filter) {
          return item.amount.replace("-", "");
        }
        return "0";
      })
      .reduce((a: number, b: string) => a + parseFloat(b), 0);
    total = filter === FlowType.OUTFLOW ? (total *= -1) : total;
    // total = filter === FlowType.INFLOW ? (total *= -1) : total;
    return Number(total.toFixed(2));
  };

  const dateCellRender = (value: any): ReactElement => {
    const listData = getListData(value);
    const totalDueAmount = getTotalDueAmount(listData);
    const totalOutflowAmount = getFilteredDueAmount(listData, FlowType.OUTFLOW);
    const totalInflowAmount = getFilteredDueAmount(listData, FlowType.INFLOW);
    const currentDate = moment(Date.now()).format("MM/DD/YYYY");

    return (
      <CalendarCellWrapper>
        {listData.length > 0 && (
          <Tooltip
            overlayInnerStyle={{ minWidth: "200px", width: "max-content" }}
            placement="top"
            title={
              <DueListCard
                listData={listData}
                totalDueAmount={totalDueAmount}
                getSignedAmount={getSignedAmount}
                title={`${listData.length} ${
                  listData.length === 1 ? "transaction" : "transactions"
                }`}
              >
                {listData.map((item, key) => {
                  return (
                    <ListItemWrapper key={key}>
                      <StyledAmountSpan
                        $payable={item.type === FlowType.OUTFLOW}
                      >
                        {getSignedAmount(item)}
                      </StyledAmountSpan>
                      <StyledFirmName>
                        {EllipsedText(` ${item.customer}` as string, 20)}
                      </StyledFirmName>
                    </ListItemWrapper>
                  );
                })}
              </DueListCard>
            }
            color={theme.palette.colors.WHITE}
          >
            {totalInflowAmount > 0 && (
              <StyledList
                $dueDate={value}
                $currentDate={currentDate}
                $positive={totalInflowAmount > 0}
                $color={
                  mainConfig[getType(value, currentDate)]?.FONT[
                    getColor(totalInflowAmount)
                  ]
                }
                $background={
                  mainConfig[getType(value, currentDate)]?.BACKGROUND[
                    getColor(totalInflowAmount)
                  ]
                }
              >
                {
                  mainConfig[getType(value, currentDate)]?.ARROW[
                    getColor(totalInflowAmount)
                  ]
                }
                {EllipsedText(
                  (currencyUSDFormatter(
                    totalInflowAmount
                  ) as unknown) as string,
                  10
                )}
              </StyledList>
            )}
            {totalOutflowAmount < 0 && (
              <StyledList
                $dueDate={value}
                $currentDate={currentDate}
                $positive={totalOutflowAmount > 0}
                $color={
                  mainConfig[getType(value, currentDate)]?.FONT[
                    getColor(totalOutflowAmount)
                  ]
                }
                $background={
                  mainConfig[getType(value, currentDate)]?.BACKGROUND[
                    getColor(totalOutflowAmount)
                  ]
                }
                $bottom={true}
              >
                {
                  mainConfig[getType(value, currentDate)]?.ARROW[
                    getColor(totalOutflowAmount)
                  ]
                }
                {EllipsedText(
                  (currencyUSDFormatter(
                    totalOutflowAmount
                  ) as unknown) as string,
                  10
                )}
              </StyledList>
            )}
          </Tooltip>
        )}
      </CalendarCellWrapper>
    );
  };

  const findTotal = (num?: number): string => {
    if (!num) {
      return "";
    }
    return currencyUSDFormatter(num);
  };

  return (
    <CalendarWrapper>
      <TotalAmountText
        $color={
          mainConfig[getType()]?.FONT[
            getColor(parseFloat(tableData?.total || "0"))
          ]
        }
      >
        {findTotal(parseFloat(tableData?.total || "0"))}
      </TotalAmountText>
      <Calendar
        dateCellRender={dateCellRender}
        style={{ fontSize: "12px", padding: "1px 0", font: "inter" }}
        {...calendarProps}
      />
    </CalendarWrapper>
  );
};

export { ActualPaymentsCalendar };
