import { BusinessViewConfig } from "../types";

export const config856: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.beginning_segment_for_ship_notice_BSN",
          formDataPath: "heading.beginning_segment_for_ship_notice_BSN",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.reference_information_REF",
          formDataPath: "detail.HL_loop_shipment[0].reference_information_REF",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.reference_identification_REF",
          formDataPath:
            "detail.HL_loop_shipment[0].reference_identification_REF",
          elementType: "object",
        },
      ],
    },
    {
      width: "30%",
      items: [
        {
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.date_time_reference_DTM",
          formDataPath: "detail.HL_loop_shipment[0].date_time_reference_DTM",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.carrier_details_routing_sequence_transit_time_TD5",
          formDataPath:
            "detail.HL_loop_shipment[0].carrier_details_routing_sequence_transit_time_TD5",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.carrier_details_quantity_and_weight_TD1",
          formDataPath:
            "detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1",
          elementType: "object",
        },
      ],
    },
  ],
  [
    {
      width: "100%",
      items: [
        // shipment level addresses
        {
          title: "Addresses",
          formDataPath: "detail.HL_loop_shipment[0].name_N1_loop",
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.name_N1_loop.items",
          elementType: "addresses",
        },
        {
          title: "Addresses",
          formDataPath:
            "detail.HL_loop_shipment[0].party_identification_N1_loop",
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.party_identification_N1_loop.items",
          elementType: "addresses",
        },
        // order level addresses
        {
          formDataPath:
            "detail.HL_loop_shipment[0].HL_loop_order[0].name_N1_loop",
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.HL_loop_order.items.properties.name_N1_loop.items",
          elementType: "addresses",
        },
        {
          formDataPath:
            "detail.HL_loop_shipment[0].HL_loop_order[0].party_identification_N1_loop",
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.HL_loop_order.items.properties.party_identification_N1_loop.items",
          elementType: "addresses",
        },
      ],
    },
  ],
  [
    {
      width: "60%",
      items: [
        {
          title: "FOB Instructions",
          schemaPath:
            "properties.detail.properties.HL_loop_shipment.items.properties.fob_related_instructions_FOB",
          formDataPath:
            "detail.HL_loop_shipment[0].fob_related_instructions_FOB",
          elementType: "object",
        },
      ],
    },
  ],
];

