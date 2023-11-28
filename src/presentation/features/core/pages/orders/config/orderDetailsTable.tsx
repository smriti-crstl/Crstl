import { ColumnsType } from "antd/lib/table";

import { TabsConfig } from "@crstl/components/atoms/tabs";
import { Chip } from "@crstl/components/molecules/order-chips/Chip";

import { OrderDetailsTablePoSummary } from "../components/view/order-table-sections/po-summary";
import { OrderDetailsTableSection } from "../components/view/order-table-sections/status";
import { HistoryButtonWrapper } from "../components/view/order-table-sections/status/HistoryButtonWrapper";
import { StatusTableConfig } from "../components/view/order-table-sections/status/hooks/useStatusTableConfig";
import { OrderDetailsStatusUpdatedBy } from "../components/view/order-table-sections/status/UpdatedBy";
import {
  ORDER_DETAILS_TAB_KEYS,
  ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS,
  ORDER_DETAILS_VIEW_STATUS_TABLE_DATA_INDEXES,
} from "../constants";

export const ORDER_DETAILS_TABLE_TABS_CONFIG = (): TabsConfig => {
  return [
    {
      tab: "Purchase Order Summary",
      tabKey: ORDER_DETAILS_TAB_KEYS.TAB_1,
      children: <OrderDetailsTablePoSummary />,
    },
    {
      tab: "Status History",
      tabKey: ORDER_DETAILS_TAB_KEYS.TAB_2,
      children: <OrderDetailsTableSection />,
    },
  ];
};

export const ORDER_DETAILS_TABLE_CONFIG: ColumnsType<StatusTableConfig> = [
  {
    title: "Status",
    dataIndex: ORDER_DETAILS_VIEW_STATUS_TABLE_DATA_INDEXES.LABEL,
    width: "20%",
  },
  {
    title: "",
    dataIndex: ORDER_DETAILS_VIEW_STATUS_TABLE_DATA_INDEXES.CONFIG_DATA,
    width: "25%",
    render: function RenderStatus(configData) {
      const value = configData.value;
      const obj = configData.dropdownValues?.find(
        (item: { status: string }) => item.status === value
      );
      return (
        <Chip
          {...{
            backgroundColor: obj?.backgroundColor,
            textColor: obj?.textColor,
            value,
            hideDropdown: true,
          }}
        />
      );
    },
  },
  {
    title: "Updated by",
    dataIndex: ORDER_DETAILS_VIEW_STATUS_TABLE_DATA_INDEXES.HISTORY_DATA,
    width: "30%",
    render: function RenderUpdatedBy(historyData) {
      return <OrderDetailsStatusUpdatedBy historyData={historyData} />;
    },
  },
  {
    title: "History",
    dataIndex: ORDER_DETAILS_VIEW_STATUS_TABLE_DATA_INDEXES.HISTORY_DATA,
    width: "25%",
    render: function RenderHistoryButton(historyData, record) {
      return (
        <HistoryButtonWrapper
          historyData={historyData}
          parentModule={record.label || ""}
          configDropdownValues={record.configData?.dropdownValues}
          customerName={record.customerName}
          orderName={record.orderName}
        />
      );
    },
  },
];

export const ORDER_DETAILS_TABLE_ROWS_CONFIG = [
  {
    label: "Order",
    field: ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.ORDER,
  },
  {
    label: "Delivery",
    field: ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.DELIVERY_STATUS,
  },
  {
    label: "Invoice",
    field: ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.INVOICING,
  },
  {
    label: "Payment",
    field: ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.PAYMENT,
  },
  {
    label: "Chargeback",
    field: ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.CHARGEBACK,
  },
];
