import { get, groupBy } from "lodash";

import { HEBASNHLLoopPackItem } from "./types";

export const getGroupedRecords = (
  formData: HEBASNHLLoopPackItem[]
): Record<string, HEBASNHLLoopPackItem[]> => {
  return groupBy(formData, (item) =>
    get(item, "item_identification_LIN.product_service_id_03", {})
  );
};

