const MAN_88_OPTIONS = [
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
    label: "SSCC-18",
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
    value: "GM",
    label: "SSCC-18 and Application Identifier",
    paragraph_number: "1",
  },
  {
    value: "MC",
    label: "Master Carton Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The identification number of the outermost (external) container in a shipment \nleaving the supplier's dock",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "PB",
    label: "Premarked by Buyer",
    paragraph_number: "1",
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

export { MAN_88_OPTIONS };
