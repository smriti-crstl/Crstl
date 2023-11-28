import _ from "lodash";
import { sanitizeTemplateOutput } from "presentation/utils/sanitizeTemplateOutput";

const n1 = `{
  "name_N1": {
    "entity_identifier_code_01": "<%= data?.N1_98_01 %>",
    "name_02": "<%= data?.N1_93_02 %>",
    "identification_code_qualifier_03": "<%= data?.N1_66_03 %>",
    "identification_code_04": "<%= data?.N1_67_04 %>"
  },
  "party_location_N3": [
    {
      "address_information_01": "<%= data?.N3_166_01 %>",
      "address_information_02": "<%= data?.N3_166_02 %>"
    }
  ],
  "geographic_location_N4": {
    "city_name_01": "<%= data?.N4_19_01 %>",
    "state_or_province_code_02": "<%= data?.N4_156_02 %>",
    "postal_code_03": "<%= data?.N4_116_03 %>",
    "location_qualifier_05": "<%= data?.N4_309_05 %>"
  }
}`;

const partyIdentificationN1Template = sanitizeTemplateOutput(_.template(n1));

export { partyIdentificationN1Template };
