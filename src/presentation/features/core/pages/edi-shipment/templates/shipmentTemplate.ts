import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const shipment = `{
  "hierarchical_level_HL": {
    "hierarchical_id_number_01": "<%= data?.HL_S_01_628 %>",
    "hierarchical_level_code_03": "<%= data?.HL_S_03_735 %>"
  },
  "carrier_details_routing_sequence_transit_time_TD5": [
    {
      "routing_sequence_code_01": "<%= data?.TD5_S_01_133 %>",
      "identification_code_qualifier_02": "<%= data?.TD5_S_02_66 %>",
      "identification_code_03": "<%= data?.TD5_S_03_67 %>",
      "transportation_method_type_code_04": "<%= data?.TD5_S_04_91 %>",
      "routing_05": "<%= data?.TD5_S_05_387 %>",
      "shipment_order_status_code_06": "<%= data?.TD5_S_06_368 %>",
      "location_identifier_08": "<%= data?.TD5_S_08_310 %>",
      "transit_time_11": "<%= data?.TD5_S_11_733 %>",
      "service_level_code_12": "<%= data?.TD5_S_12_284 %>",
      "service_level_code_13": "<%= data?.TD5_S_13_284 %>"
    }
  ],
  "reference_identification_REF_BM": {
    "reference_identification_qualifier_01": "<%= data?.REF_BM_S_01_128 %>",
    "reference_identification_02": "<%= data?.REF_BM_S_02_127 %>",
    "description_03": "<%= data?.REF_BM_S_03_352 %>"
  },
  "reference_identification_REF_CN": {
    "reference_identification_qualifier_01": "<%= data?.REF_CN_S_01_128 %>",
    "reference_identification_02": "<%= data?.REF_CN_S_02_127 %>",
    "description_03": "<%= data?.REF_CN_S_03_352 %>"
  },
  "fob_related_instructions_FOB": {
    "shipment_method_of_payment_01": "<%= data?.FOB_S_01_146 %>",
    "location_qualifier_02": "<%= data?.FOB_S_02_309 %>",
    "description_03": "<%= data?.FOB_S_03_352 %>",
    "transportation_terms_qualifier_code_04": "<%= data?.FOB_S_04_334 %>",
    "transportation_terms_code_05": "<%= data?.FOB_S_05_335 %>",
    "location_qualifier_06": "<%= data?.FOB_S_06_309 %>",
    "description_07": "<%= data?.FOB_S_07_352 %>",
    "risk_of_loss_code_08": "<%= data?.FOB_S_08_54 %>",
    "description_09": "<%= data?.FOB_S_09_352 %>"
  },
  "name_N1_loop": [
    {
      "name_N1": {
        "entity_identifier_code_01": "<%= data?.N1_S_01_98 %>",
        "name_02": "<%= data?.N1_S_02_93 %>",
        "identification_code_qualifier_03": "<%= data?.N1_S_03_66 %>",
        "identification_code_04": "<%= data?.N1_S_04_67 %>",
        "entity_relationship_code_05": "<%= data?.N1_S_05_706 %>",
        "entity_identifier_code_06": "<%= data?.N1_S_06_98 %>"
      }
    }
  ]
}`;

const shipmentTemplateExecutor = _.template(shipment);
const shipmentTemplate = sanitizeTemplateOutput(shipmentTemplateExecutor);

export { shipmentTemplate };
