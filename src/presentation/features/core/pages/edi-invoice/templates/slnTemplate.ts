import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";
const unused04 = `"quantity_04": "<%= data?.SLN_380_04 %>",`;
const unused05 = `"composite_unit_of_measurement_05": "<%= data?.SLN_C001_05 %>"`;

const slnData = `    {
  "subline_item_detail_SLN": {
    "assigned_identification_01": "<%= data?.SLN_350_01 %>",
    "assigned_identification_02": "<%= data?.SLN_350_02 %>",
    "relationship_code_03": "<%= data?.SLN_662_03 %>",
    
    "unit_price_06": "<%= data?.SLN_212_06 %>",
    "basis_of_unit_price_code_07": "<%= data?.SLN_639_07 %>",
    "relationship_code_08": "<%= data?.SLN_662_08 %>",
    "product_service_id_qualifier_09": "<%= data?.SLN_235_09 %>",
    "product_service_id_10": "<%= data?.SLN_234_10 %>",
    "product_service_id_qualifier_11": "<%= data?.SLN_235_11 %>",
    "product_service_id_12": "<%= data?.SLN_234_12 %>",
    "product_service_id_qualifier_13": "<%= data?.SLN_235_13 %>",
    "product_service_id_14": "<%= data?.SLN_234_14 %>",
    "product_service_id_qualifier_15": "<%= data?.SLN_235_15 %>",
    "product_service_id_16": "<%= data?.SLN_234_16 %>",
    "product_service_id_qualifier_17": "<%= data?.SLN_235_17 %>",
    "product_service_id_18": "<%= data?.SLN_234_18 %>",
    "product_service_id_qualifier_19": "<%= data?.SLN_235_19 %>",
    "product_service_id_20": "<%= data?.SLN_234_20 %>",
    "product_service_id_qualifier_21": "<%= data?.SLN_235_21 %>",
    "product_service_id_22": "<%= data?.SLN_234_22 %>",
    "product_service_id_qualifier_23": "<%= data?.SLN_235_23 %>",
    "product_service_id_24": "<%= data?.SLN_234_24 %>",
    "product_service_id_qualifier_25": "<%= data?.SLN_235_25 %>",
    "product_service_id_26": "<%= data?.SLN_234_26 %>",
    "product_service_id_qualifier_27": "<%= data?.SLN_235_27 %>",
    "product_service_id_28": "<%= data?.SLN_234_28 %>"
  },
  "date_time_reference_DTM": {
    "date_time_qualifier_01": "<%= data?.DTM_374_01 %>",
    "date_02": "<%= data?.DTM_373_02?.format("YYYYMMDD") %>",
    "time_03": "<%= data?.DTM_337_03?.format("HHmm") %>",
    "time_code_04": "<%= data?.DTM_623_04 %>",
    "date_time_period_format_qualifier_05": "<%= data?.DTM_1250_05 %>",
    "date_time_period_06": "<%= data?.DTM_1251_06 %>"
  }
}`;

const slnTemplate = sanitizeTemplateOutput(_.template(slnData));

export { slnTemplate };
