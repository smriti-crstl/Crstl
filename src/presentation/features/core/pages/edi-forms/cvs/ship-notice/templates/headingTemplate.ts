import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const heading = `{
  "transaction_set_header_ST": {
    "transaction_set_identifier_code_01": "<%= data?.ST_01_143 %>",
    "transaction_set_control_number_02": "<%= data?.ST_02_329 %>"
  },
  "beginning_segment_for_ship_notice_BSN": {
    "transaction_set_purpose_code_01": "<%= data?.BSN_01_353 %>",
    "shipment_identification_02": "<%= data?.BSN_02_396 %>",
    "date_03": "<%= data?.BSN_03_373?.format?.("YYYYMMDD") %>",
    "time_04": "<%= data?.BSN_04_337?.format?.("HHmm") %>",
    "hierarchical_structure_code_05": "<%= data?.BSN_05_1005 %>",
    "transaction_type_code_06": "<%= data?.BSN_06_640 %>"
  }
}`;

const headingTemplateExecutor = _.template(heading);
const headingTemplate = sanitizeTemplateOutput(headingTemplateExecutor);

export { headingTemplate };
