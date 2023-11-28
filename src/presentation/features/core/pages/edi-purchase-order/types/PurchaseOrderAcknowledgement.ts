export interface BillToReference {
  name_N1: NameN1;
  address_information_N3: AddressInformationN3[];
  geographic_location_N4: GeographicLocationN4;
}

export interface AddressInformationN3 {
  address_information_01: string;
}

export interface GeographicLocationN4 {
  city_name_01: string;
  state_or_province_code_02: string;
  postal_code_03: string;
}

export interface NameN1 {
  entity_identifier_code_01: string;
  name_02: string;
  identification_code_qualifier_03: string;
  identification_code_04: string;
}

export interface CarrierDetailsQuantityAndWeightTD1 {
  lading_quantity_02: string;
  packaging_code_01: string;
  unit_or_basis_for_measurement_code_08: string;
  unit_or_basis_for_measurement_code_10: string;
  volume_09: string;
  weight_07: string;
  weight_qualifier_06: string;
}
