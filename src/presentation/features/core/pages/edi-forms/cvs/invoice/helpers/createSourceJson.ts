import {
  BaselineItemDataInvoiceIT1Loop,
  BaselineItemDataInvoiceIT1LoopServicePromotionAllowanceOrChargeInformationSACLoop,
  ExtendedReferenceInformationN9Loop,
  HeadingPartyIdentificationN1Loop,
  HeadingReferenceInformationREF,
  InvoiceShipmentSummaryISSLoop,
  ProductItemDescriptionPIDLoop,
  SublineItemDetailSLNLoop,
  SummaryServicePromotionAllowanceOrChargeInformationSACLoop,
  CvsJSON,
  TransactionSet,
} from "domain/entity/edi/models/CvsJson810";
import { compact, get } from "lodash";
import moment from "moment";

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

function createN1SourceJson(n1Loop?: HeadingPartyIdentificationN1Loop[]) {
  return n1Loop?.map((item) => {
    const N1 = item?.name_N1;
    const N3 = item?.address_information_N3?.[0];
    const N4 = item?.geographic_location_N4;
    return {
      N1_98_01: getSafeCodeName(N1?.entity_identifier_code_01),
      N1_93_02: N1?.name_02,
      N1_66_03: getSafeCodeName(N1?.identification_code_qualifier_03),
      N1_67_04: N1?.identification_code_04,

      N3_166_01: N3?.address_information_01,
      N3_166_02: N3?.address_information_02,

      N4_19_01: N4?.city_name_01,
      N4_156_02: N4?.state_or_province_code_02,
      N4_116_03: N4?.postal_code_03,
      N4_26_04: N4?.country_code_04,
      N4_309_05: getSafeCodeName(N4?.location_qualifier_05),
      N4_310_06: N4?.location_identifier_06,
    };
  });
}

function createN9SourceJson(n9Loop?: ExtendedReferenceInformationN9Loop[]) {
  return n9Loop?.map((item) => {
    const N9 = item?.extended_reference_information_N9;
    const MSG = item?.message_text_MSG?.[0];

    return {
      N9_128_01: getSafeCodeName(N9?.reference_identification_qualifier_01),
      N9_127_02: N9?.reference_identification_02,
      N9_369_03: N9?.free_form_description_03,
      N9_337_05: createDate(N9?.time_05),
      N9_623_06: getSafeCodeName(N9?.time_code_06),

      MSG_933_01: MSG?.free_form_message_text_01,
      MSG_934_02: getSafeCodeName(MSG?.printer_carriage_control_code_02),
      MSG_1470_03: MSG?.number_03,
    };
  });
}

function createPIDSourceJson(pidLoop?: ProductItemDescriptionPIDLoop[]) {
  return pidLoop?.map((item) => {
    const PID = item?.product_item_description_PID;
    return {
      PID_349_01: getSafeCodeName(PID?.item_description_type_code_01),
      PID_750_02: getSafeCodeName(PID?.product_process_characteristic_code_02),
      PID_559_03: getSafeCodeName(PID?.agency_qualifier_code_03),
      PID_751_04: PID?.product_description_code_04,
      PID_352_05: PID?.description_05,
      PID_752_06: getSafeCodeName(PID?.surface_layer_position_code_06),
      PID_822_07: PID?.source_subqualifier_07,
      PID_1073_08: getSafeCodeName(PID?.yes_no_condition_or_response_code_08),
      PID_819_09: PID?.language_code_09,
    };
  });
}

