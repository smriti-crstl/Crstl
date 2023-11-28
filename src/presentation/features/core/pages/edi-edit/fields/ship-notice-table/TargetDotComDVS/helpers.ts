import { TargetDotComDvsASNHLLoopItem } from "./types";

export const getEditableItemPaths = (data: TargetDotComDvsASNHLLoopItem) => {
  const shippedQtyItemPath = `item_detail_shipment_SN1.number_of_units_shipped_02`;
  const trackingNumberItemPath = `marks_and_numbers_MAN[0].marks_and_numbers_02`;

  return {
    shippedQtyItemPath,
    trackingNumberItemPath,
  };
};
