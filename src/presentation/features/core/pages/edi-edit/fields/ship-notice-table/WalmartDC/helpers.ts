import { WalmartDCASNHLLoopPack } from "./types";

/**
 * @param data - rowItem data type - WalmartDCASNHLLoopPack
 * since the (date_time_qualifier_01 === "036") condition is a special case here, we need this
 * otherwise we can just hardcode paths as string
 * @returns paths to individual editable items in a single row
 */
export const getEditableItemPaths = (data: WalmartDCASNHLLoopPack) => {
  const shippedQtyItemPath = `item_detail_shipment_SN1.number_of_units_shipped_02`;
  const descriptionItemPath = "product_item_description_PID.[0].description_05";
  return {
    shippedQtyItemPath,
    descriptionItemPath,
  };
};
