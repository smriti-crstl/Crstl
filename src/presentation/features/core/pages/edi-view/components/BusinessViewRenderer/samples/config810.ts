import { BusinessViewConfig } from "../types";

export const config810: BusinessViewConfig = [
  [
    {
      width: "50%",
      items: [
        {
          schemaPath:
            "properties.heading.properties.beginning_segment_for_invoice_BIG",
          formDataPath: "heading.beginning_segment_for_invoice_BIG",
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
        {
          title: "Terms of Sale",
          formDataPath: "heading.terms_of_sale_deferred_terms_of_sale_ITD",
          schemaPath:
            "properties.heading.properties.terms_of_sale_deferred_terms_of_sale_ITD.items",
          elementType: "arrayOfObjects",
        },
        {
          formDataPath: "detail.baseline_item_data_invoice_IT1_loop",
          schemaPath:
            "properties.detail.properties.baseline_item_data_invoice_IT1_loop.items.properties",
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
          title: "Carrier Details",
          schemaPath: "properties.summary.properties.carrier_detail_CAD",
          formDataPath: "summary.carrier_detail_CAD",
          elementType: "object",
        },
      ],
    },
    {
      width: "30%",
      items: [
        {
          title: "Invoice Summary",
          schemaPath:
            "properties.summary.properties.invoice_shipment_summary_ISS_loop",
          formDataPath: "summary.invoice_shipment_summary_ISS_loop",
          elementType: "object",
        },
        {
          schemaPath:
            "properties.summary.properties.total_monetary_value_summary_TDS",
          formDataPath: "summary.total_monetary_value_summary_TDS",
          elementType: "object",
        },
        {
          schemaPath: "properties.summary.properties.transaction_totals_CTT",
          formDataPath: "summary.transaction_totals_CTT",
          elementType: "object",
        },
      ],
    },
  ],
];

