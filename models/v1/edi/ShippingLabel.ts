export interface TargetShippingLabel {
  ship_to: string;
  ship_to_post_barcode: {
    base64: string;
  };
  postal_code: string;
  carrier_code?: string;
  carrier_name: string;
  po_number: string;
  dpci: string;
  upc: string;
  product_description: string;
  from: string;
  case_pack: string;
  style: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export const TargetPostalCodePrefix = "(420)";

export interface TargetShippingLabelModel {
  status: number;
  code: string;
  data: {
    labels?: TargetShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface TargetShippingLabelError {
  message: string;
}

export const TargetShippingLabelDefaultValues = {
  ship_to_post_barcode: "NOT_GENERATED",
  sscc_barcode: "NOT_GENERATED",
  carrier_name: ""
};

export interface ShippingLabelModelData {
  totalNumberOfLabels?: number;
  labels?: GetShippingLabel[];
  page?: number;
  errors?: Array<{ message: string }>;
}

export interface ShippingLabelModel {
  status: number;
  code: string;
  data: ShippingLabelModelData;
}

export interface GetShippingLabel {
  id: string;
  labelType: string;
  shipTo: string;
  shipToPostBarCode?: {
    base64: string;
  };
  postalCode?: string;
  poNumber: string;
  dpci?: string;
  sku?: string;
  skuBarCode?: {
    base64: string;
  };
  noOfCartons?: string;
  upc: string;
  productDescription?: string;
  from: string;
  casePack: string;
  unit?: string;
  style: string;
  ssccNumber: string;
  ssccBarCode?: {
    base64: string;
  };
  cvsLineItemNumber?: string;
  carrierName?: string;
  weight?: string;
  expiryDate?: string;
  upcaBarcode?: {
    base64: string;
  };
  quantityShipped?: string;
  shipDate?: string;
  shippingMethod?: string;
  billOfLadingNumber?: string;
  productIdentifier?: string;
  classNumber?: string;
  departmentNumber?: string;
  departmentDescription?: string;
  classDescription?: string;
  itemCountryOfOrigin?: string;
  ssccNumberLast4Chars?: string;
  vendorItemId?: string;
  skuDescription?: string;
}

/* This config is created because the keys are different for 
different trading partners, like sku for McLane, dpci for Target & cvs_line_item_number for CVS
so this config helps to sort in mongo based on whatever key is specified in the doc
*/
export const sortKeyPairs = {
  sku: {
    sku: 1,
    dpci: 1,
    cvs_line_item_number: 1,
    sscc_number: 1,
    created_at: -1
  },
  vendorPartNumber: {
    style: 1,
    sscc_number: 1,
    created_at: -1
  },
  upc: {
    upc: 1,
    sscc_number: 1,
    created_at: -1
  },
  default: {
    sscc_number: 1,
    created_at: -1
  }
};

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc"
}

export enum SortKey {
  SKU = "sku",
  UPC = "upc",
  VENDORPARTNUMBER = "vendorPartNumber"
}
export interface McLaneShippingLabel {
  ship_to: string;
  ship_to_post_barcode: {
    base64: string;
  };
  postal_code: string;
  carrier_code?: string;
  carrier_name: string;
  po_number: string;
  sku: string;
  upc: string;
  from: string;
  no_of_carton: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface McLaneShippingLabelModel {
  status: number;
  code: string;
  data: {
    labels?: McLaneShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface HTShippingLabelModel {
  status: number;
  code: string;
  data: {
    labels?: HTShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface HTShippingLabel {
  ship_to: string;
  ship_to_post_barcode: {
    base64: string;
  };
  postal_code: string;
  carrier_code?: string;
  carrier_name?: string;
  po_number: string;
  bill_of_lading_number?: string;
  quantity_shipped?: string;
  product_description: string;
  from: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface MeijerShippingLabelModel {
  status: number;
  code: string;
  data: {
    labels?: MeijerShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface MeijerShippingLabel {
  ship_to: string;
  ship_to_post_barcode: {
    base64: string;
  };
  postal_code: string;
  carrier_code?: string;
  carrier_name: string;
  po_number: string;
  dpci: string;
  upc: string;
  product_description: string;
  from: string;
  case_pack: string;
  style: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface FrancescasShippingLabelModel {
  status: number;
  code: string;
  data: {
    labels?: FrancescasShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface FrancescasShippingLabel {
  ship_to: string;
  ship_to_post_barcode: {
    base64: string;
  };
  postal_code: string;
  carrier_code?: string;
  carrier_name: string;
  po_number: string;
  dpci: string;
  upc: string;
  product_description: string;
  from: string;
  case_pack: string;
  style: string;
  sku: string;
  color: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export const McLanePostalCodePrefix = "(420)";

export const MeijerPostalCodePrefix = "(420)";

export const FrancescasPostalCodePrefix = "(420)";

export const HEBPostalCodePrefix = "(420)";

export interface WegmansShippingLabel {
  ship_to: string;
  postal_code: string;
  po_number: string;
  carrier_code?: string;
  carrier_name?: string;
  department_number?: string;
  store_number?: string;
  store_barcode?: {
    base64: string;
  };
  gs1_128_barcode: {
    base64: string;
  };
  customer: string;
  from: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface HEBShippingLabel {
  ship_to: string;
  postal_code: string;
  ship_to_post_barcode: {
    base64: string;
  };
  po_number: string;
  bill_of_lading_number?: string;
  expiration_date?: string;
  product_identifier?: string;
  product_description?: string;
  quantity_shipped?: string;
  vendor_part_number?: string;
  from: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface CrateAndBarrelShippingLabel {
  from: string;
  ship_to: string;
  sku_barcode: {
    base64: string;
  };
  sku: string;
  quantity_shipped: string;
  weight: string;
  department_number: string;
  class_number: string;
  po_number: string;
  item_country_of_origin: string;
  sscc_number_last_4_digit: string;
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };

  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}

export interface WegmansShippingLabelResponseModel {
  status: number;
  code: string;
  data: {
    labels?: WegmansShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface HEBShippingLabelResponseModel {
  status: number;
  code: string;
  data: {
    labels?: HEBShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface CrateAndBarrelShippingLabelResponseModel {
  status: number;
  code: string;
  data: {
    labels?: CrateAndBarrelShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export interface ThriveMarketShippingLabelResponseModel {
  status: number;
  code: string;
  data: {
    labels?: ThriveMarketShippingLabel[];
    errors?: TargetShippingLabelError[];
  };
}

export const ThriveMarketPostalCodePrefix = "(420)";

export interface ThriveMarketShippingLabel {
  ship_from?: string;
  ship_to?: string;
  postal_code?: string;
  ship_to_post_barcode?: {
    base64: string;
  };
  carrier?: string;
  bill_of_lading_number?: string;
  pro?: string;
  quantity_shipped: string;
  po_number?: string;
  sku?: string;
  sku_description?: string;
  location_number?: string;
  location_barcode?: {
    base64: string;
  };
  sscc_number: string;
  sscc_barcode: {
    base64: string;
  };
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  organization_id: string;
  integration_id: string;
  asn_id: string;
  po_id: string;
  label_type: string;
  state: [
    {
      value: string;
      updated_at: string;
      updated_by: string;
    }
  ];
}
