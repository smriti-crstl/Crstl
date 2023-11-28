import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const sacData = `{
  "service_promotion_allowance_or_charge_information_SAC": {
    "allowance_or_charge_indicator_code_01": "<%= data?.SAC_248_01 %>",
    "service_promotion_allowance_or_charge_code_02": "<%= data?.SAC_1300_02 %>",
    "agency_qualifier_code_03": "<%= data?.SAC_559_03 %>",
    "agency_service_promotion_allowance_or_charge_code_04": "<%= data?.SAC_1301_04 %>",
    "amount_05": "<%= data?.SAC_610_05 %>",
    "allowance_charge_percent_qualifier_06": "<%= data?.SAC_378_06 %>",
    "percent_07": "<%= data?.SAC_332_07 %>",
    "rate_08": "<%= data?.SAC_118_08 %>",
    "unit_or_basis_for_measurement_code_09": "<%= data?.SAC_355_09 %>",
    "quantity_10": "<%= data?.SAC_380_10 %>",
    "quantity_11": "<%= data?.SAC_380_11 %>",
    "allowance_or_charge_method_of_handling_code_12": "<%= data?.SAC_331_12 %>",
    "reference_identification_13": "<%= data?.SAC_127_13 %>",
    "option_number_14": "<%= data?.SAC_770_14 %>",
    "description_15": "<%= data?.SAC_352_15 %>"
  }
}`;

const sacTemplate = sanitizeTemplateOutput(_.template(sacData));

export { sacTemplate };
