import { BusinessViewConfig } from "../types";

export const configRts: BusinessViewConfig = [
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
      ],
    },
  ],
  [
    {
      width: "100%",
      items: [
        {
          formDataPath: "heading.carrier_details_quantity_and_weight_TD1",
          schemaPath:
            "properties.heading.properties.carrier_details_quantity_and_weight_TD1.items",
          elementType: "arrayOfObjects",
        },
        {
          formDataPath: "detail.baseline_item_data_PO1_loop",
          schemaPath:
            "properties.detail.properties.baseline_item_data_PO1_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
      ],
    },
  ],
];

