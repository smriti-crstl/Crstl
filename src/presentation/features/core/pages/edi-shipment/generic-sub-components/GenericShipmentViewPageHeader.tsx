import { cloneDeep, compact, get } from "lodash";
import { useEffect, useState } from "react";

import { removeUserInput } from "../../edi-edit/helpers";
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

export const getShipmentNumber = (data: unknown) => {
  return get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.shipment_identification_02`
  );
};

const GenericShipmentViewPageHeader = ({ data }: { data: unknown }) => {
  const [sample, setSample] = useState<any>();

  const dtm = get(
    data,
    `${firstTransactionSet}.detail.HL_loop_shipment[0].date_time_reference_DTM`
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shipDateItem =
    dtm?.find((item: any) => {
      return item.date_time_qualifier_01 === "shipped_011";
    }) ||
    dtm?.find((item: any) => {
      return item.date_time_qualifier_01 === "011";
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
  console.log(shipDateItem, shipDate, formattedshipDate);

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
      `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1[0].lading_quantity_02`
    );

    const uom = get(
      data,
      `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1[0].packaging_code_01`
    );

    return qty ? (uom ? `${qty} ${uom}` : qty) : "";
  };

  const weightUOMMap: Record<string, string> = {
    pound_LB: "Pound",
    LB: "Pound",
  };

  const volumeUOMMap: Record<string, string> = {
    cubic_feet_CF: "Cubic Feet",
    CF: "Cubic Feet",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWeight = (data: any) => {
    let weight = get(
      data,
      `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1[0].weight_07`
    );

    const uom = get(
      data,
      `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1[0].unit_or_basis_for_measurement_code_08`
    );
    if (weight === "USER_INPUT") {
      weight = "";
    }

    return weight
      ? `${weight} ${weightUOMMap[uom] ? weightUOMMap[uom] : ""}`
      : "";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVolume = (data: any) => {
    const volume = get(
      data,
      `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1[0].volume_09`
    );

    const uom = get(
      data,
      `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_quantity_and_weight_TD1[0].unit_or_basis_for_measurement_code_10`
    );

    return volume
      ? `${volume} ${volumeUOMMap[uom] ? volumeUOMMap[uom] : ""}`
      : "";
  };

  useEffect(() => {
    if (data) {
      const _sample = {
        shipNoticeNumber: getShipmentNumber(data),
        ASNType:
          transactionPurposeMap[
            get(
              data,
              `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.transaction_set_purpose_code_01`
            )
          ] ||
          get(
            data,
            `${firstTransactionSet}.heading.beginning_segment_for_ship_notice_BSN.transaction_set_purpose_code_01`
          ),
        shippingQty: getShippingQty(data),
        billOfLadingNumber: "",
        carrierProTrackSealNumber: "",
        shipDate: formattedshipDate,
        weight: getWeight(data),
        volume: getVolume(data),
        shipNoticeDateTime: formattedShipNoticeDateAndTime,
        carrier: `\n${
          get(
            data,
            `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_routing_sequence_transit_time_TD5[0].identification_code_03`
          ) || ""
        }\n
        ${
          transportationMethodTypeCode[
            get(
              data,
              `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_routing_sequence_transit_time_TD5[0].transportation_method_type_code_04`
            )
          ] || ""
        }\n
        ${
          get(
            data,
            `${firstTransactionSet}.detail.HL_loop_shipment[0].carrier_details_routing_sequence_transit_time_TD5[0].routing_05`
          ) || ""
        }\n`,
      };
      const referenceLoop =
        get(
          data,
          `${firstTransactionSet}.detail.HL_loop_shipment[0].reference_information_REF`
        ) ||
        get(
          data,
          `${firstTransactionSet}.detail.HL_loop_shipment[0].reference_identification_REF`
        );
      referenceLoop?.forEach((ref: any) => {
        const qualifier = get(ref, `reference_identification_qualifier_01`);
        const identificationNumber = get(ref, `reference_identification_02`);
        if (qualifier === "BM") {
          _sample.billOfLadingNumber = identificationNumber;
        } else if (qualifier === "CN") {
          _sample.carrierProTrackSealNumber = identificationNumber;
        }
      });
      setSample(cloneDeep(_sample));
    }
  }, [data]);

  return (
    <HeaderContainer>
      <div>
        <p>
          Ship Notice #: <strong>{sample?.shipNoticeNumber}</strong>
        </p>
        <p>
          ASN Type: <strong>{sample?.ASNType}</strong>
        </p>
        <p>
          Shipping Quantity:{" "}
          <strong>
            {sample?.shippingQty && !sample?.shippingQty.includes("USER_INPUT")
              ? sample?.shippingQty
              : ""}
          </strong>
        </p>
        <p>
          Bill of Lading#:{" "}
          {sample?.billOfLadingNumber &&
          !sample?.billOfLadingNumber.includes("USER_INPUT")
            ? sample?.billOfLadingNumber
            : ""}
        </p>
        <p>
          Carrier Pro/Track/Seal #:{" "}
          {removeUserInput(sample?.carrierProTrackSealNumber)}
        </p>
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
              Ship notice date: <strong>{sample?.shipNoticeDateTime}</strong>
            </th>
            <td>
              Ship date: <strong>{sample?.shipDate}</strong>
            </td>
          </tr>
          <tr>
            <th>Delivery Date:</th>
            <td>
              Carrier:{" "}
              {sample?.carrier && !sample?.carrier.includes("USER_INPUT") && (
                <strong> {sample?.carrier}</strong>
              )}
            </td>
          </tr>
          <tr>
            <th>
              Weight: <strong>{sample?.weight}</strong>
            </th>
            <td>Trailer: </td>
          </tr>
          <tr>
            <th>
              Volume: <strong>{sample?.volume}</strong>
            </th>
            <td> </td>
          </tr>
        </HeaderSummaryTable>
      </div>
    </HeaderContainer>
  );
};

export default GenericShipmentViewPageHeader;
