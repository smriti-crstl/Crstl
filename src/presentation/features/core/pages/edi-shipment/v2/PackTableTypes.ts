export interface Tare {
  marks_and_numbers_information_MAN: OrderMarksAndNumbersInformationMAN[];
  HL_loop_pack: HLLoopPack[];
}

export interface HLLoopPack {
  marks_and_numbers_information_MAN: HLLoopPackMarksAndNumbersInformationMAN[];
  HL_loop_item: HLLoopItem[];
}

export interface HLLoopPackWithContainerIds extends HLLoopPack {
  containerIds: string[];
  packCount: number;
  totalQuantityShipped: number;
}

export interface HLLoopItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  item_physical_details_PO4: ItemPhysicalDetailsPO4;
  product_item_description_PID: ProductItemDescriptionPID[];
}

export interface ItemDetailShipmentSN1 {
  number_of_units_shipped_02: number;
  unit_or_basis_for_measurement_code_03: string;
}

export interface ItemIdentificationLIN {
  product_service_id_qualifier_02: string;
  product_service_id_03: string;
  product_service_id_qualifier_04: string;
  product_service_id_05: string;
}

export interface ItemPhysicalDetailsPO4 {
  pack_01: number;
  size_02: number;
  unit_or_basis_for_measurement_code_03: string;
  inner_pack_14: number;
}

export interface ProductItemDescriptionPID {
  item_description_type_01: string;
  description_05: string;
}

export interface HLLoopPackMarksAndNumbersInformationMAN {
  marks_and_numbers_qualifier_01: string;
  marks_and_numbers_02: string;
}

export interface OrderMarksAndNumbersInformationMAN {
  marks_and_numbers_qualifier_01: string;
  marks_and_numbers_02: string;
  marks_and_numbers_03: string;
  marks_and_numbers_qualifier_04: string;
  marks_and_numbers_05: string;
  marks_and_numbers_06: string;
}
