import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const summaryISS = `{
  "invoice_shipment_summary_ISS": {
    "number_of_units_shipped_01": "<%= data?.ISS_382_01 %>",
    "unit_or_basis_for_measurement_code_02": "<%= data?.ISS_355_02 %>",
    "weight_03": "<%= data?.ISS_81_03 %>",
    "unit_or_basis_for_measurement_code_04": "<%= data?.ISS_355_04 %>",
    "volume_05": "<%= data?.ISS_183_05 %>",
    "unit_or_basis_for_measurement_code_06": "<%= data?.ISS_355_06 %>"
  }
}`;

const summaryISSTemplate = sanitizeTemplateOutput(_.template(summaryISS));

export { summaryISSTemplate };
