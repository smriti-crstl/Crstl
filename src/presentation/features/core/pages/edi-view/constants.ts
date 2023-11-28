export const titleReplacements = {
  BIG: {
    "01": "Invoice Date",
    "03": "Purchase Order Date",
  },
  G01: {
    "01": "Invoice Date",
    "03": "Purchase Order Date",
  },
  BCH: {
    "06": "Purchase Order Date",
    "10": "Acknowledgement Date",
    "11": "PO Change Date",
  },
  G92: {
    "02": "Purchase Order Date",
  },
  BCA: {
    "06": "Purchase Order Date",
    "10": "Acknowledgement Date",
  },
};

export const lineItemTotalConfig: Record<string, [string, string]> = {
  PO1: ["02", "04"],
  IT1: ["02", "04"],
  G68: ["01", "03"],
  G17: ["01", "03"],
};

