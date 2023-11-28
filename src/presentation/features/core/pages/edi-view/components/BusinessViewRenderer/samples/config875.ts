import { BusinessViewConfig } from "../types";

export const config875: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.purchase_order_identification_G50",
          formDataPath: "heading.purchase_order_identification_G50",
          elementType: "object",
        },
      ],
    },
    {
      width: "30%",
      items: [
        {
          schemaPath: "properties.heading.properties.date_time_G62",
          formDataPath: "heading.date_time_G62",
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
      ],
    },
  ],
  [
    {
      width: "60%",
      items: [
        {
          title: "Transportation Instructions",
          schemaPath:
            "properties.heading.properties.transportation_instructions_G66",
          formDataPath: "heading.transportation_instructions_G66",
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
          formDataPath: "detail.line_item_detail_product_G68_loop",
          schemaPath:
            "properties.detail.properties.line_item_detail_product_G68_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
        {
          formDataPath: "summary.total_purchase_order_G76",
          schemaPath: "properties.summary.properties.total_purchase_order_G76",
          elementType: "object",
        },
      ],
    },
  ],
];

