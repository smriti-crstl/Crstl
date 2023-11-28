import { get, groupBy, sum, compact, take } from "lodash";
import moment from "moment";
import { HLILoop, HLPLoop } from "../types/sourceJson";
import {
  HierarchicalLevelHLILoop,
  HierarchicalLevelHLPLoop,
  TargetJSON,
  TransactionSet,
} from "domain/entity/edi/models/TargetJson856";
import { getSafeNumber } from "./createHierarchicalIds";

function removeUserInput(fieldValue?: string) {
  return fieldValue?.replace("USER_INPUT", "")?.replace("U_I", "");
}

function getSafeCodeName(fieldValue?: string) {
  const delimitedCodeName = removeUserInput(fieldValue)?.split("_");
  const [safeCodeName] = delimitedCodeName?.reverse() ?? [];
  return safeCodeName ?? "";
}

function createDate(fieldValue?: string) {
  if (fieldValue) {
    return moment(fieldValue);
  }
  return fieldValue;
}

function createItemSourceJson(targetItemJson: HierarchicalLevelHLILoop[]) {
  return targetItemJson?.map((targetItem) => {
    const HL = targetItem?.hierarchical_level_HL;
    const LIN = targetItem?.item_identification_LIN;
    const SN1 = targetItem?.item_detail_shipment_SN1;
    const PO4 = targetItem?.item_physical_details_PO4;

    return {
      HL_01_628: HL?.hierarchical_id_number_01,
      HL_02_734: HL?.hierarchical_parent_id_number_02,
      HL_03_735: HL?.hierarchical_level_code_03,

      LIN_01_350: LIN?.assigned_identification_01,
      LIN_02_235: getSafeCodeName(LIN?.product_service_id_qualifier_02),
      LIN_03_234: LIN?.product_service_id_03,
      LIN_04_235: getSafeCodeName(LIN?.product_service_id_qualifier_04),
      LIN_05_234: LIN?.product_service_id_05,
      LIN_06_235: LIN?.product_service_id_qualifier_06,
      LIN_07_234: LIN?.product_service_id_07,
      LIN_08_235: LIN?.product_service_id_qualifier_08,
      LIN_09_234: LIN?.product_service_id_09,
      LIN_10_235: LIN?.product_service_id_qualifier_10,
      LIN_11_234: LIN?.product_service_id_11,
      LIN_12_235: LIN?.product_service_id_qualifier_12,
      LIN_13_234: LIN?.product_service_id_13,
      LIN_14_235: LIN?.product_service_id_qualifier_14,
      LIN_15_234: LIN?.product_service_id_15,
      LIN_16_235: LIN?.product_service_id_qualifier_16,
      LIN_17_234: LIN?.product_service_id_17,
      LIN_18_235: LIN?.product_service_id_qualifier_18,
      LIN_19_234: LIN?.product_service_id_19,
      LIN_20_235: LIN?.product_service_id_qualifier_20,
      LIN_21_234: LIN?.product_service_id_21,
      LIN_22_235: LIN?.product_service_id_qualifier_22,
      LIN_23_234: LIN?.product_service_id_23,
      LIN_24_235: LIN?.product_service_id_qualifier_24,
      LIN_25_234: LIN?.product_service_id_25,
      LIN_26_235: LIN?.product_service_id_qualifier_26,
      LIN_27_234: LIN?.product_service_id_27,
      LIN_28_235: LIN?.product_service_id_qualifier_28,
      LIN_29_234: LIN?.product_service_id_29,
      LIN_30_235: LIN?.product_service_id_qualifier_30,
      LIN_31_234: LIN?.product_service_id_31,

      SN1_01_350: SN1?.assigned_identification_01,
      SN1_02_382: SN1?.number_of_units_shipped_02,
      SN1_03_355: getSafeCodeName(SN1?.unit_or_basis_for_measurement_code_03),
      SN1_05_330: SN1?.quantity_ordered_05,
      SN1_06_355: SN1?.unit_or_basis_for_measurement_code_06,

      PO4_01_356: PO4?.pack_01,
      PO4_02_357: PO4?.size_02,
      PO4_03_355: PO4?.unit_or_basis_for_measurement_code_03,
      PO4_04_103: PO4?.packaging_code_04,
      PO4_08_385: PO4?.gross_volume_per_pack_08,
      PO4_09_355: PO4?.unit_or_basis_for_measurement_code_09,
      PO4_14_810: PO4?.inner_pack_14,
      PO4_16_350: PO4?.assigned_identification_16,
    };
  });
}

