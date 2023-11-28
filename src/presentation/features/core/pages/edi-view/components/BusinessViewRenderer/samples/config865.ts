import { BusinessViewConfig } from "../types";

export const config865: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.beginning_segment_for_purchase_order_change_acknowledgment_BCA",
          formDataPath:
            "heading.beginning_segment_for_purchase_order_change_acknowledgment_BCA",
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
          formDataPath: "detail.line_item_change_POC_loop",
          schemaPath:
            "properties.detail.properties.line_item_change_POC_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
      ],
    },
  ],
];

