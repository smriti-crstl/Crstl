import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const heading = `{
  "transaction_set_header_ST": {
    "transaction_set_identifier_code_01": "810",
    "transaction_set_control_number_02": "<%= data?.ST_329_02 %>"
  },
  "beginning_segment_for_invoice_BIG": {
    "date_01": "<%= data?.BIG_373_01?.format?.("YYYYMMDD") %>",
    "invoice_number_02": "<%= data?.BIG_76_02 %>",
    "date_03": "<%= data?.BIG_373_03?.format?.("YYYYMMDD") %>",
    "purchase_order_number_04": "<%= data?.BIG_324_04 %>",
    "transaction_type_code_07": "<%= data?.BIG_640_07 %>"
  },
  "note_special_instruction_NTE": [
    {
      "note_reference_code_01": "<%= data?.NTE_363_01 %>",
      "description_02": "<%= data?.NTE_352_02 %>"
    }
  ],
  "reference_identification_REF": [<%= data?.reference_identification_REF %>],
  "name_N1_loop": [<%= data?.party_identification_N1_loop %>],
  "terms_of_sale_deferred_terms_of_sale_ITD": [
    {
      "terms_type_code_01": "<%= data?.ITD_336_01 %>",
      "terms_basis_date_code_02": "<%= data?.ITD_333_02 %>",
      "terms_discount_percent_03": "<%= data?.ITD_338_03 %>",
      "terms_discount_due_date_04": "<%= data?.ITD_370_04?.format?.("YYYYMMDD") %>",
      "terms_discount_days_due_05": "<%= data?.ITD_351_05 %>",
      "terms_net_due_date_06": "<%= data?.ITD_446_06?.format?.("YYYYMMDD") %>",
      "terms_net_days_07": "<%= data?.ITD_386_07 %>",
      "terms_discount_amount_08": "<%= data?.ITD_362_08 %>",
      "deferred_amount_due_10": "<%= data?.ITD_389_10 %>",
      "percent_of_invoice_payable_11": "<%= data?.ITD_342_11 %>",
      "day_of_month_13": "<%= data?.ITD_765_13 %>"
    }
  ],
  "date_time_reference_DTM": [
    {
      "date_time_qualifier_01": "<%= data?.DTM_374_01 %>",
      "date_02": "<%= data?.DTM_373_02?.format?.("YYYYMMDD") %>",
      "time_03": "<%= data?.DTM_337_03?.format?.("HHmm") %>",
      "date_time_period_format_qualifier_05": "<%= data?.DTM_1250_05 %>",
      "date_time_period_06": "<%= data?.DTM_1251_06 %>"
    }
  ],
  "extended_reference_information_N9_loop": [<%= data?.extended_reference_information_N9_loop %>],
  "fob_related_instructions_FOB": {
    "shipment_method_of_payment_code_01": "<%= data?.FOB_146_01 %>",
    "location_qualifier_02": "<%= data?.FOB_309_02 %>",
    "description_03": "<%= data?.FOB_352_03 %>"
  }
}`;

const headingTemplateExecutor = _.template(heading);
const headingTemplate = sanitizeTemplateOutput(headingTemplateExecutor);

export { headingTemplate };
