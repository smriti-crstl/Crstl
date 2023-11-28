export interface TargetJSON {
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
}

export interface FunctionalGroupHeaderGS {
  functional_identifier_code_01: string;
  application_senders_code_02: string;
  application_receivers_code_03: string;
  date_04: string;
  time_05: string;
  responsible_agency_code_07: string;
  version_release_industry_identifier_code_08: string;
}

export interface FunctionalGroupTrailerGE {
  number_of_transaction_sets_included_01: string;
}

export interface TransactionSet {
  set: string;
  heading: Heading;
  detail: Detail;
  summary: Summary;
}

export interface Detail {
  hierarchical_level_HL_shipment: HierarchicalLevelHLShipment;
  hierarchical_level_HL_order: HierarchicalLevelHLOrder;
  hierarchical_level_HL_P_loop: HierarchicalLevelHLPLoop[];
  hierarchical_level_HL_I_loop: HierarchicalLevelHLILoop[];
}

export interface HierarchicalLevelHLILoop {
  hierarchical_level_HL: HierarchicalLevelHLILoopHierarchicalLevelHL;
  item_identification_LIN: {
    assigned_identification_01: string;
    product_service_id_qualifier_02: string;
    product_service_id_03: string;
    product_service_id_qualifier_04: string;
    product_service_id_05: string;
    product_service_id_qualifier_06: string;
    product_service_id_07: string;
    product_service_id_qualifier_08: string;
    product_service_id_09: string;
    product_service_id_qualifier_10: string;
    product_service_id_11: string;
    product_service_id_qualifier_12: string;
    product_service_id_13: string;
    product_service_id_qualifier_14: string;
    product_service_id_15: string;
    product_service_id_qualifier_16: string;
    product_service_id_17: string;
    product_service_id_qualifier_18: string;
    product_service_id_19: string;
    product_service_id_qualifier_20: string;
    product_service_id_21: string;
    product_service_id_qualifier_22: string;
    product_service_id_23: string;
    product_service_id_qualifier_24: string;
    product_service_id_25: string;
    product_service_id_qualifier_26: string;
    product_service_id_27: string;
    product_service_id_qualifier_28: string;
    product_service_id_29: string;
    product_service_id_qualifier_30: string;
    product_service_id_31: string;
  };
  item_detail_shipment_SN1: ItemDetailShipmentSN1;
  item_physical_details_PO4: HierarchicalLevelHLILoopItemPhysicalDetailsPO4;
  product_item_description_PID: ProductItemDescriptionPID[];
  date_time_reference_DTM: DateTimeReferenceDTM[];
}

export interface HierarchicalLevelHLILoopHierarchicalLevelHL {
  hierarchical_id_number_01: string;
  hierarchical_parent_id_number_02: string;
  hierarchical_level_code_03: string;
}

export interface ItemDetailShipmentSN1 {
  assigned_identification_01: string;
  number_of_units_shipped_02: string;
  unit_or_basis_for_measurement_code_03: string;
  quantity_ordered_05: string;
  unit_or_basis_for_measurement_code_06: string;
}

export interface HierarchicalLevelHLILoopItemPhysicalDetailsPO4 {
  pack_01: string;
  size_02: string;
  unit_or_basis_for_measurement_code_03: string;
  packaging_code_04: string;
  gross_volume_per_pack_08: string;
  unit_or_basis_for_measurement_code_09: string;
  assigned_identification_16: string;
  inner_pack_14: string;
}

export interface HierarchicalLevelHLPLoop {
  hierarchical_level_HL: HierarchicalLevelHLILoopHierarchicalLevelHL;
  item_physical_details_PO4: HierarchicalLevelHLPLoopItemPhysicalDetailsPO4;
  marks_and_numbers_MAN: MarksAndNumbersMAN[];
  // date_time_reference_DTM: DateTimeReferenceDTM[];
}

export interface DateTimeReferenceDTM {
  date_time_qualifier_01: string;
  date_02: string;
  time_03: string;
  time_code_04: string;
  time_code_05: string;
  date_time_period_06: string;
}

export interface HierarchicalLevelHLPLoopItemPhysicalDetailsPO4 {
  pack_01: string;
}

export interface MarksAndNumbersMAN {
  marks_and_numbers_qualifier_01: string;
  marks_and_numbers_02: string;
  marks_and_numbers_03: string;
  marks_and_number_qualifier_04: string;
  marks_and_numbers_05: string;
  marks_and_numbers_06: string;
}

