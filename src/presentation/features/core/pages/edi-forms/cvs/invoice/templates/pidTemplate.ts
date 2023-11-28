import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const pidData = `{
  "product_item_description_PID": {
    "item_description_type_code_01": "<%= data?.PID_349_01 %>",
    "product_process_characteristic_code_02": "<%= data?.PID_750_02 %>",
    "agency_qualifier_code_03": "<%= data?.PID_559_03 %>",
    "product_description_code_04": "<%= data?.PID_751_04 %>",
    "description_05": "<%= data?.PID_352_05 %>",
    "surface_layer_position_code_06": "<%= data?.PID_752_06 %>",
    "source_subqualifier_07": "<%= data?.PID_822_07 %>",
    "yes_no_condition_or_response_code_08": "<%= data?.PID_1073_08 %>",
    "language_code_09": "<%= data?.PID_819_09 %>"
  }
}`;

const pidTemplate = sanitizeTemplateOutput(_.template(pidData));

export { pidTemplate };
