export interface IUNFIPOAckTableItem {
  baseline_item_data_PO1: IBaselineItemDataPO1;
  line_item_acknowledgment_ACK_loop: ILineItemAcknowledgmentACKLoop[];
}

export interface IBaselineItemDataPO1 {
  quantity_ordered_02: string;
  unit_or_basis_for_measurement_code_03: string;
  unit_price_04: string;
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
}

export interface ILineItemAcknowledgmentACKLoop {
  line_item_acknowledgment_ACK: ILineItemAcknowledgmentACK;
  date_time_reference_DTM: IDateTimeReferenceDTM;
}

export interface IDateTimeReferenceDTM {
  date_time_qualifier_01: string;
  date_02: string;
}

export interface ILineItemAcknowledgmentACK {
  line_item_status_code_01: string;
  quantity_02: string;
  unit_or_basis_for_measurement_code_03: string;
  date_time_qualifier_04: string;
  date_05: string;
  product_service_id_qualifier_07: string;
  product_service_id_08: string;
  product_service_id_qualifier_09: string;
  product_service_id_10: string;
  product_service_id_qualifier_11: string;
  product_service_id_12: string;
  product_service_id_qualifier_13: string;
  product_service_id_14: string;
  product_service_id_qualifier_15: string;
  product_service_id_16: string;
}
