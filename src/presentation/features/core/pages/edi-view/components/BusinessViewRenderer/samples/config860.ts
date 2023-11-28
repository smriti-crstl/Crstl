import { BusinessViewConfig } from "../types";

export const config860: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.beginning_segment_for_purchase_order_change_BCH",
          formDataPath:
            "heading.beginning_segment_for_purchase_order_change_BCH",
          elementType: "object",
        },
      ],
    },
    {
      width: "30%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.reference_identification_REF",
          formDataPath: "heading.reference_identification_REF",
          elementType: "object",
        },
        {
          schemaPath: "properties.heading.properties.date_time_reference_DTM",
          formDataPath: "heading.date_time_reference_DTM",
          elementType: "object",
        },
      ],
    },
  ],
  [
    {
      width: "100%",
      items: [
        {
          title: "Addresses",
          formDataPath: "heading.name_N1_loop",
          schemaPath: "properties.heading.properties.name_N1_loop.items",
          elementType: "addresses",
        },
        {
          title: "Terms of Sale",
          formDataPath: "heading.terms_of_sale_deferred_terms_of_sale_ITD",
          schemaPath:
            "heading.properties.terms_of_sale_deferred_terms_of_sale_ITD",
          elementType: "arrayOfObjects",
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
            "properties.heading.properties.fob_related_instructions_FOB",
          formDataPath: "heading.fob_related_instructions_FOB",
          elementType: "object",
        },
      ],
    },
    {
      width: "40%",
      items: [
        {
          title: "Carrier Details",
          schemaPath:
            "properties.heading.properties.carrier_details_routing_sequence_transit_time_TD5",
          formDataPath:
            "heading.carrier_details_routing_sequence_transit_time_TD5",
          elementType: "object",
        },
      ],
    },
  ],
  [
    {
      width: "100%",
      items: [
        {
          formDataPath: "detail.line_item_change_POC_loop",
          schemaPath:
            "properties.detail.properties.line_item_change_POC_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
      ],
    },
  ],
];

