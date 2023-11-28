import { get, groupBy, sum, compact, take, each } from "lodash";
import moment from "moment";
import { HLILoop, HLPLoop } from "../types/sourceJson";
import {
  HierarchicalLevelHLILoop,
  HierarchicalLevelHLPLoop,
  CvsJSON,
  TransactionSet,
} from "domain/entity/edi/models/CvsJson856";
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
  if (fieldValue === "USER_INPUT") {
    return moment(moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"));
  }
  if (fieldValue?.toLowerCase() === "invalid date") {
    return moment(moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"));
  }
  if (fieldValue) {
    return moment(fieldValue);
  }
  return fieldValue;
}

function createTime(fieldValue?: string) {
  const cleanInput = removeUserInput(fieldValue);
  if (cleanInput?.toLocaleLowerCase() === "invalid date") {
    return moment();
  }
  if (cleanInput === "") {
    return moment();
  }

  const date = moment(cleanInput, "HHmm");

  return date.isValid() ? date : "";
}

function createItemSourceJson(targetItemJson: HierarchicalLevelHLILoop[]) {
  return targetItemJson?.map((targetItem) => {
    const HL = targetItem?.hierarchical_level_HL;
    const LIN = targetItem?.item_identification_LIN;
    const SN1 = targetItem?.item_detail_shipment_SN1;
    const PO4 = targetItem?.item_physical_details_PO4;
    const PID = targetItem?.product_item_description_PID?.[0];
    const DTM = targetItem?.date_time_reference_DTM?.[0];

    return {
      HL_01_628: HL?.hierarchical_id_number_01,
      HL_02_734: HL?.hierarchical_parent_id_number_02,
      HL_03_735: HL?.hierarchical_level_code_03,

      LIN_01_350: LIN?.assigned_identification_01,
      LIN_02_235: getSafeCodeName(LIN?.product_service_id_qualifier_02),
      LIN_03_234: LIN?.product_service_id_03,
      LIN_04_235: getSafeCodeName(LIN?.product_service_id_qualifier_04),
      LIN_05_234: LIN?.product_service_id_05,
      LIN_06_235: getSafeCodeName(LIN?.product_service_id_qualifier_06),
      LIN_07_234: LIN?.product_service_id_07,
      LIN_08_235: getSafeCodeName(LIN?.product_service_id_qualifier_08),
      LIN_09_234: removeUserInput(LIN?.product_service_id_09),
      LIN_10_235: getSafeCodeName(LIN?.product_service_id_qualifier_10),
      LIN_11_234: LIN?.product_service_id_11,
      LIN_12_235: getSafeCodeName(LIN?.product_service_id_qualifier_12),
      LIN_13_234: removeUserInput(LIN?.product_service_id_13),
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
      PO4_05_187: getSafeCodeName(PO4?.weight_qualifier_05),
      PO4_06_384: removeUserInput(PO4?.gross_weight_per_pack_06),
      PO4_07_355: getSafeCodeName(PO4?.unit_or_basis_for_measurement_code_07),
      PO4_08_385: PO4?.gross_volume_per_pack_08,
      PO4_09_355: PO4?.unit_or_basis_for_measurement_code_09,
      PO4_10_82: PO4?.length_10,
      PO4_11_189: PO4?.width_11,
      PO4_12_65: PO4?.height_12,
      PO4_13_355: PO4?.unit_or_basis_for_measurement_code_13,
      PO4_14_810: PO4?.inner_pack_14,
      PO4_16_350: PO4?.assigned_identification_16,
      PO4_18_1470: PO4?.number_18,

      PID_01_324: getSafeCodeName(PID?.item_description_type_01),
      PID_02_750: PID?.product_process_characteristic_code_02,
      PID_03_559: PID?.agency_qualifier_code_03,
      PID_04_751: PID?.product_description_code_04,
      PID_05_352: removeUserInput(PID?.description_05),

      DTM_01_374: getSafeCodeName(DTM?.date_time_qualifier_01) ?? "036",
      DTM_02_373: createDate(removeUserInput(DTM?.date_02)),
      DTM_03_337: createTime(DTM?.time_03),
      DTM_04_623: DTM?.time_code_04,
      DTM_05_1250: DTM?.time_code_05,
      DTM_06_1251: DTM?.date_time_period_06,
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

      HL_I_Loop: items,
    };
  });
}

function createSourceJson(targetJson: CvsJSON) {
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

  const ShipmentTD1 = Shipment?.carrier_details_quantity_and_weight_TD1?.[0];
  const ShipmentTD3 = Shipment?.carrier_details_equipment_TD3?.[0];
  const ShipmentTD5 =
    Shipment?.carrier_details_routing_sequence_transit_time_TD5?.[0];

  const Shipment_DTM = Shipment?.date_time_reference_DTM_011;
  const Shipment_Delivery_DTM = Shipment?.date_time_reference_DTM_067;

  const Shipment_REF_BM = Shipment?.reference_identification_REF_BM;
  const Shipment_REF_CN = Shipment?.reference_identification_REF_CN;
  const Shipment_FOB = Shipment?.fob_related_instructions_FOB;

  const ShipmentN1_SF = Shipment?.name_N1_SF?.name_N1;
  const ShipmentN3_SF = Shipment?.name_N1_SF?.address_information_N3?.[0];
  const ShipmentN4_SF = Shipment?.name_N1_SF?.geographic_location_N4;

  const ShipmentN1_ST = Shipment?.name_N1_ST?.name_N1;
  const ShipmentN3_ST = Shipment?.name_N1_ST?.address_information_N3?.[0];
  const ShipmentN4_ST = Shipment?.name_N1_ST?.geographic_location_N4;

  const Order = detail?.hierarchical_level_HL_order;
  const OrderHL = Order?.hierarchical_level_HL;
  const OrderPRF = Order?.purchase_order_reference_PRF;
  const OrderN1 = Order?.name_N1_loop?.[0]?.name_N1;
  const OrderREF = Order?.reference_identification_REF?.[0];

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
    HL_S_03_735: getSafeCodeName(ShipmentHL?.hierarchical_level_code_03),

    DTM_S_DATE_SHIPPED_01_374: Shipment_DTM?.date_time_qualifier_01 ?? "011",
    DTM_S_DATE_SHIPPED_02_373: createDate(
      removeUserInput(Shipment_DTM?.date_02)
    ),
    DTM_S_DATE_SHIPPED_03_337: createTime(
      removeUserInput(Shipment_DTM?.time_03)
    ),

    DTM_S_DELIVERY_01_374:
      Shipment_Delivery_DTM?.date_time_qualifier_01 ?? "067",
    DTM_S_DELIVERY_02_373: createDate(
      removeUserInput(Shipment_Delivery_DTM?.date_02)
    ),
    DTM_S_DELIVERY_03_337: createTime(
      removeUserInput(Shipment_Delivery_DTM?.time_03)
    ),

    HL_S_TD1_01_103: ShipmentTD1?.packaging_code_01,
    HL_S_TD1_02_80: ShipmentTD1?.lading_quantity_02,
    HL_S_TD1_06_187: getSafeCodeName(ShipmentTD1?.weight_qualifier_06),
    HL_S_TD1_07_81: removeUserInput(ShipmentTD1?.weight_07),
    HL_S_TD1_08_355: getSafeCodeName(
      ShipmentTD1?.unit_or_basis_for_measurement_code_08
    ),
    HL_S_TD1_09_183: removeUserInput(ShipmentTD1?.volume_09),
    HL_S_TD1_10_355: getSafeCodeName(
      ShipmentTD1?.unit_or_basis_for_measurement_code_10
    ),

    HL_S_TD3_01_40: ShipmentTD3?.equipment_description_code_01,
    HL_S_TD3_03_207: ShipmentTD3?.equipment_number_03,

    TD5_S_01_133: getSafeCodeName(ShipmentTD5?.routing_sequence_code_01),
    TD5_S_02_66: getSafeCodeName(ShipmentTD5?.identification_code_qualifier_02),
    TD5_S_03_67: removeUserInput(ShipmentTD5?.identification_code_03),
    TD5_S_04_91: getSafeCodeName(
      removeUserInput(ShipmentTD5?.transportation_method_type_code_04)
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

    FOB_S_01_146: getSafeCodeName(Shipment_FOB?.shipment_method_of_payment_01),
    FOB_S_02_309: Shipment_FOB?.location_qualifier_02,
    FOB_S_03_352: Shipment_FOB?.description_03,
    FOB_S_04_334: Shipment_FOB?.transportation_terms_qualifier_code_04,
    FOB_S_05_335: Shipment_FOB?.transportation_terms_code_05,
    FOB_S_06_309: Shipment_FOB?.location_qualifier_06,
    FOB_S_07_352: Shipment_FOB?.description_07,
    FOB_S_08_54: Shipment_FOB?.risk_of_loss_code_08,
    FOB_S_09_352: Shipment_FOB?.description_09,

    N1_S_SF_01_98: getSafeCodeName(ShipmentN1_SF?.entity_identifier_code_01),
    N1_S_SF_02_93: ShipmentN1_SF?.name_02,
    N1_S_SF_03_66: getSafeCodeName(
      ShipmentN1_SF?.identification_code_qualifier_03
    ),
    N1_S_SF_04_67: ShipmentN1_SF?.identification_code_04,
    N1_S_SF_05_706: getSafeCodeName(ShipmentN1_SF?.entity_relationship_code_05),
    N1_S_SF_06_98: ShipmentN1_SF?.entity_identifier_code_06,

    N3_S_SF_01_166: ShipmentN3_SF?.address_information_01,
    N3_S_SF_02_166: ShipmentN3_SF?.address_information_02,

    N4_S_SF_01_19: ShipmentN4_SF?.city_name_01,
    N4_S_SF_02_156: ShipmentN4_SF?.state_or_province_code_02,
    N4_S_SF_03_116: ShipmentN4_SF?.postal_code_03,
    N4_S_SF_04_26: ShipmentN4_SF?.country_code_04,
    N4_S_SF_05_309: ShipmentN4_SF?.location_qualifier_05,

    N1_S_ST_01_98: getSafeCodeName(ShipmentN1_ST?.entity_identifier_code_01),
    N1_S_ST_02_93: ShipmentN1_ST?.name_02,
    N1_S_ST_03_66: getSafeCodeName(
      ShipmentN1_ST?.identification_code_qualifier_03
    ),
    N1_S_ST_04_67: ShipmentN1_ST?.identification_code_04,
    N1_S_ST_05_706: getSafeCodeName(ShipmentN1_ST?.entity_relationship_code_05),
    N1_S_ST_06_98: ShipmentN1_ST?.entity_identifier_code_06,

    N3_S_ST_01_166: ShipmentN3_ST?.address_information_01,
    N3_S_ST_02_166: ShipmentN3_ST?.address_information_02,

    N4_S_ST_01_19: ShipmentN4_ST?.city_name_01,
    N4_S_ST_02_156: ShipmentN4_ST?.state_or_province_code_02,
    N4_S_ST_03_116: ShipmentN4_ST?.postal_code_03,
    N4_S_ST_04_26: ShipmentN4_ST?.country_code_04,
    N4_S_ST_05_309: ShipmentN4_ST?.location_qualifier_05,

    // Order
    HL_O_01_628: OrderHL?.hierarchical_id_number_01,
    HL_O_02_734: OrderHL?.hierarchical_parent_id_number_02,
    HL_O_03_735: getSafeCodeName(OrderHL?.hierarchical_level_code_03),

    HL_O_PRF_01_324: OrderPRF?.purchase_order_number_01,
    HL_O_PRF_02_328: OrderPRF?.release_number_02,
    HL_O_PRF_04_373: createDate(OrderPRF?.date_04), // OrderPRF?.date_04, // createDate(OrderPRF?.date_04),

    HL_O_N1_01_98: getSafeCodeName(OrderN1?.entity_identifier_code_01),
    HL_O_N1_02_93: OrderN1?.name_02,
    HL_O_N1_03_66: getSafeCodeName(OrderN1?.identification_code_qualifier_03),
    HL_O_N1_04_67: OrderN1?.identification_code_04,
    HL_O_N1_05_706: OrderN1?.entity_relationship_code_05,
    HL_O_N1_06_98: OrderN1?.entity_identifier_code_06,

    REF_O_01_128: getSafeCodeName(
      OrderREF?.reference_identification_qualifier_01
    ),
    REF_O_02_127: OrderREF?.reference_identification_02,

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
    (item) => item.HL_I_Loop?.[0].LIN_07_234
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
    const packItemWithUpdates = currentPack?.HL_I_Loop?.[0];
    const sku = packItemWithUpdates?.LIN_07_234 ?? "";
    const allPacksForSku = get(packGroups, sku, null);

    const packForSku = take(allPacksForSku, packCount);

    each(packForSku, (pack: HLPLoop) => {
      pack.HL_I_Loop = pack.HL_I_Loop?.map((packItem) => {
        return {
          ...packItem,
          ...packItemWithUpdates,
        };
      });
    });

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
