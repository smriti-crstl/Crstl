export interface WalmartDCASNHLLoopPack {
  reference_identification_REF: ReferenceIdentificationREF;
  party_identification_N1_loop: PartyIdentificationN1Loop[];
  marks_and_numbers_MAN: {
    marks_and_numbers_qualifier_01: string;
    marks_and_numbers_02: string;
  };
  HL_loop_item: WalmartDCASNHLLoopItem[];
}

export interface PartyIdentificationN1Loop {
  party_identification_N1: PartyIdentificationN1;
}

export interface PartyIdentificationN1 {
  entity_identifier_code_01: string;
  name_02: string;
  identification_code_qualifier_03: string;
  identification_code_04: string;
}
export interface ReferenceIdentificationREF {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
}

export interface HLLoopItem {
  item_identification_LIN: ItemIdentificationLIN;
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  product_item_description_PID: ProductItemDescriptionPID[];
  reference_information_REF: ReferenceInformationREF[];
  date_time_reference_DTM: DateTimeReferenceDTM[];
}

export interface ProductItemDescriptionPID {
  item_description_type_01: string;
  description_05: string;
}

export interface ReferenceInformationREF {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
}

export interface DateTimeReferenceDTM {
  date_time_qualifier_01: string;
  date_02: string;
}

export type handleQuantityChangeFn = (
  propertyPath: string,
  newCount?: string
) => void;

export interface WalmartDCASNHLLoopItem {
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

export type handleDescriptionChangeFn = (
  propertyPath: string,
  newDescription?: string
) => void;

export type handleDeleteRowFn = (rowIndex: number) => void;
