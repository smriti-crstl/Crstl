import { isNil, omitBy } from "lodash";
import moment from "moment";

// creates an object composed of the property paths of object with removing undefined keys.
export const filterFormData = (data: any) => {
  const updatedData = omitBy(data, isNil);
  updatedData.filter = omitBy(
    updatedData.filter,
    (item) => isNil(item) || !item.length
  );

  const [createdAtStart, createdAtEnd] = updatedData?.filter?.createdAt ?? [];
  if (createdAtStart || createdAtEnd) {
    updatedData.filter.createdAt = {
      ...(createdAtStart && {
        start: moment(createdAtStart).format("YYYY-MM-DD"),
      }),
      ...(createdAtEnd && { end: moment(createdAtEnd).format("YYYY-MM-DD") }),
    };
  }

  const [dateRangeStart, dateRangeEnd] = updatedData?.filter?.dateRange ?? [];
  if (dateRangeStart || dateRangeEnd) {
    updatedData.filter.dateRange = {
      ...(dateRangeStart && {
        start: moment(dateRangeStart).format("YYYY-MM-DD"),
      }),
      ...(dateRangeEnd && { end: moment(dateRangeEnd).format("YYYY-MM-DD") }),
    };
  }

  return updatedData;
};
