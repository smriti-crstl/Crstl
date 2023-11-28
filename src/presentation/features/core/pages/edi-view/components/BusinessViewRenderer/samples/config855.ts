import { BusinessViewConfig } from "../types";

export const config855: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.beginning_segment_for_purchase_order_acknowledgment_BAK",
          formDataPath:
            "heading.beginning_segment_for_purchase_order_acknowledgment_BAK",
          elementType: "object",
        },
      ],
    },
    {
      width: "30%",
      items: [
        {
          schemaPath: "properties.heading.properties.reference_information_REF",
          formDataPath: "heading.reference_information_REF",
          elementType: "object",
        },
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

