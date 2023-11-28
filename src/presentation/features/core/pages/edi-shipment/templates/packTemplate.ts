import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const pack = `{
  "hierarchical_level_HL": {
    "hierarchical_id_number_01": "<%= data?.HL_01_628 %>",
    "hierarchical_parent_id_number_02": "<%= data?.HL_02_734 %>",
    "hierarchical_level_code_03": "<%= data?.HL_03_735 %>"
  },
  "item_physical_details_PO4": { "pack_01": "<%= data?.P04_01_356 %>" },
  "marks_and_numbers_MAN": [
    {
      "marks_and_numbers_qualifier_01": "<%= data?.MAN_01_88 %>",
      "marks_and_numbers_02": "<%= data?.MAN_02_87 %>",
      "marks_and_numbers_03": "<%= data?.MAN_03_87 %>",
      "marks_and_number_qualifier_04": "<%= data?.MAN_04_88 %>",
      "marks_and_numbers_05": "<%= data?.MAN_05_87 %>",
      "marks_and_numbers_06": "<%= data?.MAN_06_87 %>"
    }
  ],
  "date_time_reference_DTM": [
    {
      "date_time_qualifier_01": "<%= data?.DTM_01_374 %>",
      "date_02": "<%= data?.DTM_02_373?.format("YYYYMMDD") %>",
      "time_03": "<%= data?.DTM_03_337?.format("HHmm") %>",
      "time_code_04": "<%= data?.DTM_04_623 %>",
      "time_code_05": "<%= data?.DTM_05_1250 %>",
      "date_time_period_06": "<%= data?.DTM_06_1251 %>"
    }
  ]
}`;

const packTemplateExecutor = _.template(pack);
const packTemplate = sanitizeTemplateOutput(packTemplateExecutor);

export { packTemplate };
