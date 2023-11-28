import { get, groupBy } from "lodash";
import { TargetASNHLLoopPackItem } from "./types";

export const getGroupedRecords = (
  formData: TargetASNHLLoopPackItem[]
): Record<string, TargetASNHLLoopPackItem[]> => {
  return groupBy(formData, (item) =>
    get(
      item,
      "HL_loop_item[0].item_identification_LIN.product_service_id_03",
      {}
    )
  );
};
