export type handleDeleteRowFn = (rowIndex: number) => void;

export interface MeijerASNHLLoopPack {
  HL_loop_item: MeijerASNHLLoopItem[];
  item_physical_details_PO4: {
    gross_weight_per_pack_06: string;
    unit_or_basis_for_measurement_code_07: string;
  };
  marks_and_numbers_information_MAN: {
    marks_and_numbers_02: string;
    marks_and_numbers_qualifier_01: string;
  }[];
}

export interface MeijerASNHLLoopItem {
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  item_identification_LIN: ItemIdentificationLIN;
  item_physical_details_PO4: ItemPhysicalDetailsPO4;
}

export interface ItemDetailShipmentSN1 {
  number_of_units_shipped_02: string;
  unit_or_basis_for_measurement_code_03: string;
}

export interface ItemIdentificationLIN {
  product_service_id_qualifier_02: string;
  product_service_id_03: string;
}

export interface ItemPhysicalDetailsPO4 {
  pack_01: string;
  packaging_code_04: string;
  weight_qualifier_05: string;
  gross_weight_per_pack_06: string;
  unit_or_basis_for_measurement_code_07: string;
  number_18: string;
}

