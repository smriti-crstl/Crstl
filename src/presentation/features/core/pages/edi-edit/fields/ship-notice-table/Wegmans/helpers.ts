import { get, groupBy } from "lodash";

import { WegmansASNHLLoopPackItem } from "./types";

export const getGroupedRecords = (
  formData: WegmansASNHLLoopPackItem[]
): Record<string, WegmansASNHLLoopPackItem[]> => {
  return groupBy(formData, (item) =>
    get(item, "item_identification_LIN.product_service_id_05", {})
  );
};

