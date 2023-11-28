import { ColumnsType } from "antd/lib/table";
import {
  OrdersSummaryRes,
  OrganizationConfigModelRes,
} from "domain/entity/orders/models";
import { StatusLabelFE } from "domain/entity/shared/models";
import { GetZonedTimeProps } from "presentation/hooks/common/use-timestamp";
import { currencyFormatter } from "presentation/utils";

import { OrderChipsWrapper } from "../components/common/OrderChipsWrapper";

// TODO: TAMAN / BACKEND: Round values from BE
// TODO: TAMAN : Move Organization slice index in global configurations

// Exception: projectedDate is used directly in the repository sorting
export const ORDERS_TABLE_DATA_INDEXES: Record<
  | "ORDER_ID"
  | "ORDER_DATE"
  | "TOTAL"
  | "CHANNEL"
  | "ORDER_STATUS"
  | "DELIVERY_STATUS"
  | "INVOICING_STATUS"
  | "PAYMENT_STATUS"
  | "CHARGEBACK_STATUS"
  | "SOURCE",
  keyof OrdersSummaryRes
> = {
  ORDER_ID: "orderName",
  ORDER_DATE: "receivedAt",
  TOTAL: "totalAmount",
  CHANNEL: "channelName",
  ORDER_STATUS: "status",
  DELIVERY_STATUS: "deliveryStatus",
  INVOICING_STATUS: "invoiceStatus",
  PAYMENT_STATUS: "paymentStatus",
  CHARGEBACK_STATUS: "chargebackStatus",
  SOURCE: "source",
};

export const ORDERS_TABLE_CONFIG = (
  configModel: OrganizationConfigModelRes | undefined,
  getZonedTime: GetZonedTimeProps
  // orderPageType: CoreRouteOrdersOptions
): ColumnsType<OrdersSummaryRes> => [
  {
    title: "Order ID",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.ORDER_ID,
    width: "100px",
    ellipsis: true,
    render: function RenderOrderId(value) {
      const children = value ? value : "-";
      return {
        children,
        props: {
          "data-testid": "orderId",
        },
      };
    },
    fixed: true,
  },
  {
    title: "Order Date",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.ORDER_DATE,
    render: (value: string) => {
      const children = value
        ? getZonedTime({ ISODateString: value, withAltLabel: true })
        : "-";
      return {
        children,
        props: {
          "data-testid": "orderDate",
        },
      };
    },
    width: "120px",
    fixed: true,
  },
  {
    title: "Total",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.TOTAL,
    render: (value, tableRow) => {
      const children = value
        ? currencyFormatter(value, tableRow.currency)
        : "-";
      return {
        children,
        props: {
          "data-testid": "orderTotal",
        },
      };
    },
    width: "100px",
  },
  {
    title: "Customer",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.CHANNEL,
    width: "100px",
    ellipsis: true,
    render: (children) => ({
      children,
      props: {
        "data-testid": "customer",
      },
    }),
  },
  {
    title: "Source",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.SOURCE,
    width: "100px",
    render: (children) => ({
      children,
      props: {
        "data-testid": "source",
      },
    }),
  },
  {
    title: "Order",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.ORDER_STATUS,
    width: "140px",
    render: function RenderOrderChips(value, { id }) {
      return (
        <div data-testid="order">
          <OrderChipsWrapper
            poId={id}
            configArray={configModel?.OrderStatus}
            value={value}
            parentModule={StatusLabelFE.orderStatus}
          />
        </div>
      );
    },
  },
  {
    title: "Delivery",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.DELIVERY_STATUS,
    width: "160px",
    render: function RenderOrderChips(value, { id }) {
      return (
        <div data-testid="delivery">
          <OrderChipsWrapper
            poId={id}
            configArray={configModel?.DeliveryStatus}
            value={value}
            parentModule={StatusLabelFE.deliveryStatus}
          />
        </div>
      );
    },
  },
  //   { title: "Checklist Status", dataIndex: "id" },
  {
    title: "Invoice",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.INVOICING_STATUS,
    width: "120px",
    render: function RenderOrderChips(value, { id }) {
      return (
        <div data-testid="invoice">
          <OrderChipsWrapper
            poId={id}
            configArray={configModel?.InvoiceStatus}
            value={value}
            parentModule={StatusLabelFE.invoiceStatus}
          />
        </div>
      );
    },
  },
  {
    title: "Payment",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.PAYMENT_STATUS,
    width: "120px",
    render: function RenderOrderChips(value, { id }) {
      return (
        <div data-testid="payment">
          <OrderChipsWrapper
            poId={id}
            configArray={configModel?.Payment}
            value={value}
            parentModule={StatusLabelFE.paymentStatus}
          />
        </div>
      );
    },
  },
  {
    title: "Chargeback",
    dataIndex: ORDERS_TABLE_DATA_INDEXES.CHARGEBACK_STATUS,
    width: "120px",
    render: function RenderOrderChips(value, { id }) {
      return (
        <div data-testid="chargeback">
          <OrderChipsWrapper
            poId={id}
            configArray={configModel?.ChargeBackStatus}
            parentModule={StatusLabelFE.chargebackStatus}
            value={value}
          />
        </div>
      );
    },
  },
];

export const ORDERS_EXCLUDE_COLUMNS_SHOPIFY_AMAZON = {
  INVOICE: "Invoice",
  PAYMENT: "Payment",
  CHARGEBACK: "Chargeback",
};

export const ORDERS_EXCLUDE_FILTERS_SHOPIFY_AMAZON = {
  INVOICE_STATUS: "invoiceStatus",
  CHARGEBACK_STATUS: "chargebackStatus",
  PAYMENT_STATUS: "paymentStatus",
};

export const ORDERS_SOURCE = {
  AMAZON: "amazon",
  SHOPIFY: "shopify",
  B2B: "b2b",
};
