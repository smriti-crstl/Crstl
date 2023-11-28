import { ColumnsType } from "antd/lib/table";

import { StatusModel } from "@crstl/api/src/apis/models/config";

import { IHistoryData } from "../components/view/order-table-sections/status/HistoryButtonWrapper";
import { HistoryChips } from "../components/view/order-table-sections/status/HistoryChips/HistoryChips";
import { HistoryDate } from "../components/view/order-table-sections/status/HistoryDate";
import { HistoryName } from "../components/view/order-table-sections/status/HistoryName";

// import { HistoryTime } from "../components/view/order-table-sections/status/HistoryTime";

export const ORDER_DETAILS_HISTORY_TABLE_CONFIG = (
  configDropdownValues: StatusModel[] | undefined,
  heading: {
    customerName?: string;
    orderName?: string;
  }
): ColumnsType<IHistoryData> => [
  {
    dataIndex: "fullName",
    title: `Order ${heading.orderName} - ${heading.customerName}`,
    width: "25%",
    render: function RenderHistoryName(_configData, record) {
      return <HistoryName name={record.fullName} />;
    },
  },
  {
    dataIndex: "",
    title: "",
    width: "50%",
    render: function RenderHistoryChips(_configData, record) {
      return (
        <HistoryChips
          configDropdownValues={configDropdownValues}
          prevValue={record.prevStatus}
          value={record.status}
          prevStatusDescription={record.prevStatusDescription}
          statusDescription={record.statusDescription}
        />
      );
    },
  },
  {
    dataIndex: "createdAt",
    title: "",
    width: "23%",
    render: function RenderHistoryDate(_configData, record) {
      return <HistoryDate date={record.createdAt} />;
    },
  },
  // {
  //   dataIndex: "createdAt",
  //   title: "",
  //   width: "15%",
  //   render: function RenderHistoryTime(_configData, _record) {
  //     return <HistoryTime />;
  //   },
  // },
];