function createSACSourceJson(
  sacLoop?: BaselineItemDataInvoiceIT1LoopServicePromotionAllowanceOrChargeInformationSACLoop[]
) {
  return sacLoop?.map((item) => {
    const SAC = item?.service_promotion_allowance_or_charge_information_SAC;
    return {
      SAC_248_01: getSafeCodeName(SAC?.allowance_or_charge_indicator_code_01),
      SAC_1300_02: getSafeCodeName(
        SAC?.service_promotion_allowance_or_charge_code_02
      ),
      SAC_559_03: getSafeCodeName(SAC?.agency_qualifier_code_03),
      SAC_1301_04: SAC?.agency_service_promotion_allowance_or_charge_code_04,
      SAC_610_05: SAC?.amount_05,
      SAC_378_06: getSafeCodeName(SAC?.allowance_charge_percent_qualifier_06),
      SAC_332_07: SAC?.percent_07,
      SAC_118_08: SAC?.rate_08,
      SAC_355_09: getSafeCodeName(SAC?.unit_or_basis_for_measurement_code_09),
      SAC_380_10: SAC?.quantity_10,
      SAC_380_11: SAC?.quantity_11,
      SAC_331_12: getSafeCodeName(
        SAC?.allowance_or_charge_method_of_handling_code_12
      ),
      SAC_127_13: SAC?.reference_identification_13,
      SAC_770_14: SAC?.option_number_14,
      SAC_352_15: SAC?.description_15,
      SAC_819_16: SAC?.language_code_16,
    };
  });
}

function createSLNSourceJson(slnLoop?: SublineItemDetailSLNLoop[]) {
  return slnLoop?.map((item) => {
    const SLN = item?.subline_item_detail_SLN;
    const DTM = item?.date_time_reference_DTM;

    return {
      SLN_350_01: SLN?.assigned_identification_01,
      SLN_350_02: SLN?.assigned_identification_02,
      SLN_662_03: getSafeCodeName(SLN?.relationship_code_03),
      SLN_380_04: SLN?.quantity_04,
      SLN_C001_05: getSafeCodeName(SLN?.composite_unit_of_measurement_05),
      SLN_212_06: SLN?.unit_price_06,
      SLN_639_07: SLN?.basis_of_unit_price_code_07,
      SLN_662_08: SLN?.relationship_code_08,
      SLN_235_09: getSafeCodeName(SLN?.product_service_id_qualifier_09),
      SLN_234_10: SLN?.product_service_id_10,
      SLN_235_11: getSafeCodeName(SLN?.product_service_id_qualifier_11),
      SLN_234_12: SLN?.product_service_id_12,
      SLN_235_13: getSafeCodeName(SLN?.product_service_id_qualifier_13),
      SLN_234_14: SLN?.product_service_id_14,
      SLN_235_15: getSafeCodeName(SLN?.product_service_id_qualifier_15),
      SLN_234_16: SLN?.product_service_id_16,
      SLN_235_17: getSafeCodeName(SLN?.product_service_id_qualifier_17),
      SLN_234_18: SLN?.product_service_id_18,
      SLN_235_19: getSafeCodeName(SLN?.product_service_id_qualifier_19),
      SLN_234_20: SLN?.product_service_id_20,
      SLN_235_21: getSafeCodeName(SLN?.product_service_id_qualifier_21),
      SLN_234_22: SLN?.product_service_id_22,
      SLN_235_23: getSafeCodeName(SLN?.product_service_id_qualifier_23),
      SLN_234_24: SLN?.product_service_id_24,
      SLN_235_25: getSafeCodeName(SLN?.product_service_id_qualifier_25),
      SLN_234_26: SLN?.product_service_id_26,
      SLN_235_27: getSafeCodeName(SLN?.product_service_id_qualifier_27),
      SLN_234_28: SLN?.product_service_id_28,

      DTM_374_01: getSafeCodeName(DTM?.date_time_qualifier_01),
      DTM_373_02: createDate(DTM?.date_02),
      DTM_337_03: createDate(DTM?.time_03),
      DTM_623_04: DTM?.time_code_04,
      DTM_1250_05: getSafeCodeName(DTM?.date_time_period_format_qualifier_05),
      DTM_1251_06: DTM?.date_time_period_06,
    };
  });
}

