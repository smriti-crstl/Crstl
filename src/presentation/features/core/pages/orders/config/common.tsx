import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

// import { TabsConfig } from "@crstl/components/atoms/tabs";
import { DropdownMenuProps } from "@crstl/components/molecules/dropdowns";

// import { OrdersAll } from "../components/all";
// import { ORDERS_ALL_TABS_CONSTANTS } from "../constants";

// export const ORDERS_ALL_TABS_CONFIG: TabsConfig = [
//   {
//     // tab: ORDERS_ALL_TABS_CONSTANTS.ALL.tabName,
//     tab: "",
//     tabKey: ORDERS_ALL_TABS_CONSTANTS.ALL.tabKey,
//     children: <OrdersAll />,
//   },
//   //   {
//   //     tab: ORDERS_ALL_TABS_CONSTANTS.DRAFTS.tabName,
//   //     tabKey: ORDERS_ALL_TABS_CONSTANTS.DRAFTS.tabName,
//   //     children: "Drafts Tabs",
//   //   },
// ];

export interface IOrderTableToFilterKeys {
  channelName: string;
  status: string;
  fulfillmentStatus: string;
  deliveryStatus: string;
  invoiceStatus: string;
  paymentStatus: string;
  chargebackStatus: string;
  sort?: string;
  excludeShopify: string;
}

export const ORDER_TABLE_TO_FILTER_CONSTANTS = {
  CHANNEL_NAME: "channelName",
  ORDER_STATUS: "status",
  FULFILLMENT_STATUS: "fulfillmentStatus",
  DELIVERY_STATUS: "deliveryStatus",
  INVOICING_STATUS: "invoiceStatus",
  PAYMENT_STATUS: "paymentStatus",
  CHARGEBACK_STATUS: "chargebackStatus",
};

export const ORDER_TABLE_FILTER_TAGS_DATA_INDEXES_MAPPINGS = {
  [ORDER_TABLE_TO_FILTER_CONSTANTS.CHANNEL_NAME]:
    CORE_ORDERS_TEXT_CONSTANTS.FILTER_NAMES.CHANNEL_NAME,
  [ORDER_TABLE_TO_FILTER_CONSTANTS.ORDER_STATUS]:
    CORE_ORDERS_TEXT_CONSTANTS.FILTER_NAMES.ORDER_STATUS,
  [ORDER_TABLE_TO_FILTER_CONSTANTS.DELIVERY_STATUS]:
    CORE_ORDERS_TEXT_CONSTANTS.FILTER_NAMES.DELIVERY_STATUS,
  [ORDER_TABLE_TO_FILTER_CONSTANTS.INVOICING_STATUS]:
    CORE_ORDERS_TEXT_CONSTANTS.FILTER_NAMES.INVOICING_STATUS,
  [ORDER_TABLE_TO_FILTER_CONSTANTS.PAYMENT_STATUS]:
    CORE_ORDERS_TEXT_CONSTANTS.FILTER_NAMES.PAYMENT_STATUS,
  [ORDER_TABLE_TO_FILTER_CONSTANTS.CHARGEBACK_STATUS]:
    CORE_ORDERS_TEXT_CONSTANTS.FILTER_NAMES.CHARGEBACK_STATUS,
};

export const ORDERS_FILTERS_CONFIG: DropdownMenuProps[] = [
  {
    buttonText: "Customer",
    menuConfig: [],
    parentModule: ORDER_TABLE_TO_FILTER_CONSTANTS.CHANNEL_NAME,
  },
  {
    buttonText: "Order Status",
    menuConfig: [],
    parentModule: ORDER_TABLE_TO_FILTER_CONSTANTS.ORDER_STATUS,
  },
  {
    buttonText: "Delivery Status",
    menuConfig: [],
    parentModule: ORDER_TABLE_TO_FILTER_CONSTANTS.DELIVERY_STATUS,
  },
  {
    buttonText: "Invoice Status",
    menuConfig: [],
    parentModule: ORDER_TABLE_TO_FILTER_CONSTANTS.INVOICING_STATUS,
  },
  {
    buttonText: "Payment Status",
    menuConfig: [],
    parentModule: ORDER_TABLE_TO_FILTER_CONSTANTS.PAYMENT_STATUS,
  },
  {
    buttonText: "Chargeback Status",
    menuConfig: [],
    parentModule: ORDER_TABLE_TO_FILTER_CONSTANTS.CHARGEBACK_STATUS,
  },
];
