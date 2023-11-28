import { currencyUSDFormatter } from "presentation/utils";
import moment from "moment";

import {
  DueListDetailWrapper,
  DueListWrapper,
  DueListHeader,
  DueListFooter,
  FooterText,
  DueAmountText,
} from "./MoneyCalendar.style";
import { mainConfig } from "./MoneyCalendar.enums";
import { getColor, getType } from "./MoneyCalendar.utils";
import { CalendarItem } from "./MoneyCalendar.types";

type Props = {
  listData: any[];
  limit?: number;
  totalDueAmount: number;
  title: string;
  getSignedAmount: (item: CalendarItem) => string;
};

export const DueListCard: React.FC<Props> = ({
  listData,
  totalDueAmount,
  title,
  children,
}) => {
  const DueDate = new Date(listData[0].date);

  return (
    <DueListWrapper>
      <DueListHeader>{title}</DueListHeader>
      <DueListDetailWrapper>{children}</DueListDetailWrapper>
      <DueListFooter>
        <FooterText>{moment(DueDate).format("MMMM DD, YYYY")}</FooterText>
        <FooterText>
          Total:
          <DueAmountText
            $color={mainConfig[getType()]?.FONT[getColor(totalDueAmount)]}
          >
            {` ${currencyUSDFormatter(totalDueAmount)}`}
          </DueAmountText>
        </FooterText>
      </DueListFooter>
    </DueListWrapper>
  );
};
