import { get, groupBy } from "lodash";
import { HarrisTeeterASNHLLoopPackItem } from "./types";

export const getGroupedRecords = (
  formData: HarrisTeeterASNHLLoopPackItem[]
): Record<string, HarrisTeeterASNHLLoopPackItem[]> => {
  return groupBy(formData, (item) =>
    get(
      item,
      "HL_loop_item[0].item_identification_LIN.product_service_id_03",
      {}
    )
  );
};

