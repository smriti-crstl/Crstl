export interface CVSShippingLabel {
  po_id: string;
  asn_id: string;
  ship_to: string;
  sscc_number: string;
  po_number: string;
  cvs_line_item_number: string;
  upc: string;
  from: string;
  case_pack: string;
  weight: string;
  expiry_date: string;
  style: string;
  upca_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface CVSPackingSlip {
  ship_to: string;
  po_number: string;
  po_id: string;
  asn_id: string;
  cvs_line_item_number: string;
  upc: string;
  from: string;
  case_pack: string;
  quantity_shipped: string;
  ship_date: string;
  shipping_method: string;
  style: string;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
  unit?: string;
}

export interface CVSShippingLabelModel {
  status: number;
  code: string;
  data: {
    labels?: CVSShippingLabel[];
    errors?: CVSShippingLabelError[];
  };
}

export interface CVSPackingSlipModel {
  status: number;
  code: string;
  data: {
    labels?: CVSPackingSlip[];
    errors?: CVSShippingLabelError[];
  };
}

export interface CVSShippingLabelError {
  message: string;
}

export const CVSShippingLabelDefaultValues = {
  ship_to_post_barcode: "NOT_GENERATED",
  upca_barcode: "NOT_GENERATED",
  carrier_name: ""
};
