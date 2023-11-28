import { isEmpty } from "lodash";
import moment from "moment";
import { decodeUrl, encodeToUrl } from "presentation/utils";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

type DateRangeStrings = { startDate: string; endDate: string };

type DateRangeContextProps = {
  datesSelected: moment.Moment[];
  dateStrings: DateRangeStrings;
  changeDates: (
    datesSelected: moment.Moment[],
    datesFormatted: string[]
  ) => void;
};

function formatDateRange(dateRange: moment.Moment[]): DateRangeStrings {
  const [startDate, endDate] = dateRange;
  return {
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
  };
}

const defaultDateRange = [moment().subtract(30, "days"), moment()];

const defaultDateRangeStrings = formatDateRange(defaultDateRange);

const useQuery = (): URLSearchParams =>
  new URLSearchParams(useLocation().search);

const DateRangeContext = React.createContext<DateRangeContextProps | null>(
  null
);

function initializeDateRangeState(query: URLSearchParams) {
  const encodedFilter = query.get("filter");
  if (!encodedFilter) {
    return {
      datesSelected: defaultDateRange,
      dateStrings: defaultDateRangeStrings,
    };
  }
  const parsedFilterData = decodeUrl<{ datesSelected: string[] }>(
    encodedFilter
  );

  if (isEmpty(parsedFilterData)) {
    return {
      datesSelected: defaultDateRange,
      dateStrings: defaultDateRangeStrings,
    };
  }
  const [startDate, endDate] = parsedFilterData.datesSelected;

  const datesSelected = [moment(startDate), moment(endDate)];

  const dateStrings = formatDateRange(datesSelected);

  return {
    datesSelected,
    dateStrings,
  };
}

const DateRangeProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const query = useQuery();

  const [{ datesSelected, dateStrings }, setData] = React.useState(() =>
    initializeDateRangeState(query)
  );

  function changeDates(
    datesSelected: moment.Moment[],
    datesFormatted: string[]
  ) {
    if (!datesSelected) {
      return;
    }

    const [startDate, endDate] = datesFormatted;

    const dateStrings = {
      startDate,
      endDate,
    };

    setData({
      datesSelected,
      dateStrings,
    });

    const base64 = encodeToUrl({ datesSelected }, true);
    query.set("filter", base64);
    history.push({ search: query.toString() });
  }

  const value = {
    datesSelected,
    dateStrings,
    changeDates,
  };

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  );
};

function useDateRange() {
  const value = React.useContext(DateRangeContext);

  if (!value) {
    throw new Error(
      "useDateRange hook must be called within DateRangeProvider component"
    );
  }

  return value;
}

export { DateRangeProvider, useDateRange };
