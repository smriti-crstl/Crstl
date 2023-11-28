export type handlePackCountChangeFn = (
  productId: string,
  newCount: number
) => void;

export interface HEBASNHLLoopPackItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  marks_and_numbers_MAN: MarksAndNumbersMAN[];
  HL_loop_item: HLLoopItem[];
}

interface HLLoopItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  product_item_description_PID: ProductItemDescriptionPID[];
}

interface ItemDetailShipmentSN1 {
  number_of_units_shipped_02: string;
  unit_or_basis_for_measurement_code_03: string;
}

interface ItemIdentificationLIN {
  product_service_id_qualifier_02: string;
  product_service_id_03: string;
}

interface ProductItemDescriptionPID {
  item_description_type_01: string;
  description_05: string;
}

interface MarksAndNumbersMAN {
  marks_and_numbers_qualifier_01: string;
  marks_and_numbers_02: string;
}

