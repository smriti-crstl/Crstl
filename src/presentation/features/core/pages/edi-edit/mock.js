const mockdata = {
  enhancedSchema: {
    properties: {
      heading: {
        type: "object",
        additionalProperties: false,
        properties: {
          transaction_set_header_ST: {
            type: "object",
            additionalProperties: false,
            properties: {
              transaction_set_identifier_code_01: {
                type: "string",
                default: "856",
                enum: ["856"],
                "x12-codes": {
                  856: {
                    code: "856",
                  },
                },
                title: "Transaction Set Identifier Code",
              },
              transaction_set_control_number_02: {
                type: "string",
                minLength: 4,
                maxLength: 9,
                title: "Transaction Set Control Number",
              },
            },
            required: [
              "transaction_set_identifier_code_01",
              "transaction_set_control_number_02",
            ],
            title: "Transaction Set Header",
          },
          beginning_segment_for_ship_notice_BSN: {
            type: "object",
            additionalProperties: false,
            properties: {
              transaction_set_purpose_code_01: {
                type: "string",
                "x12-codes": {
                  "00": {
                    description: "Original",
                    code: "00",
                  },
                },
                enum: ["00"],
                title: "Transaction Set Purpose Code",
              },
              shipment_identification_02: {
                type: "string",
                minLength: 2,
                maxLength: 30,
                title: "Shipment Identification",
              },
              date_03: {
                type: "string",
                format: "date",
                "x12-format": "CCYYMMDD",
                title: "Date",
              },
              time_04: {
                type: "string",
                "x12-format": "HHMM",
                pattern: "^([01][0-9]|2[0-3]):([0-5][0-9])$",
                title: "Time",
              },
            },
            required: [
              "transaction_set_purpose_code_01",
              "shipment_identification_02",
              "date_03",
              "time_04",
            ],
            title: "Beginning Segment For Ship Notice",
          },
          date_time_reference_DTM: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                date_time_qualifier_01: {
                  type: "string",
                  minLength: 3,
                  maxLength: 3,
                  title: "Date Time Qualifier",
                },
                date_02: {
                  type: "string",
                  format: "date",
                  "x12-format": "CCYYMMDD",
                  title: "Date",
                },
                time_03: {
                  type: "string",
                  "x12-format": "ANY_TIME_FORMAT",
                  pattern:
                    "^([01][0-9]|2[0-3]):([0-5][0-9])((:([0-5][0-9]))(\\.[0-9]{1,2})?)?$",
                  title: "Time",
                },
              },
            },
            minItems: 0,
            maxItems: 10,
            title: "Date Time Reference",
          },
        },
        required: ["beginning_segment_for_ship_notice_BSN"],
        title: "Heading",
      },
      detail: {
        type: "object",
        additionalProperties: false,
        properties: {
          HL_loop_shipment: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                carrier_details_quantity_and_weight_TD1: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      packaging_code_01: {
                        type: "string",
                        minLength: 3,
                        maxLength: 5,
                        title: "Packaging Code",
                      },
                      lading_quantity_02: {
                        minLength: 1,
                        maxLength: 7,
                        type: "string",
                        title: "Lading Quantity",
                      },
                      weight_qualifier_06: {
                        type: "string",
                        "x12-codes": {
                          G: {
                            description: "Gross Weight",
                            code: "G",
                          },
                        },
                        enum: ["G"],
                        title: "Weight Type",
                      },
                      weight_07: {
                        minLength: 1,
                        maxLength: 10,
                        type: "string",
                        title: "Weight",
                      },
                      unit_or_basis_for_measurement_code_08: {
                        type: "string",
                        "x12-codes": {
                          LB: {
                            description: "Pound",
                            code: "LB",
                          },
                        },
                        enum: ["LB"],
                        title: "Unit Or Basis For Measurement Code",
                      },
                    },
                    allOf: [
                      {
                        type: "object",
                        "x12-condition": "C0607",
                        dependentRequired: {
                          weight_qualifier_06: ["weight_07"],
                        },
                      },
                      {
                        "x12-condition": "P0708",
                        type: "object",
                        dependentRequired: {
                          weight_07: ["unit_or_basis_for_measurement_code_08"],
                          unit_or_basis_for_measurement_code_08: ["weight_07"],
                        },
                      },
                      {
                        type: "object",
                        "x12-condition": "C0102",
                        dependentRequired: {
                          packaging_code_01: ["lading_quantity_02"],
                        },
                      },
                    ],
                  },
                  minItems: 1,
                  maxItems: 20,
                  title: "Carrier Details Quantity And Weight",
                },
                carrier_details_routing_sequence_transit_time_TD5: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      transportation_method_type_code_04: {
                        description:
                          "Code specifying the method or type of transportation for the shipment.\n\nK  Back Haul\nM  Motor (Common Carrier)\n\n(Not a complete list)",
                        type: "string",
                        "x12-codes": {
                          K: {
                            description: "Backhaul",
                            code: "K",
                          },
                          M: {
                            description: "Motor (Common Carrier)",
                            code: "M",
                          },
                        },
                        enum: ["K", "M"],
                        title: "Transportation Method Type Code",
                      },
                      routing_05: {
                        type: "string",
                        minLength: 1,
                        maxLength: 35,
                        title: "Routing",
                      },
                      transit_time_direction_qualifier_10: {
                        description:
                          "Code specifying the value of time used to measure the transit time\n\nCD  Calendar Days\nWD  Working Days\nWW  5 Day Work Week\n\n(Not a complete list)",
                        type: "string",
                        "x12-codes": {
                          CD: {
                            description:
                              "Calendar Days (Includes weekends and Holidays)",
                            code: "CD",
                          },
                          WD: {
                            description:
                              "Working Days (Excludes weekends and holidays)",
                            code: "WD",
                          },
                          WW: {
                            description: "5 Day Work Week",
                            code: "WW",
                          },
                        },
                        enum: ["CD", "WD", "WW"],
                        title: "Transit Time Direction Qualifier",
                      },
                      transit_time_11: {
                        minLength: 1,
                        maxLength: 4,
                        type: "string",
                        title: "Transit Time",
                      },
                    },
                    allOf: [
                      {
                        type: "object",
                        "x12-condition": "C1011",
                        dependentRequired: {
                          transit_time_direction_qualifier_10: [
                            "transit_time_11",
                          ],
                        },
                      },
                    ],
                  },
                  minItems: 1,
                  maxItems: 12,
                  title: "Carrier Details Routing Sequence Transit Time",
                },
                reference_information_REF: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      reference_identification_qualifier_01: {
                        type: "string",
                        "x12-codes": {
                          BM: {
                            description: "Bill of Lading Number",
                            code: "BM",
                          },
                        },
                        enum: ["BM"],
                        title: "Reference Identification Qualifier",
                      },
                      reference_identification_02: {
                        type: "string",
                        minLength: 1,
                        maxLength: 50,
                        title: "Reference Identification",
                      },
                    },
                    description:
                      "To specify identifying information\n\nBM  Bill of Lading Number",
                  },
                  minItems: 1,
                  title: "Reference Information",
                },
                date_time_reference_DTM: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      date_time_qualifier_01: {
                        type: "string",
                        "x12-codes": {
                          "011": {
                            description: "Shipped",
                            code: "011",
                          },
                        },
                        enum: ["011"],
                        title: "Date Time Qualifier",
                      },
                      date_02: {
                        type: "string",
                        format: "date",
                        "x12-format": "CCYYMMDD",
                        title: "Date",
                      },
                    },
                  },
                  minItems: 1,
                  maxItems: 10,
                  title: "Date Time Reference",
                },
                party_identification_N1_loop: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      party_identification_N1: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          entity_identifier_code_01: {
                            type: "string",
                            "x12-codes": {
                              ST: {
                                description: "Ship To",
                                code: "ST",
                              },
                            },
                            enum: ["ST"],
                            title: "Entity Identifier Code",
                          },
                          name_02: {
                            type: "string",
                            minLength: 1,
                            maxLength: 60,
                            title: "Name",
                          },
                          identification_code_qualifier_03: {
                            type: "string",
                            "x12-codes": {
                              UL: {
                                description: "Global Location Number (GLN)",
                                code: "UL",
                              },
                            },
                            enum: ["UL"],
                            title: "Identification Code Qualifier",
                          },
                          identification_code_04: {
                            type: "string",
                            minLength: 2,
                            maxLength: 80,
                            title: "Identification Code",
                          },
                        },
                        allOf: [
                          {
                            "x12-condition": "R0203",
                            anyOf: [
                              {
                                required: ["name_02"],
                                type: "object",
                                properties: {
                                  name_02: true,
                                },
                              },
                              {
                                required: ["identification_code_qualifier_03"],
                                type: "object",
                                properties: {
                                  identification_code_qualifier_03: true,
                                },
                              },
                            ],
                          },
                          {
                            "x12-condition": "P0304",
                            type: "object",
                            dependentRequired: {
                              identification_code_qualifier_03: [
                                "identification_code_04",
                              ],
                              identification_code_04: [
                                "identification_code_qualifier_03",
                              ],
                            },
                          },
                        ],
                        title: "Party Identification",
                      },
                      party_location_N3: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            address_information_01: {
                              type: "string",
                              minLength: 1,
                              maxLength: 55,
                              title: "Address Information",
                            },
                          },
                        },
                        minItems: 1,
                        maxItems: 2,
                        title: "Party Location",
                      },
                      geographic_location_N4: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          city_name_01: {
                            type: "string",
                            minLength: 2,
                            maxLength: 30,
                            title: "City Name",
                          },
                          state_or_province_code_02: {
                            type: "string",
                            minLength: 2,
                            maxLength: 2,
                            title: "State or Province Code",
                          },
                          postal_code_03: {
                            type: "string",
                            minLength: 3,
                            maxLength: 15,
                            title: "Zip or Postal Code",
                          },
                        },
                        title: "Geographic Location",
                      },
                    },
                    description:
                      "To identify a party by type of organization, name, and code",
                    required: ["party_identification_N1"],
                  },
                  title: "Party Identification",
                },
                HL_loop_order: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      purchase_order_reference_PRF: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          purchase_order_number_01: {
                            type: "string",
                            minLength: 1,
                            maxLength: 22,
                            title: "Purchase Order Number",
                          },
                        },
                        title: "Purchase Order Reference",
                      },
                      reference_information_REF: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            reference_identification_qualifier_01: {
                              type: "string",
                              "x12-codes": {
                                IV: {
                                  description: "Seller's Invoice Number",
                                  code: "IV",
                                },
                              },
                              enum: ["IV"],
                              title: "Reference Identification Qualifier",
                            },
                            reference_identification_02: {
                              type: "string",
                              minLength: 1,
                              maxLength: 50,
                              title: "Reference Identification",
                            },
                          },
                        },
                        minItems: 1,
                        title: "Reference Information",
                      },
                      HL_loop_pack: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            marks_and_numbers_information_MAN: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                  marks_and_numbers_qualifier_01: {
                                    type: "string",
                                    "x12-codes": {
                                      GM: {
                                        description:
                                          "EAN.UCC Serial Shipping Container Code (SSCC) and Application Identifier",
                                        code: "GM",
                                      },
                                    },
                                    enum: ["GM"],
                                    title: "Marks And Numbers Qualifier",
                                  },
                                  marks_and_numbers_02: {
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 48,
                                    title: "Marks And Numbers",
                                  },
                                  marks_and_numbers_03: {
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 48,
                                    title: "Marks And Numbers",
                                  },
                                  marks_and_numbers_qualifier_04: {
                                    type: "string",
                                    "x12-codes": {
                                      UC: {
                                        description:
                                          "U.P.C. Shipping Container Code",
                                        code: "UC",
                                      },
                                    },
                                    enum: ["UC"],
                                    title: "Marks And Numbers Qualifier",
                                  },
                                  marks_and_numbers_05: {
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 48,
                                    title: "Marks And Numbers",
                                  },
                                  marks_and_numbers_06: {
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 48,
                                    title: "Marks And Numbers",
                                  },
                                },
                                allOf: [
                                  {
                                    "x12-condition": "P0405",
                                    type: "object",
                                    dependentRequired: {
                                      marks_and_numbers_qualifier_04: [
                                        "marks_and_numbers_05",
                                      ],
                                      marks_and_numbers_05: [
                                        "marks_and_numbers_qualifier_04",
                                      ],
                                    },
                                  },
                                  {
                                    type: "object",
                                    "x12-condition": "C0605",
                                    dependentRequired: {
                                      marks_and_numbers_06: [
                                        "marks_and_numbers_05",
                                      ],
                                    },
                                  },
                                ],
                              },
                              minItems: 1,
                              title: "Marks And Numbers Information",
                            },
                            HL_loop_item: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: false,
                                properties: {
                                  item_identification_LIN: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                      product_service_id_qualifier_02: {
                                        type: "string",
                                        minLength: 2,
                                        maxLength: 2,
                                        title: "Product Service Id Qualifier",
                                      },
                                      product_service_id_03: {
                                        type: "string",
                                        minLength: 1,
                                        maxLength: 48,
                                        title: "Product Service Id",
                                      },
                                      product_service_id_qualifier_04: {
                                        type: "string",
                                        minLength: 2,
                                        maxLength: 2,
                                        title: "Product Service Id Qualifier",
                                      },
                                      product_service_id_05: {
                                        type: "string",
                                        minLength: 1,
                                        maxLength: 48,
                                        title: "Product Service Id",
                                      },
                                    },
                                    allOf: [
                                      {
                                        "x12-condition": "P0405",
                                        type: "object",
                                        dependentRequired: {
                                          product_service_id_qualifier_04: [
                                            "product_service_id_05",
                                          ],
                                          product_service_id_05: [
                                            "product_service_id_qualifier_04",
                                          ],
                                        },
                                      },
                                    ],
                                    title: "Item Identification",
                                  },
                                  item_detail_shipment_SN1: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                      number_of_units_shipped_02: {
                                        minLength: 1,
                                        maxLength: 10,
                                        type: "string",
                                        title: "Number Of Units Shipped",
                                      },
                                      unit_or_basis_for_measurement_code_03: {
                                        type: "string",
                                        minLength: 2,
                                        maxLength: 2,
                                        title:
                                          "Unit Or Basis For Measurement Code",
                                      },
                                    },
                                    title: "Item Detail Shipment",
                                  },
                                  item_physical_details_PO4: {
                                    type: "object",
                                    additionalProperties: false,
                                    properties: {
                                      pack_01: {
                                        minLength: 1,
                                        maxLength: 6,
                                        type: "string",
                                        title: "Pack",
                                      },
                                      size_02: {
                                        minLength: 1,
                                        maxLength: 8,
                                        type: "string",
                                        title: "Size",
                                      },
                                      unit_or_basis_for_measurement_code_03: {
                                        type: "string",
                                        minLength: 2,
                                        maxLength: 2,
                                        title:
                                          "Unit Or Basis For Measurement Code",
                                      },
                                      inner_pack_14: {
                                        minLength: 1,
                                        maxLength: 6,
                                        type: "string",
                                        title: "Inner Pack",
                                      },
                                    },
                                    allOf: [
                                      {
                                        "x12-condition": "P0203",
                                        type: "object",
                                        dependentRequired: {
                                          size_02: [
                                            "unit_or_basis_for_measurement_code_03",
                                          ],
                                          unit_or_basis_for_measurement_code_03: [
                                            "size_02",
                                          ],
                                        },
                                      },
                                    ],
                                    title: "Item Physical Details",
                                  },
                                  product_item_description_PID: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      additionalProperties: false,
                                      properties: {
                                        item_description_type_01: {
                                          type: "string",
                                          minLength: 1,
                                          maxLength: 1,
                                          title: "Item Description Type",
                                        },
                                        description_05: {
                                          type: "string",
                                          minLength: 1,
                                          maxLength: 80,
                                          title: "Description",
                                        },
                                      },
                                    },
                                    minItems: 1,
                                    maxItems: 200,
                                    title: "Product Item Description",
                                  },
                                },
                              },
                              title: "Item",
                            },
                          },
                          required: ["HL_loop_item"],
                        },
                        title: "Pack",
                      },
                    },
                    required: ["HL_loop_pack"],
                  },
                  title: "Order",
                },
              },
              required: ["HL_loop_order"],
            },
            title: "Shipment",
          },
        },
        required: ["HL_loop_shipment"],
        title: "Detail",
      },
      summary: {
        type: "object",
        additionalProperties: false,
        properties: {
          transaction_totals_CTT: {
            type: "object",
            additionalProperties: false,
            properties: {
              number_of_line_items_01: {
                minLength: 1,
                maxLength: 6,
                type: "string",
                title: "Number Of Line Items",
              },
            },
            required: ["number_of_line_items_01"],
            title: "Transaction Totals",
          },
          transaction_set_trailer_SE: {
            type: "object",
            additionalProperties: false,
            properties: {
              number_of_included_segments_01: {
                minLength: 1,
                maxLength: 10,
                type: "string",
                title: "Number Of Included Segments",
              },
              transaction_set_control_number_02: {
                type: "string",
                minLength: 4,
                maxLength: 9,
                title: "Transaction Set Control Number",
              },
            },
            required: [
              "number_of_included_segments_01",
              "transaction_set_control_number_02",
            ],
            title: "Transaction Set Trailer",
          },
        },
        required: [],
        title: "Summary",
      },
    },
  },
  quickEntryUISchema: {
    properties: {
      heading: {
        transaction_set_header_ST: {
          transaction_set_identifier_code_01: {
            classNames: "no-display transaction_set_identifier_code_01",
            "ui:disabled": true,
          },
          transaction_set_control_number_02: {
            classNames: "no-display transaction_set_control_number_02",
            "ui:disabled": true,
          },
          classNames: "no-display transaction_set_header_ST",
        },
        beginning_segment_for_ship_notice_BSN: {
          transaction_set_purpose_code_01: {
            classNames: "no-display transaction_set_purpose_code_01",
            "ui:disabled": true,
          },
          shipment_identification_02: {
            classNames: "no-display shipment_identification_02",
          },
          date_03: {
            classNames: "no-display date_03",
          },
          time_04: {
            classNames: "no-display time_04",
          },
          classNames: "no-display beginning_segment_for_ship_notice_BSN",
        },
        date_time_reference_DTM: {
          items: {
            date_time_qualifier_01: {
              classNames: "no-display date_time_qualifier_01",
            },
            date_02: {
              classNames: "no-display date_02",
            },
            time_03: {
              classNames: "no-display time_03",
            },
          },
          classNames: "no-display date_time_reference_DTM",
        },
        classNames: "no-display heading",
      },
      detail: {
        HL_loop_shipment: {
          items: {
            carrier_details_quantity_and_weight_TD1: {
              items: {
                packaging_code_01: {
                  classNames: "no-display packaging_code_01",
                },
                lading_quantity_02: {
                  classNames: "no-display lading_quantity_02",
                },
                weight_qualifier_06: {
                  classNames: "weight_qualifier_06",
                },
                weight_07: {
                  classNames: "weight_07",
                },
                unit_or_basis_for_measurement_code_08: {
                  classNames: "unit_or_basis_for_measurement_code_08",
                },
              },
              classNames: "carrier_details_quantity_and_weight_TD1",
            },
            carrier_details_routing_sequence_transit_time_TD5: {
              items: {
                transportation_method_type_code_04: {
                  classNames: "no-display transportation_method_type_code_04",
                },
                routing_05: {
                  classNames: "routing_05",
                },
                transit_time_direction_qualifier_10: {
                  classNames: "no-display transit_time_direction_qualifier_10",
                },
                transit_time_11: {
                  classNames: "no-display transit_time_11",
                },
              },
              classNames: "carrier_details_routing_sequence_transit_time_TD5",
            },
            reference_information_REF: {
              items: {
                reference_identification_qualifier_01: {
                  classNames: "reference_identification_qualifier_01",
                },
                reference_identification_02: {
                  classNames: "reference_identification_02",
                },
              },
              classNames: "reference_information_REF",
            },
            date_time_reference_DTM: {
              items: {
                date_time_qualifier_01: {
                  classNames: "date_time_qualifier_01",
                },
                date_02: {
                  classNames: "date_02",
                },
              },
              classNames: "date_time_reference_DTM",
            },
            party_identification_N1_loop: {
              items: {
                party_identification_N1: {
                  entity_identifier_code_01: {
                    classNames: "no-display entity_identifier_code_01",
                  },
                  name_02: {
                    classNames: "no-display name_02",
                  },
                  identification_code_qualifier_03: {
                    classNames: "no-display identification_code_qualifier_03",
                  },
                  identification_code_04: {
                    classNames: "no-display identification_code_04",
                  },
                  classNames: "no-display party_identification_N1",
                },
                party_location_N3: {
                  items: {
                    address_information_01: {
                      classNames: "no-display address_information_01",
                    },
                  },
                  classNames: "no-display party_location_N3",
                },
                geographic_location_N4: {
                  city_name_01: {
                    classNames: "no-display city_name_01",
                  },
                  state_or_province_code_02: {
                    classNames: "no-display state_or_province_code_02",
                  },
                  postal_code_03: {
                    classNames: "no-display postal_code_03",
                  },
                  classNames: "no-display geographic_location_N4",
                },
              },
              classNames: "no-display party_identification_N1_loop",
            },
            HL_loop_order: {
              items: {
                purchase_order_reference_PRF: {
                  purchase_order_number_01: {
                    classNames: "no-display purchase_order_number_01",
                  },
                  classNames: "no-display purchase_order_reference_PRF",
                },
                reference_information_REF: {
                  items: {
                    reference_identification_qualifier_01: {
                      classNames:
                        "no-display reference_identification_qualifier_01",
                    },
                    reference_identification_02: {
                      classNames: "no-display reference_identification_02",
                    },
                  },
                  classNames: "no-display reference_information_REF",
                },
                HL_loop_pack: {
                  items: {
                    marks_and_numbers_information_MAN: {
                      items: {
                        marks_and_numbers_qualifier_01: {
                          classNames:
                            "no-display marks_and_numbers_qualifier_01",
                        },
                        marks_and_numbers_02: {
                          classNames: "no-display marks_and_numbers_02",
                        },
                        marks_and_numbers_03: {
                          classNames: "no-display marks_and_numbers_03",
                        },
                        marks_and_numbers_qualifier_04: {
                          classNames:
                            "no-display marks_and_numbers_qualifier_04",
                        },
                        marks_and_numbers_05: {
                          classNames: "no-display marks_and_numbers_05",
                        },
                        marks_and_numbers_06: {
                          classNames: "no-display marks_and_numbers_06",
                        },
                      },
                      classNames:
                        "no-display marks_and_numbers_information_MAN",
                    },
                    HL_loop_item: {
                      items: {
                        item_identification_LIN: {
                          product_service_id_qualifier_02: {
                            classNames:
                              "no-display product_service_id_qualifier_02",
                          },
                          product_service_id_03: {
                            classNames: "no-display product_service_id_03",
                          },
                          product_service_id_qualifier_04: {
                            classNames:
                              "no-display product_service_id_qualifier_04",
                          },
                          product_service_id_05: {
                            classNames: "no-display product_service_id_05",
                          },
                          classNames: "no-display item_identification_LIN",
                        },
                        item_detail_shipment_SN1: {
                          number_of_units_shipped_02: {
                            classNames: "no-display number_of_units_shipped_02",
                          },
                          unit_or_basis_for_measurement_code_03: {
                            classNames:
                              "no-display unit_or_basis_for_measurement_code_03",
                          },
                          classNames: "no-display item_detail_shipment_SN1",
                        },
                        item_physical_details_PO4: {
                          pack_01: {
                            classNames: "no-display pack_01",
                          },
                          size_02: {
                            classNames: "no-display size_02",
                          },
                          unit_or_basis_for_measurement_code_03: {
                            classNames:
                              "no-display unit_or_basis_for_measurement_code_03",
                          },
                          inner_pack_14: {
                            classNames: "no-display inner_pack_14",
                          },
                          classNames: "no-display item_physical_details_PO4",
                        },
                        product_item_description_PID: {
                          items: {
                            item_description_type_01: {
                              classNames: "no-display item_description_type_01",
                            },
                            description_05: {
                              classNames: "no-display description_05",
                            },
                          },
                          classNames: "no-display product_item_description_PID",
                        },
                      },
                      classNames: "no-display HL_loop_item",
                    },
                  },
                  classNames: "HL_loop_pack",
                  "ui:widget": "customMclanePackTable",
                },
              },
              classNames: "HL_loop_order",
            },
          },
          classNames: "HL_loop_shipment",
        },
        classNames: "detail",
      },
      summary: {
        transaction_totals_CTT: {
          number_of_line_items_01: {
            classNames: "no-display number_of_line_items_01",
            "ui:disabled": true,
          },
          classNames: "no-display transaction_totals_CTT",
        },
        transaction_set_trailer_SE: {
          number_of_included_segments_01: {
            classNames: "no-display number_of_included_segments_01",
            "ui:disabled": true,
          },
          transaction_set_control_number_02: {
            classNames: "no-display transaction_set_control_number_02",
            "ui:disabled": true,
          },
          classNames: "no-display transaction_set_trailer_SE",
        },
        classNames: "no-display summary",
      },
    },
  },
  fullEntryUISchema: {
    properties: {
      heading: {
        transaction_set_header_ST: {
          transaction_set_identifier_code_01: {
            classNames: "transaction_set_identifier_code_01",
            "ui:disabled": true,
          },
          transaction_set_control_number_02: {
            classNames: "transaction_set_control_number_02",
            "ui:disabled": true,
          },
          classNames: "transaction_set_header_ST",
        },
        beginning_segment_for_ship_notice_BSN: {
          transaction_set_purpose_code_01: {
            classNames: "transaction_set_purpose_code_01",
            "ui:disabled": true,
          },
          shipment_identification_02: {
            classNames: "shipment_identification_02",
          },
          date_03: {
            classNames: "date_03",
          },
          time_04: {
            classNames: "time_04",
          },
          classNames: "beginning_segment_for_ship_notice_BSN",
        },
        date_time_reference_DTM: {
          items: {
            date_time_qualifier_01: {
              classNames: "date_time_qualifier_01",
            },
            date_02: {
              classNames: "date_02",
            },
            time_03: {
              classNames: "time_03",
            },
          },
          classNames: "date_time_reference_DTM",
        },
        classNames: "heading",
      },
      detail: {
        HL_loop_shipment: {
          items: {
            carrier_details_quantity_and_weight_TD1: {
              items: {
                packaging_code_01: {
                  classNames: "packaging_code_01",
                },
                lading_quantity_02: {
                  classNames: "lading_quantity_02",
                },
                weight_qualifier_06: {
                  classNames: "weight_qualifier_06",
                },
                weight_07: {
                  classNames: "weight_07",
                },
                unit_or_basis_for_measurement_code_08: {
                  classNames: "unit_or_basis_for_measurement_code_08",
                },
              },
              classNames: "carrier_details_quantity_and_weight_TD1",
            },
            carrier_details_routing_sequence_transit_time_TD5: {
              items: {
                transportation_method_type_code_04: {
                  classNames: "transportation_method_type_code_04",
                },
                routing_05: {
                  classNames: "routing_05",
                },
                transit_time_direction_qualifier_10: {
                  classNames: "transit_time_direction_qualifier_10",
                },
                transit_time_11: {
                  classNames: "transit_time_11",
                },
              },
              classNames: "carrier_details_routing_sequence_transit_time_TD5",
            },
            reference_information_REF: {
              items: {
                reference_identification_qualifier_01: {
                  classNames: "reference_identification_qualifier_01",
                },
                reference_identification_02: {
                  classNames: "reference_identification_02",
                },
              },
              classNames: "reference_information_REF",
            },
            date_time_reference_DTM: {
              items: {
                date_time_qualifier_01: {
                  classNames: "date_time_qualifier_01",
                },
                date_02: {
                  classNames: "date_02",
                },
              },
              classNames: "date_time_reference_DTM",
            },
            party_identification_N1_loop: {
              items: {
                party_identification_N1: {
                  entity_identifier_code_01: {
                    classNames: "entity_identifier_code_01",
                  },
                  name_02: {
                    classNames: "name_02",
                  },
                  identification_code_qualifier_03: {
                    classNames: "identification_code_qualifier_03",
                  },
                  identification_code_04: {
                    classNames: "identification_code_04",
                  },
                  classNames: "party_identification_N1",
                },
                party_location_N3: {
                  items: {
                    address_information_01: {
                      classNames: "address_information_01",
                    },
                  },
                  classNames: "party_location_N3",
                },
                geographic_location_N4: {
                  city_name_01: {
                    classNames: "city_name_01",
                  },
                  state_or_province_code_02: {
                    classNames: "state_or_province_code_02",
                  },
                  postal_code_03: {
                    classNames: "postal_code_03",
                  },
                  classNames: "geographic_location_N4",
                },
              },
              classNames: "party_identification_N1_loop",
            },
            HL_loop_order: {
              items: {
                purchase_order_reference_PRF: {
                  purchase_order_number_01: {
                    classNames: "purchase_order_number_01",
                  },
                  classNames: "purchase_order_reference_PRF",
                },
                reference_information_REF: {
                  items: {
                    reference_identification_qualifier_01: {
                      classNames: "reference_identification_qualifier_01",
                    },
                    reference_identification_02: {
                      classNames: "reference_identification_02",
                    },
                  },
                  classNames: "reference_information_REF",
                },
                HL_loop_pack: {
                  items: {
                    marks_and_numbers_information_MAN: {
                      items: {
                        marks_and_numbers_qualifier_01: {
                          classNames: "marks_and_numbers_qualifier_01",
                        },
                        marks_and_numbers_02: {
                          classNames: "marks_and_numbers_02",
                        },
                        marks_and_numbers_03: {
                          classNames: "marks_and_numbers_03",
                        },
                        marks_and_numbers_qualifier_04: {
                          classNames: "marks_and_numbers_qualifier_04",
                        },
                        marks_and_numbers_05: {
                          classNames: "marks_and_numbers_05",
                        },
                        marks_and_numbers_06: {
                          classNames: "marks_and_numbers_06",
                        },
                      },
                      classNames: "marks_and_numbers_information_MAN",
                    },
                    HL_loop_item: {
                      items: {
                        item_identification_LIN: {
                          product_service_id_qualifier_02: {
                            classNames: "product_service_id_qualifier_02",
                          },
                          product_service_id_03: {
                            classNames: "product_service_id_03",
                          },
                          product_service_id_qualifier_04: {
                            classNames: "product_service_id_qualifier_04",
                          },
                          product_service_id_05: {
                            classNames: "product_service_id_05",
                          },
                          classNames: "item_identification_LIN",
                        },
                        item_detail_shipment_SN1: {
                          number_of_units_shipped_02: {
                            classNames: "number_of_units_shipped_02",
                          },
                          unit_or_basis_for_measurement_code_03: {
                            classNames: "unit_or_basis_for_measurement_code_03",
                          },
                          classNames: "item_detail_shipment_SN1",
                        },
                        item_physical_details_PO4: {
                          pack_01: {
                            classNames: "pack_01",
                          },
                          size_02: {
                            classNames: "size_02",
                          },
                          unit_or_basis_for_measurement_code_03: {
                            classNames: "unit_or_basis_for_measurement_code_03",
                          },
                          inner_pack_14: {
                            classNames: "inner_pack_14",
                          },
                          classNames: "item_physical_details_PO4",
                        },
                        product_item_description_PID: {
                          items: {
                            item_description_type_01: {
                              classNames: "item_description_type_01",
                            },
                            description_05: {
                              classNames: "description_05",
                            },
                          },
                          classNames: "product_item_description_PID",
                        },
                      },
                      classNames: "HL_loop_item",
                    },
                  },
                  classNames: "HL_loop_pack",
                },
              },
              classNames: "HL_loop_order",
            },
          },
          classNames: "HL_loop_shipment",
        },
        classNames: "detail",
      },
      summary: {
        transaction_totals_CTT: {
          number_of_line_items_01: {
            classNames: "number_of_line_items_01",
            "ui:disabled": true,
          },
          classNames: "transaction_totals_CTT",
        },
        transaction_set_trailer_SE: {
          number_of_included_segments_01: {
            classNames: "number_of_included_segments_01",
            "ui:disabled": true,
          },
          transaction_set_control_number_02: {
            classNames: "transaction_set_control_number_02",
            "ui:disabled": true,
          },
          classNames: "transaction_set_trailer_SE",
        },
        classNames: "summary",
      },
    },
  },
  viewModeUISchema: {
    properties: {
      heading: {
        transaction_set_header_ST: {
          transaction_set_identifier_code_01: {
            classNames: "transaction_set_identifier_code_01",
            "ui:disabled": true,
          },
          transaction_set_control_number_02: {
            classNames: "transaction_set_control_number_02",
            "ui:disabled": true,
          },
          classNames: "transaction_set_header_ST half-width no-display",
        },
        beginning_segment_for_ship_notice_BSN: {
          transaction_set_purpose_code_01: {
            classNames: "transaction_set_purpose_code_01",
            "ui:disabled": true,
          },
          shipment_identification_02: {
            classNames: "shipment_identification_02",
          },
          date_03: {
            classNames: "date_03",
          },
          time_04: {
            classNames: "time_04",
          },
          classNames: "beginning_segment_for_ship_notice_BSN half-width",
        },
        date_time_reference_DTM: {
          items: {
            date_time_qualifier_01: {
              classNames: "date_time_qualifier_01",
            },
            date_02: {
              classNames: "date_02",
            },
            time_03: {
              classNames: "time_03",
            },
          },
          classNames: "date_time_reference_DTM half-width",
        },
        classNames: "heading full-width",
      },
      detail: {
        HL_loop_shipment: {
          items: {
            carrier_details_quantity_and_weight_TD1: {
              items: {
                packaging_code_01: {
                  classNames: "packaging_code_01",
                },
                lading_quantity_02: {
                  classNames: "lading_quantity_02",
                },
                weight_qualifier_06: {
                  classNames: "weight_qualifier_06",
                },
                weight_07: {
                  classNames: "weight_07",
                },
                unit_or_basis_for_measurement_code_08: {
                  classNames: "unit_or_basis_for_measurement_code_08",
                },
              },
              classNames: "carrier_details_quantity_and_weight_TD1",
            },
            carrier_details_routing_sequence_transit_time_TD5: {
              items: {
                transportation_method_type_code_04: {
                  classNames: "transportation_method_type_code_04",
                },
                routing_05: {
                  classNames: "routing_05",
                },
                transit_time_direction_qualifier_10: {
                  classNames: "transit_time_direction_qualifier_10",
                },
                transit_time_11: {
                  classNames: "transit_time_11",
                },
              },
              classNames: "carrier_details_routing_sequence_transit_time_TD5",
            },
            reference_information_REF: {
              items: {
                reference_identification_qualifier_01: {
                  classNames: "reference_identification_qualifier_01",
                },
                reference_identification_02: {
                  classNames: "reference_identification_02",
                },
              },
              classNames: "reference_information_REF",
            },
            date_time_reference_DTM: {
              items: {
                date_time_qualifier_01: {
                  classNames: "date_time_qualifier_01",
                },
                date_02: {
                  classNames: "date_02",
                },
              },
              classNames: "date_time_reference_DTM",
            },
            party_identification_N1_loop: {
              items: {
                party_identification_N1: {
                  entity_identifier_code_01: {
                    classNames: "entity_identifier_code_01",
                  },
                  name_02: {
                    classNames: "name_02",
                  },
                  identification_code_qualifier_03: {
                    classNames: "identification_code_qualifier_03",
                  },
                  identification_code_04: {
                    classNames: "identification_code_04",
                  },
                  classNames: "party_identification_N1",
                },
                party_location_N3: {
                  items: {
                    address_information_01: {
                      classNames: "address_information_01",
                    },
                  },
                  classNames: "party_location_N3",
                },
                geographic_location_N4: {
                  city_name_01: {
                    classNames: "city_name_01",
                  },
                  state_or_province_code_02: {
                    classNames: "state_or_province_code_02",
                  },
                  postal_code_03: {
                    classNames: "postal_code_03",
                  },
                  classNames: "geographic_location_N4",
                },
              },
              classNames: "party_identification_N1_loop",
            },
            HL_loop_order: {
              items: {
                purchase_order_reference_PRF: {
                  purchase_order_number_01: {
                    classNames: "purchase_order_number_01",
                  },
                  classNames: "purchase_order_reference_PRF",
                },
                reference_information_REF: {
                  items: {
                    reference_identification_qualifier_01: {
                      classNames: "reference_identification_qualifier_01",
                    },
                    reference_identification_02: {
                      classNames: "reference_identification_02",
                    },
                  },
                  classNames: "reference_information_REF",
                },
                HL_loop_pack: {
                  items: {
                    marks_and_numbers_information_MAN: {
                      items: {
                        marks_and_numbers_qualifier_01: {
                          classNames: "marks_and_numbers_qualifier_01",
                        },
                        marks_and_numbers_02: {
                          classNames: "marks_and_numbers_02",
                        },
                        marks_and_numbers_03: {
                          classNames: "marks_and_numbers_03",
                        },
                        marks_and_numbers_qualifier_04: {
                          classNames: "marks_and_numbers_qualifier_04",
                        },
                        marks_and_numbers_05: {
                          classNames: "marks_and_numbers_05",
                        },
                        marks_and_numbers_06: {
                          classNames: "marks_and_numbers_06",
                        },
                      },
                      classNames: "marks_and_numbers_information_MAN",
                    },
                    HL_loop_item: {
                      items: {
                        item_identification_LIN: {
                          product_service_id_qualifier_02: {
                            classNames: "product_service_id_qualifier_02",
                          },
                          product_service_id_03: {
                            classNames: "product_service_id_03",
                          },
                          product_service_id_qualifier_04: {
                            classNames: "product_service_id_qualifier_04",
                          },
                          product_service_id_05: {
                            classNames: "product_service_id_05",
                          },
                          classNames: "item_identification_LIN",
                        },
                        item_detail_shipment_SN1: {
                          number_of_units_shipped_02: {
                            classNames: "number_of_units_shipped_02",
                          },
                          unit_or_basis_for_measurement_code_03: {
                            classNames: "unit_or_basis_for_measurement_code_03",
                          },
                          classNames: "item_detail_shipment_SN1",
                        },
                        item_physical_details_PO4: {
                          pack_01: {
                            classNames: "pack_01",
                          },
                          size_02: {
                            classNames: "size_02",
                          },
                          unit_or_basis_for_measurement_code_03: {
                            classNames: "unit_or_basis_for_measurement_code_03",
                          },
                          inner_pack_14: {
                            classNames: "inner_pack_14",
                          },
                          classNames: "item_physical_details_PO4",
                        },
                        product_item_description_PID: {
                          items: {
                            item_description_type_01: {
                              classNames: "item_description_type_01",
                            },
                            description_05: {
                              classNames: "description_05",
                            },
                          },
                          classNames: "product_item_description_PID",
                        },
                      },
                      classNames: "HL_loop_item",
                    },
                  },
                  classNames: "HL_loop_pack",
                },
              },
              classNames: "HL_loop_order",
            },
          },
          classNames: "HL_loop_shipment full-width",
        },
        classNames: "detail full-width",
      },
      summary: {
        transaction_totals_CTT: {
          number_of_line_items_01: {
            classNames: "number_of_line_items_01",
            "ui:disabled": true,
          },
          classNames: "transaction_totals_CTT half-width",
        },
        transaction_set_trailer_SE: {
          number_of_included_segments_01: {
            classNames: "number_of_included_segments_01",
            "ui:disabled": true,
          },
          transaction_set_control_number_02: {
            classNames: "transaction_set_control_number_02",
            "ui:disabled": true,
          },
          classNames: "transaction_set_trailer_SE half-width no-display",
        },
        classNames: "summary full-width",
      },
    },
  },
};

export { mockdata };