export interface HierarchicalLevelHLOrder {
  hierarchical_level_HL: HierarchicalLevelHLILoopHierarchicalLevelHL;
  purchase_order_reference_PRF: PurchaseOrderReferencePRF;
  product_item_description_PID: ProductItemDescriptionPID[];
  carrier_details_quantity_and_weight_TD1: CarrierDetailsQuantityAndWeightTD1[];
  name_N1_loop: NameN1Loop[];
}

export interface CarrierDetailsQuantityAndWeightTD1 {
  packaging_code_01: string;
  lading_quantity_02: string;
}

export interface NameN1Loop {
  name_N1: NameN1;
}

export interface NameN1 {
  entity_identifier_code_01: string;
  name_02: string;
  identification_code_qualifier_03: string;
  identification_code_04: string;
  entity_relationship_code_05: string;
  entity_identifier_code_06: string;
}

export interface ProductItemDescriptionPID {
  item_description_type_01: string;
  product_process_characteristic_code_02: string;
  agency_qualifier_code_03: string;
  product_description_code_04: string;
  description_05: string;
}

export interface PurchaseOrderReferencePRF {
  purchase_order_number_01: string;
}

export interface HierarchicalLevelHLShipment {
  hierarchical_level_HL: HierarchicalLevelHLShipmentHierarchicalLevelHL;
  carrier_details_routing_sequence_transit_time_TD5: {
    routing_sequence_code_01: string;
    identification_code_qualifier_02: string;
    identification_code_03: string;
    transportation_method_type_code_04: string;
    routing_05: string;
    shipment_order_status_code_06: string;
    location_identifier_08: string;
    transit_time_11: string;
    service_level_code_12: string;
    service_level_code_13: string;
  }[];
  reference_identification_REF_BM: ReferenceIdentificationRef;
  reference_identification_REF_CN: ReferenceIdentificationRef;
  fob_related_instructions_FOB: FobRelatedInstructionsFOB;
  name_N1_loop: NameN1Loop[];
  date_time_reference_DTM: DateTimeReferenceDTM[];
}

export interface FobRelatedInstructionsFOB {
  shipment_method_of_payment_01: string;
  location_qualifier_02: string;
  description_03: string;
  transportation_terms_qualifier_code_04: string;
  transportation_terms_code_05: string;
  location_qualifier_06: string;
  description_07: string;
  risk_of_loss_code_08: string;
  description_09: string;
}

export interface HierarchicalLevelHLShipmentHierarchicalLevelHL {
  hierarchical_id_number_01: string;
  hierarchical_level_code_03: string;
}

export interface ReferenceIdentificationRef {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
  description_03: string;
}

export interface Heading {
  transaction_set_header_ST: TransactionSetHeaderST;
  beginning_segment_for_ship_notice_BSN: BeginningSegmentForShipNoticeBSN;
}

export interface BeginningSegmentForShipNoticeBSN {
  transaction_set_purpose_code_01: string;
  shipment_identification_02: string;
  date_03: string;
  time_04: string;
  hierarchical_structure_code_05: string;
  transaction_type_code_06: string;
}

export interface TransactionSetHeaderST {
  transaction_set_identifier_code_01: string;
  transaction_set_control_number_02: string;
}

export interface Summary {
  transaction_totals_CTT: TransactionTotalsCTT;
  transaction_set_trailer_SE: TransactionSetTrailerSE;
}

export interface TransactionSetTrailerSE {
  number_of_included_segments_01: string;
  transaction_set_control_number_02: string;
}

export interface TransactionTotalsCTT {
  number_of_line_items_01: string;
  weight_03: string;
  unit_or_basis_for_measurement_code_04: string;
  volume_05: string;
  unit_or_basis_for_measurement_code_06: string;
}

export interface InterchangeControlTrailerIEA {
  number_of_included_functional_groups_01: string;
}

export interface FileMetadata {
  version: number;
  created_at: string;
  autofilled: boolean;
  source_document_version: number;
  isArgoForm?: boolean;
}

export interface DataMetadata {
  state: State[];
  customer_id: string;
  integration_id: string;
  document_type: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  trading_partner_name: string;
  source_document_id: string;
  source_document_type: string;
  stage: string;
  isa13: string;
  gs06: string;
  st02: string;
}

export interface State {
  value: string;
  updated_at: string;
  updated_by: string;
}

