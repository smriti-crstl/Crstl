export interface ShopbopWarehouseASNHLLoopPack {
  reference_identification_REF: ReferenceIdentificationREF;
  carrier_details_quantity_and_weight_TD1: CarrierDetailsQuantityAndWeightTD1;
  marks_and_numbers_MAN: {
    marks_and_numbers_qualifier_01: string;
    marks_and_numbers_02: string;
  };
  HL_loop_item: ShopbopWarehouseASNHLLoopItem[];
}

export interface CarrierDetailsQuantityAndWeightTD1 {
  packaging_code_01: string;
  lading_quantity_02: string;
  commodity_code_qualifier_03: string;
  commodity_code_04: string;
  lading_description_05: string;
  weight_qualifier_06: string;
  weight_07: string;
  unit_or_basis_for_measurement_code_08: string;
}
export interface ReferenceIdentificationREF {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
}

export type handleQuantityChangeFn = (
  propertyPath: string,
  newCount?: string
) => void;

export type handleGrossWeightChangeFn = (
  propertyPath: string,
  newVal?: number
) => void;

export interface ShopbopWarehouseASNHLLoopItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
}

export interface ItemDetailShipmentSN1 {
  assigned_identification_01: string;
  number_of_units_shipped_02: string;
  unit_or_basis_for_measurement_code_03: string;
}

export interface ItemIdentificationLIN {
  assigned_identification_01: string;
  product_service_id_qualifier_02: string;
  product_service_id_03: string;
  product_service_id_qualifier_04: string;
  product_service_id_05: string;
  product_service_id_qualifier_06: string;
  product_service_id_07: string;
}

export type handleDeleteRowFn = (rowIndex: number) => void;
