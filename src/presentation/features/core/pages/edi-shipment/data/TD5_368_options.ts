const TD5_365_OPTIONS = [
  {
    value: "AA",
    label: "Multiple Pickup Same Destination",
    paragraph_number: "1",
  },
  {
    value: "AB",
    label: "Available to Ship - Billed Quantity",
    paragraph_number: "1",
  },
  {
    value: "AN",
    label: "Available Now - No Shipping Schedule",
    paragraph_number: "1",
  },
  {
    value: "AP",
    label: "Allocation",
    paragraph_number: "1",
  },
  {
    value: "AS",
    label: "Available Now - Scheduled to Ship (date)",
    paragraph_number: "1",
  },
  {
    value: "AU",
    label: "Available to Ship - Unbilled Quantity",
    paragraph_number: "1",
  },
  {
    value: "AV",
    label: "Available",
    paragraph_number: "1",
  },
  {
    value: "BK",
    label: "Back Ordered from Previous Order",
    paragraph_number: "1",
  },
  {
    value: "BM",
    label: "Backordered, Manufacturer, Out-of-Stock",
    paragraph_number: "1",
  },
  {
    value: "BO",
    label: "Back Ordered",
    paragraph_number: "1",
  },
  {
    value: "BP",
    label: "Shipment Partial, Back Order to Ship on (Date)",
    paragraph_number: "1",
  },
  {
    value: "BT",
    label: "Billed total",
    paragraph_number: "1",
  },
  {
    value: "BW",
    label: "Billed week-to-date",
    paragraph_number: "1",
  },
  {
    value: "CA",
    label: "Customer Inquiry - All Items",
    paragraph_number: "1",
  },
  {
    value: "CB",
    label: "Components Missing",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A shipment made minus components that should have been shipped in order for the \nshipment to be in compliance with the terms and conditions of a contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CC",
    label: "Shipment Complete on (Date)",
    paragraph_number: "1",
  },
  {
    value: "CD",
    label: "Consolidated Freight",
    paragraph_number: "1",
  },
  {
    value: "CE",
    label: "Shipment Includes Extra Items to Meet Price Break",
    paragraph_number: "1",
  },
  {
    value: "CF",
    label: "Consolidated Load",
    paragraph_number: "1",
  },
  {
    value: "CI",
    label: "Customer Inquiry - Shipped Items Only",
    paragraph_number: "1",
  },
  {
    value: "CK",
    label: "Cancelled from Previous Order",
    paragraph_number: "1",
  },
  {
    value: "CL",
    label: "Complete",
    paragraph_number: "1",
    notes: [
      {
        content: "Material on the load is for one producer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CM",
    label: "Shipment Complete with Additional Quantity",
    paragraph_number: "1",
  },
  {
    value: "CN",
    label: "Next Carrier Move on (Date)",
    paragraph_number: "1",
  },
  {
    value: "CO",
    label: "Customer Inquiry - Unshipped Items Only",
    paragraph_number: "1",
  },
  {
    value: "CP",
    label: "Partial Shipment on (Date), Considered No Backorder",
    paragraph_number: "1",
  },
  {
    value: "CS",
    label: "Shipment Complete with Substitution",
    paragraph_number: "1",
  },
  {
    value: "CT",
    label: "Combination",
    paragraph_number: "1",
    notes: [
      {
        content: "Shipment contains material for more than one producer.",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CU",
    label: "Cancelled Line Item",
    paragraph_number: "1",
  },
  {
    value: "DA",
    label: "Due for Assortment",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Quantity of a product which has been ordered by a buyer in an unfinished state \nthat is available for instructions for the final manufacturing process to \ncomplete for delivery to the customer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DD",
    label: "Delivered to Destination on (Date)",
    paragraph_number: "1",
  },
  {
    value: "DE",
    label: "Deleted Order",
    paragraph_number: "1",
  },
  {
    value: "DI",
    label: "Discontinued",
    paragraph_number: "1",
  },
  {
    value: "DO",
    label: "Diverted Order",
    paragraph_number: "1",
  },
  {
    value: "DP",
    label: "Dispose",
    paragraph_number: "1",
  },
  {
    value: "DR",
    label: "Dating Requirements",
    paragraph_number: "1",
  },
  {
    value: "DS",
    label: "Out Of Stock Condition",
    paragraph_number: "1",
  },
  {
    value: "EC",
    label: "Equipment Capacity",
    paragraph_number: "1",
  },
  {
    value: "ED",
    label: "Expect to Ship By (Date)",
    paragraph_number: "1",
  },
  {
    value: "EW",
    label: "Expect To Ship Week of (Date)",
    paragraph_number: "1",
  },
  {
    value: "EX",
    label: "Expect to Deliver by",
    paragraph_number: "1",
  },
  {
    value: "FS",
    label: "Units Not Shipped By Agent - To Be Shipped From Factory",
    paragraph_number: "1",
  },
  {
    value: "HQ",
    label: "Held Awaiting Qualification",
    paragraph_number: "1",
  },
  {
    value: "IC",
    label: "Item Canceled",
    paragraph_number: "1",
  },
  {
    value: "ID",
    label: "Insufficient Information",
    paragraph_number: "1",
  },
  {
    value: "IN",
    label: "In Process",
    paragraph_number: "1",
  },
  {
    value: "IP",
    label: "Inquiry by Purchase Order",
    paragraph_number: "1",
  },
  {
    value: "IS",
    label: "Item Represents Substitution from Original Order",
    paragraph_number: "1",
  },
  {
    value: "LM",
    label: "Shipment late",
    paragraph_number: "1",
  },
  {
    value: "LS",
    label: "Last Shipment on (Date)",
    paragraph_number: "1",
  },
  {
    value: "LW",
    label: "Number of Late Weeks",
    paragraph_number: "1",
  },
  {
    value: "MC",
    label: "Missing Components Furnished",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A shipment which contains components earlier reported as missing from a prior \nshipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "NF",
    label: "Not Yet Published",
    paragraph_number: "1",
  },
  {
    value: "NN",
    label: "Not in Process - No Shipping Schedule",
    paragraph_number: "1",
  },
  {
    value: "NS",
    label: "Not In Process, Scheduled to Ship on (Date)",
    paragraph_number: "1",
  },
  {
    value: "NY",
    label: "No Shipping Schedule",
    paragraph_number: "1",
  },
  {
    value: "OB",
    label: "Out of Bill & Hold Goods",
    paragraph_number: "1",
  },
  {
    value: "OF",
    label: "Order Sent to Factory for Production on (Date)",
    paragraph_number: "1",
  },
  {
    value: "OP",
    label: "Out of Print",
    paragraph_number: "1",
  },
  {
    value: "OR",
    label: "Temporarily Out of Stock - Reorder",
    paragraph_number: "1",
  },
  {
    value: "PA",
    label: "Purchase Order Inquiry - All Items",
    paragraph_number: "1",
  },
  {
    value: "PC",
    label: "Production",
    paragraph_number: "1",
  },
  {
    value: "PD",
    label: "Purchase Order Complete",
    paragraph_number: "1",
  },
  {
    value: "PH",
    label: "Product On Hold",
    paragraph_number: "1",
  },
  {
    value: "PI",
    label: "Purchase Order Inquiry - Shipped Items Only",
    paragraph_number: "1",
  },
  {
    value: "PK",
    label: "Packed-to-Date as of (Date)",
    paragraph_number: "1",
  },
  {
    value: "PL",
    label: "Part Lot, Stop Off",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Shipment contains material for more than one producer and indicates a drop off \nof material",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "PN",
    label: "In Process - No Shipping Schedule",
    paragraph_number: "1",
  },
  {
    value: "PO",
    label: "Purchase Order Inquiry - Unshipped Items Only",
    paragraph_number: "1",
  },
  {
    value: "PP",
    label: "Purchase Order Inquiry - Specific Items",
    paragraph_number: "1",
  },
  {
    value: "PR",
    label: "Partial Shipment",
    paragraph_number: "1",
  },
  {
    value: "PS",
    label: "In Process, Scheduled to Ship On (Date)",
    paragraph_number: "1",
  },
  {
    value: "PT",
    label: "Part Lot",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Material in a shipment for one producer which is part of a multi-producer \nshipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "QN",
    label: "Quantity Net Due",
    paragraph_number: "1",
  },
  {
    value: "QP",
    label: "Quantity Past Due",
    paragraph_number: "1",
  },
  {
    value: "RC",
    label: "Released to Carrier (Date)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Code indicating that material was given to a carrier for shipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RD",
    label: "Revised Expect to Ship By (Date)",
    paragraph_number: "1",
  },
  {
    value: "RI",
    label: "Recall",
    paragraph_number: "1",
  },
  {
    value: "RT",
    label: "Received Total",
    paragraph_number: "1",
  },
  {
    value: "RW",
    label: "Revised Expect to Ship Week of (Date)",
    paragraph_number: "1",
  },
  {
    value: "SA",
    label: "Shipment Quantity Increase",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A shipment which contains a quantity of items greater than the quantity called \nfor by contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SB",
    label: "Seconds Available to Ship - Billed Quantity",
    paragraph_number: "1",
  },
  {
    value: "SC",
    label: "Shipment Quantity Decrease",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A shipment which contains a quantity of items less than the quantity called for \nby contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SD",
    label: "Shipped Damaged",
    paragraph_number: "1",
  },
  {
    value: "SE",
    label: "Replacement Shipment",
    paragraph_number: "1",
    notes: [
      {
        content: "A shipment of items replacing a previous shipment of items",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SF",
    label: "Shipped and Held in Bond at Contractor's Plant",
    paragraph_number: "1",
    notes: [
      {
        content:
          'A technical "shipment" so that an invoice can be processed for payment, but the \ngoods actually remain in bond at a facility awaiting further use or movement',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SG",
    label: "Shipped and Held as Government-Furnished Property",
    paragraph_number: "1",
    notes: [
      {
        content:
          'A technical "shipment" so that an invoice can be processed for payment, but the \ngoods actually remain at a facility for incorporation, a government-furnished \nproperty, into a further work product',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SH",
    label: "Shipped (Date)",
    paragraph_number: "1",
  },
  {
    value: "SI",
    label: "Shipment Late, Scheduled to Ship on (Date)",
    paragraph_number: "1",
  },
  {
    value: "SJ",
    label: "Shipped or Performed as Indicated",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A shipment or performance made according to the terms and conditions of a \ncontract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SK",
    label: "Shipment Underrun Quantity",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A shipment which contains a quantity of items less than the expected quantity \nof items but the contract allows for the lesser (unknown) quantity to be \naccepted in satisfaction of the contract requirement",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SL",
    label: "Shipped - to - Date through (Date)",
    paragraph_number: "1",
  },
  {
    value: "SP",
    label: "Scheduled for Production at Factory on (Date)",
    paragraph_number: "1",
  },
  {
    value: "SQ",
    label: "Scheduled to ship (Summary quantity)",
    paragraph_number: "1",
  },
  {
    value: "SS",
    label: "Split Shipment",
    paragraph_number: "1",
  },
  {
    value: "ST",
    label: "Stop Off",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Intermediate stops will be made by the carrier to drop off material",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SU",
    label: "Seconds Available to Ship - Unbilled Quantity",
    paragraph_number: "1",
  },
  {
    value: "UB",
    label: "Unbilled Quantity Balance",
    paragraph_number: "1",
  },
  {
    value: "UN",
    label: "Unavailable",
    paragraph_number: "1",
  },
  {
    value: "UR",
    label: "Unsolicited Report",
    paragraph_number: "1",
  },
  {
    value: "WS",
    label: "Item Invoiced - Shipment to Follow",
    paragraph_number: "1",
  },
  {
    value: "ZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
];

export { TD5_365_OPTIONS };
