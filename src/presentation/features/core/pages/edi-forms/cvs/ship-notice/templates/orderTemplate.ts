import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const order = `{
  "hierarchical_level_HL": {
    "hierarchical_id_number_01": "<%= data?.HL_O_01_628 %>",
    "hierarchical_parent_id_number_02": "<%= data?.HL_O_02_734 %>",
    "hierarchical_level_code_03": "<%= data?.HL_O_03_735 %>"
  },
  "purchase_order_reference_PRF": {
    "purchase_order_number_01": "<%= data?.HL_O_PRF_01_324 %>",
    "release_number_02": "<%= data?.HL_O_PRF_02_328 %>",
    "date_04": "<%= data?.HL_O_PRF_04_373?.format?.("YYYYMMDD") %>"
  },
  "reference_identification_REF": [
    {
      "reference_identification_qualifier_01": "<%= data?.REF_O_01_128 %>",
      "reference_identification_02": "<%= data?.REF_O_02_127 %>"
    }
  ],
  "product_item_description_PID": [
    {
      "item_description_type_01": "<%= data?.HL_O_PID_01_324 %>",
      "product_process_characteristic_code_02": "<%= data?.HL_O_PID_02_750 %>",
      "agency_qualifier_code_03": "<%= data?.HL_O_PID_03_559 %>",
      "product_description_code_04": "<%= data?.HL_O_PID_04_751 %>",
      "description_05": "<%= data?.HL_O_PID_05_352 %>"
    }
  ],
  "carrier_details_quantity_and_weight_TD1": [
    {
      "packaging_code_01": "<%= data?.HL_O_TD1_01_103 %>",
      "lading_quantity_02": "<%= data?.HL_O_TD1_02_80 %>"
    }
  ],
  "name_N1_loop": [
    {
      "name_N1": {
        "entity_identifier_code_01": "<%= data?.HL_O_N1_01_98 %>",
        "name_02": "<%= data?.HL_O_N1_02_93 %>",
        "identification_code_qualifier_03": "<%= data?.HL_O_N1_03_66 %>",
        "identification_code_04": "<%= data?.HL_O_N1_04_67 %>",
        "entity_relationship_code_05": "<%= data?.HL_O_N1_05_706 %>",
        "entity_identifier_code_06": "<%= data?.HL_O_N1_06_98 %>"
      }
    }
  ]
}`;

const orderTemplateExecutor = _.template(order);
const orderTemplate = sanitizeTemplateOutput(orderTemplateExecutor);

export { orderTemplate };
