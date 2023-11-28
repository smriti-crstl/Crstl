const BCH_92_OPTIONS = [
  {
    value: "AB",
    label: "Assortment Against Blanket",
    paragraph_number: "1",
  },
  {
    value: "AC",
    label: "AOG (Aircraft on Ground) Critical",
    paragraph_number: "1",
  },
  {
    value: "AO",
    label: "AOG (Aircraft on Ground) Service",
    paragraph_number: "1",
  },
  {
    value: "BD",
    label: "Bidding",
    paragraph_number: "1",
  },
  {
    value: "BE",
    label: "Blanket Order/Estimated Quantities (Not firm Commitment)",
    paragraph_number: "1",
  },
  {
    value: "BH",
    label: "Bill and Hold",
    paragraph_number: "1",
  },
  {
    value: "BK",
    label: "Blanket Order (Quantity Firm)",
    paragraph_number: "1",
  },
  {
    value: "BL",
    label: "Bailment",
    paragraph_number: "1",
  },
  {
    value: "BQ",
    label: "Budgetary Quote",
    paragraph_number: "1",
  },
  {
    value: "BY",
    label: "Buying",
    paragraph_number: "1",
  },
  {
    value: "CA",
    label: "Contract Award Notification",
    paragraph_number: "1",
  },
  {
    value: "CB",
    label: "Cooperative Agreement",
    paragraph_number: "1",
  },
  {
    value: "CC",
    label: "Change to Contract",
    paragraph_number: "1",
  },
  {
    value: "CD",
    label: "Assistance Award Loan",
    paragraph_number: "1",
  },
  {
    value: "CE",
    label: "Undefinitized Contract Action",
    paragraph_number: "1",
  },
  {
    value: "CF",
    label: "Confirmation",
    paragraph_number: "1",
  },
  {
    value: "CG",
    label: "Formula Funds Assistance Award",
    paragraph_number: "1",
  },
  {
    value: "CN",
    label: "Consigned Order",
    paragraph_number: "1",
  },
  {
    value: "CO",
    label: "Catalog Order",
    paragraph_number: "1",
  },
  {
    value: "CP",
    label: "Change to Purchase Order",
    paragraph_number: "1",
  },
  {
    value: "CR",
    label: "Change to Release",
    paragraph_number: "1",
  },
  {
    value: "DR",
    label: "Direct Ship",
    paragraph_number: "1",
    notes: [
      {
        content: "Vendor ships directly to customer",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DS",
    label: "Dropship",
    paragraph_number: "1",
  },
  {
    value: "EO",
    label: "Emergency Order",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Acquires what is needed no matter what the cost; different from a rush order in \nthat rush utilizes the normal channels as quickly as possible",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FF",
    label: "Formula Funds",
    paragraph_number: "1",
  },
  {
    value: "FH",
    label: "Fabricate and Hold",
    paragraph_number: "1",
  },
  {
    value: "IN",
    label: "Information Copy",
    paragraph_number: "1",
  },
  {
    value: "JL",
    label: "Job Lot",
    paragraph_number: "1",
  },
  {
    value: "KA",
    label: "Agreement",
    paragraph_number: "1",
  },
  {
    value: "KB",
    label: "Blanket Purchase Agreement",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A charge account established with qualified sources of supply to satisfy \nrepetitive requirements",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KC",
    label: "Contract",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A legally binding document wherein one party agrees to provide supplies or \nservices and another party agrees to provide compensation for the supplies or \nservices",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KD",
    label: "Basic Agreement",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A written instrument of understanding that contemplates separate future \ncontracts",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KE",
    label: "Basic Ordering Agreement",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A document which contains terms and conditions, a description of supplies or \nservices to be provided and methods of pricing, issuing, and delivering orders \nunder this agreement",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KG",
    label: "Grant",
    paragraph_number: "1",
  },
  {
    value: "KI",
    label: "Indefinite Delivery Indefinite Quantity",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A contract that provides for a minimum quantity and an indefinite maximum \nquantity within stated limits",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KN",
    label: "Purchase Order",
    paragraph_number: "1",
    notes: [
      {
        content: "Procurement instrument within the small purchasing threshold",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KO",
    label: "Close Out",
    paragraph_number: "1",
  },
  {
    value: "KP",
    label: "Authority to Proceed",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An authorization that permits the selling party to incur costs for the eventual \ndelivery of supplies or services prior to the formal execution of a contract",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KQ",
    label: "Indefinite Delivery Definite Quantity",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A contract that provides for delivery of a specified quantity over a fixed \nperiod of time to unspecified locations",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KR",
    label: "Requirements",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A contract to provide all specified requirements of designated organizations \nfor a fixed period of time",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "KS",
    label: "Letter Contract",
    paragraph_number: "1",
  },
  {
    value: "KT",
    label: "Task Order",
    paragraph_number: "1",
  },
  {
    value: "LB",
    label: "Lease (Blanket Agreement)",
    paragraph_number: "1",
  },
  {
    value: "LN",
    label: "Loan",
    paragraph_number: "1",
  },
  {
    value: "LS",
    label: "Lease",
    paragraph_number: "1",
  },
  {
    value: "NA",
    label: "Novation Agreement",
    paragraph_number: "1",
  },
  {
    value: "NE",
    label: "New Order",
    paragraph_number: "1",
  },
  {
    value: "NO",
    label: "Not for Sale",
    paragraph_number: "1",
  },
  {
    value: "NP",
    label: "New Product Introduction",
    paragraph_number: "1",
  },
  {
    value: "NS",
    label: "New Store Opening",
    paragraph_number: "1",
  },
  {
    value: "OS",
    label: "Special Order",
    paragraph_number: "1",
  },
  {
    value: "PR",
    label: "Promotion",
    paragraph_number: "1",
  },
  {
    value: "RA",
    label: "Release Against Assortment",
    paragraph_number: "1",
  },
  {
    value: "RC",
    label: "Retailer Pre-commitment",
    paragraph_number: "1",
  },
  {
    value: "RE",
    label: "Reorder",
    paragraph_number: "1",
  },
  {
    value: "RL",
    label: "Release or Delivery Order",
    paragraph_number: "1",
    notes: [
      {
        content:
          "An order for goods and services placed against a pre-existing contract or \nblanket order",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RN",
    label: "Renewal Order",
    paragraph_number: "1",
  },
  {
    value: "RO",
    label: "Rush Order",
    paragraph_number: "1",
  },
  {
    value: "RR",
    label: "Repair and Return",
    paragraph_number: "1",
  },
  {
    value: "RT",
    label: "Rental",
    paragraph_number: "1",
  },
  {
    value: "RU",
    label: "Record Update Service",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Service orders for customer-requested changes to the service provider's records \nthat do not require installation or movement of equipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RW",
    label: "Resume Work Order",
    paragraph_number: "1",
  },
  {
    value: "SA",
    label: "Stand-alone Order",
    paragraph_number: "1",
  },
  {
    value: "SO",
    label: "Shipped Order",
    paragraph_number: "1",
  },
  {
    value: "SP",
    label: "Sample",
    paragraph_number: "1",
  },
  {
    value: "SS",
    label: "Supply or Service Order",
    paragraph_number: "1",
  },
  {
    value: "ST",
    label: "Standing Order",
    paragraph_number: "1",
  },
  {
    value: "SW",
    label: "Stop Work",
    paragraph_number: "1",
  },
  {
    value: "TC",
    label: "Toll Conversion Order",
    paragraph_number: "1",
  },
  {
    value: "TM",
    label: "Time & Materials",
    paragraph_number: "1",
  },
  {
    value: "TR",
    label: "Termination",
    paragraph_number: "1",
  },
  {
    value: "UD",
    label: "Unit Down",
    paragraph_number: "1",
    notes: [
      {
        content: "Critical unit is down. This is the highest priority",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "UE",
    label: "Unit Exchange",
    paragraph_number: "1",
  },
  {
    value: "US",
    label: "Urgent Service Request",
    paragraph_number: "1",
  },
  {
    value: "WO",
    label: "Warranty Order",
    paragraph_number: "1",
  },
  {
    value: "ZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
  {
    value: "DN",
    label: "Donation Order",
    paragraph_number: "1",
  },
  {
    value: "DO",
    label: "Domestic Order",
    paragraph_number: "1",
  },
  {
    value: "EP",
    label: "Export Order",
    paragraph_number: "1",
  },
  {
    value: "FS",
    label: "Firesale Order - Damaged or Distressed Merchandise",
    paragraph_number: "1",
  },
  {
    value: "PD",
    label: "Production Order",
    paragraph_number: "1",
  },
  {
    value: "WT",
    label: "Warehouse Transfer Order",
    paragraph_number: "1",
  },
];

export { BCH_92_OPTIONS };
