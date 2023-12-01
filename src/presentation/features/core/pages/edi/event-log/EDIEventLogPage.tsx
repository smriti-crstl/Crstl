import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { Key, SorterResult, SortOrder } from "antd/lib/table/interface";
import Paragraph from "antd/lib/typography/Paragraph";
import { EventLogResponseModelDataItem } from "domain/entity/edi/models";
import { useGetEventLogQuery } from "domain/interactors/edi";
import { useGetTradingPartners } from "domain/interactors/shared";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "domain/services/localStorage";
import moment from "moment";
import { useSearchParams } from "presentation/hooks/common";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SimpleTable } from "components/atoms/table";
import { Chip } from "components/molecules/order-chips/Chip";
import { PageWrapper } from "components/molecules/page";

import { DownloadEventLogCSV } from "../Download/DownloadEventLogCSV";
import { exportToCsv, getTpfName } from "../edi.utils";
import {
  DOCUMENT_DIRECTION_FILTER_CONFIG,
  DOCUMENT_TYPE_FILTER_CONFIG,
  EDI_EVENT_LOG_LOCAL_STORAGE_KEY,
  EDI_EVENT_LOG_SEARCH_KEY,
  EMPTY_OBJECT_STRING,
  EVENT_LOG_TABLE_INDEX,
  eventLogCsvConfig,
  PAGE_SIZE,
} from "./constants";
import { generateLoadedCSV } from "./helpers";
import { TableConfig } from "./types";

