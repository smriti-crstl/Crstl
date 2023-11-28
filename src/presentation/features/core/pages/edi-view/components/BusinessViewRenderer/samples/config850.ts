import { BusinessViewConfig } from "../types";

export const config850: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.beginning_segment_for_purchase_order_BEG",
          formDataPath: "heading.beginning_segment_for_purchase_order_BEG",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.heading.properties.administrative_communications_contact_PER",
          formDataPath: "heading.administrative_communications_contact_PER",
          elementType: "object",
        },
      ],
    },
    {
      width: "30%",
      items: [
        {
          schemaPath: "properties.heading.properties.date_time_reference_DTM",
          formDataPath: "heading.date_time_reference_DTM",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.heading.properties.reference_identification_REF",
          formDataPath: "heading.reference_identification_REF",
          elementType: "object",
        },
        {
          schemaPath: "properties.heading.properties.reference_information_REF",
          formDataPath: "heading.reference_information_REF",
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
          title: "Addresses",
          formDataPath: "heading.party_identification_N1_loop",
          schemaPath:
            "properties.heading.properties.party_identification_N1_loop.items",
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
          formDataPath:
            "heading.service_promotion_allowance_or_charge_information_SAC_loop",
          schemaPath:
            "properties.heading.properties.service_promotion_allowance_or_charge_information_SAC_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
        {
          title: "Terms of Sale",
          formDataPath: "heading.terms_of_sale_deferred_terms_of_sale_ITD",
          schemaPath:
            "properties.heading.properties.terms_of_sale_deferred_terms_of_sale_ITD.items",
          elementType: "arrayOfObjects",
        },
        {
          formDataPath: "detail.baseline_item_data_PO1_loop",
          schemaPath:
            "properties.detail.properties.baseline_item_data_PO1_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
        {
          formDataPath: "summary.transaction_totals_CTT_loop",
          schemaPath:
            "properties.summary.properties.transaction_totals_CTT_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
      ],
    },
  ],
];

