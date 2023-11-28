export interface GroceryShippingAddress {
  name_N1: NameN1;
  address_information_N3: AddressInformationN3[];
  geographic_location_N4: GeographicLocationN4;
}

interface AddressInformationN3 {
  address_information_01: string;
  address_information_02?: string;
}

interface GeographicLocationN4 {
  city_name_01: string;
  state_or_province_code_02: string;
  postal_code_03: string;
}

interface NameN1 {
  entity_identifier_code_01: string;
  name_02: string;
  identification_code_qualifier_03: string;
  identification_code_04: string;
}

