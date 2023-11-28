import moment from "moment";

const prefillData2: Record<string, any> = {
  "76_BIG_02": "TEST!!",
  "324_BIG_04": "12312",
  "127_REF_02": "12312",
  "336_ITD_01": "01",
  "333_ITD_02": "2",
  "370_ITD_04": moment("2022-04-06T00:37:20.759Z"),
  "128_N9_01": "ZZ",
  "127_N9_02": "Reference Identification",
  "933_MSG_01": "Free-Form Message Text",
  "355_IT1_03": "CA",
  "235_IT1_06": "CB",
  "235_IT1_08": "CB",
  "368_IT3_03": "IS",
  "356_PO4_01": "1",
  "610_TDS_01": "Amount",
  "610_TDS_02": "Amount",
  "91_CAD_01": "C",
  "373_BIG_01": moment("2022-04-06T00:38:45.259Z"),
  "140_CAD_04": "Code",
  heading_N1: [
    {
      N3_01_166: "Enter a value",
      N3_02_166: "Enter a value",
      N4_01_19: "Enter a value",
      N4_02_156: "Enter a value",
      N4_03_116: "Enter a value",
      N4_04_26: "Enter a value",
      N4_05_309: "Enter a value",
      N4_06_310: "Enter a value",
      N1_01_98: "Enter a value",
      N1_03_66: "Enter a value",
      N1_04_67: "Enter a value",
    },
  ],
  "detail_PID-TABLE": [
    {
      PID_01_349: "Enter a value",
      PID_02_750: "Enter a value",
      PID_05_352: "Enter a value",
    },
  ],
  "detail_SAC-TABLE": [
    {
      SAC_01_248: "Enter a value",
      SAC_02_1300: "Enter a value",
      SAC_03_559: "Enter a value",
      SAC_04_1301: "Enter a value",
      SAC_05_610: "Enter a value",
      SAC_09_355: "Enter a value",
      SAC_10_380: "Enter a value",
      SAC_12_331: "Enter a value",
    },
  ],
  "detail_SLN-TABLE": [
    {
      SLN_03_662: "Enter a value",
      SLN_01_350: "Enter a value",
      SLN_09_235: "Enter a value",
      SLN_11_235: "Enter a value",
    },
  ],
  "summary_SAC-TABLE": [
    {
      SAC_01_248: "Enter a value",
      SAC_02_1300: "Enter a value",
      SAC_03_559: "Enter a value",
      SAC_04_1301: "Enter a value",
      SAC_05_610: "Enter a value",
      SAC_06_378: "Enter a value",
      SAC_12_331: "Enter a value",
      SAC_15_352: "Enter a value",
    },
  ],
};

