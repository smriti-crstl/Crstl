import { DropdownMenuProps } from "@crstl/components/molecules/dropdowns";
import {
  OrdersSummaryRes,
  OrganizationConfigModelRes,
  TransformedChannels,
} from "domain/entity/orders/models";
import {
  ORDERS_FILTERS_CONFIG,
  ORDERS_TABLE_DATA_INDEXES,
  ORDERS_TABLE_SORTING_VALUE_CONSTANTS,
  ORDER_TABLE_TO_FILTER_CONSTANTS,
} from "../config";
import { sortByDate } from "presentation/utils";
import { orderBy } from "lodash";

const generateMenuConfig = (
  configArray: { status: string; backgroundColor: string; textColor: string }[]
): { label: string; value: string }[] =>
  configArray.map(({ status }) => ({
    label: status,
    value: status,
  }));

const getConfigFilterFields = ({
  configObj,
  channelsData,
  isOrganizationConfigLoading,
  isChannelsLoading,
}: {
  configObj: OrganizationConfigModelRes | undefined;
  channelsData: TransformedChannels;
  isOrganizationConfigLoading: boolean;
  isChannelsLoading: boolean;
}): DropdownMenuProps[] => {
  return ORDERS_FILTERS_CONFIG.map((item) => {
    if (configObj) {
      const parentModule = item.parentModule;
      switch (parentModule) {
        case ORDER_TABLE_TO_FILTER_CONSTANTS.CHANNEL_NAME:
          return {
            ...item,
            menuConfig: channelsData || [],
            isLoading: isChannelsLoading,
          };
        case ORDER_TABLE_TO_FILTER_CONSTANTS.CHARGEBACK_STATUS:
          return {
            ...item,
            menuConfig: generateMenuConfig(configObj.ChargeBackStatus),
          };
        case ORDER_TABLE_TO_FILTER_CONSTANTS.DELIVERY_STATUS:
          return {
            ...item,
            menuConfig: generateMenuConfig(configObj?.DeliveryStatus),
          };
        case ORDER_TABLE_TO_FILTER_CONSTANTS.INVOICING_STATUS:
          return {
            ...item,
            menuConfig: generateMenuConfig(configObj.InvoiceStatus),
          };
        case ORDER_TABLE_TO_FILTER_CONSTANTS.ORDER_STATUS:
          return {
            ...item,
            menuConfig: generateMenuConfig(configObj.OrderStatus),
          };
        case ORDER_TABLE_TO_FILTER_CONSTANTS.PAYMENT_STATUS:
          return {
            ...item,
            menuConfig: generateMenuConfig(configObj.Payment),
          };
        default:
          return item;
      }
    }
    return { ...item, isLoading: isOrganizationConfigLoading };
  });
};

const sortOrders = ({
  sortingKey,
  targetArray,
}: {
  sortingKey: string;
  targetArray: OrdersSummaryRes[];
}): OrdersSummaryRes[] => {
  const resultArray = [...targetArray];
  switch (sortingKey) {
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.DATE_NEWEST:
      return sortByDate<OrdersSummaryRes, keyof OrdersSummaryRes>(
        resultArray,
        ORDERS_TABLE_DATA_INDEXES.ORDER_DATE,
        "DSC"
      );
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.DATE_OLDEST:
      return sortByDate<OrdersSummaryRes, keyof OrdersSummaryRes>(
        resultArray,
        ORDERS_TABLE_DATA_INDEXES.ORDER_DATE,
        "ASC"
      );
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.PAYMENT_STATUS_ASC:
      return orderBy(
        resultArray,
        [ORDERS_TABLE_DATA_INDEXES.PAYMENT_STATUS],
        ["asc"]
      );
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.PAYMENT_STATUS_DSC:
      return orderBy(
        resultArray,
        [ORDERS_TABLE_DATA_INDEXES.PAYMENT_STATUS],
        ["desc"]
      );
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.DELIVERY_STATUS_ASC:
      return orderBy(
        resultArray,
        [ORDERS_TABLE_DATA_INDEXES.DELIVERY_STATUS],
        ["asc"]
      );
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.DELIVERY_STATUS_DSC:
      return orderBy(
        resultArray,
        [ORDERS_TABLE_DATA_INDEXES.DELIVERY_STATUS],
        ["desc"]
      );
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.PRICE_ASC:
      return orderBy(resultArray, [ORDERS_TABLE_DATA_INDEXES.TOTAL], ["asc"]);
    case ORDERS_TABLE_SORTING_VALUE_CONSTANTS.PRICE_DSC:
      return orderBy(resultArray, [ORDERS_TABLE_DATA_INDEXES.TOTAL], ["desc"]);
    default:
      return resultArray;
  }
};

export { sortOrders, getConfigFilterFields };
