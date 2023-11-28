import { get, groupBy } from "lodash";

import { FrancescasASNHLLoopPackItem } from "./types";

export const getGroupedRecords = (
  formData: FrancescasASNHLLoopPackItem[]
): Record<string, FrancescasASNHLLoopPackItem[]> => {
  return groupBy(formData, (item) =>
    get(
      item,
      "HL_loop_item[0].item_identification_LIN.product_service_id_03",
      {}
    )
  );
};
