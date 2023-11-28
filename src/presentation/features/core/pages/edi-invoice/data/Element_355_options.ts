const ELEMENT_355_OPTIONS = [
  {
    value: "CFR",
    label: "Cost and Freight",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller pays cost and freight to named port of destination; buyer assumes all risks of loss and damage and additional costs incurred once goods are delivered on board the vessel; these are assumed by the buyer when the goods pass over the rail of the ship at the port of shipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CIF",
    label: "Cost, Insurance, and Freight",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller pays cost and freight to named port of destination; buyer assumes all risks of loss and damage and additional costs incurred once goods are delivered onboard the vessel; risks are assumed by the buyer when the goods pass over the rail of the ship at the port of shipment; seller must in addition procure (i.e. contract and pay for) marine insurance against the buyer's risk of loss or damage during shipment",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CIP",
    label: "Carriage and Insurance Paid To",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller pays cost and freight to named port of destination; buyer assumes all risk of damage or loss and additional costs incurred once goods are delivered on board the vessel; these risks are assumed by the buyer when the goods pass over the rail of the ship at the port of shipment; seller must procure (i.e. contract and pay for) marine insurance against the buyer's risk of loss or damage during carriage; seller must in addition procure (i.e. contract and pay for) cargo insurance against the buyer's risk of loss or damage to the goods during carriage",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CPT",
    label: "Carriage Paid To",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller pays freight charges named to destination; the risk of loss or damage to the goods, as well as any additional costs due to events occurring after the time the goods have been delivered to other carrier, is transferred from the seller to the buyer when the goods have been delivered into the custody of the carrier",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DAF",
    label: "Delivered at Frontier",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller fulfills obligation to deliver when goods have been made available, cleared for export, at the named point and place at the frontier, but before the border of the adjoining country",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DAP",
    label: "Delivered At Place",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller delivers the goods when they are placed at the disposal of the buyer on the arriving means of transport ready for unloading at the named place of destination. An Incoterm rule",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DAT",
    label: "Delivered At Terminal",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller delivers when the goods, once unloaded from the arriving means of transport, are placed at the disposal of the buyer at a named terminal at the named port or place of destination. Terminal includes quay, warehouse, container yard or road, rail or air terminal. An Incoterm rule",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DDP",
    label: "Delivered Duty Paid",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller bears costs and risks involved in bringing goods to the named place in the country of importation including duties, taxes, and other official charges payable upon import",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DDU",
    label: "Deliver Duty Unpaid",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller bears costs and risks involved in bringing goods to the named place in country of importation exclusive of duties, taxes, or other official charges payable upon import, and the costs and risks of carrying out import formalities",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DEQ",
    label: "Delivered Ex Quay",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller bears all costs and risks involved, including duties, taxes, and other charges involved in delivering the goods to the quay (wharf) at the named port of destination, cleared for import; seller's obligation ends when the goods are available to the buyer on the quay (this term used only for sea or inland waterway shipments)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DES",
    label: "Delivered Ex Ship",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller bears all costs and risks involved in bringing goods to the named port of destination; seller's obligation ends when goods are available to buyer on board the ship uncleared for import at named port of destination (this term used only for sea or inland waterway shipments)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DOM",
    label: "Domestically Supplied",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Duty paid at the border, making the material equivalent to being supplied by a domestic source",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DUP",
    label: "Delivered; Duty Unpaid",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller bears costs and risks involved in bringing goods to a named place in the country of importation as well as risks and costs of carrying out customs formalities, but excluding duties, taxes, and other official changes payable upon importation",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "EXQ",
    label: "Ex Quay",
    paragraph_number: "1",
  },
  {
    value: "EXS",
    label: "Ex Ship",
    paragraph_number: "1",
  },
  {
    value: "EXW",
    label: "Ex Works",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Buyer bears all costs and risks in taking the goods from the seller's premises to the desired location",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FAS",
    label: "Free Alongside Ship",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller's obligation ends when goods have been placed alongside the vessel on the quay or in lighters at the named port of shipment; buyer bears all costs and risks thereafter",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FCA",
    label: "Free Carrier",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller fulfills his obligation when goods are handed over, cleared for export, and into the charge of the carrier named by the buyer at the named place or location",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "FCI",
    label: "Freight Carriage and Insurance Paid To",
    paragraph_number: "1",
  },
  {
    value: "FCP",
    label: "Freight Carriage Paid To",
    paragraph_number: "1",
  },
  {
    value: "FOB",
    label: "Free on Board",
    paragraph_number: "1",
  },
  {
    value: "FOR",
    label: "Free on Rail",
    paragraph_number: "1",
  },
  {
    value: "FOT",
    label: "Free on Truck",
    paragraph_number: "1",
  },
  {
    value: "NPF",
    label: "Non-privileged Foreign",
    paragraph_number: "1",
    notes: [
      {
        content:
          'Duty not paid at the border and in the U. S. Customs and Border Protection (CBP) category of "non-privileged foreign"',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "PPF",
    label: "Privileged Foreign",
    paragraph_number: "1",
    notes: [
      {
        content:
          'Duty not paid at the border and in the U. S. Customs and Border Protection (CBP) category of "privileged foreign"',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
];

export { ELEMENT_355_OPTIONS };
