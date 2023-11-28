const BSN_1005_OPTIONS = [
  {
    value: "0001",
    label: "Shipment, Order, Packaging, Item",
    paragraph_number: "1",
  },
  {
    value: "0002",
    label: "Shipment, Order, Item, Packaging",
    paragraph_number: "1",
  },
  {
    value: "0003",
    label: "Shipment, Packaging, Order, Item",
    paragraph_number: "1",
  },
  {
    value: "0004",
    label: "Shipment, Order, Item",
    paragraph_number: "1",
  },
  {
    value: "0010",
    label:
      "Information Source, Information Receiver, Provider of Service, Subscriber, \nDependent",
    paragraph_number: "1",
  },
  {
    value: "0011",
    label:
      "Information Receiver, Information Source, Provider of Service, Subscriber, \nDependent",
    paragraph_number: "1",
  },
  {
    value: "0012",
    label: "Information Source, Provider of Service, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0013",
    label: "Provider of Service, Information Source, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0014",
    label:
      "Provider of Service, Information Source, Information Receiver, Subscriber, \nDependent",
    paragraph_number: "1",
  },
  {
    value: "0015",
    label: "Information Receiver, Provider of Service, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0016",
    label: "Provider of Service, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0017",
    label: "Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0018",
    label: "Information Receiver, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0019",
    label: "Information Source, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0020",
    label:
      "Information Source, Information Receiver, Group Coverage Options, Subscriber, \nDependent",
    paragraph_number: "1",
  },
  {
    value: "0021",
    label: "Information Source, Information Receiver, Group Coverage Options",
    paragraph_number: "1",
  },
  {
    value: "0022",
    label: "Information Source, Information Receiver, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0023",
    label: "Information Receiver, Information Source, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0035",
    label: "Address, Shipment, Order",
    paragraph_number: "1",
  },
  {
    value: "0036",
    label: "Address, Transaction Reference Number, Suffix, Serial Number",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The hierarchical structure differentiates between information associated with \ntransaction addressees, reference number, suffix designation of the transaction \nnumber, and serial number of material",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "0055",
    label: "Supergroup, Group, Subgroup, Member",
    paragraph_number: "1",
  },
  {
    value: "0056",
    label: "Supergroup, subgroup, member, ancillary facility or department",
    paragraph_number: "1",
  },
  {
    value: "0057",
    label: "Supergroup, subgroup, member",
    paragraph_number: "1",
  },
  {
    value: "0058",
    label: "Group, member, ancillary facility or department",
    paragraph_number: "1",
  },
  {
    value: "0059",
    label: "Group, member",
    paragraph_number: "1",
  },
  {
    value: "0060",
    label: "Hospital, ancillary facility or department",
    paragraph_number: "1",
  },
  {
    value: "0061",
    label:
      "Health Industry Business Communications Council (HIBCC) Health Industry Number \n(HIN) database, facility record, location record",
    paragraph_number: "1",
  },
  {
    value: "0062",
    label: "Franchisor, franchisee",
    paragraph_number: "1",
  },
  {
    value: "0063",
    label: "Franchisee association, franchisee",
    paragraph_number: "1",
  },
  {
    value: "0064",
    label: "Company, Company",
    paragraph_number: "1",
  },
  {
    value: "0065",
    label: "Company, Operating Unit",
    paragraph_number: "1",
  },
  {
    value: "0066",
    label: "Operating Unit, Operating Unit",
    paragraph_number: "1",
  },
  {
    value: "0067",
    label: "Company, Property",
    paragraph_number: "1",
  },
  {
    value: "0068",
    label: "Company, Property Property, Property",
    paragraph_number: "1",
  },
  {
    value: "0069",
    label: "Operating Unit, Property",
    paragraph_number: "1",
  },
  {
    value: "0070",
    label: "Property, Property",
    paragraph_number: "1",
  },
  {
    value: "0071",
    label: "Company, Tradename",
    paragraph_number: "1",
  },
  {
    value: "0072",
    label: "Operating Unit, Tradename",
    paragraph_number: "1",
  },
  {
    value: "0073",
    label: "Property, Tradename",
    paragraph_number: "1",
  },
  {
    value: "0074",
    label: "Company, Operating Unit, Operating Unit, Operating Unit",
    paragraph_number: "1",
  },
  {
    value: "0075",
    label: "Operating Unit, Operating Unit, Operating Unit, Operating Unit",
    paragraph_number: "1",
  },
  {
    value: "0076",
    label: "Company, Operating Unit, Operating Unit, Property",
    paragraph_number: "1",
  },
  {
    value: "0077",
    label: "Tradename, Property",
    paragraph_number: "1",
  },
  {
    value: "0078",
    label:
      "Information Source, Information Receiver, Subscriber, Dependent, Provider of \nService, Services",
    paragraph_number: "1",
  },
  {
    value: "0079",
    label:
      "Information Source, Information Receiver, Company/Corporation, Operating Unit",
    paragraph_number: "1",
  },
  {
    value: "0080",
    label: "Information Source, Employer, Patient",
    paragraph_number: "1",
  },
  {
    value: "0081",
    label: "Information Source, Patient",
    paragraph_number: "1",
  },
  {
    value: "0082",
    label: "Information Source, Employer, Subscriber, Dependent",
    paragraph_number: "1",
  },
  {
    value: "0083",
    label:
      "Information Source, Information Receiver, Subscriber, Dependent, Referring \nProvider, Provider of Service, Services",
    paragraph_number: "1",
  },
  {
    value: "0200",
    label:
      "Credential Action (AP), Company/Corporation (35), Quantity (R), Transportation \nEquipment (E), Fleet (FL), Jurisdiction (JU)",
    paragraph_number: "1",
  },
  {
    value: "0201",
    label:
      "Credential Action (AP), Company/Corporation (35), Transportation Equipment (E)",
    paragraph_number: "1",
  },
  {
    value: "0202",
    label:
      "Credential Action (AP), Company/Corporation (35), Transportation Equipment (E), \nQuantity (R), Jurisdiction (JU)",
    paragraph_number: "1",
  },
  {
    value: "0203",
    label:
      "Credential Action (AP), Company/Corporation (35), Transportation Equipment (E), \nQuantity (R)",
    paragraph_number: "1",
  },
  {
    value: "0204",
    label: "Report (RP), Jurisdiction (JU), Company/Corporation (35)",
    paragraph_number: "1",
  },
  {
    value: "0205",
    label:
      "Report (RP), Company/Corporation (35), Fleet (FL), Jurisdiction (JU), \nTransportation Equipment (E)",
    paragraph_number: "1",
  },
  {
    value: "0206",
    label:
      "Credential Action (AP), Company/Corporation (35), Jurisdiction (JU), \nTransportation Equipment (E)",
    paragraph_number: "1",
  },
  {
    value: "0207",
    label:
      "Credential Action (AP), Company/Corporation (35), Transportation Equipment (E), \nComponent (F), Measurement (M), Jurisdiction (JU)",
    paragraph_number: "1",
  },
  {
    value: "0208",
    label:
      "Credential Action (AP), Company/Corporation (35), Cost Type (CT), Jurisdiction \n(JU)",
    paragraph_number: "1",
  },
  {
    value: "0209",
    label: "Credential Action (AP), Company/Corporation (35)",
    paragraph_number: "1",
  },
  {
    value: "0210",
    label: "Credential Action (AP)",
    paragraph_number: "1",
  },
  {
    value: "ZZZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
];

export { BSN_1005_OPTIONS };