function createPO4SourceJson(PO4: { [key: string]: string } = {}) {
  const containsData = compact(Object.values(PO4)).length > 0;

  if (!containsData) {
    return null;
  }

  return [
    {
      PO4_356_01: PO4?.pack_01,
      PO4_357_02: PO4?.size_02,
      PO4_355_03: PO4?.unit_or_basis_for_measurement_code_03,
      PO4_103_04: PO4?.packaging_code_04,
      PO4_384_06: PO4?.gross_weight_per_pack_06,
      PO4_355_07: PO4?.unit_or_basis_for_measurement_code_07,
      PO4_385_08: PO4?.gross_volume_per_pack_08,
      PO4_355_09: PO4?.unit_or_basis_for_measurement_code_09,
      PO4_82_10: PO4?.length_10,
      PO4_189_11: PO4?.width_11,
      PO4_65_12: PO4?.height_12,
      PO4_355_13: PO4?.unit_or_basis_for_measurement_code_13,
      PO4_810_14: PO4?.inner_pack_14,
      PO4_752_15: PO4?.surface_layer_position_code_15,
      PO4_350_16: PO4?.assigned_identification_16,
      PO4_350_17: PO4?.assigned_identification_17,
      PO4_1470_18: PO4?.number_18,
    },
  ];
}

function createIT1SourceJson(it1Loop?: BaselineItemDataInvoiceIT1Loop[]) {
  return it1Loop?.map((item) => {
    const IT1 = item?.baseline_item_data_invoice_IT1;

    const IT3 = item?.additional_item_data_IT3?.[0];
    const PO4 = item?.item_physical_details_PO4;

    const PID_data = item?.product_item_description_PID_loop;
    const PID_loop = createPIDSourceJson(PID_data);

    const SAC_data =
      item?.service_promotion_allowance_or_charge_information_SAC_loop;
    const SAC_loop = createSACSourceJson(SAC_data);

    const SLN_data = item?.subline_item_detail_SLN_loop;
    const SLN_loop = createSLNSourceJson(SLN_data);

    const PO4_loop = createPO4SourceJson(PO4);

    return {
      IT1_350_01: IT1?.assigned_identification_01,
      IT1_358_02: IT1?.quantity_invoiced_02,
      IT1_355_03: getSafeCodeName(IT1?.unit_or_basis_for_measurement_code_03),
      IT1_212_04: IT1?.unit_price_04,
      IT1_639_05: IT1?.basis_of_unit_price_code_05,
      IT1_235_06: getSafeCodeName(IT1?.product_service_id_qualifier_06),
      IT1_234_07: IT1?.product_service_id_07,
      IT1_235_08: getSafeCodeName(IT1?.product_service_id_qualifier_08),
      IT1_234_09: IT1?.product_service_id_09,
      IT1_235_10: getSafeCodeName(IT1?.product_service_id_qualifier_10),
      IT1_234_11: IT1?.product_service_id_11,
      IT1_235_12: getSafeCodeName(IT1?.product_service_id_qualifier_12),
      IT1_234_13: IT1?.product_service_id_13,
      IT1_235_14: getSafeCodeName(IT1?.product_service_id_qualifier_14),
      IT1_234_15: IT1?.product_service_id_15,
      IT1_235_16: getSafeCodeName(IT1?.product_service_id_qualifier_16),
      IT1_234_17: IT1?.product_service_id_17,
      IT1_235_18: getSafeCodeName(IT1?.product_service_id_qualifier_18),
      IT1_234_19: IT1?.product_service_id_19,
      IT1_235_20: getSafeCodeName(IT1?.product_service_id_qualifier_20),
      IT1_234_21: IT1?.product_service_id_21,
      IT1_235_22: getSafeCodeName(IT1?.product_service_id_qualifier_22),
      IT1_234_23: IT1?.product_service_id_23,
      IT1_235_24: getSafeCodeName(IT1?.product_service_id_qualifier_24),
      IT1_234_25: IT1?.product_service_id_25,

      IT3_382_01: IT3?.number_of_units_shipped_01,
      IT3_355_02: getSafeCodeName(IT3?.unit_or_basis_for_measurement_code_02),
      IT3_368_03: getSafeCodeName(IT3?.shipment_order_status_code_03),
      IT3_383_04: IT3?.quantity_difference_04,
      IT3_371_05: IT3?.change_reason_code_05,

      PO4_loop: PO4_loop,
      PID_loop: PID_loop,
      SAC_loop: SAC_loop,
      SLN_loop: SLN_loop,
    };
  });
}

