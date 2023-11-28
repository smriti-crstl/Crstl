import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const summary = `{
  "total_monetary_value_summary_TDS": {
    "amount_01": "<%= data?.TDS_610_01 %>"
  },
  "transaction_set_trailer_SE": {
    "number_of_included_segments_01": "11",
    "transaction_set_control_number_02": "0005"
  },
  "carrier_detail_CAD": {
    "transportation_method_type_code_01": "<%= data?.CAD_91_01 %>",
    "standard_carrier_alpha_code_04": "<%= data?.CAD_140_04 %>",
    "reference_identification_qualifier_07": "<%= data?.CAD_128_07 %>",
    "reference_identification_08": "<%= data?.CAD_127_08 %>"
  },
  "service_promotion_allowance_or_charge_information_SAC_loop": [<%= data?.service_promotion_allowance_or_charge_information_SAC_loop %>],
  "invoice_shipment_summary_ISS_loop": [<%= data?.invoice_shipment_summary_ISS_loop %>],
  "transaction_totals_CTT": {
    "number_of_line_items_01": "<%= data?.CTT_354_01 %>",
    "weight_03": "<%= data?.CTT_81_03 %>",
    "unit_or_basis_for_measurement_code_04": "<%= data?.CTT_355_04 %>",
    "volume_05": "<%= data?.CTT_183_05 %>",
    "unit_or_basis_for_measurement_code_06": "<%= data?.CTT_355_06 %>",
    "description_07": "<%= data?.CTT_352_07 %>"
  }
}`;

const summaryTemplateExecutor = _.template(summary);
const summaryTemplate = sanitizeTemplateOutput(summaryTemplateExecutor);

export { summaryTemplate };
