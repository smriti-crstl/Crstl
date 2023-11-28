import { get, toNumber } from "lodash";

import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { ErrorSchema } from "@rjsf/utils";

import { getEditableItemPaths } from "./helpers";
import { RemoveButtonWrapper, StyledInput } from "./styles";
import {
  WalmartDCASNHLLoopPack,
  handleDeleteRowFn,
  handleDescriptionChangeFn,
  handleQuantityChangeFn,
} from "./types";
import { InputNumber, Tooltip } from "antd";
import { removeUserInput } from "../../../helpers";
import { RJSFErrorWrapper } from "../../../components";
import { codeToTextMapping } from "globals/configs";
import { getFallbackTextForCode } from "presentation/features/core/pages/edi/edi.utils";
import { getIdsInCustomTables } from "../../../helpers";
import { CellWrapper } from "../../common/styles";

interface IProps {
  data: WalmartDCASNHLLoopPack;
  onDescriptionChange: handleDescriptionChangeFn;
  rowIndex: number; // * Need this for using lodash to manipulate state
  onQuantityChange: handleQuantityChangeFn;
  maxQty: number;
  errorSchema?: ErrorSchema;
  handleDeleteRow: handleDeleteRowFn;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const WalmartDCASNTableRow = ({
  data,
  onDescriptionChange,
  rowIndex,
  onQuantityChange,
  maxQty,
  errorSchema,
  handleDeleteRow,
  idSchema,
  copyToAll,
}: IProps) => {
  const { shippedQtyItemPath, descriptionItemPath } = getEditableItemPaths(
    data
  );
  const upcNumber = get(
    data,
    "HL_loop_item[0].item_identification_LIN.product_service_id_03"
  );

  const description = get(data, `HL_loop_item[0].${descriptionItemPath}`);

  const shippedQty = get(data, `HL_loop_item[0].${shippedQtyItemPath}`);
  const shippedUnits = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
  );

  // * Safe values for the form
  const safeValues = {
    shippedQty: removeUserInput(shippedQty) ? toNumber(shippedQty) : undefined,
    description: removeUserInput(description) ? description : undefined,
  };

  const shippedQtyPath = `[${rowIndex}].HL_loop_item[0].${shippedQtyItemPath}`;
  const descriptionPath = `[${rowIndex}].HL_loop_item[0].${descriptionItemPath}`;

  const [shippedQtyId, descriptionId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [
      `.HL_loop_item[0].${shippedQtyItemPath}`,
      `.HL_loop_item[0].${descriptionItemPath}`,
    ],
  });

  return (
    <tr>
      <td>
        <div className="ant-row ant-form-item">{upcNumber}</div>
      </td>
      <td>
        <RJSFErrorWrapper fieldErrors={get(errorSchema, descriptionPath)}>
          <CellWrapper>
            <StyledInput
              id={descriptionId}
              value={safeValues.description}
              onChange={(e) =>
                onDescriptionChange(descriptionPath, e.target.value)
              }
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.HL_loop_item[0].${descriptionItemPath}`,
                  safeValues.description
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
      </td>
      <td>
        <RJSFErrorWrapper fieldErrors={get(errorSchema, shippedQtyPath)}>
          <CellWrapper>
            <InputNumber
              id={shippedQtyId}
              min={0}
              max={maxQty}
              value={safeValues.shippedQty}
              onChange={(newCount) =>
                onQuantityChange(shippedQtyPath, newCount?.toString())
              }
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.HL_loop_item[0].${shippedQtyItemPath}`,
                  safeValues.shippedQty
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
      </td>
      <td>
        <div className="ant-row ant-form-item">
          {codeToTextMapping[shippedUnits] ??
            getFallbackTextForCode(shippedUnits)}
        </div>
      </td>
      <td>
        <RemoveButtonWrapper className="ant-row ant-form-item">
          <DeleteOutlined onClick={() => handleDeleteRow(rowIndex)} />
        </RemoveButtonWrapper>
      </td>
    </tr>
  );
};
