import { PurchaseOrderResTransformed } from "domain/entity/orders/models";
import { CORE_ORDERS_TEXT_CONSTANTS } from "presentation/texts-reservoir/core";
import { currencyUSDFormatter } from "presentation/utils";

export type OrderDetailsDataSource = {
  label: string;
  value: string;
  key: string;
  isDates?: boolean;
  isAnchor?: boolean;
  anchorUrl?: string;
};

// TODO: Move text to text reservoir

const DATE_KEYS = [
  "REQUESTED_DELIVERY",
  "EARLIEST_SHIP",
  "LATEST_SHIP",
  "REQUESTED_SHIP",
  "LATEST_DELIVERY",
  "PO_DATE",
  "ACTUAL_SHIP",
  "SCHEDULED_SHIP",
];

const ORDER_DETAILS_CONFIG: {
  heading: string;
  keys: string[];
}[] = [
  {
    heading: "Order Details",
    keys: [
      "ORDER_NAME",
      // Customer in UI
      "CHANNEL",
      "PO_DATE",
      "SHIP_TO_ADDRESS",
    ],
  },
  {
    heading: "Shipping Details",
    keys: [
      "REQUESTED_DELIVERY",
      "EARLIEST_SHIP",
      "LATEST_SHIP",
      "REQUESTED_SHIP",
      "LATEST_DELIVERY",
      // Uncomment when 856 data flows
      "ACTUAL_SHIP",
      "SCHEDULED_SHIP",
      "SHIPMENT_TRACKING",
      "CARRIER_ALPHA_CODE",
      "CARRIER_TRANS_METHOD_CODE",
    ],
  },
  {
    heading: "Money Details",
    keys: [
      "NET_DUE_DAYS",
      "DISCOUNT_DUE_DAYS",
      "DISCOUNT_PERCENTAGE",
      "TERMS_TYPE",
      "TERMS_START_DATE",
      "INVOICE_NUMBER",
      "INVOICE_AMOUNT",
    ],
  },

  // Depricated
  // "REQUESTED_DATE",
  // "SHIP_TO",
  // "NET_DAYS",
];

const ORDER_DETAILS_MAPPING: Record<
  string,
  { label: string; dataMappingKey: keyof PurchaseOrderResTransformed }
> = {
  ORDER_NAME: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.ORDER_NAME,
    dataMappingKey: "orderName",
  },
  CHANNEL: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.CHANNEL,
    dataMappingKey: "channelName",
  },
  PO_DATE: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.PO_DATE,
    dataMappingKey: "poDate",
  },
  REQUESTED_DELIVERY: {
    label:
      CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.REQUESTED_DELIVERY,
    dataMappingKey: "requestedDelivery",
  },
  EARLIEST_SHIP: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.EARLIEST_SHIP,
    dataMappingKey: "earliestShip",
  },
  LATEST_SHIP: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.LATEST_SHIP,
    dataMappingKey: "latestShip",
  },
  REQUESTED_SHIP: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.REQUESTED_SHIP,
    dataMappingKey: "requestedShip",
  },
  LATEST_DELIVERY: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.LATEST_DELIVERY,
    dataMappingKey: "latestDelivery",
  },
  // Uncomment when 856 data flows
  SHIPMENT_TRACKING: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.SHIPMENT_TRACKING,
    dataMappingKey: "trackingDetails",
  },
  NET_DUE_DAYS: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.NET_DUE_DAYS,
    dataMappingKey: "netDueDays",
  },
  DISCOUNT_DUE_DAYS: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.DISCOUNT_DUE_DAYS,
    dataMappingKey: "discountDueDays",
  },
  DISCOUNT_PERCENTAGE: {
    label:
      CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.DISCOUNT_PERCENTAGE,
    dataMappingKey: "discountPercentage",
  },
  TERMS_TYPE: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.TERMS_TYPE,
    dataMappingKey: "termsType",
  },
  TERMS_START_DATE: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.TERMS_START_DATE,
    dataMappingKey: "termsStartDate",
  },

  // Depricated
  // REQUESTED_DATE: {
  //   label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.REQUESTED_DATE,
  //   dataMappingKey: "requestShipDeliveryDate",
  // },
  SHIP_TO_ADDRESS: {
    label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.SHIP_TO_ADDRESS,
    dataMappingKey: "shipTo",
  },
  // NET_DAYS: {
  //   label: CORE_ORDERS_TEXT_CONSTANTS.VIEW.ORDER_DETAILS.LIST.NET_DAYS,
  //   dataMappingKey: "netDays",
  // },
  ACTUAL_SHIP: {
    label: "Actual Ship",
    dataMappingKey: "actualShip",
  },
  SCHEDULED_SHIP: {
    label: "Scheduled Ship",
    dataMappingKey: "scheduledShip",
  },
  CARRIER_ALPHA_CODE: {
    label: "Carrier Alpha Code",
    dataMappingKey: "carrierAlphaCode",
  },
  CARRIER_TRANS_METHOD_CODE: {
    label: "Carrier Trans Method Code",
    dataMappingKey: "carrierTransMethodCode",
  },
  INVOICE_NUMBER: {
    label: "Invoice Number",
    dataMappingKey: "invoiceDocNumber",
  },
  INVOICE_AMOUNT: {
    label: "Invoice Amount",
    dataMappingKey: "invoiceAmount",
  },
};

const createConfig = (
  key: string,
  poDetails: PurchaseOrderResTransformed | undefined
): OrderDetailsDataSource => {
  const isDates = DATE_KEYS.includes(key);
  const mappingObj = ORDER_DETAILS_MAPPING[key];
  const valueObj = poDetails?.[mappingObj?.dataMappingKey] as string;
  switch (key) {
    case "SHIPMENT_TRACKING": {
      const objectValue1 = (valueObj as unknown) as Record<string, string>;
      const isShipmentTrackingUrl1 = !!objectValue1?.shipmentTrackingURL;
      if (isShipmentTrackingUrl1) {
        return {
          key,
          label: mappingObj?.label || "-",
          value: objectValue1?.shipmentTrackingNumber || "-",
          isDates,
          isAnchor: true,
          anchorUrl: objectValue1?.shipmentTrackingURL,
        };
      } else {
        return {
          key,
          label: mappingObj?.label || "-",
          value: objectValue1?.shipmentTrackingNumber || "-",
          isDates,
        };
      }
      break;
    }

    case "INVOICE_AMOUNT": {
      const mappingObj = ORDER_DETAILS_MAPPING[key];
      let valueObjNum = poDetails?.[mappingObj?.dataMappingKey];
      valueObjNum =
        valueObjNum === null ? " " : currencyUSDFormatter(Number(valueObjNum));
      return {
        key,
        label: mappingObj?.label || "-",
        value: valueObjNum || "-",
        isDates,
      };
      break;
    }
    default: {
      return {
        key,
        label: mappingObj?.label || "-",
        value: valueObj || "-",
        isDates,
      };
      break;
    }
  }
};

const createOrderDetailsDataSource = (
  poDetails: PurchaseOrderResTransformed | undefined
): Array<{ config: OrderDetailsDataSource[]; heading: string }> => {
  return ORDER_DETAILS_CONFIG.map((itemObj) => {
    const { heading, keys } = itemObj;
    return {
      config: keys.map((key) => createConfig(key, poDetails)),
      heading,
    };
  });
};

export { createOrderDetailsDataSource };