function createSummarySACSourceJson(
  sacLoop?: SummaryServicePromotionAllowanceOrChargeInformationSACLoop[]
) {
  return sacLoop?.map((item) => {
    const SAC = item.service_promotion_allowance_or_charge_information_SAC;

    return {
      SAC_248_01: getSafeCodeName(SAC?.allowance_or_charge_indicator_code_01),
      SAC_1300_02: getSafeCodeName(
        SAC?.service_promotion_allowance_or_charge_code_02
      ),
      SAC_559_03: getSafeCodeName(SAC?.agency_qualifier_code_03),
      SAC_1301_04: SAC?.agency_service_promotion_allowance_or_charge_code_04,
      SAC_610_05: SAC?.amount_05,
      SAC_378_06: getSafeCodeName(SAC?.allowance_charge_percent_qualifier_06),
      SAC_332_07: SAC?.percent_07,
      SAC_118_08: SAC?.rate_08,
      SAC_355_09: getSafeCodeName(SAC?.unit_or_basis_for_measurement_code_09),
      SAC_380_10: SAC?.quantity_10,
      SAC_380_11: SAC?.quantity_11,
      SAC_331_12: getSafeCodeName(
        SAC?.allowance_or_charge_method_of_handling_code_12
      ),
      SAC_127_13: SAC?.reference_identification_13,
      SAC_770_14: SAC?.option_number_14,
      SAC_352_15: SAC?.description_15,
    };
  });
}

function createSummaryISSSourceJson(issLoop?: InvoiceShipmentSummaryISSLoop[]) {
  return issLoop?.map((item) => {
    const ISS = item.invoice_shipment_summary_ISS;

    return {
      ISS_382_01: ISS?.number_of_units_shipped_01,
      ISS_355_02: getSafeCodeName(ISS?.unit_or_basis_for_measurement_code_02),
      ISS_81_03: ISS?.weight_03,
      ISS_355_04: getSafeCodeName(ISS?.unit_or_basis_for_measurement_code_04),
      ISS_183_05: ISS?.volume_05,
      ISS_355_06: getSafeCodeName(ISS?.unit_or_basis_for_measurement_code_06),
    };
  });
}

