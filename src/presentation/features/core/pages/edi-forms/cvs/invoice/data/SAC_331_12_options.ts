const SAC_331_12_OPTIONS = [
  {
    value: "01",
    label: "Bill Back",
    paragraph_number: "1",
  },
  {
    value: "02",
    label: "Off Invoice",
    paragraph_number: "1",
  },
  {
    value: "03",
    label: "Vendor Check to Customer",
    paragraph_number: "1",
  },
  {
    value: "04",
    label: "Credit Customer Account",
    paragraph_number: "1",
  },
  {
    value: "05",
    label: "Charge to be Paid by Vendor",
    paragraph_number: "1",
  },
  {
    value: "06",
    label: "Charge to be Paid by Customer",
    paragraph_number: "1",
  },
  {
    value: "07",
    label: "Optional",
    paragraph_number: "1",
  },
  {
    value: "08",
    label: "Off Gross Quantity Invoiced",
    paragraph_number: "1",
  },
  {
    value: "09",
    label: "Allowance To Be Issued by Vendor",
    paragraph_number: "1",
    notes: [
      {
        content: "Code designating vendor as the issuer of an allowance",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "10",
    label: "Allowance To Be Issued by Reseller",
    paragraph_number: "1",
    notes: [
      {
        content: "Code designating reseller as the issuer of an allowance",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "11",
    label: "Charge Denied by Vendor",
    paragraph_number: "1",
    notes: [
      {
        content: "Vendor will not allow charge requested",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "12",
    label: "Cancel Allowance",
    paragraph_number: "1",
  },
  {
    value: "13",
    label: "Provide Amount",
    paragraph_number: "1",
    notes: [
      {
        content:
          "To enable a shipper to request the forwarder to provide the amount of the specified allowance or charge",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "15",
    label: "Information Only",
    paragraph_number: "1",
    notes: [
      {
        content:
          "When this code is used, the allowance or charge amounts are not to be added or subtracted from the transaction; the data is being provided for information purposes only",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "18",
    label: "Non-Payable Tax",
    paragraph_number: "1",
  },
  {
    value: "20",
    label: "Accrual Fund",
    paragraph_number: "1",
  },
  {
    value: "21",
    label: "Flat Fund",
    paragraph_number: "1",
  },
  {
    value: "25",
    label: "Cash in Advance",
    paragraph_number: "1",
  },
  {
    value: "CA",
    label: "Calculate and Add to Invoice",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Value of allowance or charge is to be calculated by recipient and added to invoice total",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CC",
    label: "Collect",
    paragraph_number: "1",
  },
  {
    value: "PP",
    label: "Prepaid",
    paragraph_number: "1",
  },
  {
    value: "ZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
];

export { SAC_331_12_OPTIONS };
