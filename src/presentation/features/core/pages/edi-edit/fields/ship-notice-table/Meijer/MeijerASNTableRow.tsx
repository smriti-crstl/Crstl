import { InputNumber } from "antd";
import { codeToTextMapping } from "globals/configs";
import { get, toString } from "lodash";

import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { ErrorSchema } from "@rjsf/utils";

import { RJSFErrorWrapper } from "../../../components";
import { getIdsInCustomTables, removeUserInput } from "../../../helpers";
import { ChangeHandlerFn } from "../../common";
import { handleDeleteRowFn, MeijerASNHLLoopPack } from "./types";
import { CellWrapper } from "../../common/styles";
import { Tooltip } from "antd";

interface IProps {
  data: MeijerASNHLLoopPack;
  onChange: ChangeHandlerFn;
  rowIndex: number; // * Need this for using lodash to manipulate state
  errorSchema?: ErrorSchema;
  isViewMode?: boolean;
  handleDeleteRow: handleDeleteRowFn;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const MeijerASNTableRow = ({
  data,
  onChange,
  rowIndex,
  errorSchema,
  isViewMode,
  handleDeleteRow,
  idSchema,
  copyToAll,
}: IProps) => {
  const productUPC = get(
    data,
    "HL_loop_item[0].item_identification_LIN.product_service_id_03",
    ""
  );
  const containerId = get(
    data,
    "marks_and_numbers_information_MAN[0].marks_and_numbers_02",
    ""
  );
  const grossWeightPerPack = get(
    data,
    "item_physical_details_PO4.gross_weight_per_pack_06",
    ""
  );
  const weightUnit = get(
    data,
    "item_physical_details_PO4.unit_or_basis_for_measurement_code_07",
    ""
  );
  const weightUnitString = `${codeToTextMapping[weightUnit] ?? weightUnit}`;
  const quantityShipped = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02",
    ""
  );
  const quantityUnit = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03",
    ""
  );
  const quantityUnitString = `${
    codeToTextMapping[quantityUnit] ?? quantityUnit
  }`;

  // * Safe values for the form
  const safeValues = {
    grossWeightPerPack: removeUserInput(grossWeightPerPack)
      ? Number(grossWeightPerPack)
      : undefined,
    quantityShipped: removeUserInput(quantityShipped)
      ? Number(quantityShipped)
      : undefined,
  };
  const grossWeightPerPackPath = `[${rowIndex}].item_physical_details_PO4.gross_weight_per_pack_06`;
  const quantityShippedPath = `[${rowIndex}].HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02`;

  const basePath = `HL_loop_item[0]`;
  const [quantityShippedId, grossWeightId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [
      `${basePath}.item_detail_shipment_SN1.number_of_units_shipped_02`,
      ".item_physical_details_PO4.gross_weight_per_pack_06",
    ],
  });

  return (
    <tr>
      <td>{productUPC}</td>
      <td>{containerId}</td>
      <td>
        {isViewMode ? (
          safeValues?.grossWeightPerPack
        ) : (
          <RJSFErrorWrapper
            fieldErrors={get(errorSchema, grossWeightPerPackPath)}
          >
            <CellWrapper>
              <InputNumber
                id={grossWeightId}
                min={0}
                value={safeValues?.grossWeightPerPack}
                onChange={(newCount) =>
                  onChange(grossWeightPerPackPath, toString(newCount as number))
                }
              />
              <div
                className="copy-button-box"
                onClick={() =>
                  copyToAll(
                    ".item_physical_details_PO4.gross_weight_per_pack_06",
                    safeValues?.grossWeightPerPack
                  )
                }
                aria-hidden="true"
              >
                <Tooltip title={"Copy value to all rows"}>
                  <CopyOutlined />
                </Tooltip>
              </div>
            </CellWrapper>
          </RJSFErrorWrapper>
        )}
      </td>
      <td>{weightUnitString}</td>
      <td>
        {isViewMode ? (
          safeValues?.quantityShipped
        ) : (
          <RJSFErrorWrapper fieldErrors={get(errorSchema, quantityShippedPath)}>
            <CellWrapper>
              <InputNumber
                id={quantityShippedId}
                min={0}
                value={safeValues?.quantityShipped}
                onChange={(newCount) =>
                  onChange(quantityShippedPath, toString(newCount as number))
                }
              />
              <div
                className="copy-button-box"
                onClick={() =>
                  copyToAll(
                    ".HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02",
                    safeValues?.quantityShipped
                  )
                }
                aria-hidden="true"
              >
                <Tooltip title={"Copy value to all rows"}>
                  <CopyOutlined />
                </Tooltip>
              </div>
            </CellWrapper>
          </RJSFErrorWrapper>
        )}
      </td>
      <td>{quantityUnitString}</td>
      <td>
        <DeleteOutlined onClick={() => handleDeleteRow(rowIndex)} />
      </td>
    </tr>
  );
};
