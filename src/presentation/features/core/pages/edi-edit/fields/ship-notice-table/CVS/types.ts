export interface CVSASNHLLoopPack {
  HL_loop_item: CVSASNHLLoopItem[];
  marks_and_numbers_MAN: {
    marks_and_numbers_02: string;
    marks_and_numbers_qualifier_01: string;
  }[];
}

export interface CVSASNHLLoopItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  item_physical_details_PO4: ItemPhysicalDetailsPO4;
  product_item_description_PID: ProductItemDescriptionPID[];
  date_time_reference_DTM: DateTimeReferenceDTM[];
}

export interface DateTimeReferenceDTM {
  date_time_qualifier_01: string;
  date_02: string;
}

export interface ItemDetailShipmentSN1 {
  number_of_units_shipped_02: string;
  unit_or_basis_for_measurement_code_03: string;
  quantity_ordered_05: string;
  unit_or_basis_for_measurement_code_06: string;
}

export interface ItemIdentificationLIN {
  product_service_id_qualifier_02: string;
  product_service_id_03: string;
  product_service_id_qualifier_06: string;
  product_service_id_07: string;
  product_service_id_qualifier_12: string;
  product_service_id_13: string;
}

export interface ItemPhysicalDetailsPO4 {
  pack_01: string;
  packaging_code_04: string;
  weight_qualifier_05: string;
  gross_weight_per_pack_06: string;
  unit_or_basis_for_measurement_code_07: string;
  number_18: string;
}

export interface ProductItemDescriptionPID {
  item_description_type_01: string;
  description_05: string;
}

export type handleDeleteRowFn = (rowIndex: number) => void;
