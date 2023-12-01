import { Table } from "antd";
import { ReactElement } from "react";

import { StatusModel } from "models/config";
import { TableContainer } from "components/atoms/table";

import { ORDER_DETAILS_HISTORY_TABLE_CONFIG } from "../../../../config/historyTableConfig";
import { IHistoryData } from "./HistoryButtonWrapper";

type Props = {
  historyData: IHistoryData[];
  configDropdownValues?: StatusModel[];
  customerName?: string;
  orderName?: string;
};

export const HistoryComponent = ({
  historyData,
  configDropdownValues,
  customerName,
  orderName,
}: Props): ReactElement => {
  return (
    <div>
      <TableContainer>
        <Table
          dataSource={historyData}
          columns={ORDER_DETAILS_HISTORY_TABLE_CONFIG(configDropdownValues, {
            customerName,
            orderName,
          })}
          pagination={{
            position: ["bottomRight"],
            pageSize: 5,
            size: "small",
            showSizeChanger: false,
          }}
        />
      </TableContainer>
    </div>
  );
};
