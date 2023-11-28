import { compact, get } from "lodash";

import { formatDate, formatTime } from "../../edi-invoice/sub-components";
import { HeaderContainer, HeaderSummaryTable } from "../ShipmentPage.styles";

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

type KVPair = {
  [key: string]: string;
};

const transactionPurposeMap: KVPair = {
  "00": "Original",
  "07": "Duplicate",
};

const transportationMethodTypeCode: KVPair = {
  A: "Air",
  C: "Consolidation",
  M: "Motor (Common Carrier)",
  U: "Private Parcel Service",
};

const ShipmentViewPageHeader = ({ data }: { data: unknown }) => {
  const dtm = get(
    data,
    `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.date_time_reference_DTM`
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shipDateItem =
    dtm?.find((item: any) => {
      return item.date_time_qualifier_01 === "shipped_011";
    }) ||
    dtm?.find((item: any) => {
      return item.date_time_qualifier_01 === "  011";
    });

  const shipDate =
    shipDateItem && shipDateItem.date_02 !== "USER_INPUT"
      ? shipDateItem.date_02
      : "";

  const formattedshipDate = shipDate
    ? formatDate(shipDate, "MM/DD/YYYY")
    : null;

  const shipNoticeDate = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.date_03`,
    null
  );

  const shipNoticeTime = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.time_04`,
    null
  );

  const formattedShipNoticeDate = shipNoticeDate
    ? formatDate(shipNoticeDate, "MM/DD/YYYY")
    : null;

  const formattedShipNoticeTime = shipNoticeTime
    ? formatTime(shipNoticeTime)
    : null;

  const formattedShipNoticeDateAndTime = compact([
    formattedShipNoticeDate,
    formattedShipNoticeTime,
  ]).join(" - ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getShippingQty = (data: any) => {
    const qty = get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_quantity_and_weight_TD1[0].lading_quantity_02`
    );

    const uom = get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_quantity_and_weight_TD1[0].packaging_code_01`
    );

    return qty ? `${qty} ${uom}` : "";
  };

  const weightUOMMap: Record<string, string> = {
    pound_LB: "Pound",
  };

  const volumeUOMMap: Record<string, string> = {
    cubic_feet_CF: "Cubic Feet",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWeight = (data: any) => {
    const weight = get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_quantity_and_weight_TD1[0].weight_07`
    );

    const uom = get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_quantity_and_weight_TD1[0].unit_or_basis_for_measurement_code_08`
    );

    return weight
      ? `${weight} ${weightUOMMap[uom] ? weightUOMMap[uom] : ""}`
      : "";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVolume = (data: any) => {
    const volume = get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_quantity_and_weight_TD1[0].volume_09`
    );

    const uom = get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_quantity_and_weight_TD1[0].unit_or_basis_for_measurement_code_10`
    );

    return volume
      ? `${volume} ${volumeUOMMap[uom] ? volumeUOMMap[uom] : ""}`
      : "";
  };

  const sample = {
    shipNoticeNumber: get(
      data,
      `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.shipment_identification_02`
    ),
    ASNType:
      transactionPurposeMap[
        get(
          data,
          `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.transaction_set_purpose_code_01`
        )
      ],
    shippingQty: getShippingQty(data),
    billOfLadingNumber: get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.reference_identification_REF_BM.reference_identification_02`
    ),
    carrierProTrackSealNumber: get(
      data,
      `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.reference_identification_REF_CN.reference_identification_02`
    ),
    shipDate: formattedshipDate,
    weight: getWeight(data),
    volume: getVolume(data),
    shipNoticeDateTime: formattedShipNoticeDateAndTime,
    carrier: `\n${
      get(
        data,
        `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_routing_sequence_transit_time_TD5[0].identification_code_03`
      ) || ""
    }\n
    ${
      transportationMethodTypeCode[
        get(
          data,
          `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_routing_sequence_transit_time_TD5[0].transportation_method_type_code_04`
        )
      ] || ""
    }\n
    ${
      get(
        data,
        `${firstTransactionSet}.detail.hierarchical_level_HL_shipment.carrier_details_routing_sequence_transit_time_TD5[0].routing_05`
      ) || ""
    }\n`,
  };

  return (
    <HeaderContainer>
      <div>
        <p>
          Ship Notice #: <strong>{sample.shipNoticeNumber}</strong>
        </p>
        <p>
          ASN Type: <strong>{sample.ASNType}</strong>
        </p>
        <p>
          Shipping Quantity:{" "}
          <strong>{sample.shippingQty ? sample.shippingQty : ""}</strong>
        </p>
        <p>Bill of Lading#: {sample.billOfLadingNumber}</p>
        <p>Carrier Pro/Track/Seal #: {sample.carrierProTrackSealNumber}</p>
      </div>
      <div
        style={{
          borderRadius: 4,
          border: "1px solid #f0f0f0",
          padding: "0px 12px",
        }}
      >
        <HeaderSummaryTable summary="These are the key and value pairs">
          <tr>
            <th scope="row">
              Ship notice date: <strong>{sample.shipNoticeDateTime}</strong>
            </th>
            <td>
              Ship date: <strong>{sample.shipDate}</strong>
            </td>
          </tr>
          <tr>
            <th>Delivery Date:</th>
            <td>
              Carrier: <strong>{sample.carrier}</strong>
            </td>
          </tr>
          <tr>
            <th>
              Weight: <strong>{sample.weight}</strong>
            </th>
            <td>Trailer: </td>
          </tr>
          <tr>
            <th>
              Volume:<strong>{sample.volume}</strong>
            </th>
            <td> </td>
          </tr>
        </HeaderSummaryTable>
      </div>
    </HeaderContainer>
  );
};

export default ShipmentViewPageHeader;
