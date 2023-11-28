import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const item = `{
  "hierarchical_level_HL": {
    "hierarchical_id_number_01": "<%= data?.HL_01_628 %>",
    "hierarchical_parent_id_number_02": "<%= data?.HL_02_734 %>",
    "hierarchical_level_code_03": "<%= data?.HL_03_735 %>"
  },
  "item_identification_LIN": {
    "assigned_identification_01": "<%= data?.LIN_01_350 %>",
    "product_service_id_qualifier_02": "<%= data?.LIN_02_235 %>",
    "product_service_id_03": "<%= data?.LIN_03_234 %>",
    "product_service_id_qualifier_04": "<%= data?.LIN_04_235 %>",
    "product_service_id_05": "<%= data?.LIN_05_234 %>",
    "product_service_id_qualifier_06": "<%= data?.LIN_06_235 %>",
    "product_service_id_07": "<%= data?.LIN_07_234 %>",
    "product_service_id_qualifier_08": "<%= data?.LIN_08_235 %>",
    "product_service_id_09": "<%= data?.LIN_09_234 %>",
    "product_service_id_qualifier_10": "<%= data?.LIN_10_235 %>",
    "product_service_id_11": "<%= data?.LIN_11_234 %>",
    "product_service_id_qualifier_12": "<%= data?.LIN_12_235 %>",
    "product_service_id_13": "<%= data?.LIN_13_234 %>",
    "product_service_id_qualifier_14": "<%= data?.LIN_14_235 %>",
    "product_service_id_15": "<%= data?.LIN_15_234 %>",
    "product_service_id_qualifier_16": "<%= data?.LIN_16_235 %>",
    "product_service_id_17": "<%= data?.LIN_17_234 %>",
    "product_service_id_qualifier_18": "<%= data?.LIN_18_235 %>",
    "product_service_id_19": "<%= data?.LIN_19_234 %>",
    "product_service_id_qualifier_20": "<%= data?.LIN_20_235 %>",
    "product_service_id_21": "<%= data?.LIN_21_234 %>",
    "product_service_id_qualifier_22": "<%= data?.LIN_22_235 %>",
    "product_service_id_23": "<%= data?.LIN_23_234 %>",
    "product_service_id_qualifier_24": "<%= data?.LIN_24_235 %>",
    "product_service_id_25": "<%= data?.LIN_25_234 %>",
    "product_service_id_qualifier_26": "<%= data?.LIN_26_235 %>",
    "product_service_id_27": "<%= data?.LIN_27_234 %>",
    "product_service_id_qualifier_28": "<%= data?.LIN_28_235 %>",
    "product_service_id_29": "<%= data?.LIN_29_234 %>",
    "product_service_id_qualifier_30": "<%= data?.LIN_30_235 %>",
    "product_service_id_31": "<%= data?.LIN_31_234 %>"
  },
  "item_detail_shipment_SN1": {
    "assigned_identification_01": "<%= data?.SN1_01_350 %>",
    "number_of_units_shipped_02": "<%= data?.SN1_02_382 %>",
    "unit_or_basis_for_measurement_code_03": "<%= data?.SN1_03_355 %>",
    "quantity_ordered_05": "<%= data?.SN1_05_330 %>",
    "unit_or_basis_for_measurement_code_06": "<%= data?.SN1_06_355 %>"
  },
  "item_physical_details_PO4": {
    "pack_01": "<%= data?.PO4_01_356 %>",
    "size_02": "<%= data?.PO4_02_357 %>",
    "unit_or_basis_for_measurement_code_03": "<%= data?.PO4_03_355 %>",
    "packaging_code_04": "<%= data?.PO4_04_103 %>",
    "weight_qualifier_05": "<%= data?.PO4_05_187 %>",
    "gross_weight_per_pack_06": "<%= data?.PO4_06_384 %>",
    "unit_or_basis_for_measurement_code_07": "<%= data?.PO4_07_355 %>",
    "gross_volume_per_pack_08": "<%= data?.PO4_08_385 %>",
    "unit_or_basis_for_measurement_code_09": "<%= data?.PO4_09_355 %>",
    "length_10": "<%= data?.PO4_10_82 %>",
    "width_11": "<%= data?.PO4_11_189 %>",
    "height_12": "<%= data?.PO4_12_65 %>",
    "unit_or_basis_for_measurement_code_13": "<%= data?.PO4_13_355 %>",
    "inner_pack_14": "<%= data?.PO4_14_810 %>",
    "assigned_identification_16": "<%= data?.PO4_16_350 %>",
    "number_18": "<%= data?.PO4_18_1470 %>"
  },
  "product_item_description_PID": [
    {
      "item_description_type_01": "<%= data?.PID_01_324 %>",
      "product_process_characteristic_code_02": "<%= data?.PID_02_750 %>",
      "agency_qualifier_code_03": "<%= data?.PID_03_559 %>",
      "product_description_code_04": "<%= data?.PID_04_751 %>",
      "description_05": "<%= data?.PID_05_352 %>"
    }
  ],
  "date_time_reference_DTM": [
    {
      "date_time_qualifier_01": "<%= data?.DTM_01_374 %>",
      "date_02": "<%= data?.DTM_02_373?.format?.("YYYYMMDD") %>",
      "time_03": "<%= data?.DTM_03_337?.format?.("HHmm") %>",
      "time_code_04": "<%= data?.DTM_04_623 %>",
      "time_code_05": "<%= data?.DTM_05_1250 %>",
      "date_time_period_06": "<%= data?.DTM_06_1251 %>"
    }
  ]
}`;

const itemTemplateExecutor = _.template(item);
const itemTemplate = sanitizeTemplateOutput(itemTemplateExecutor);

export { itemTemplate };
