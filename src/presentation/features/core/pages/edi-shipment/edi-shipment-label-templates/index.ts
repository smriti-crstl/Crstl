import { ShipmentPrintPage } from "../ShipmentPrintPage";
import { ShipmentPrintPageBedBathBeyond } from "./BedBathBeyond/ShipmentPrintPageBedBathBeyond";
import { ShipmentPrintPageCrateAndBarrelWarehouse } from "./CrateAndBarrel/ShipmentPrintPageCrateAndBarrel";
import { ShipmentPrintPageCVS } from "./CVS/ShipmentPrintPageCVS";
import { ShipmentPrintPageCVSDSD } from "./CVS/ShipmentPrintPageCVSDSD";
import { ShipmentPrintPageFrancescas } from "./Francescas/ShipmentPrintPageFrancescas";
import { ShipmentPrintPageHarrisTeeter } from "./HarrisTeeter/ShipmentPrintPageHarrisTeeter";
import { ShipmentPrintPageHEB } from "./HEB/ShipmentPrintPageHEB";
import { ShipmentPrintPageMcLane } from "./McLane/ShipmentPrintPageMcLane";
import { ShipmentPrintPageMeijer } from "./Meijer/ShipmentPrintPageMeijer";
import { ShipmentPrintPageThriveMarketDC } from "./ThriveMarket/ShipmentPrintPageThriveMarket";
// import { ShipmentPrintPageWegmansOld } from "./Wegmans/ShipmentPrintPageWegmansOld";
import { ShipmentPrintPageWegmans } from "./Wegmans/ShipmentPrintPageWegmans";

/**
 * * Trading partner specific views come in here
 */
export const shipmentLabelViewMap: Record<string, any> = {
  // new ones with the flavor
  "harris teeter - warehouse": ShipmentPrintPageHarrisTeeter,
  "cvs - distribution center/warehouse": ShipmentPrintPageCVS,
  "cvs - direct store delivery (dsd) / sbt": ShipmentPrintPageCVSDSD,
  "target - distribution center (dc)": ShipmentPrintPage,
  "wegmans - warehouse": ShipmentPrintPageWegmans,
  "heb - warehouse": ShipmentPrintPageHEB,
  "crate&barrel - warehouse": ShipmentPrintPageCrateAndBarrelWarehouse,
  "thrive market - distribution center (dc)": ShipmentPrintPageThriveMarketDC,

  // old ones without the flavor (default fallback)
  bedbathbeyond: ShipmentPrintPageBedBathBeyond,
  mclane: ShipmentPrintPageMcLane,
  "harris teeter": ShipmentPrintPageHarrisTeeter,
  cvs: ShipmentPrintPageCVS,
  target: ShipmentPrintPage,
  "francesca's": ShipmentPrintPageFrancescas,
  meijer: ShipmentPrintPageMeijer,
  wegmans: ShipmentPrintPageWegmans,
  heb: ShipmentPrintPageHEB,
};
