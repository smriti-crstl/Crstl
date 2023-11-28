import { ShopbopWarehouseASNHLLoopPack } from "./types";

/**
 * @param data - rowItem data type - ShopbopWarehouseASNHLLoopPack
 * since the (date_time_qualifier_01 === "036") condition is a special case here, we need this
 * otherwise we can just hardcode paths as string
 * @returns paths to individual editable items in a single row
 */
export const getEditableItemPaths = (data: ShopbopWarehouseASNHLLoopPack) => {
  const shippedQtyItemPath = `item_detail_shipment_SN1.number_of_units_shipped_02`;

  return {
    shippedQtyItemPath,
  };
};
