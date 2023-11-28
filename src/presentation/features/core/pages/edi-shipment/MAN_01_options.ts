const MAN_01_OPTIONS = [
  {
    value: "L",
    label: "Line Item Only",
    paragraph_number: "1",
  },
  {
    value: "R",
    label: "Originator Assigned",
    paragraph_number: "1",
    notes: [
      {
        content: "Information originated by the initiator of the transaction",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "S",
    label: "Entire Shipment",
    paragraph_number: "1",
  },
  {
    value: "W",
    label: "Pallet Number",
    paragraph_number: "1",
  },
  {
    value: "X",
    label: "Pallet Configuration Number",
    paragraph_number: "1",
  },
  {
    value: "AA",
    label: "EAN.UCC Serial Shipping Container Code (SSCC)",
    paragraph_number: "1",
  },
  {
    value: "AI",
    label: "UCC/EAN-128 Application Identifier (AI) and Data",
    paragraph_number: "1",
  },
  {
    value: "CA",
    label: "Shipper-Assigned Case Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Number identifying unit shipped",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CP",
    label: "Carrier-Assigned Package ID Number",
    paragraph_number: "1",
  },
  {
    value: "DZ",
    label: "Receiver Assigned Drop Zone",
    paragraph_number: "1",
  },
  {
    value: "E1",
    label:
      "Electronic Product Code (ePC) Serial Shipping Container Code (SSCC)",
    paragraph_number: "1",
    notes: [
      {
        content: "Trade Item with ePC tag marked with SSCC value",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E2",
    label:
      "Electronic Product Code (ePC) and Bar Code Serial Shipping Container Code (SSCC)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Trade Item with dual marking for barcode and ePC, with SSCC value",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E3",
    label:
      "Electronic Product Code (ePC) and Bar Code Serial Shipping Container Code (SSCC) with Application Identifier (AI)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Trade Item with dual marking for barcode and ePC, with SSCC and AI value",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E4",
    label:
      "Electronic Product Code (ePC) Serialized Global Trade Item Number (SGTIN)",
    paragraph_number: "1",
    notes: [
      {
        content: "Trade Item with ePC tag marked with SGTIN",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "E5",
    label:
      "Electronic Product Code (ePC) with Bar Code Serialized Global Trade Item Number (SGTIN)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Trade Item with dual marking for barcode and ePC, with SGTIN. Serial Number is in ePC tag only",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GI",
    label: "Global Individual Asset Identifier",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A globally unique GS1 System identification number used to identify a physical asset",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GM",
    label:
      "EAN.UCC Serial Shipping Container Code (SSCC) and Application Identifier",
    paragraph_number: "1",
  },
  {
    value: "GR",
    label: "Global Returnable Asset Identifier (GRAI)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The globally unique GS1 System identification number for a reusable package or transport equipment of a certain value, such as a beer keg, gas cylinder, or pallet. The GRAI enables returnable assets to be identified by type or individually for tracking or sorting purposes.",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "GS",
    label: "Serialized Global Returnable Asset Identifier (GRAI)",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The globally unique GS1 System identification number for a reusable package or transport equipment of a certain value, such as a beer keg, gas cylinder or pallet. The identifier includes a 1 to 16 character serial number. The serialized GRAI enables returnable assets to be identified by type or individually for tracking or sorting purposes",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "MC",
    label: "Master Carton Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The identification number of the outermost (external) container in a shipment leaving the supplier's dock",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "MT",
    label: "Marked Ticket Price",
    paragraph_number: "1",
  },
  {
    value: "PB",
    label: "Premarked by Buyer",
    paragraph_number: "1",
  },
  {
    value: "S1",
    label: "Serialized Number",
    paragraph_number: "1",
    notes: [
      {
        content: "Serial number for trade item",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SI",
    label: "Self-Identifying Container via Radio Frequency ID Device",
    paragraph_number: "1",
    notes: [
      {
        content: "Inbound containers that do not need manual routing",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "SM",
    label: "Shipper Assigned",
    paragraph_number: "1",
  },
  {
    value: "SR",
    label: "Shipper Assigned Roll Number",
    paragraph_number: "1",
  },
  {
    value: "SS",
    label: "Shipper Assigned Skid Number",
    paragraph_number: "1",
  },
  {
    value: "UC",
    label: "U.P.C. Shipping Container Code",
    paragraph_number: "1",
  },
  {
    value: "UI",
    label: "Department of Defense Unique Item Identifier",
    paragraph_number: "1",
    notes: [
      {
        content: "An identifier used to uniquely identify an individual item",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UP",
    label: "U.P.C. Consumer Package Code (1-5-5-1)",
    paragraph_number: "1",
  },
  {
    value: "ZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
];

export { MAN_01_OPTIONS };
