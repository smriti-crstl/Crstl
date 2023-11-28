export interface CvsJSON {
  status: number;
  code: string;
  data: Data;
}

export interface Data {
  metadata: { [key: string]: null | string };
  file: File;
}

export interface File {
  metadata: Metadata;
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
  baseline_item_data_invoice_IT1_loop: BaselineItemDataInvoiceIT1Loop[];
}

export interface BaselineItemDataInvoiceIT1Loop {
  baseline_item_data_invoice_IT1: BaselineItemDataInvoiceIT1;
  conditions_indicator_CRC: ConditionsIndicatorCRC;
  quantity_information_QTY: QuantityInformationQTY[];
  currency_CUR: CurrencyCUR;
  additional_item_data_IT3: AdditionalItemDataIT3[];
  tax_information_TXI: TaxInformationTXI[];
  pricing_information_CTP: TariffReferenceL7[];
  period_amount_PAM: PeriodAmountPAM[];
  measurements_MEA: MeasurementsMEA[];
  product_item_description_PID_loop: ProductItemDescriptionPIDLoop[];
  paperwork_PWK: PaperworkPWK[];
  marking_packaging_loading_PKG: MarkingPackagingLoadingPKG[];
  item_physical_details_PO4: { [key: string]: string };
  terms_of_sale_deferred_terms_of_sale_ITD: TariffReferenceL7[];
  reference_information_REF: PartyIdentificationN1LoopReferenceInformationREF[];
  yes_no_question_YNQ: YesNoQuestionYNQ[];
  administrative_communications_contact_PER: AdministrativeCommunicationsContactPER[];
  destination_quantity_SDQ: DestinationQuantitySDQ[];
  date_time_reference_DTM: BaselineItemDataInvoiceIT1LoopDateTimeReferenceDTM[];
  carrier_details_CAD: CarrierDetailsCADElement[];
  tariff_reference_L7: TariffReferenceL7[];
  requested_service_schedule_SR: TariffReferenceL7;
  service_promotion_allowance_or_charge_information_SAC_loop: BaselineItemDataInvoiceIT1LoopServicePromotionAllowanceOrChargeInformationSACLoop[];
  subline_item_detail_SLN_loop: SublineItemDetailSLNLoop[];
  party_identification_N1_loop: BaselineItemDataInvoiceIT1LoopPartyIdentificationN1Loop[];
  code_source_information_LM_loop: CodeSourceInformationLMLoop[];
  vessel_identification_V1_loop: VesselIdentificationV1Loop[];
  type_of_financial_accounting_data_FA1_loop: TypeOfFinancialAccountingDataFA1Loop[];
}

export interface BaselineItemDataInvoiceIT1 {
  assigned_identification_01: string;
  quantity_invoiced_02: string;
  unit_or_basis_for_measurement_code_03: string;
  unit_price_04: string;
  basis_of_unit_price_code_05: string;
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
}

export interface AdditionalItemDataIT3 {
  number_of_units_shipped_01: string;
  unit_or_basis_for_measurement_code_02: string;
  shipment_order_status_code_03: string;
  quantity_difference_04: string;
  change_reason_code_05: string;
}

export interface AdministrativeCommunicationsContactPER {
  contact_function_code_01: string;
}

export interface CarrierDetailsCADElement {
  transportation_method_type_code_01: string;
  routing_05: string;
}

export interface CodeSourceInformationLMLoop {
  code_source_information_LM: CodeSourceInformationLM;
  industry_code_identification_LQ: TariffReferenceL7[];
}