function createPackageSourceJson({
  packageLoop,
  itemLoop,
}: {
  packageLoop?: HierarchicalLevelHLPLoop[];
  itemLoop?: HLILoop[];
}) {
  return packageLoop?.map((targetPackage) => {
    const HL = targetPackage?.hierarchical_level_HL;
    const PO4 = targetPackage?.item_physical_details_PO4;
    const MAN = targetPackage?.marks_and_numbers_MAN?.[0];
    const DTM = targetPackage?.date_time_reference_DTM?.[0];

    const items = itemLoop?.filter(
      (item) => item?.HL_02_734 === HL?.hierarchical_id_number_01
    );

    return {
      HL_01_628: HL?.hierarchical_id_number_01,
      HL_02_734: HL?.hierarchical_parent_id_number_02,
      HL_03_735: HL?.hierarchical_level_code_03,
      P04_01_356: PO4?.pack_01,

      MAN_01_88: MAN?.marks_and_numbers_qualifier_01,
      MAN_02_87: removeUserInput(MAN?.marks_and_numbers_02),
      MAN_03_87: MAN?.marks_and_numbers_03,
      MAN_04_88: MAN?.marks_and_number_qualifier_04,
      MAN_05_87: MAN?.marks_and_numbers_05,
      MAN_06_87: MAN?.marks_and_numbers_06,

      DTM_01_374: DTM?.date_time_qualifier_01,
      DTM_02_373: createDate(DTM?.date_02),
      DTM_03_337: createDate(DTM?.time_03),
      DTM_04_623: DTM?.time_code_04,
      DTM_05_1250: DTM?.time_code_05,
      DTM_06_1251: DTM?.date_time_period_06,

      HL_I_Loop: items,
    };
  });
}

function createSourceJson(targetJson: TargetJSON) {
  const transactionSet = get(
    targetJson,
    `data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]`,
    null
  ) as TransactionSet;

  const heading = transactionSet?.heading;
  const detail = transactionSet?.detail;
  const summary = transactionSet?.summary;

  const BSN = heading?.beginning_segment_for_ship_notice_BSN;
  const ST = heading?.transaction_set_header_ST;
  const CTT = summary?.transaction_totals_CTT;
  const SE = summary?.transaction_set_trailer_SE;

  const Shipment = detail?.hierarchical_level_HL_shipment;
  const ShipmentHL = Shipment?.hierarchical_level_HL;
  const ShipmentTD5 =
    Shipment?.carrier_details_routing_sequence_transit_time_TD5?.[0];

  const Shipment_REF_BM = Shipment?.reference_identification_REF_BM;
  const Shipment_REF_CN = Shipment?.reference_identification_REF_CN;
  const Shipment_FOB = Shipment?.fob_related_instructions_FOB;

  const ShipmentN1 = Shipment?.name_N1_loop?.[0]?.name_N1;

  const Order = detail?.hierarchical_level_HL_order;
  const OrderHL = Order?.hierarchical_level_HL;
  const OrderPRF = Order?.purchase_order_reference_PRF;
  const OrderPID = Order?.product_item_description_PID?.[0];
  const OrderTD1 = Order?.carrier_details_quantity_and_weight_TD1?.[0];
  const OrderN1 = Order?.name_N1_loop?.[0]?.name_N1;

  const ItemLoop = createItemSourceJson(detail?.hierarchical_level_HL_I_loop);
  const PackageLoop = createPackageSourceJson({
    packageLoop: detail?.hierarchical_level_HL_P_loop,
    itemLoop: ItemLoop,
  });

  return {
    ST_01_143: "856",
    ST_02_329: ST?.transaction_set_control_number_02,

    BSN_01_353: BSN?.transaction_set_purpose_code_01,
    BSN_02_396: removeUserInput(BSN?.shipment_identification_02),
    BSN_03_373: createDate(BSN?.date_03),
    BSN_04_337: createDate(`${BSN?.date_03}T${BSN?.time_04}`),
    BSN_05_1005: BSN?.hierarchical_structure_code_05,
    BSN_06_640: BSN?.transaction_type_code_06,

    // Shipment
    HL_S_01_628: ShipmentHL?.hierarchical_id_number_01,
    HL_S_03_735: ShipmentHL?.hierarchical_level_code_03,

    TD5_S_01_133: getSafeCodeName(ShipmentTD5?.routing_sequence_code_01),
    TD5_S_02_66: ShipmentTD5?.identification_code_qualifier_02,
    TD5_S_03_67: removeUserInput(ShipmentTD5?.identification_code_03),
    TD5_S_04_91: removeUserInput(
      ShipmentTD5?.transportation_method_type_code_04
    ),
    TD5_S_05_387: removeUserInput(ShipmentTD5?.routing_05),
    TD5_S_06_368: ShipmentTD5?.shipment_order_status_code_06,
    TD5_S_08_310: ShipmentTD5?.location_identifier_08,
    TD5_S_11_733: ShipmentTD5?.transit_time_11,
    TD5_S_12_284: ShipmentTD5?.service_level_code_12,
    TD5_S_13_284: ShipmentTD5?.service_level_code_13,

    REF_BM_S_01_128: Shipment_REF_BM?.reference_identification_qualifier_01,
    REF_BM_S_02_127: removeUserInput(
      Shipment_REF_BM?.reference_identification_02
    ),
    REF_BM_S_03_352: Shipment_REF_BM?.description_03,

    REF_CN_S_01_128: Shipment_REF_CN?.reference_identification_qualifier_01,
    REF_CN_S_02_127: removeUserInput(
      Shipment_REF_CN?.reference_identification_02
    ),
    REF_CN_S_03_352: Shipment_REF_CN?.description_03,

    FOB_S_01_146: Shipment_FOB?.shipment_method_of_payment_01,
    FOB_S_02_309: Shipment_FOB?.location_qualifier_02,
    FOB_S_03_352: Shipment_FOB?.description_03,
    FOB_S_04_334: Shipment_FOB?.transportation_terms_qualifier_code_04,
    FOB_S_05_335: Shipment_FOB?.transportation_terms_code_05,
    FOB_S_06_309: Shipment_FOB?.location_qualifier_06,
    FOB_S_07_352: Shipment_FOB?.description_07,
    FOB_S_08_54: Shipment_FOB?.risk_of_loss_code_08,
    FOB_S_09_352: Shipment_FOB?.description_09,

    N1_S_01_98: ShipmentN1?.entity_identifier_code_01,
    N1_S_02_93: ShipmentN1?.name_02,
    N1_S_03_66: ShipmentN1?.identification_code_qualifier_03,
    N1_S_04_67: ShipmentN1?.identification_code_04,
    N1_S_05_706: ShipmentN1?.entity_relationship_code_05,
    N1_S_06_98: ShipmentN1?.entity_identifier_code_06,

    // Order
    HL_O_01_628: OrderHL?.hierarchical_id_number_01,
    HL_O_02_734: OrderHL?.hierarchical_parent_id_number_02,
    HL_O_03_735: OrderHL?.hierarchical_level_code_03,

    HL_O_PRF_01_324: OrderPRF?.purchase_order_number_01,

    HL_O_PID_01_324: OrderPID?.item_description_type_01,
    HL_O_PID_02_750: OrderPID?.product_process_characteristic_code_02,
    HL_O_PID_03_559: OrderPID?.agency_qualifier_code_03,
    HL_O_PID_04_751: OrderPID?.product_description_code_04,
    HL_O_PID_05_352: OrderPID?.description_05,

    HL_O_TD1_01_103: OrderTD1?.packaging_code_01,
    HL_O_TD1_02_80: OrderTD1?.lading_quantity_02,

    HL_O_N1_01_98: getSafeCodeName(OrderN1?.entity_identifier_code_01),
    HL_O_N1_02_93: OrderN1?.name_02,
    HL_O_N1_03_66: getSafeCodeName(OrderN1?.identification_code_qualifier_03),
    HL_O_N1_04_67: OrderN1?.identification_code_04,
    HL_O_N1_05_706: OrderN1?.entity_relationship_code_05,
    HL_O_N1_06_98: OrderN1?.entity_identifier_code_06,

    // Package loop
    HL_P_loop: PackageLoop,

    CTT_01_354: CTT?.number_of_line_items_01,
    CTT_03_81: CTT?.weight_03,
    CTT_04_355: CTT?.unit_or_basis_for_measurement_code_04,
    CTT_05_183: CTT?.volume_05,
    CTT_06_355: CTT?.unit_or_basis_for_measurement_code_06,

    SE_01_96: SE?.number_of_included_segments_01,
  };
}

