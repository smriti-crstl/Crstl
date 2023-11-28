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
import { mainConfig, PaymentType } from "./MoneyCalendar.enums";
import { PaymentDetailResponseModel } from "../../../../../../../../../api/src/apis/models/Invoice";
import { CalendarItem } from "./MoneyCalendar.types";
// import transactionDetailsData from "./transactionDetailsData.json";

type Props = {
  tableData: PaymentDetailResponseModel | undefined;
  calendarProps?: Partial<CalendarProps<moment.Moment>>;
};

const getSignedAmount = (item: CalendarItem): string =>
  item.type === PaymentType.PAYABLE
    ? `- ${currencyUSDFormatter(parseFloat(item.amount))}`
    : `+ ${currencyUSDFormatter(parseFloat(item.amount))}`;

const ExpectedPaymentsCalendar = ({
  calendarProps,
  tableData,
}: Props): ReactElement => {
  const theme = useContext(ThemeContext);

  const getListData = (value: any): any[] => {
    let listData: any[] = [];
    tableData?.data.map((item: any) => {
      const formatedDueDate = moment(item.dueDate).format("MM/DD/YYYY");
      switch (moment(value).format("MM/DD/YYYY")) {
        case formatedDueDate:
          listData = [
            ...listData,
            {
              content: `$${item.totalAmount}`,
              customer: item.customer,
              date: formatedDueDate,
              amount: item.totalAmount,
              type: item.type,
            },
          ];
          break;
      }
    });
    return listData;
  };

  const getTotalDueAmount = (listData: any): number => {
    const total = listData.reduce((total: number, item: any) => {
      return item.type === PaymentType.PAYABLE
        ? total - Number(item.amount)
        : total + Number(item.amount);
    }, 0);

    return total.toFixed(2);
  };

  const getFilteredDueAmount = (listData: any, filter: string): number => {
    let total = listData
      .map((item: CalendarItem) => {
        if (item.type === filter) {
          return item.amount;
        }
        return "0";
      })
      .reduce((a: string, b: string) => parseFloat(a) + parseFloat(b), 0);
    total = filter === PaymentType.PAYABLE ? (total *= -1) : total;
    return total.toFixed(2);
  };

  const dateCellRender = (value: any): ReactElement => {
    const listData = getListData(value);
    const totalDueAmount = getTotalDueAmount(listData);
    const totalPayableAmount = getFilteredDueAmount(
      listData,
      PaymentType.PAYABLE
    );
    const totalReceivableAmount = getFilteredDueAmount(
      listData,
      PaymentType.RECEIVABLE
    );
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
                title={`${listData.length} expected ${
                  listData.length === 1 ? "payment" : "payments"
                }`}
              >
                {listData.map((item, key) => {
                  return (
                    <ListItemWrapper key={key}>
                      <StyledAmountSpan
                        $payable={item.type === PaymentType.PAYABLE}
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
            {totalReceivableAmount > 0 && (
              <StyledList
                $dueDate={value}
                $currentDate={currentDate}
                $positive={totalReceivableAmount > 0}
                $color={
                  mainConfig[getType(value, currentDate)]?.FONT[
                    getColor(totalReceivableAmount)
                  ]
                }
                $background={
                  mainConfig[getType(value, currentDate)]?.BACKGROUND[
                    getColor(totalReceivableAmount)
                  ]
                }
              >
                {
                  mainConfig[getType(value, currentDate)]?.ARROW[
                    getColor(totalReceivableAmount)
                  ]
                }
                {EllipsedText(
                  (currencyUSDFormatter(
                    totalReceivableAmount
                  ) as unknown) as string,
                  10
                )}
              </StyledList>
            )}
            {totalPayableAmount < 0 && (
              <StyledList
                $dueDate={value}
                $currentDate={currentDate}
                $positive={totalPayableAmount > 0}
                $color={
                  mainConfig[getType(value, currentDate)]?.FONT[
                    getColor(totalPayableAmount)
                  ]
                }
                $background={
                  mainConfig[getType(value, currentDate)]?.BACKGROUND[
                    getColor(totalPayableAmount)
                  ]
                }
                $bottom={true}
              >
                {
                  mainConfig[getType(value, currentDate)]?.ARROW[
                    getColor(totalPayableAmount)
                  ]
                }
                {EllipsedText(
                  (currencyUSDFormatter(
                    totalPayableAmount
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

export { ExpectedPaymentsCalendar };
