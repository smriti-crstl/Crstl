import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const headingRef = `{
  "reference_identification_qualifier_01": "<%= data?.REF_128_01 %>",
  "reference_identification_02": "<%= data?.REF_127_02 %>",
  "description_03": "<%= data?.REF_352_03 %>"
}`;

const headingRefTemplateExecutor = _.template(headingRef);

const headingRefTemplate = sanitizeTemplateOutput(headingRefTemplateExecutor);

export { headingRefTemplate };