export const EDIEventLogPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [tableConfig, setTableConfig] = useState<TableConfig>({});
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const history = useHistory();

  const { data: tableData, isLoading } = useGetEventLogQuery(tableConfig);

  const { data: tradingPartners } = useGetTradingPartners({
    select: (response) =>
      response?.data?.map(({ id, name }) => ({
        text: name,
        value: name,
      })),
  });

  const handleTableChange = async (
    pagination: TablePaginationConfig,
    filters: Record<string, (Key | boolean)[] | null>,
    sorter:
      | SorterResult<EventLogResponseModelDataItem>
      | SorterResult<EventLogResponseModelDataItem>[]
  ): Promise<void> => {
    // * When no records found, current page gets set to 0, doing this to send a {current: 1} by default
    const paginationConfig: TablePaginationConfig = {
      ...pagination,
      ...(pagination.current ? {} : { current: 1 }),
    };

    setTableConfig({ pagination: paginationConfig, filters, sorter });
  };

  /**
   * Check if URL has ?config=something
   * if it exists -> update localStorage edi-event-log-config
   *
   * else check for edi-event-log-config in localStorage
   * update the URL with ?config=something
   */
  useEffect(() => {
    let tableConfigString: string | null;

    const searchParamValue = searchParams.get(EDI_EVENT_LOG_SEARCH_KEY);
    if (searchParamValue) {
      tableConfigString = searchParamValue;
    } else {
      tableConfigString = getItemFromLocalStorage(
        EDI_EVENT_LOG_LOCAL_STORAGE_KEY
      );
    }
    try {
      const tableConfigObj: TableConfig = JSON.parse(
        tableConfigString ?? EMPTY_OBJECT_STRING
      );
      setTableConfig(tableConfigObj);
    } catch (error) {
      setTableConfig({});
    }
  }, []);

  /**
   * constantly listening to changes of the tableConfig
   * and updating localStorage + URL search string
   */
  useEffect(() => {
    if (!tableConfig) {
      return;
    }

    const tableConfigString = JSON.stringify(tableConfig);

    if (tableConfigString === EMPTY_OBJECT_STRING) {
      removeItemFromLocalStorage(EDI_EVENT_LOG_LOCAL_STORAGE_KEY);
      history.push({});
    } else {
      setItemInLocalStorage(EDI_EVENT_LOG_LOCAL_STORAGE_KEY, tableConfigString);
      searchParams.set(EDI_EVENT_LOG_SEARCH_KEY, tableConfigString);
      history.push({
        search: `?${searchParams.toString()}`,
      });
    }
  }, [tableConfig]);

  const getFilteredValue = (dataIndex: string): Key[] => {
    return (tableConfig?.filters?.[dataIndex] as Key[]) ?? [];
  };

  const getSortOrderValue = (dataIndex: string): SortOrder | undefined => {
    const sorter = (tableConfig?.sorter ??
      {}) as SorterResult<EventLogResponseModelDataItem>;
    const { columnKey, order } = sorter;

    if (columnKey !== dataIndex) {
      return null;
    }

    return order;
  };

  const columns: ColumnsType<EventLogResponseModelDataItem> = [
    {
      title: "Document #",
      dataIndex: EVENT_LOG_TABLE_INDEX.REFERENCE_ID,
      key: EVENT_LOG_TABLE_INDEX.REFERENCE_ID,
      fixed: true,
      width: 180,
      render(_value, { referenceId }, _index) {
        if (!referenceId) {
          return null;
        }
        return <Paragraph copyable>{referenceId}</Paragraph>;
      },
      // sorter: true, // TODO: TBD - to sort?
      sortOrder: getSortOrderValue(EVENT_LOG_TABLE_INDEX.REFERENCE_ID),
    },
    {
      title: "Trading Partner",
      dataIndex: EVENT_LOG_TABLE_INDEX.TRADING_PARTNER,
      key: EVENT_LOG_TABLE_INDEX.TRADING_PARTNER,
      width: 160,
      filteredValue: getFilteredValue(EVENT_LOG_TABLE_INDEX.TRADING_PARTNER),
      filters: tradingPartners,
      render: (value: string, tableRow: any) => {
        const { tradingPartner, tradingPartnerFlavor } = tableRow;
        const children = tradingPartner
          ? getTpfName({ name: tradingPartner, flavor: tradingPartnerFlavor })
          : "-";

        return {
          children,
        };
      },
    },
    {
      title: "Document Type",
      dataIndex: EVENT_LOG_TABLE_INDEX.DOCUMENT_TYPE,
      key: EVENT_LOG_TABLE_INDEX.DOCUMENT_TYPE,
      width: 150,
      render(_value, { documentType, documentTypeNumber }, _index) {
        let documentTypeString = "";
        if (documentType) {
          documentTypeString += documentType;
        }
        if (documentTypeNumber) {
          documentTypeString += ` (${documentTypeNumber})`;
        }
        return documentTypeString;
      },
      ellipsis: true,
      filteredValue: getFilteredValue(EVENT_LOG_TABLE_INDEX.DOCUMENT_TYPE),
      // TODO: get these from the BE
      filters: DOCUMENT_TYPE_FILTER_CONFIG,
    },
    {
      title: "Message",
      dataIndex: EVENT_LOG_TABLE_INDEX.MESSAGE,
      key: EVENT_LOG_TABLE_INDEX.MESSAGE,
      width: 240,
      // sorter: true, // TODO: TBD - to sort?
      sortOrder: getSortOrderValue(EVENT_LOG_TABLE_INDEX.MESSAGE),
    },
    {
      title: "Incoming / Outgoing",
      dataIndex: EVENT_LOG_TABLE_INDEX.DOCUMENT_DIRECTION,
      key: EVENT_LOG_TABLE_INDEX.DOCUMENT_DIRECTION,
      width: 190,
      render(_value, { documentDirection, documentDirectionStyle }, _index) {
        if (!documentDirection) {
          return null;
        }
        return (
          <Chip
            value={documentDirection}
            hideDropdown
            chipStyles={{ ...documentDirectionStyle, width: 120 }}
          />
        );
      },
      filteredValue: getFilteredValue(EVENT_LOG_TABLE_INDEX.DOCUMENT_DIRECTION),
      filters: DOCUMENT_DIRECTION_FILTER_CONFIG,
    },
    {
      title: "Timestamp",
      dataIndex: EVENT_LOG_TABLE_INDEX.CREATED_TIMESTAMP,
      key: EVENT_LOG_TABLE_INDEX.CREATED_TIMESTAMP,
      sorter: true,
      sortOrder: getSortOrderValue(EVENT_LOG_TABLE_INDEX.CREATED_TIMESTAMP),
      width: 240,
      render(_value, { createdTimestamp }, _index) {
        const dateObj = moment(createdTimestamp).utc();
        return `${dateObj.format("dddd, MMMM D, YYYY, HH:mm:ss")} UTC`;
      },
    },
    {
      title: "Event #",
      dataIndex: EVENT_LOG_TABLE_INDEX.EVENT_NUMBER,
      key: EVENT_LOG_TABLE_INDEX.EVENT_NUMBER,
      // sorter: true, // TODO: TBD - to sort?
      sortOrder: getSortOrderValue(EVENT_LOG_TABLE_INDEX.EVENT_NUMBER),
      width: 240,
      render(_value, { eventNumber }, _index) {
        if (!eventNumber) {
          return null;
        }
        return <Paragraph copyable>{eventNumber}</Paragraph>;
      },
    },
  ];

  const downloadCsv = (data: any) => {
    setDownloadDisabled(true);
    exportToCsv(
      eventLogCsvConfig,
      generateLoadedCSV(data),
      "Crstl Event Log Download"
    );
    setDownloadDisabled(false);
  };

  return (
    <>
      {selectedIds.length !== 0 && (
        <DownloadEventLogCSV
          downloadCsv={downloadCsv}
          orderIds={selectedIds}
          downloadDisabled={downloadDisabled}
          tableConfig={tableConfig}
        />
      )}
      <PageWrapper>
        <SimpleTable
          rowKey={({ eventNumber }) => eventNumber}
          rowSelection={{
            type: "checkbox",
            onChange: (newRowKeys) => setSelectedIds(newRowKeys),
            preserveSelectedRowKeys: true,
          }}
          loading={isLoading}
          dataSource={tableData?.data?.data ?? []}
          columns={columns}
          onChange={handleTableChange}
          scroll={{ x: true, y: "calc(100vh - 240px)" }}
          pagination={{
            current: tableConfig?.pagination?.current,
            pageSize: PAGE_SIZE,
            showSizeChanger: false,
            total: tableData?.data?.totalCount,
            position: ["bottomLeft"],
          }}
        />
      </PageWrapper>
    </>
  );
};

