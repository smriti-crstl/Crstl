import { get, toString } from "lodash";
import moment, { Moment } from "moment";

import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { ErrorSchema } from "@rjsf/utils";

import { RJSFErrorWrapper } from "../../../components";
import { getIdsInCustomTables, removeUserInput } from "../../../helpers";
import { ChangeHandlerFn } from "../../common";
import { getEditableItemPaths } from "./helpers";
import { RemoveButtonWrapper, StyledDatePicker, StyledInput } from "./styles";
import { CellWrapper } from "../../common/styles";
import {
  ThriveMarketASNHLLoopPack,
  handleDeleteRowFn,
  handleQuantityChangeFn,
} from "./types";
import { InputNumber, Tooltip } from "antd";

interface IProps {
  data: ThriveMarketASNHLLoopPack;
  onChange: ChangeHandlerFn;
  rowIndex: number; // * Need this for using lodash to manipulate state
  errorSchema?: ErrorSchema;
  onQuantityChange: handleQuantityChangeFn;
  maxQty: number;
  handleDeleteRow: handleDeleteRowFn;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const ThriveMarketASNTableRow = ({
  data,
  onChange,
  rowIndex,
  errorSchema,
  onQuantityChange,
  maxQty,
  handleDeleteRow,
  idSchema,
  copyToAll,
}: IProps) => {
  const {
    lotNumberItemPath,
    descriptionItemPath,
    expirationDateItemPath,
    shippedQtyItemPath,
  } = getEditableItemPaths(data);
  // * developer (human :p) readable variable names for fields/labels
  const upcNumber = get(
    data,
    "HL_loop_item[0].item_identification_LIN.product_service_id_03"
  );
  const lotNumberWholePath = `HL_loop_item[0].${lotNumberItemPath}`;

  const lotNumber = get(data, lotNumberWholePath);
  const shippedQtyStr = get(data, `HL_loop_item[0].${shippedQtyItemPath}`);

  const description = get(data, `HL_loop_item[0].${descriptionItemPath}`);
  const expirationDate = get(data, `HL_loop_item[0]${expirationDateItemPath}`);

  // * Safe values for the form
  const safeValues = {
    lotNumber: removeUserInput(lotNumber) ? lotNumber : undefined,
    expirationDate: removeUserInput(expirationDate)
      ? moment(expirationDate)
      : undefined,
    shippedQty: removeUserInput(shippedQtyStr) ? shippedQtyStr : undefined,
  };

  // * parent form level paths to do changes to the main RJSF (non-branched out) form
  const lotNumberPath = `[${rowIndex}].HL_loop_item[0].${lotNumberItemPath}`;
  const shippedQtyPath = `[${rowIndex}].HL_loop_item[0].${shippedQtyItemPath}`;
  const expirationDatePath = `[${rowIndex}].HL_loop_item[0].${expirationDateItemPath}`;

  // * change handlers - field wise
  /**
   * * Note the "value: string" here. This is because the form expects the value to be string,
   * * and the InputNumber expects it to be a number
   */
  const handleLotNumberChange = (value: string | number | null | undefined) => {
    onChange(lotNumberPath, toString(value));
  };
  const handleExpirationDateChange = (value: Moment | null) => {
    if (!value) {
      return;
    }

    onChange(expirationDatePath, value.format("YYYY-MM-DD"));
  };

  const onHandleCopyLotNumberToAll = () => {
    copyToAll(`.HL_loop_item[0].${lotNumberItemPath}`, safeValues.lotNumber);
  };

  const basePath = "HL_loop_item[0]";
  const [lotNumberId, shippedQtyId, expirationDateId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [
      `${basePath}.${lotNumberItemPath}`,
      `${basePath}.${shippedQtyItemPath}`,
      `${basePath}.${expirationDateItemPath}`,
    ],
  });

  return (
    <tr>
      <td>
        <div className="ant-row ant-form-item">{upcNumber}</div>
      </td>
      <td>
        <RJSFErrorWrapper fieldErrors={get(errorSchema, lotNumberPath)}>
          <CellWrapper>
            <StyledInput
              id={lotNumberId}
              value={safeValues.lotNumber}
              onChange={(e) => handleLotNumberChange(e.target.value)}
            />
            <div
              className="copy-button-box"
              onClick={onHandleCopyLotNumberToAll}
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
        <div className="ant-row ant-form-item">{description}</div>
      </td>
      <td>
        <RJSFErrorWrapper fieldErrors={get(errorSchema, expirationDatePath)}>
          <CellWrapper>
            <StyledDatePicker
              id={expirationDateId}
              value={safeValues.expirationDate}
              onChange={handleExpirationDateChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `HL_loop_item[0].${expirationDateItemPath}`,
                  safeValues.expirationDate?.format("YYYY-MM-DD")
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
        <RemoveButtonWrapper className="ant-row ant-form-item">
          <DeleteOutlined onClick={() => handleDeleteRow(rowIndex)} />
        </RemoveButtonWrapper>
      </td>
    </tr>
  );
};