const prefillData = {
  "373_BIG_01": moment("2022-04-06T00:38:45.259Z"),
  "76_BIG_02": "123456",
  "373_BIG_03": moment("2022-04-09T23:04:59.712Z"),
  "324_BIG_04": "12312",
  "640_BIG_07": "DO",
  "128_REF_01": "DP",
  "127_REF_02": "12312",
  heading_N1: [
    {
      N3_01_166: "Test",
      N3_02_166: "test",
      N4_01_19: "test",
      N4_02_156: "test",
      N4_03_116: "test",
      N4_04_26: "test",
      N4_05_309: "test",
      N4_06_310: "test",
      N1_01_98: "BS",
      N1_03_66: "91",
      N1_04_67: "test",
    },
  ],
  "336_ITD_01": "01",
  "333_ITD_02": "2",
  "338_ITD_03": "123",
  "370_ITD_04": moment("2022-04-06T00:37:20.759Z"),
  "351_ITD_05": "03",
  "446_ITD_06": moment("2022-04-07T01:10:43.115Z"),
  "386_ITD_07": "123",
  "362_ITD_08": "123",
  "374_DTM_01": "011",
  "373_DTM_02": moment("2022-04-07T01:10:45.873Z"),
  heading_N9: [
    {
      N9_01_128: "ZZ",
      N9_02_127: "test",
      "933_MSG_01": "Message",
    },
  ],
  detail_IT1: [
    {
      "355_IT1_03": "CA",
      "235_IT1_06": "CB",
      "235_IT1_08": "EN",
      "235_IT1_10": "CB",
      "368_IT3_03": "IS",
      "356_PO4_01": "123",
      "810_PO4_14": "123",
      detail_PID_subform: [
        {
          PID_01_349: "F",
          PID_02_750: "08",
          PID_05_352: "test",
        },
      ],
      detail_SAC_subform: [
        {
          SAC_01_248: "A",
          SAC_02_1300: "A400",
          SAC_03_559: "VI",
          SAC_04_1301: "test",
          SAC_05_610: "123",
          SAC_06_378: "123",
          SAC_07_332: "123",
          SAC_09_355: "EA",
          SAC_10_380: "123",
          SAC_12_331: "02",
          SAC_15_352: "123",
        },
      ],
      detail_SLN_subform: [
        {
          SLN_01_350: "test",
          SLN_02_350: "test",
          SLN_03_662: "S",
          SLN_04_380: "123",
          SLN_05_355: "EA",
          SLN_09_235: "CB",
          SLN_10_234: "test",
          SLN_11_235: "CB",
          SLN_12_234: "test",
        },
      ],
    },
    {
      "355_IT1_03": "CA",
      "235_IT1_06": "CB",
      "235_IT1_08": "EN",
      "235_IT1_10": "CB",
      "368_IT3_03": "IS",
      "356_PO4_01": "123",
      "810_PO4_14": "123",
      detail_PID_subform: [
        {
          PID_01_349: "F",
          PID_02_750: "08",
          PID_05_352: "test",
        },
      ],
      detail_SAC_subform: [
        {
          SAC_01_248: "A",
          SAC_02_1300: "A400",
          SAC_03_559: "VI",
          SAC_04_1301: "test",
          SAC_05_610: "123",
          SAC_06_378: "123",
          SAC_07_332: "123",
          SAC_09_355: "EA",
          SAC_10_380: "123",
          SAC_12_331: "02",
          SAC_15_352: "123",
        },
      ],
      detail_SLN_subform: [
        {
          SLN_01_350: "test",
          SLN_02_350: "test",
          SLN_03_662: "S",
          SLN_04_380: "123",
          SLN_05_355: "EA",
          SLN_09_235: "CB",
          SLN_10_234: "test",
          SLN_11_235: "CB",
          SLN_12_234: "test",
        },
      ],
    },
    {},
  ],
  "610_TDS_01": "10",
  "610_TDS_02": "Amount",
  "91_CAD_01": "C",
  "140_CAD_04": "Code",
  "387_CAD_05": "Routing",
  "128_CAD_07": "BM",
  summary_SAC: [
    {
      SAC_01_248: "A",
      SAC_02_1300: "A400",
      SAC_03_559: "VI",
      SAC_04_1301: "test",
      SAC_05_610: "123",
      SAC_06_378: "3",
      SAC_07_332: "123",
      SAC_10_380: "123",
      SAC_11_380: "123",
      SAC_12_331: "02",
      SAC_15_352: "test",
    },
  ],
  summary_ISS: [
    {
      ISS_01_382: "123",
      ISS_02_355: "CA",
      ISS_03_81: "123",
      ISS_04_355: "LB",
    },
  ],
  "143_ST_01": "810",
  "329_ST_02": "Test",
  "363_NTE_01": "CER",
  "363_NTE_02": "test",
  "127_CAD_08": " Reference Identification",
  "354_CTT_01": "2",
  "96_SE_01": "123",
  "329_SE_02": "1231",
};

