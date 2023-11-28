import _ from "lodash";

const mainJson = `{
  "code": "valid",
  "output": {
    "interchanges": [
      {
        "interchange_control_header_ISA": {
          "authorization_information_qualifier_01": "no_authorization_information_present_no_meaningful_information_in_i02_00",
          "authorization_information_02": "",
          "security_information_qualifier_03": "no_security_information_present_no_meaningful_information_in_i04_00",
          "security_information_04": "",
          "interchange_id_qualifier_05": "mutually_defined_ZZ",
          "interchange_sender_id_06": "SPS1993611",
          "interchange_id_qualifier_07": "ucc_edi_communications_id_comm_id_08",
          "interchange_receiver_id_08": "6111470100",
          "interchange_date_09": "220228",
          "interchange_time_10": "1336",
          "interchange_control_standards_identifier_11": "us_edi_community_of_asc_x12_tdcc_and_ucs_U",
          "interchange_control_version_number_12": "00401",
          "interchange_control_number_13": "100000065",
          "acknowledgment_requested_14": "no_acknowledgment_requested_0",
          "usage_indicator_15": "production_data_P",
          "component_element_separator_16": ">"
        },
        "groups": [
          {
            "functional_group_header_GS": {
              "functional_identifier_code_01": "ship_notice_manifest_856_SH",
              "application_senders_code_02": "SPS1993611",
              "application_receivers_code_03": "6111470100",
              "date_04": "20220228",
              "time_05": "1336",
              "group_control_number_06": "1065",
              "responsible_agency_code_07": "accredited_standards_committee_x12_X",
              "version_release_industry_identifier_code_08": "004010"
            },
            "transaction_sets": [
              {
                "heading": <%= heading %>,
                "detail": {
                  "hierarchical_level_HL_loop": [<%= detail_Hl %>]
                },
                "summary": <%= summary %>
              }
            ],
            "release": "004010"
          }
        ],
        "delimiters": {
          "element": "*",
          "segment": "~",
          "sub_element": ">"
        }
      }
    ],
    "__version": "jedi@2.0"
  }
}
`;

const heading = `{
  "transaction_set_header_ST": {
    "transaction_set_identifier_code_01": "<%= m_143_ST_01 %>",
    "transaction_set_control_number_02": "<%= m_329_ST_02 %>"
  },
  "beginning_segment_for_ship_notice_BSN": {
    "transaction_set_purpose_code_01": "<%= m_353_BSN_01 %>",
    "shipment_identification_02": "<%= m_396_BSN_02 %>",
    "date_03": "<%= m_373_BSN_03.format("YYYYMMDD") %>",
    "time_04": "<%= m_337_BSN_04.format("HHmmSS") %>",
    "hierarchical_structure_code_05": "<%= m_1005_BSN_05 %>"
  }
}`;

const product = `{
  "hierarchical_level_HL": {
    "hierarchical_id_number_01": "<%= HL_01_628 %>",
    "hierarchical_level_code_03": "<%= HL_03_735 %>"
  },
  "carrier_details_routing_sequence_transit_time_TD5": [
    {
      "routing_sequence_code_01": "<%= TD5_01_133 %>",
      "identification_code_qualifier_02": "<%= TD5_02_66 %>",
      "identification_code_03": "<%= TD5_03_67 %>",
      "transportation_method_type_code_04": "<%= TD5_04_91 %>",
      "routing_05": "<%= TD5_05_387 %>"
    }
  ],
  "reference_identification_REF": [
    {
      "reference_identification_qualifier_01": "<%= REF_01_128 %>",
      "reference_identification_02": "<%= REF_02_127 %>"
    }
  ],
  "name_N1_loop": [
    {
      "name_N1": {
        "entity_identifier_code_01": "<%= N1_01_98 %>",
        "identification_code_qualifier_03": "<%= N1_03_66 %>",
        "identification_code_04": "<%= N1_04_67 %>"
      }
    }
  ]
}`;

const summary = `{
  "transaction_totals_CTT": {
    "number_of_line_items_01": "<%= m_354_CTT_01 %>"
  },
  "transaction_set_trailer_SE": {
    "number_of_included_segments_01": "<%= m_96_SE_01 %>",
    "transaction_set_control_number_02": "1065"
  }
}`;

const mainTemplate = _.template(mainJson);

const headingTemplate = _.template(heading);

const productTemplate = _.template(product);

const summaryTemplate = _.template(summary);

export { mainTemplate, headingTemplate, summaryTemplate, productTemplate };
