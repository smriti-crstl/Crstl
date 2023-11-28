import { ThriveMarketASNHLLoopPack } from "./types";

/**
 * @param data - rowItem data type - ThriveMarketASNHLLoopPack
 * since the (date_time_qualifier_01 === "036") condition is a special case here, we need this
 * otherwise we can just hardcode paths as string
 * @returns paths to individual editable items in a single row
 */
export const getEditableItemPaths = (data: ThriveMarketASNHLLoopPack) => {
  // * Declaring ItemPath constants here
  const lotNumberItemPath =
    "reference_information_REF[0].reference_identification_02";
  const descriptionItemPath = "product_item_description_PID.[0].description_05";
  const expirationDateItemPath = `date_time_reference_DTM.[0].date_02`;
  const shippedQtyItemPath = `item_detail_shipment_SN1.number_of_units_shipped_02`;

  return {
    lotNumberItemPath,
    descriptionItemPath,
    expirationDateItemPath,
    shippedQtyItemPath,
  };
};
