import {
  CoreMarkPOAckTable,
  KeHEPOAckTable,
  UNFIPOAckTable,
} from "./purchase-order-acknowledgement-table";
import {
  CVSASNTable,
  FrancescasASNTable,
  HarrisTeeterASNTable,
  HEBASNTable,
  MeijerASNTable,
  TargetASNTable,
  ThriveMarketASNTable,
  TargetDotComDVSASNTable,
  WegmansASNTable,
  ShopbopWarehouseASNTable,
  WalmartDCASNTable,
  McLaneASNTable,
} from "./ship-notice-table";

const customFields = {
  customUNFIPOAckTable: UNFIPOAckTable,
  customKeHEPOAckTable: KeHEPOAckTable,
  customCoreMarkPOAckTable: CoreMarkPOAckTable,
  customCVSASNTable: CVSASNTable,
  customHarrisTeeterASNTable: HarrisTeeterASNTable,
  customTargetASNTable: TargetASNTable,
  customFrancescasASNTable: FrancescasASNTable,
  customMeijerASNTable: MeijerASNTable,
  customWegmansASNTable: WegmansASNTable,
  customHEBASNTable: HEBASNTable,
  customThriveMarketASNTable: ThriveMarketASNTable,
  customTargetDVSASNTable: TargetDotComDVSASNTable,
  customShopbopWarehouseASNTable: ShopbopWarehouseASNTable,
  customWalmartDCASNTable: WalmartDCASNTable,
  customMclanePackTable: McLaneASNTable,
};

export { customFields };

