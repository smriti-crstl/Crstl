import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const summary = `{
  "transaction_totals_CTT": {
    "number_of_line_items_01": "<%= data?.CTT_01_354 %>",
    "weight_03": "<%= data?.CTT_03_81 %>",
    "unit_or_basis_for_measurement_code_04": "<%= data?.CTT_04_355 %>",
    "volume_05": "<%= data?.CTT_05_183 %>",
    "unit_or_basis_for_measurement_code_06": "<%= data?.CTT_06_355 %>"
  }
}`;

const summaryTemplateExecutor = _.template(summary);
const summaryTemplate = sanitizeTemplateOutput(summaryTemplateExecutor);

export { summaryTemplate };
