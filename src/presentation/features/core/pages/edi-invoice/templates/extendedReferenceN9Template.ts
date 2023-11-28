import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const n9 = `{
  "extended_reference_information_N9": {
    "reference_identification_qualifier_01": "<%= data?.N9_128_01 %>",
    "reference_identification_02": "<%= data?.N9_127_02 %>",
    "free_form_description_03": "<%= data?.N9_369_03 %>",
    "time_05": "<%= data?.N9_337_05?.format("HHmm") %>",
    "time_code_06": "<%= data?.N9_623_06 %>"
  },
  "message_text_MSG": [
    {
      "free_form_message_text_01": "<%= data?.MSG_933_01 %>",
      "printer_carriage_control_code_02": "<%= data?.MSG_934_02 %>",
      "number_03": "<%= data?.MSG_1470_03 %>"
    }
  ]
}`;

const extendedReferenceN9Template = sanitizeTemplateOutput(_.template(n9));

export { extendedReferenceN9Template };
