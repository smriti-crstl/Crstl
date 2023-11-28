import { firstTransactionSetNoOutput } from "globals/configs";
import React from "react";

import { removeUserInput } from "../../edi-edit/helpers";
import { getValue } from "../../edi/edi.utils";
import {
  ItemTable,
  ScrollableTableContainer,
} from "../PurchaseOrderPage.styles";
import { CarrierDetailsQuantityAndWeightTD1 } from "../types/PurchaseOrderAcknowledgement";
import { Document } from "../types/TargetJson850";
import {
  PackagingCodeTextMap,
  VolumeUnitTextMap,
  WeightQualifierTextMap,
  WeightUnitTextMap,
} from "./constants";

interface PublicProps {
  data?: Document;
}

export const GenericCarrierDetailTable: React.FC<PublicProps> = ({ data }) => {
  const carrierDetailItems: CarrierDetailsQuantityAndWeightTD1[] = getValue(
    `${firstTransactionSetNoOutput}.heading.carrier_details_quantity_and_weight_TD1`,
    data,
    []
  );

  if (!carrierDetailItems.length) {
    return null;
  }

  return (
    <ScrollableTableContainer>
      <ItemTable>
        <thead>
          <td>Packaging Code</td>
          <td>Lading Quantity</td>
          <td>Weight Qualifier</td>
          <td>Weight</td>
          <td>Volume</td>
        </thead>
        <tbody>
          {carrierDetailItems.map((item, idx) => {
            const {
              packaging_code_01,
              lading_quantity_02,
              weight_qualifier_06,
              weight_07,
              unit_or_basis_for_measurement_code_08,
              volume_09,
              unit_or_basis_for_measurement_code_10,
            } = item;

            const weight = removeUserInput(weight_07);
            const volume = removeUserInput(volume_09);

            return (
              <tr key={idx}>
                <td>{PackagingCodeTextMap[packaging_code_01] ?? ""}</td>
                <td>{lading_quantity_02}</td>
                <td>{WeightQualifierTextMap[weight_qualifier_06] ?? ""}</td>
                <td>
                  {weight ? (
                    <>
                      {weight}{" "}
                      {WeightUnitTextMap[
                        unit_or_basis_for_measurement_code_08
                      ] ?? ""}
                    </>
                  ) : null}
                </td>
                <td>
                  {volume ? (
                    <>
                      {volume}{" "}
                      {VolumeUnitTextMap[
                        unit_or_basis_for_measurement_code_10
                      ] ?? ""}
                    </>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </ItemTable>
    </ScrollableTableContainer>
  );
};