export interface CodeSourceInformationLM {
  agency_qualifier_code_01: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TariffReferenceL7 {}

export interface ConditionsIndicatorCRC {
  code_category_01: string;
  yes_no_condition_or_response_code_02: string;
  condition_indicator_code_03: string;
}

export interface CurrencyCUR {
  entity_identifier_code_01: string;
  currency_code_02: string;
}

export interface BaselineItemDataInvoiceIT1LoopDateTimeReferenceDTM {
  date_time_qualifier_01: string;
  date_02: string;
}

export interface DestinationQuantitySDQ {
  unit_or_basis_for_measurement_code_01: string;
  identification_code_03: string;
  quantity_04: string;
}

export interface MarkingPackagingLoadingPKG {
  agency_qualifier_code_03: string;
  packaging_description_code_04: string;
}

export interface MeasurementsMEA {
  measurement_value_03: string;
}

export interface PaperworkPWK {
  report_type_code_01: string;
}

export interface BaselineItemDataInvoiceIT1LoopPartyIdentificationN1Loop {
  party_identification_N1: PurplePartyIdentificationN1;
  additional_name_information_N2: AdditionalNameInformationN2[];
  party_location_N3: PurplePartyLocationN3[];
  geographic_location_N4: TariffReferenceL7;
  reference_information_REF: PartyIdentificationN1LoopReferenceInformationREF[];
  administrative_communications_contact_PER: AdministrativeCommunicationsContactPER[];
  demographic_information_DMG: TariffReferenceL7;
}

export interface AdditionalNameInformationN2 {
  name_01: string;
}

export interface PurplePartyIdentificationN1 {
  entity_identifier_code_01: string;
  name_02: string;
}

export interface PurplePartyLocationN3 {
  address_information_01: string;
}

export interface PartyIdentificationN1LoopReferenceInformationREF {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
}

export interface PeriodAmountPAM {
  quantity_qualifier_01: string;
  quantity_02: string;
  composite_unit_of_measure_03: { [key: string]: string };
}

export interface ProductItemDescriptionPIDLoop {
  product_item_description_PID: ProductItemDescriptionPIDLoopProductItemDescriptionPID;
  measurements_MEA: MeasurementsMEA[];
}

export interface ProductItemDescriptionPIDLoopProductItemDescriptionPID {
  item_description_type_code_01: string;
  product_process_characteristic_code_02: string;
  agency_qualifier_code_03: string;
  product_description_code_04: string;
  description_05: string;
  surface_layer_position_code_06: string;
  source_subqualifier_07: string;
  yes_no_condition_or_response_code_08: string;
  language_code_09: string;
}

export interface QuantityInformationQTY {
  quantity_qualifier_01: string;
  quantity_02: string;
}

export interface BaselineItemDataInvoiceIT1LoopServicePromotionAllowanceOrChargeInformationSACLoop {
  service_promotion_allowance_or_charge_information_SAC: ServicePromotionAllowanceOrChargeInformationSac;
  tax_information_TXI_loop: TaxInformationTXILoop[];
}

export interface ServicePromotionAllowanceOrChargeInformationSac {
  allowance_or_charge_indicator_code_01: string;
  service_promotion_allowance_or_charge_code_02: string;
  agency_qualifier_code_03: string;
  agency_service_promotion_allowance_or_charge_code_04: string;
  amount_05: string;
  allowance_charge_percent_qualifier_06: string;
  percent_07: string;
  rate_08: string;
  unit_or_basis_for_measurement_code_09: string;
  quantity_10: string;
  quantity_11: string;
  allowance_or_charge_method_of_handling_code_12: string;
  reference_identification_13: string;
  option_number_14: string;
  description_15: string;
  language_code_16: string;
}

export interface TaxInformationTXILoop {
  tax_information_TXI: TaxInformationTXI;
  date_time_reference_DTM: BaselineItemDataInvoiceIT1LoopDateTimeReferenceDTM;
}

export interface TaxInformationTXI {
  tax_type_code_01: string;
  monetary_amount_02: string;
}

export interface SublineItemDetailSLNLoop {
  subline_item_detail_SLN: SublineItemDetailSLN;
  date_time_reference_DTM: SublineItemDetailSLNLoopDateTimeReferenceDTM;
  reference_information_REF: PartyIdentificationN1LoopReferenceInformationREF[];
  product_item_description_PID: ProductItemDescriptionPIDElement[];
  service_promotion_allowance_or_charge_information_SAC: ServicePromotionAllowanceOrChargeInformationSAC[];
  commodity_TC2: CommodityTC2[];
  tax_information_TXI: TaxInformationTXI[];
}

export interface CommodityTC2 {
  commodity_code_qualifier_01: string;
  commodity_code_02: string;
}

export interface SublineItemDetailSLNLoopDateTimeReferenceDTM {
  date_time_qualifier_01: string;
  date_02: string;
  time_03: string;
  time_code_04?: string;
  date_time_period_format_qualifier_05: string;
  date_time_period_06: string;
}

export interface ProductItemDescriptionPIDElement {
  item_description_type_code_01: string;
  agency_qualifier_code_03: string;
  product_description_code_04: string;
  source_subqualifier_07: string;
  yes_no_condition_or_response_code_08: string;
}

export interface ServicePromotionAllowanceOrChargeInformationSAC {
  allowance_or_charge_indicator_code_01: ServicePromotionAllowanceOrChargeInformationSac;
  service_promotion_allowance_or_charge_code_02: ServicePromotionAllowanceOrChargeInformationSac;
}

export interface SublineItemDetailSLN {
  assigned_identification_01: string;
  assigned_identification_02: string;
  relationship_code_03: string;
  quantity_04: string;
  composite_unit_of_measurement_05: string;
  unit_price_06: string;
  basis_of_unit_price_code_07: string;
  relationship_code_08: string;
  product_service_id_qualifier_09: string;
  product_service_id_10: string;
  product_service_id_qualifier_11: string;
  product_service_id_12: string;
  product_service_id_qualifier_13: string;
  product_service_id_14: string;
  product_service_id_qualifier_15: string;
  product_service_id_16: string;
  product_service_id_qualifier_17: string;
  product_service_id_18: string;
  product_service_id_qualifier_19: string;
  product_service_id_20: string;
  product_service_id_qualifier_21: string;
  product_service_id_22: string;
  product_service_id_qualifier_23: string;
  product_service_id_24: string;
  product_service_id_qualifier_25: string;
  product_service_id_26: string;
  product_service_id_qualifier_27: string;
  product_service_id_28: string;
}

export interface TypeOfFinancialAccountingDataFA1Loop {
  type_of_financial_accounting_data_FA1: CodeSourceInformationLM;
  accounting_data_FA2: AccountingDataFA2[];
}

export interface AccountingDataFA2 {
  breakdown_structure_detail_code_01: string;
  financial_information_code_02: string;
}

export interface VesselIdentificationV1Loop {
  vessel_identification_V1: VesselIdentificationV1;
  port_or_terminal_R4: PortOrTerminalR4[];
  date_time_reference_DTM: BaselineItemDataInvoiceIT1LoopDateTimeReferenceDTM[];
}

export interface PortOrTerminalR4 {
  port_or_terminal_function_code_01: string;
}

export interface VesselIdentificationV1 {
  vessel_code_01: string;
  vessel_code_qualifier_08: string;
}

export interface YesNoQuestionYNQ {
  yes_no_condition_or_response_code_02: string;
}

export interface Heading {
  transaction_set_header_ST: TransactionSetHeaderST;
  beginning_segment_for_invoice_BIG: BeginningSegmentForInvoiceBIG;
  note_special_instruction_NTE: NoteSpecialInstructionNTE[];
  currency_CUR: CurrencyCUR;
  reference_identification_REF: HeadingReferenceInformationREF[];
  yes_no_question_YNQ: YesNoQuestionYNQ[];
  administrative_communications_contact_PER: AdministrativeCommunicationsContactPER[];
  name_N1_loop: HeadingPartyIdentificationN1Loop[];
  terms_of_sale_deferred_terms_of_sale_ITD: HeadingTermsOfSaleDeferredTermsOfSaleITD[];
  date_time_reference_DTM: SublineItemDetailSLNLoopDateTimeReferenceDTM[];
  fob_related_instructions_FOB: FobRelatedInstructionsFOB;
  product_item_description_PID: ProductItemDescriptionPIDElement[];
  measurements_MEA: MeasurementsMEA[];
  paperwork_PWK: PaperworkPWK[];
  marking_packaging_loading_PKG: MarkingPackagingLoadingPKG[];
  tariff_reference_L7: TariffReferenceL7;
  balance_detail_BAL: BalanceDetailBAL[];
  installment_information_INC: InstallmentInformationINC;
  period_amount_PAM: PeriodAmountPAM[];
  conditions_indicator_CRC: ConditionsIndicatorCRC;
  text_MTX: TariffReferenceL7[];
  code_source_information_LM_loop: CodeSourceInformationLMLoop[];
  extended_reference_information_N9_loop: ExtendedReferenceInformationN9Loop[];
  vessel_identification_V1_loop: VesselIdentificationV1Loop[];
  type_of_financial_accounting_data_FA1_loop: TypeOfFinancialAccountingDataFA1Loop[];
}

export interface HeadingTermsOfSaleDeferredTermsOfSaleITD {
  terms_type_code_01: string;
  terms_basis_date_code_02: string;
  terms_discount_percent_03: string;
  terms_discount_due_date_04: string;
  terms_discount_days_due_05: string;
  terms_net_due_date_06: string;
  terms_net_days_07: string;
  terms_discount_amount_08: string;
  deferred_amount_due_10: string;
  percent_of_invoice_payable_10: string;
  percent_of_invoice_payable_11: string;
  day_of_month_13: string;
}

export interface BalanceDetailBAL {
  balance_type_code_01: string;
  amount_qualifier_code_02: string;
  monetary_amount_03: string;
}

export interface BeginningSegmentForInvoiceBIG {
  date_01: string;
  invoice_number_02: string;
  date_03: string;
  purchase_order_number_04: string;
  transaction_type_code_07: string;
}

export interface ExtendedReferenceInformationN9Loop {
  extended_reference_information_N9: ExtendedReferenceInformationN9;
  message_text_MSG: MessageTextMSG[];
}

export interface ExtendedReferenceInformationN9 {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
  free_form_description_03: string;
  time_05: string;
  time_code_06: string;
}

export interface MessageTextMSG {
  free_form_message_text_01: string;
  printer_carriage_control_code_02: string;
  number_03: string;
}

export interface FobRelatedInstructionsFOB {
  shipment_method_of_payment_code_01: string;
  location_qualifier_02: string;
  description_03: string;
}

export interface InstallmentInformationINC {
  terms_type_code_01: string;
  composite_unit_of_measure_02: CompositeUnitOfMeasure02;
  quantity_03: string;
}

export interface CompositeUnitOfMeasure02 {
  unit_or_basis_for_measurement_code_01: string;
}

export interface NoteSpecialInstructionNTE {
  note_reference_code_01: string;
  description_02: string;
}

export interface HeadingPartyIdentificationN1Loop {
  name_N1: FluffyPartyIdentificationN1;
  additional_name_information_N2: AdditionalNameInformationN2[];
  address_information_N3: FluffyPartyLocationN3[];
  geographic_location_N4: GeographicLocationN4;
  reference_information_REF: PartyIdentificationN1LoopReferenceInformationREF[];
  administrative_communications_contact_PER: AdministrativeCommunicationsContactPER[];
  demographic_information_DMG: TariffReferenceL7;
}

export interface GeographicLocationN4 {
  city_name_01: string;
  state_or_province_code_02: string;
  postal_code_03: string;
  country_code_04: string;
  location_qualifier_05: string;
}

export interface FluffyPartyIdentificationN1 {
  entity_identifier_code_01: string;
  name_02: string;
  identification_code_qualifier_03: string;
  identification_code_04: string;
}

export interface FluffyPartyLocationN3 {
  address_information_01: string;
  address_information_02: string;
}

export interface HeadingReferenceInformationREF {
  reference_identification_qualifier_01: string;
  reference_identification_02: string;
  description_03: string;
}

export interface TransactionSetHeaderST {
  transaction_set_identifier_code_01: string;
  transaction_set_control_number_02: string;
}

export interface Summary {
  total_monetary_value_summary_TDS: TotalMonetaryValueSummaryTDS;
  tax_information_TXI: TaxInformationTXI[];
  carrier_detail_CAD: SummaryCarrierDetailsCAD;
  monetary_amount_information_AMT: MonetaryAmountInformationAMT[];
  service_promotion_allowance_or_charge_information_SAC_loop: SummaryServicePromotionAllowanceOrChargeInformationSACLoop[];
  invoice_shipment_summary_ISS_loop: InvoiceShipmentSummaryISSLoop[];
  transaction_totals_CTT: TransactionTotalsCTT;
  transaction_set_trailer_SE: TransactionSetTrailerSE;
}

export interface SummaryCarrierDetailsCAD {
  transportation_method_type_code_01: string;
  routing_05: string;
  equipment_initial_02: string;
  equipment_number_03: string;
  standard_carrier_alpha_code_04: string;
  shipment_order_status_code_06: string;
  reference_identification_qualifier_07: string;
  reference_identification_08: string;
}

export interface InvoiceShipmentSummaryISSLoop {
  invoice_shipment_summary_ISS: InvoiceShipmentSummaryISS;
  product_item_description_PID: ProductItemDescriptionPIDElement;
}

export interface InvoiceShipmentSummaryISS {
  number_of_units_shipped_01: string;
  unit_or_basis_for_measurement_code_02: string;
  weight_03: string;
  unit_or_basis_for_measurement_code_04: string;
  volume_05: string;
  unit_or_basis_for_measurement_code_06: string;
}

export interface MonetaryAmountInformationAMT {
  amount_qualifier_code_01: string;
  monetary_amount_02: string;
}

export interface SummaryServicePromotionAllowanceOrChargeInformationSACLoop {
  service_promotion_allowance_or_charge_information_SAC: ServicePromotionAllowanceOrChargeInformationSac;
  date_time_reference_DTM: BaselineItemDataInvoiceIT1LoopDateTimeReferenceDTM[];
  tax_information_TXI_loop: TaxInformationTXILoop[];
}

export interface TotalMonetaryValueSummaryTDS {
  amount_01: string;
  amount_02: string;
  amount_03: string;
  amount_04: string;
}

export interface TransactionSetTrailerSE {
  number_of_included_segments_01: string;
  transaction_set_control_number_02: string;
}

export interface TransactionTotalsCTT {
  number_of_line_items_01: string;
  hash_total_02: string;
  weight_03: string;
  unit_or_basis_for_measurement_code_04: string;
  volume_05: string;
  unit_or_basis_for_measurement_code_06: string;
  description_07: string;
}

export interface InterchangeControlTrailerIEA {
  number_of_included_functional_groups_01: string;
  interchange_control_number_02: string;
}

export interface Metadata {
  version: number;
  created_at: string;
  autofilled: boolean;
  source_document_version: number;
}
