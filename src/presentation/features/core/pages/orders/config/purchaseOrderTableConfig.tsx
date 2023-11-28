import { ColumnsType } from "antd/lib/table";
import { currencyUSDFormatter } from "presentation/utils";

export type OrderItems = {
  externalSku: string;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
};

export const ORDER_DETAILS_PURCHASE_ORDER_TABLE_CONFIG: ColumnsType<OrderItems> = [
  {
    dataIndex: "productName",
    title: "Product",
    width: "28%",
    render: function RenderProductName(value) {
      if (value === "") {
        return <div style={{ visibility: "hidden" }}>-</div>;
      }
      return value;
    },
  },
  { dataIndex: "externalSku", title: "SKU", width: "22%" },
  { dataIndex: "quantity", title: "Qty Ordered", width: "25%" },
  {
    dataIndex: "unitPrice",
    title: "Unit Price",
    render: function RenderPrice(value) {
      if (value === null || value === undefined) {
        return "";
      } else {
        return currencyUSDFormatter(value);
      }
    },
  },
];
