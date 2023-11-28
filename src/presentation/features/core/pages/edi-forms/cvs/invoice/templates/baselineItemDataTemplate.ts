import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const baselineItemData = `{
  "baseline_item_data_invoice_IT1": {
    "assigned_identification_01": "<%= data?.IT1_350_01 %>",
    "quantity_invoiced_02": "<%= data?.IT1_358_02 %>",
    "unit_or_basis_for_measurement_code_03": "<%= data?.IT1_355_03 %>",
    "unit_price_04": "<%= data?.IT1_212_04 %>",
    "basis_of_unit_price_code_05": "<%= data?.IT1_639_05 %>",
    "product_service_id_qualifier_06": "<%= data?.IT1_235_06 %>",
    "product_service_id_07": "<%= data?.IT1_234_07 %>",
    "product_service_id_qualifier_08": "<%= data?.IT1_235_08 %>",
    "product_service_id_09": "<%= data?.IT1_234_09 %>",
    "product_service_id_qualifier_10": "<%= data?.IT1_235_10 %>",
    "product_service_id_11": "<%= data?.IT1_234_11 %>",
    "product_service_id_qualifier_12": "<%= data?.IT1_235_12 %>",
    "product_service_id_13": "<%= data?.IT1_234_13 %>",
    "product_service_id_qualifier_14": "<%= data?.IT1_235_14 %>",
    "product_service_id_15": "<%= data?.IT1_234_15 %>",
    "product_service_id_qualifier_16": "<%= data?.IT1_235_16 %>",
    "product_service_id_17": "<%= data?.IT1_234_17 %>",
    "product_service_id_qualifier_18": "<%= data?.IT1_235_18 %>",
    "product_service_id_19": "<%= data?.IT1_234_19 %>",
    "product_service_id_qualifier_20": "<%= data?.IT1_235_20 %>",
    "product_service_id_21": "<%= data?.IT1_234_21 %>",
    "product_service_id_qualifier_22": "<%= data?.IT1_235_22 %>",
    "product_service_id_23": "<%= data?.IT1_234_23 %>",
    "product_service_id_qualifier_24": "<%= data?.IT1_235_24 %>",
    "product_service_id_25": "<%= data?.IT1_234_25 %>"
  },
  "additional_item_data_IT3": [
    {
      "number_of_units_shipped_01": "<%= data?.IT3_382_01 %>",
      "unit_or_basis_for_measurement_code_02": "<%= data?.IT3_355_02 %>",
      "shipment_order_status_code_03": "<%= data?.IT3_368_03 %>",
      "quantity_difference_04": "<%= data?.IT3_383_04 %>",
      "change_reason_code_05": "<%= data?.IT3_371_05 %>"
    }
  ],
  "item_physical_details_PO4": {
    "pack_01": "<%= data?.PO4_loop?.[0]?.PO4_356_01 %>",
    "size_02": "<%= data?.PO4_loop?.[0]?.PO4_357_02 %>",
    "unit_or_basis_for_measurement_code_03": "<%= data?.PO4_loop?.[0]?.PO4_355_03 %>",
    "packaging_code_04": "<%= data?.PO4_loop?.[0]?.PO4_103_04 %>",
    "gross_weight_per_pack_06": "<%= data?.PO4_loop?.[0]?.PO4_384_06 %>",
    "unit_or_basis_for_measurement_code_07": "<%= data?.PO4_loop?.[0]?.PO4_355_07 %>",
    "gross_volume_per_pack_08": "<%= data?.PO4_loop?.[0]?.PO4_385_08 %>",
    "unit_or_basis_for_measurement_code_09": "<%= data?.PO4_loop?.[0]?.PO4_355_09 %>",
    "length_10": "<%= data?.PO4_loop?.[0]?.PO4_82_10 %>",
    "width_11": "<%= data?.PO4_loop?.[0]?.PO4_189_11 %>",
    "height_12": "<%= data?.PO4_loop?.[0]?.PO4_65_12 %>",
    "unit_or_basis_for_measurement_code_13": "<%= data?.PO4_loop?.[0]?.PO4_355_13 %>",
    "inner_pack_14": "<%= data?.PO4_loop?.[0]?.PO4_810_14 %>",
    "surface_layer_position_code_15": "<%= data?.PO4_loop?.[0]?.PO4_752_15 %>",
    "assigned_identification_16": "<%= data?.PO4_loop?.[0]?.PO4_350_16 %>",
    "assigned_identification_17": "<%= data?.PO4_loop?.[0]?.PO4_350_17 %>",
    "number_18": "<%= data?.PO4_loop?.[0]?.PO4_1470_18 %>"
  },
  "product_item_description_PID_loop": [<%= data?.PID_data %>],
  "service_promotion_allowance_or_charge_information_SAC_loop": [<%= data?.SAC_data %>],
  "subline_item_detail_SLN_loop": [<%= data?.SLN_data %>]
}`;

const baselineItemDataTemplateExecutor = _.template(baselineItemData);
const baselineItemDataTemplate = sanitizeTemplateOutput(
  baselineItemDataTemplateExecutor
);

export { baselineItemDataTemplate };