const _jediData = {
  code: "valid",
  output: {
    interchanges: [
      {
        interchange_control_header_ISA: {
          authorization_information_qualifier_01:
            "no_authorization_information_present_no_meaningful_information_in_i02_00",
          authorization_information_02: "",
          security_information_qualifier_03:
            "no_security_information_present_no_meaningful_information_in_i04_00",
          security_information_04: "",
          interchange_id_qualifier_05: "mutually_defined_ZZ",
          interchange_sender_id_06: "SPS1993611",
          interchange_id_qualifier_07: "ucc_edi_communications_id_comm_id_08",
          interchange_receiver_id_08: "6111470100",
          interchange_date_09: "220324",
          interchange_time_10: "1245",
          interchange_control_standards_identifier_11:
            "us_edi_community_of_asc_x12_tdcc_and_ucs_U",
          interchange_control_version_number_12: "00401",
          interchange_control_number_13: "100000077",
          acknowledgment_requested_14: "no_acknowledgment_requested_0",
          usage_indicator_15: "production_data_P",
          component_element_separator_16: ">",
        },
        groups: [
          {
            functional_group_header_GS: {
              functional_identifier_code_01: "invoice_information_810819_IN",
              application_senders_code_02: "SPS1993611",
              application_receivers_code_03: "6111470100",
              date_04: "20220324",
              time_05: "1245",
              group_control_number_06: "1077",
              responsible_agency_code_07:
                "accredited_standards_committee_x12_X",
              version_release_industry_identifier_code_08: "004010",
            },
            transaction_sets: [
              {
                set: "810",
                heading: {
                  transaction_set_header_ST: {
                    transaction_set_identifier_code_01: "810",
                    transaction_set_control_number_02: "1077",
                  },
                  beginning_segment_for_invoice_BIG: {
                    date_01: "20220324",
                    invoice_number_02: "NEURO1045",
                    purchase_order_number_04: "10000366144-0559",
                  },
                  reference_identification_REF: [
                    {
                      reference_identification_qualifier_01:
                        "internal_vendor_number_IA",
                      reference_identification_02: "1993611",
                    },
                    {
                      reference_identification_qualifier_01:
                        "department_number_DP",
                      reference_identification_02: "094",
                    },
                  ],
                  name_N1_loop: [
                    {
                      name_N1: {
                        entity_identifier_code_01: "buying_party_purchaser_BY",
                        identification_code_qualifier_03:
                          "assigned_by_buyer_or_buyers_agent_92",
                        identification_code_04: "0559",
                      },
                    },
                  ],
                  terms_of_sale_deferred_terms_of_sale_ITD: [
                    {
                      terms_type_code_01: "basic_01",
                      terms_basis_date_code_02: "delivery_date_2",
                      terms_discount_percent_03: "2",
                      terms_discount_days_due_05: "65",
                    },
                  ],
                  date_time_reference_DTM: [
                    {
                      date_time_qualifier_01: "shipped_011",
                      date_02: "20220321",
                    },
                  ],
                },
                detail: {
                  baseline_item_data_invoice_IT1_loop: [
                    {
                      baseline_item_data_invoice_IT1: {
                        assigned_identification_01: "1",
                        quantity_invoiced_02: "288",
                        unit_or_basis_for_measurement_code_03: "EA",
                        unit_price_04: "2.2",
                        product_service_id_qualifier_06:
                          "buyers_catalog_number_CB",
                        product_service_id_07: "094080085",
                        product_service_id_qualifier_10:
                          "upc_consumer_package_code_1_5_5_1_UP",
                        product_service_id_11: "869657000029",
                      },
                    },
                    {
                      baseline_item_data_invoice_IT1: {
                        assigned_identification_01: "1",
                        quantity_invoiced_02: "288",
                        unit_or_basis_for_measurement_code_03: "TWO_EA2",
                        unit_price_04: "2.2",
                        product_service_id_qualifier_06:
                          "TWO_buyers_catalog_number_CB",
                        product_service_id_07: "094080085",
                        product_service_id_qualifier_10:
                          "upc_consumer_package_code_1_5_5_1_UP",
                        product_service_id_11: "869657000029",
                      },
                    },
                  ],
                },
                summary: {
                  total_monetary_value_summary_TDS: {
                    amount_01: "633.6",
                  },
                  carrier_detail_CAD: {
                    transportation_method_type_code_01:
                      "private_parcel_service_U",
                    standard_carrier_alpha_code_04: "FDEG",
                    reference_identification_qualifier_07:
                      "carriers_reference_number_pro_invoice_CN",
                    reference_identification_08: "271034570636",
                  },
                  invoice_shipment_summary_ISS_loop: [
                    {
                      invoice_shipment_summary_ISS: {
                        number_of_units_shipped_01: "288",
                        unit_or_basis_for_measurement_code_02: "each_EA",
                      },
                    },
                  ],
                  transaction_totals_CTT: {
                    number_of_line_items_01: "1",
                  },
                  transaction_set_trailer_SE: {
                    number_of_included_segments_01: "13",
                    transaction_set_control_number_02: "1077",
                  },
                },
              },
            ],
            functional_group_trailer_GE: {
              number_of_transaction_sets_included_01: "1",
              group_control_number_02: "1077",
            },
            release: "004010",
          },
        ],
        interchange_control_trailer_IEA: {
          number_of_included_functional_groups_01: "1",
          interchange_control_number_02: "100000077",
        },
        delimiters: {
          element: "*",
          segment: "~",
          sub_element: ">",
        },
      },
    ],
    __version: "jedi@2.0",
  },
};

