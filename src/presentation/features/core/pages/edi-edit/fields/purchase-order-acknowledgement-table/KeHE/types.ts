export interface IKeHEPOAckTableItem {
  baseline_item_data_PO1: IBaselineItemDataPO1;
  product_item_description_PID_loop: IProductItemDescriptionPIDLoop[];
  line_item_acknowledgment_ACK_loop: ILineItemAcknowledgmentACKLoop[];
}

export interface IBaselineItemDataPO1 {
  assigned_identification_01: string;
  quantity_02: string;
  unit_or_basis_for_measurement_code_03: string;
  unit_price_04: string;
  product_service_id_qualifier_06: string;
  product_service_id_07: string;
}

export interface ILineItemAcknowledgmentACKLoop {
  line_item_acknowledgment_ACK: ILineItemAcknowledgmentACK;
}

export interface ILineItemAcknowledgmentACK {
  line_item_status_code_01: string;
  quantity_02: string;
  unit_or_basis_for_measurement_code_03: string;
  request_reference_number_06: string;
}

export interface IProductItemDescriptionPIDLoop {
  product_item_description_PID: IProductItemDescriptionPID;
}

export interface IProductItemDescriptionPID {
  item_description_type_01: string;
  description_05: string;
}

export type handleDeleteRowFn = (rowIndex: number) => void;
