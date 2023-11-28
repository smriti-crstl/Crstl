export interface ItemIdentificationLIN {
  product_service_id_qualifier_02: string;
  product_service_id_03: string;
  product_service_id_qualifier_06: string;
  product_service_id_07: string;
  product_service_id_qualifier_12: string;
  product_service_id_13: string;
}

export interface ItemDetailShipmentSN1 {
  number_of_units_shipped_02: string;
  unit_or_basis_for_measurement_code_03: string;
  quantity_ordered_05: string;
  unit_or_basis_for_measurement_code_06: string;
}

export interface TargetDotComDvsASNHLLoopItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  marks_and_numbers_MAN: {
    marks_and_numbers_qualifier_01: string;
    marks_and_numbers_02: string;
  }[];
}

export type handleQuantityChangeFn = (
  propertyPath: string,
  newCount?: string
) => void;

export type handleTrackingNumberChangeFn = (
  propertyPath: string,
  newValue: string
) => void;

export type handleDeleteRowFn = (rowIndex: number) => void;
