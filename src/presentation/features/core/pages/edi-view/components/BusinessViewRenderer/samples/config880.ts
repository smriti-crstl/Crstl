import { BusinessViewConfig } from "../types";

export const config880: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.invoice_identification_G01",
          formDataPath: "heading.invoice_identification_G01",
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
        {
          title: "Terms of Sale",
          formDataPath: "heading.terms_of_sale_G23",
          schemaPath: "properties.heading.properties.terms_of_sale_G23.items",
          elementType: "arrayOfObjects",
        },
        {
          formDataPath: "detail.item_detail_invoice_G17_loop",
          schemaPath:
            "properties.detail.properties.item_detail_invoice_G17_loop.items.properties",
          elementType: "nestedArrayOfObjects",
        },
      ],
    },
  ],
  [
    {
      width: "50%",
      items: [
        {
          title: "Invoice Summary",
          schemaPath:
            "properties.summary.properties.total_invoice_quantity_G31",
          formDataPath: "summary.total_invoice_quantity_G31",
          elementType: "object",
        },
        {
          schemaPath: "properties.summary.properties.total_dollars_summary_G33",
          formDataPath: "summary.total_dollars_summary_G33",
          elementType: "object",
        },
      ],
    },
  ],
];

