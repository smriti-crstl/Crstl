import { ReactElement, useContext } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { RESULT_CONSTANTS } from "../../config";
import { ThemeContext } from "styled-components";
import { useDateRange } from "presentation/hooks/contexts";
import { SelectedDateRangeWrapper } from "./common.styles";

const { RangePicker } = DatePicker;

// TODO: Modify the Types here
type DatePickerDropDown = {
  datesSelected: any;
  changeDates: any;
};

export const CustomDateRangePicker = ({
  datesSelected,
  changeDates,
}: DatePickerDropDown): ReactElement => {
  const theme = useContext(ThemeContext);
  const today = new Date();
  return (
    <RangePicker
      disabledDate={(d) =>
        !d || d.isAfter(today) || d.isSameOrBefore("1960-01-01")
      }
      value={datesSelected}
      onChange={changeDates}
      style={{
        width: 300,
      }}
      popupStyle={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.colors.ALTO,
        backgroundColor: theme.palette.background.PRIMARY,
      }}
      format="YYYY-MM-DD"
      ranges={{
        [RESULT_CONSTANTS.TODAY]: [moment(), moment()],
        [RESULT_CONSTANTS.SEVEN_DAYS]: [moment().subtract(7, "days"), moment()],
        [RESULT_CONSTANTS.THIRTY_DAYS]: [
          moment().subtract(30, "days"),
          moment(),
        ],
        [RESULT_CONSTANTS.SIXTY_DAYS]: [
          moment().subtract(60, "days"),
          moment(),
        ],
        [RESULT_CONSTANTS.NINETY_DAYS]: [
          moment().subtract(90, "days"),
          moment(),
        ],
      }}
    />
  );
};

export const SelectedDateRange = (): ReactElement => {
  // const { startDate, endDate } = useContext(AnalyticsDateRangeContext);
  const {
    dateStrings: { startDate, endDate },
  } = useDateRange();

  return (
    <SelectedDateRangeWrapper>
      {moment(startDate).format("MMM D")} -
      {" " + moment(endDate).format("MMM D, YYYY")}
    </SelectedDateRangeWrapper>
  );
};