const jediData = {
  code: "valid",
  output: {
    interchanges: [
      {
        interchange_control_header_ISA: {
          authorization_information_qualifier_01:
            "no_authorization_information_present_no_meaningful_information_in_i02_00",
          authorization_information_02: "",
          security_information_qualifier_03:
            "no_security_information_present_no_meaningful_information_in_i04_00",
          security_information_04: "",
          interchange_id_qualifier_05: "x121_ccitt_09",
          interchange_sender_id_06: "005070479ff",
          interchange_id_qualifier_07: "mutually_defined_ZZ",
          interchange_receiver_id_08: "X0000X0",
          interchange_date_09: "931001",
          interchange_time_10: "1020",
          repetition_separator_11: "U",
          interchange_control_version_number_code_12: "00801",
          interchange_control_number_13: "000866292",
          acknowledgment_requested_code_14:
            "no_interchange_acknowledgment_requested_0",
          interchange_usage_indicator_code_15: "test_data_T",
          component_element_separator_16: "^",
        },
        groups: [
          {
            functional_group_header_GS: {
              functional_identifier_code_01: "account_analysis_822_AA",
              application_senders_code_02: "4Q5K5BX0",
              application_receivers_code_03: "46838K6JC2WQ",
              date_04: "20211008",
              time_05: "223139",
              group_control_number_06: "442560",
              responsible_agency_code_07:
                "transportation_data_coordinating_committee_tdcc_T",
              version_release_industry_identifier_code_08: "008010",
            },
            transaction_sets: [
              {
                heading: {
                  transaction_set_header_ST: {
                    transaction_set_identifier_code_01: "810",
                    transaction_set_control_number_02: "338474891",
                  },
                  beginning_segment_for_invoice_BIG: {
                    date_01: "20210727",
                    invoice_number_02: "983063447",
                  },
                  note_special_instruction_NTE: [
                    {
                      description_02:
                        "Use the cross-platform THX array, then you can parse the primary capacitor!",
                    },
                  ],
                  administrative_communications_contact_PER: [
                    {
                      contact_function_code_01: "review_repricing_contact_1A",
                    },
                  ],
                  party_identification_N1_loop: [
                    {
                      party_identification_N1: {
                        entity_identifier_code_01: "alternate_insurer_00",
                        name_02: "Dolores Jóhannesson",
                      },
                      additional_name_information_N2: [
                        {
                          name_01: "Sigrún Žukauskas",
                        },
                      ],
                      party_location_N3: [
                        {
                          address_information_01: "574 Shakira Crossroad",
                        },
                      ],
                      reference_information_REF: [
                        {
                          reference_identification_qualifier_01:
                            "contracting_district_number_00",
                          reference_identification_02: "512529",
                        },
                      ],
                      administrative_communications_contact_PER: [
                        {
                          contact_function_code_01:
                            "review_repricing_contact_1A",
                        },
                      ],
                    },
                  ],
                  date_time_reference_DTM: [
                    {
                      date_time_qualifier_01: "cancel_after_001",
                      date_02: "20220411",
                    },
                  ],
                  fob_related_instructions_FOB: {
                    shipment_method_of_payment_code_01: "rule_11_shipment_11",
                  },
                  measurements_MEA: [
                    {
                      measurement_value_03: "8917.21",
                    },
                  ],
                  marking_packaging_loading_PKG: [
                    {
                      agency_qualifier_code_03: "alabama_10",
                      packaging_description_code_04: "0005",
                    },
                  ],
                  period_amount_PAM: [
                    {
                      quantity_qualifier_01:
                        "hospital_homebound_individuals_00",
                      quantity_02: "1",
                      composite_unit_of_measure_03: {
                        unit_or_basis_for_measurement_code_01:
                          "actual_pounds_01",
                        exponent_02: "167.27",
                        multiplier_03: "1739.81",
                        unit_or_basis_for_measurement_code_04:
                          "actual_pounds_01",
                        exponent_05: "4285.17",
                        multiplier_06: "7906.22",
                        unit_or_basis_for_measurement_code_07:
                          "actual_pounds_01",
                        exponent_08: "81.74",
                        multiplier_09: "9142.53",
                        unit_or_basis_for_measurement_code_10:
                          "actual_pounds_01",
                        exponent_11: "7909.51",
                        multiplier_12: "2983.09",
                        unit_or_basis_for_measurement_code_13:
                          "actual_pounds_01",
                        exponent_14: "1483.66",
                        multiplier_15: "7171.83",
                      },
                    },
                  ],
                  extended_reference_information_N9_loop: [
                    {
                      extended_reference_information_N9: {
                        reference_identification_qualifier_01:
                          "contracting_district_number_00",
                        reference_identification_02: "723094",
                      },
                      message_text_MSG: [
                        {
                          free_form_message_text_01:
                            "Seamless bi-directional capacity",
                        },
                      ],
                    },
                  ],
                  vessel_identification_V1_loop: [
                    {
                      vessel_identification_V1: {
                        vessel_code_01: "886446",
                        vessel_code_qualifier_08: "us_bureau_of_census_B",
                      },
                      date_time_reference_DTM: [
                        {
                          date_time_qualifier_01: "cancel_after_001",
                          date_02: "20220127",
                        },
                      ],
                    },
                  ],
                },
                detail: {
                  baseline_item_data_invoice_IT1_loop: [
                    {
                      baseline_item_data_invoice_IT1: {
                        assigned_identification_01: "1",
                        quantity_invoiced_02: "288",
                        unit_or_basis_for_measurement_code_03: "EA",
                        unit_price_04: "2.2",
                        product_service_id_qualifier_06:
                          "buyers_catalog_number_CB",
                        product_service_id_07: "094080085",
                        product_service_id_qualifier_10:
                          "upc_consumer_package_code_1_5_5_1_UP",
                        product_service_id_11: "869657000029",
                      },
                      conditions_indicator_CRC: {
                        code_category_01: "employee_mobility_00",
                        yes_no_condition_or_response_code_02: "contains_C",
                        condition_indicator_code_03: "requested_00",
                      },
                      quantity_information_QTY: [
                        {
                          quantity_qualifier_01:
                            "hospital_homebound_individuals_00",
                          quantity_02: "6",
                        },
                      ],
                      currency_CUR: {
                        entity_identifier_code_01: "alternate_insurer_00",
                        currency_code_02: "RUB",
                      },
                      additional_item_data_IT3: [
                        {
                          number_of_units_shipped_01: "3229.84",
                          unit_or_basis_for_measurement_code_02:
                            "actual_pounds_01",
                        },
                      ],
                      period_amount_PAM: [
                        {
                          quantity_qualifier_01:
                            "hospital_homebound_individuals_00",
                          quantity_02: "9",
                          composite_unit_of_measure_03: {
                            unit_or_basis_for_measurement_code_01:
                              "actual_pounds_01",
                            exponent_02: "8912.42",
                            multiplier_03: "5820.18",
                            unit_or_basis_for_measurement_code_04:
                              "actual_pounds_01",
                            exponent_05: "1714.1",
                            multiplier_06: "1001.3",
                            unit_or_basis_for_measurement_code_07:
                              "actual_pounds_01",
                            exponent_08: "9600.98",
                            multiplier_09: "4018.27",
                            unit_or_basis_for_measurement_code_10:
                              "actual_pounds_01",
                            exponent_11: "7398.71",
                            multiplier_12: "1639.01",
                            unit_or_basis_for_measurement_code_13:
                              "actual_pounds_01",
                            exponent_14: "8944.63",
                            multiplier_15: "320.28",
                          },
                        },
                      ],
                      measurements_MEA: [
                        {
                          measurement_value_03: "944.96",
                        },
                      ],
                      product_item_description_PID_loop: [
                        {
                          product_item_description_PID: {
                            item_description_type_code_01: "F",
                            agency_qualifier_code_03: "alabama_10",
                            product_description_code_04: "0004",
                            source_subqualifier_07: "e",
                            yes_no_condition_or_response_code_08: "contains_C",
                          },
                        },
                        {
                          product_item_description_PID: {
                            item_description_type_code_01: "G",
                            agency_qualifier_code_03: "alabama_11",
                            product_description_code_04: "0004",
                            source_subqualifier_07: "e",
                            yes_no_condition_or_response_code_08: "contains_C",
                          },
                        },
                      ],
                      paperwork_PWK: [
                        {
                          report_type_code_01: "product_transfer_01",
                        },
                      ],
                      marking_packaging_loading_PKG: [
                        {
                          agency_qualifier_code_03: "alabama_10",
                          packaging_description_code_04: "0005",
                        },
                      ],
                      terms_of_sale_deferred_terms_of_sale_ITD: [{}],
                      administrative_communications_contact_PER: [
                        {
                          contact_function_code_01:
                            "review_repricing_contact_1A",
                        },
                      ],
                      carrier_details_CAD: [
                        {
                          transportation_method_type_code_01:
                            "military_official_mail_6",
                          routing_05: "7O",
                        },
                      ],
                      tariff_reference_L7: [{}],
                      requested_service_schedule_SR: {},
                      service_promotion_allowance_or_charge_information_SAC_loop: [
                        {
                          service_promotion_allowance_or_charge_information_SAC: {
                            allowance_or_charge_indicator_code_01:
                              "allowance_A",
                            service_promotion_allowance_or_charge_code_02:
                              "absolute_minimum_charge_A010",
                          },
                          tax_information_TXI_loop: [
                            {
                              tax_information_TXI: {
                                tax_type_code_01: "stadium_tax_AA",
                                monetary_amount_02: "1552.17",
                              },
                              date_time_reference_DTM: {
                                date_time_qualifier_01: "cancel_after_001",
                                date_02: "20210907",
                              },
                            },
                          ],
                        },
                      ],
                      subline_item_detail_SLN_loop: [
                        {
                          subline_item_detail_SLN: {
                            assigned_identification_01: "Y6RVF31H653L47",
                            relationship_code_03: "add_A",
                          },
                          date_time_reference_DTM: {
                            date_time_qualifier_01: "cancel_after_001",
                            date_02: "20220117",
                          },
                        },
                      ],
                      code_source_information_LM_loop: [
                        {
                          code_source_information_LM: {
                            agency_qualifier_code_01: "alabama_10",
                          },
                          industry_code_identification_LQ: [{}],
                        },
                      ],
                    },
                    {
                      baseline_item_data_invoice_IT1: {
                        assigned_identification_01: "1",
                        quantity_invoiced_02: "288",
                        unit_or_basis_for_measurement_code_03: "EA",
                        unit_price_04: "2.2",
                        product_service_id_qualifier_06:
                          "TWObuyers_catalog_number_CB",
                        product_service_id_07: "094080085",
                        product_service_id_qualifier_10:
                          "upc_consumer_package_code_1_5_5_1_UP",
                        product_service_id_11: "869657000029",
                      },
                      conditions_indicator_CRC: {
                        code_category_01: "employee_mobility_00",
                        yes_no_condition_or_response_code_02: "contains_C",
                        condition_indicator_code_03: "requested_00",
                      },
                      quantity_information_QTY: [
                        {
                          quantity_qualifier_01:
                            "hospital_homebound_individuals_00",
                          quantity_02: "6",
                        },
                      ],
                      currency_CUR: {
                        entity_identifier_code_01: "alternate_insurer_00",
                        currency_code_02: "RUB",
                      },
                      additional_item_data_IT3: [
                        {
                          number_of_units_shipped_01: "3229.84",
                          unit_or_basis_for_measurement_code_02:
                            "actual_pounds_01",
                        },
                      ],
                      period_amount_PAM: [
                        {
                          quantity_qualifier_01:
                            "hospital_homebound_individuals_00",
                          quantity_02: "9",
                          composite_unit_of_measure_03: {
                            unit_or_basis_for_measurement_code_01:
                              "actual_pounds_01",
                            exponent_02: "8912.42",
                            multiplier_03: "5820.18",
                            unit_or_basis_for_measurement_code_04:
                              "actual_pounds_01",
                            exponent_05: "1714.1",
                            multiplier_06: "1001.3",
                            unit_or_basis_for_measurement_code_07:
                              "actual_pounds_01",
                            exponent_08: "9600.98",
                            multiplier_09: "4018.27",
                            unit_or_basis_for_measurement_code_10:
                              "actual_pounds_01",
                            exponent_11: "7398.71",
                            multiplier_12: "1639.01",
                            unit_or_basis_for_measurement_code_13:
                              "actual_pounds_01",
                            exponent_14: "8944.63",
                            multiplier_15: "320.28",
                          },
                        },
                      ],
                      measurements_MEA: [
                        {
                          measurement_value_03: "944.96",
                        },
                      ],
                      product_item_description_PID_loop: [
                        {
                          product_item_description_PID: {
                            item_description_type_code_01: "F2",
                            agency_qualifier_code_03: "TWOalabama_10",
                            product_description_code_04: "0004",
                            source_subqualifier_07: "e",
                            yes_no_condition_or_response_code_08: "contains_C",
                          },
                        },
                        {
                          product_item_description_PID: {
                            item_description_type_code_01: "G2",
                            agency_qualifier_code_03: "TWOalabama_11",
                            product_description_code_04: "0004",
                            source_subqualifier_07: "e",
                            yes_no_condition_or_response_code_08: "contains_C",
                          },
                        },
                      ],
                      paperwork_PWK: [
                        {
                          report_type_code_01: "product_transfer_01",
                        },
                      ],
                      marking_packaging_loading_PKG: [
                        {
                          agency_qualifier_code_03: "alabama_10",
                          packaging_description_code_04: "0005",
                        },
                      ],
                      terms_of_sale_deferred_terms_of_sale_ITD: [{}],
                      administrative_communications_contact_PER: [
                        {
                          contact_function_code_01:
                            "review_repricing_contact_1A",
                        },
                      ],
                      carrier_details_CAD: [
                        {
                          transportation_method_type_code_01:
                            "military_official_mail_6",
                          routing_05: "7O",
                        },
                      ],
                      tariff_reference_L7: [{}],
                      requested_service_schedule_SR: {},
                      service_promotion_allowance_or_charge_information_SAC_loop: [
                        {
                          service_promotion_allowance_or_charge_information_SAC: {
                            allowance_or_charge_indicator_code_01:
                              "allowance_A",
                            service_promotion_allowance_or_charge_code_02:
                              "absolute_minimum_charge_A010",
                          },
                          tax_information_TXI_loop: [
                            {
                              tax_information_TXI: {
                                tax_type_code_01: "stadium_tax_AA",
                                monetary_amount_02: "1552.17",
                              },
                              date_time_reference_DTM: {
                                date_time_qualifier_01: "cancel_after_001",
                                date_02: "20210907",
                              },
                            },
                          ],
                        },
                      ],
                      subline_item_detail_SLN_loop: [
                        {
                          subline_item_detail_SLN: {
                            assigned_identification_01: "Y6RVF31H653L47",
                            relationship_code_03: "add_A",
                          },
                          date_time_reference_DTM: {
                            date_time_qualifier_01: "cancel_after_001",
                            date_02: "20220117",
                          },
                        },
                      ],
                      code_source_information_LM_loop: [
                        {
                          code_source_information_LM: {
                            agency_qualifier_code_01: "alabama_10",
                          },
                          industry_code_identification_LQ: [{}],
                        },
                      ],
                    },
                  ],
                },
                summary: {
                  total_monetary_value_summary_TDS: {
                    amount_01: "0.06",
                  },
                  monetary_amount_information_AMT: [
                    {
                      amount_qualifier_code_01: "line_item_total_1",
                      monetary_amount_02: "4712.64",
                    },
                  ],
                  transaction_set_trailer_SE: {
                    number_of_included_segments_01: "10",
                    transaction_set_control_number_02: "713597027",
                  },
                },
                set: "810",
              },
            ],
            functional_group_trailer_GE: {
              number_of_transaction_sets_included_01: "10",
              group_control_number_02: "442560",
            },
            release: "008010",
          },
        ],
        interchange_control_trailer_IEA: {
          number_of_included_functional_groups_01: "1",
          interchange_control_number_02: "000866292",
        },
        delimiters: {
          element: "*",
          segment: "~",
          sub_element: "^",
        },
      },
    ],
    __version: "jedi@2.0",
  },
};

export { prefillData, jediData, _jediData };
