import { useState } from "react";
type KVPair = {
  [key: string]: string;
};

// common table hook to get table sort order, filter, page number and handle change
// TODO: to be enhanced with route params
export const useTable = (data: any, dataIndex: KVPair) => {
  const defaultFilterValue: string[] = [];

  const initializeSortOrder = () => {
    const data: KVPair = {};
    Object.values(dataIndex).map((i) => (data[i] = ""));
    return data;
  };
  const [filteredInfo, setFilteredInfo] = useState<any>({});
  const [pageNumber, setPageNumber] = useState<any>(1);

  const [tableSortOrder, setTableSortOrder] = useState<any>(
    initializeSortOrder
  );
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    const newFilters: any = {};
    for (const key in filters) {
      if (filters?.[key]?.length) {
        newFilters[key] = filters[key];
      } else {
        newFilters[key] = [];
      }
    }
    const mergedFilterState = {
      ...filteredInfo,
      ...newFilters,
    };

    setFilteredInfo(mergedFilterState);
    if (sorter.field) {
      const mergedSort = {
        ...tableSortOrder,
        [sorter.field]: sorter.order || "",
      };
      setTableSortOrder(mergedSort);
    }
    setPageNumber(pagination.current || 1);
  };

  return {
    tableSortOrder,
    filteredInfo,
    defaultFilterValue,
    handleChange,
    pageNumber,
  };
};