type SourceJSON = ReturnType<typeof createSourceJson>;

function mergeDuplicatePacks(sourceJson: SourceJSON) {
  const groupedProductData = groupBy(
    sourceJson.HL_P_loop,
    (item) => item.HL_I_Loop?.[0].LIN_05_234
  );

  const mergedProducts = Object.values(groupedProductData).map(
    (productItems) => {
      const containerIds = productItems?.map((item) => item.MAN_02_87);
      const quantitiesShipped = productItems?.map((product) => {
        const item = product.HL_I_Loop?.[0];
        return getSafeNumber(item?.SN1_02_382);
      });
      const totalQuantityShipped = sum(compact(quantitiesShipped));

      const initial = {
        containerIds,
        packCount: containerIds.length,
        totalQuantityShipped,
      } as Partial<HLPLoop>;

      const mergedProduct = productItems.reduce((acc, current) => {
        return { ...acc, ...current };
      }, initial);

      return mergedProduct;
    }
  );

  const updates = {
    ...sourceJson,
    HL_P_loop: mergedProducts,
    groupedProductData,
  };

  return updates;
}

type MergedSourceJSON = ReturnType<typeof mergeDuplicatePacks>;

function dedupePacks(sourceJson: MergedSourceJSON) {
  const packs = sourceJson?.HL_P_loop?.filter((pack) => {
    const packCount = pack?.packCount ?? 0;
    return packCount > 0;
  });

  const packGroups = sourceJson.groupedProductData;

  const updatedPacks = packs.reduce((acc: HLPLoop[], currentPack) => {
    const packCount = currentPack?.packCount;
    const sku = currentPack?.HL_I_Loop?.[0]?.LIN_05_234 ?? "";
    const allPacksForSku = get(packGroups, sku, null);

    const packForSku = take(allPacksForSku, packCount);

    const updatedAcc = packForSku ? acc.concat(packForSku) : acc;

    return updatedAcc;
  }, []);

  const updatedSourceJson = {
    ...sourceJson,
    HL_P_loop: updatedPacks,
  };

  return updatedSourceJson;
}

export type { MergedSourceJSON };
export { createSourceJson, mergeDuplicatePacks, dedupePacks };
