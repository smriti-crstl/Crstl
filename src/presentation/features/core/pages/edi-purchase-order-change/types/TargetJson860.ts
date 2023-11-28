// Generated by https://quicktype.io

export interface TargetJson860 {
  status: number;
  code: string;
  data: Data;
}

export interface Data {
  metadata: DataMetadata;
  file: File;
}

export interface File {
  metadata: FileMetadata;
  json_edi: Document;
}

export interface Document {
  code: string;
  output: Output;
}

export interface Output {
  interchanges: Interchange[];
  __version: string;
}

export interface Interchange {
  interchange_control_header_ISA: { [key: string]: string };
  groups: Group[];
  interchange_control_trailer_IEA: InterchangeControlTrailerIEA;
  delimiters: Delimiters;
}

export interface Delimiters {
  element: string;
  segment: string;
  sub_element: string;
}

export interface Group {
  functional_group_header_GS: FunctionalGroupHeaderGS;
  transaction_sets: TransactionSet[];
  functional_group_trailer_GE: FunctionalGroupTrailerGE;
  release: string;
}

export interface FunctionalGroupHeaderGS {
  functional_identifier_code_01: string;
  application_senders_code_02: string;
  application_receivers_code_03: string;
  date_04: string;
  time_05: string;
  group_control_number_06: string;
  responsible_agency_code_07: string;
  version_release_industry_identifier_code_08: string;
}

export interface FunctionalGroupTrailerGE {
  number_of_transaction_sets_included_01: string;
  group_control_number_02: string;
}

export interface TransactionSet {
  set: string;
  heading: Heading;
  detail: Detail;
  summary: Summary;
}

export interface Detail {
  line_item_change_POC_loop: LineItemChangePOCLoop[];
}

export interface LineItemChangePOCLoop {
  line_item_change_POC: LineItemChangePOC;
}

export interface LineItemChangePOC {
  assigned_identification_01: string;
  change_or_response_type_code_02: string;
  quantity_ordered_03: string;
  quantity_left_to_receive_04: string;
  composite_unit_of_measure_05: CompositeUnitOfMeasure05;
  unit_price_06: string;
  product_service_id_qualifier_08: string;
  product_service_id_09: string;
  product_service_id_qualifier_10: string;
  product_service_id_11: string;
  product_service_id_qualifier_12: string;
  product_service_id_13: string;
  product_service_id_qualifier_14: string;
  product_service_id_15: string;
}

export interface CompositeUnitOfMeasure05 {
  unit_or_basis_for_measurement_code_01: string;
}

export interface Heading {
  transaction_set_header_ST: TransactionSetHeaderST;
  beginning_segment_for_purchase_order_change_BCH: BeginningSegmentForPurchaseOrderChangeBCH;
  reference_identification_REF: ReferenceIdentificationREF[];
  fob_related_instructions_FOB: FobRelatedInstructionsFOB[];
  sales_requirements_CSH: SalesRequirementsCSH[];
  name_N1_loop: NameN1Loop[];
}

export interface BeginningSegmentForPurchaseOrderChangeBCH {
  transaction_set_purpose_code_01: string;
  purchase_order_type_code_02: string;
  purchase_order_number_03: string;
  date_06: string;
  contract_number_08: string;
  date_11: string;
}

export interface FobRelatedInstructionsFOB {
  shipment_method_of_payment_01: string;
  location_qualifier_02: string;
  description_03: string;
}

export interface NameN1Loop {
  name_N1: NameN1;
  address_information_N3: AddressInformationN3[];
  geographic_location_N4: GeographicLocationN4[];
}

export interface AddressInformationN3 {
  address_information_01: string;
}

export interface GeographicLocationN4 {
  city_name_01: string;
  state_or_province_code_02: string;
  postal_code_03: string;
  country_code_04: string;
}

export interface NameN1 {
  entity_identifier_code_01: string;
  name_02: string;
  identification_code_qualifier_03: string;
  identification_code_04: string;
}

export interface ReferenceIdentificationREF {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
  description_03: string;
}

export interface SalesRequirementsCSH {
  sales_requirement_code_01: string;
}

export interface TransactionSetHeaderST {
  transaction_set_identifier_code_01: string;
  transaction_set_control_number_02: string;
}

export interface Summary {
  transaction_totals_CTT_loop: TransactionTotalsCTTLoop[];
  transaction_set_trailer_SE: TransactionSetTrailerSE;
}

export interface TransactionSetTrailerSE {
  number_of_included_segments_01: string;
  transaction_set_control_number_02: string;
}

export interface TransactionTotalsCTTLoop {
  transaction_totals_CTT: TransactionTotalsCTT;
}

export interface TransactionTotalsCTT {
  number_of_line_items_01: string;
  hash_total_02: string;
}

export interface InterchangeControlTrailerIEA {
  number_of_included_functional_groups_01: string;
  interchange_control_number_02: string;
}

export interface FileMetadata {
  version: number;
  created_at: string;
}

export interface DataMetadata {
  state: State[];
  po_id: string;
  customer_id: string;
  integration_id: string;
  document_type: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  ext_created_at: string;
  po_change_date: string;
  trading_partner_name: string;
  isa07: string;
  isa08: string;
  isa13: string;
  gs02: string;
  gs03: string;
  gs06: string;
  st02: string;
  fa_doc_id: string;
  fa_state: State[];
  raw_860_doc_id: string;
  source_850_doc_id: string;
}

export interface State {
  value: string;
  updated_at: string;
  updated_by: string;
}