import { CVSPackingSlipPrintPage } from "./CVS/ShipmentPrintPageCVS";
import { CVSDSDPackingSlipPrintPage } from "./CVS/ShipmentPrintPageCVSDSD";
import { FrancescasPackingSlipPrintPage } from "./Francescas/ShipmentPrintPageFrancescas";

/**
 * * Trading partner specific views come in here
 */
export const packingSlipViewMap: Record<string, any> = {
  // new ones with the flavor
  "cvs - distribution center/warehouse": CVSPackingSlipPrintPage,
  "cvs - direct store delivery (dsd) / sbt": CVSDSDPackingSlipPrintPage,

  // old ones without the flavor (default fallback)
  cvs: CVSPackingSlipPrintPage,
  "francesca's": FrancescasPackingSlipPrintPage,
};

