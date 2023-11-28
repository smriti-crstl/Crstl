const FOB_335_OPTIONS = [
  {
    value: "CFR",
    label: "Cost and Freight",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Seller pays cost and freight to named port of destination; buyer assumes all \nrisks of loss and damage and additional costs incurred once goods are delivered \non board the vessel; these are assumed by the buyer when the goods pass over \nthe rail of the ship at the port of shipment",
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
          "Seller pays cost and freight to named port of destination; buyer assumes all \nrisks of loss and damage and additional costs incurred once goods are delivered \nonboard the vessel; risks are assumed by the buyer when the goods pass over the \nrail of the ship at the port of shipment; seller must in addition procure (i.e. \ncontract and pay for) marine insurance against the buyer's risk of loss or \ndamage during shipment",
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
          "Seller pays cost and freight to named port of destination; buyer assumes all \nrisk of damage or loss and additional costs incurred once goods are delivered \non board the vessel; these risks are assumed by the buyer when the goods pass \nover the rail of the ship at the port of shipment; seller must procure (i.e. \ncontract and pay for) marine insurance against the buyer's risk of loss or \ndamage during carriage; seller must in addition procure (i.e. contract and pay \nfor) cargo insurance against the buyer's risk of loss or damage to the goods \nduring carriage",
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
          "Seller pays freight charges named to destination; the risk of loss or damage to \nthe goods, as well as any additional costs due to events occurring after the \ntime the goods have been delivered to other carrier, is transferred from the \nseller to the buyer when the goods have been delivered into the custody of the \ncarrier",
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
          "Seller fulfills obligation to deliver when goods have been made available, \ncleared for export, at the named point and place at the frontier, but before \nthe border of the adjoining country",
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
          "Seller bears costs and risks involved in bringing goods to the named place in \nthe country of importation including duties, taxes, and other official charges \npayable upon import",
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
          "Seller bears costs and risks involved in bringing goods to the named place in \ncountry of importation exclusive of duties, taxes, or other official charges \npayable upon import, and the costs and risks of carrying out import formalities",
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
          "Seller bears all costs and risks involved, including duties, taxes, and other \ncharges involved in delivering the goods to the quay (wharf) at the named port \nof destination, cleared for import; seller's obligation ends when the goods are \navailable to the buyer on the quay (this term used only for sea or inland \nwaterway shipments)",
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
          "Seller bears all costs and risks involved in bringing goods to the named port \nof destination; seller's obligation ends when goods are available to buyer on \nboard the ship uncleared for import at named port of destination (this term \nused only for sea or inland waterway shipments)",
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
          "Duty paid at the border, making the material equivalent to being supplied by a \ndomestic source",
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
          "Seller bears costs and risks involved in bringing goods to a named place in the \ncountry of importation as well as risks and costs of carrying out customs \nformalities, but excluding duties, taxes, and other official changes payable \nupon importation",
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
          "Buyer bears all costs and risks in taking the goods from the seller's premises \nto the desired location",
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
          "Seller's obligation ends when goods have been placed alongside the vessel on \nthe quay or in lighters at the named port of shipment; buyer bears all costs \nand risks thereafter",
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
          "Seller fulfills his obligation when goods are handed over, cleared for export, \nand into the charge of the carrier named by the buyer at the named place or \nlocation",
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
          'Duty not paid at the border and in the U. S. Customs category of \n"non-privileged foreign"',
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
          'Duty not paid at the border and in the U. S. Customs category of "privileged \nforeign"',
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "ZZZ",
    label: "Mutually Defined",
    paragraph_number: "1",
  },
  {
    value: "CAF",
    label: "Cost and Freight",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The seller must pay the costs and freight necessary to bring the goods to the \nnamed destination, but the risk of loss or damage to the goods, as well as any \ncost increases, is transferred from the seller to the buyer when the goods pass \nthe ship's rail in the port of the shipment",
        paragraph_number: "1",
      },
    ],
  },
];

export { FOB_335_OPTIONS };