function createHeadingREFSourceJson(
  refLoop?: HeadingReferenceInformationREF[]
) {
  return refLoop?.map((REF) => {
    return {
      REF_128_01: getSafeCodeName(REF?.reference_identification_qualifier_01),
      REF_127_02: REF?.reference_identification_02,
      REF_352_03: REF?.description_03,
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

  const BIG = heading?.beginning_segment_for_invoice_BIG;
  const REF_loop = heading?.reference_identification_REF;
  const ITD = heading?.terms_of_sale_deferred_terms_of_sale_ITD?.[0];
  const DTM = heading?.date_time_reference_DTM?.[0];
  const FOB = heading?.fob_related_instructions_FOB;

  const heading_REF = createHeadingREFSourceJson(REF_loop);

  const N1_loop = heading?.name_N1_loop;
  const heading_N1 = createN1SourceJson(N1_loop);

  const N9_loop = heading?.extended_reference_information_N9_loop;
  const heading_N9 = createN9SourceJson(N9_loop);

  const IT1_loop_data = detail?.baseline_item_data_invoice_IT1_loop;
  const IT1_loop = createIT1SourceJson(IT1_loop_data);

  const TDS = summary?.total_monetary_value_summary_TDS;
  const CAD = summary?.carrier_detail_CAD;

  const SAC_loop =
    summary?.service_promotion_allowance_or_charge_information_SAC_loop;
  const summary_SAC = createSummarySACSourceJson(SAC_loop);

  const ISS_loop = summary?.invoice_shipment_summary_ISS_loop;
  const summary_ISS = createSummaryISSSourceJson(ISS_loop);

  const ST = heading?.transaction_set_header_ST;
  const NTE = heading?.note_special_instruction_NTE?.[0];
  const CTT = summary?.transaction_totals_CTT;
  const SE = summary?.transaction_set_trailer_SE;

  return {
    BIG_373_01: createDate(BIG?.date_01),
    BIG_76_02: removeUserInput(BIG?.invoice_number_02),
    BIG_373_03: createDate(BIG?.date_03),
    BIG_324_04: BIG?.purchase_order_number_04,
    BIG_640_07: getSafeCodeName(BIG?.transaction_type_code_07),

    heading_REF: heading_REF,

    heading_N1: heading_N1,

    ITD_336_01: getSafeCodeName(ITD?.terms_type_code_01),
    ITD_333_02: getSafeCodeName(ITD?.terms_basis_date_code_02),
    ITD_338_03: ITD?.terms_discount_percent_03,
    ITD_351_05: ITD?.terms_discount_days_due_05,
    ITD_386_07: ITD?.terms_net_days_07,
    ITD_362_08: ITD?.terms_discount_amount_08,
    ITD_389_10: ITD?.deferred_amount_due_10,
    ITD_342_11: ITD?.percent_of_invoice_payable_11,
    ITD_765_13: ITD?.day_of_month_13,
    DTM_374_01: getSafeCodeName(DTM?.date_time_qualifier_01),
    DTM_373_02: createDate(removeUserInput(DTM?.date_02)),
    DTM_337_03: createDate(DTM?.time_03),
    DTM_1250_05: getSafeCodeName(DTM?.date_time_period_format_qualifier_05),
    DTM_1251_06: DTM?.date_time_period_06,

    FOB_146_01: FOB?.shipment_method_of_payment_code_01,
    FOB_309_02: FOB?.location_qualifier_02,
    FOB_352_03: FOB?.description_03,

    heading_N9: heading_N9,
    IT1_loop: IT1_loop,
    TDS_610_01: TDS?.amount_01,
    TDS_610_02: TDS?.amount_02,
    TDS_610_03: TDS?.amount_03,
    TDS_610_04: TDS?.amount_04,

    CAD_91_01: getSafeCodeName(CAD?.transportation_method_type_code_01),
    CAD_206_02: CAD?.equipment_initial_02,
    CAD_207_03: CAD?.equipment_number_03,
    CAD_140_04: removeUserInput(CAD?.standard_carrier_alpha_code_04),
    CAD_387_05: CAD?.routing_05,
    CAD_368_06: CAD?.shipment_order_status_code_06,
    CAD_128_07: getSafeCodeName(CAD?.reference_identification_qualifier_07),
    CAD_127_08: removeUserInput(CAD?.reference_identification_08),

    summary_SAC: summary_SAC,
    summary_ISS: summary_ISS,
    ST_143_01: getSafeCodeName(ST?.transaction_set_identifier_code_01),
    ST_329_02: ST?.transaction_set_control_number_02,
    NTE_363_01: getSafeCodeName(NTE?.note_reference_code_01),
    NTE_352_02: NTE?.description_02,

    CTT_354_01: CTT?.number_of_line_items_01,
    CTT_347_02: CTT?.hash_total_02,
    CTT_81_03: CTT?.weight_03,
    CTT_355_04: CTT?.unit_or_basis_for_measurement_code_04,
    CTT_183_05: CTT?.volume_05,
    CTT_355_06: CTT?.unit_or_basis_for_measurement_code_06,
    CTT_352_07: CTT?.description_07,

    SE_96_01: SE?.number_of_included_segments_01,
    SE_329_02: SE?.transaction_set_control_number_02,
  };
}

export { createSourceJson };
