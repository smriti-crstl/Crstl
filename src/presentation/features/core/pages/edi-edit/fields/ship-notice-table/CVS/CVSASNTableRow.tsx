import { InputNumber, Tooltip } from "antd";
import { codeToTextMapping } from "globals/configs";
import { get, toString } from "lodash";
import moment, { Moment } from "moment";

import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { ErrorSchema } from "@rjsf/utils";

import { RJSFErrorWrapper } from "../../../components";
import { getIdsInCustomTables, removeUserInput } from "../../../helpers";
import { ChangeHandlerFn } from "../../common";
import { getEditableItemPaths } from "./helpers";
import {
  RemoveButtonWrapper,
  StyledDatePicker,
  StyledInput,
  StyledSelect,
} from "./styles";
import { CVSASNHLLoopPack, handleDeleteRowFn } from "./types";
import { CellWrapper } from "../../common/styles";

interface IProps {
  data: CVSASNHLLoopPack;
  onChange: ChangeHandlerFn;
  rowIndex: number; // * Need this for using lodash to manipulate state
  weightUnitOptions: { label: string; value: string }[];
  errorSchema?: ErrorSchema;
  handleDeleteRow: handleDeleteRowFn;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const CVSASNTableRow = ({
  data,
  onChange,
  rowIndex,
  weightUnitOptions,
  errorSchema,
  handleDeleteRow,
  idSchema,
  copyToAll,
}: IProps) => {
  const {
    lotNumberItemPath,
    grossWeightPerPackItemPath,
    descriptionItemPath,
    expirationDateItemPath,
    grossWeightPerPackItemUnitPath,
  } = getEditableItemPaths(data);

  // * developer (human :p) readable variable names for fields/labels
  const upcNumber = get(
    data,
    "HL_loop_item[0].item_identification_LIN.product_service_id_03"
  );
  const sku = get(
    data,
    "HL_loop_item[0].item_identification_LIN.product_service_id_07"
  );
  const lotNumber = get(data, `HL_loop_item[0].${lotNumberItemPath}`);
  const shippedQty = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02"
  );
  const shippedUnits = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
  );
  const shippedQtyString = `${shippedQty} ${
    codeToTextMapping?.[shippedUnits] ?? shippedUnits
  }`;
  const orderedQty = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.quantity_ordered_05"
  );
  const orderedUnits = get(
    data,
    "HL_loop_item[0].item_detail_shipment_SN1.unit_or_basis_for_measurement_code_06"
  );
  const orderedQtyString = `${orderedQty} ${
    codeToTextMapping?.[orderedUnits] ?? orderedUnits
  }`;
  const grossWeightPerPack = get(
    data,
    `HL_loop_item[0].${grossWeightPerPackItemPath}`
  );
  const grossWeightPerPackUnit = get(
    data,
    `HL_loop_item[0].${grossWeightPerPackItemUnitPath}`
  );
  const description = get(data, `HL_loop_item[0].${descriptionItemPath}`);
  const expirationDate = get(data, `HL_loop_item[0]${expirationDateItemPath}`);

  // * Safe values for the form
  const safeValues = {
    lotNumber: removeUserInput(lotNumber) ? lotNumber : undefined,
    grossWeightPerPack: removeUserInput(grossWeightPerPack)
      ? Number(grossWeightPerPack)
      : undefined,
    grossWeightPerPackUnit: removeUserInput(grossWeightPerPackUnit)
      ? grossWeightPerPackUnit
      : undefined,
    description: removeUserInput(description) ? description : undefined,
    expirationDate: removeUserInput(expirationDate)
      ? moment(expirationDate)
      : undefined,
  };

  // * parent form level paths to do changes to the main RJSF (non-branched out) form
  const lotNumberPath = `[${rowIndex}].HL_loop_item[0].${lotNumberItemPath}`;
  const grossWeightPerPackPath = `[${rowIndex}].HL_loop_item[0].${grossWeightPerPackItemPath}`;
  const grossWeightPerPackUnitPath = `[${rowIndex}].HL_loop_item[0].${grossWeightPerPackItemUnitPath}`;
  const descriptionPath = `[${rowIndex}].HL_loop_item[0].${descriptionItemPath}`;
  const expirationDatePath = `[${rowIndex}].HL_loop_item[0].${expirationDateItemPath}`;

  // * change handlers - field wise
  /**
   * * Note the "value: string" here. This is because the form expects the value to be string,
   * * and the InputNumber expects it to be a number
   */
  const handleLotNumberChange = (value: string | number | null | undefined) => {
    console.log("value", value, lotNumberPath);
    onChange(lotNumberPath, toString(value));
  };
  const handleGrossWeightPerPackChange = (
    value: string | number | null | undefined
  ) => {
    onChange(grossWeightPerPackPath, toString(value));
  };
  const handleDescriptionChange = (value: string) => {
    onChange(descriptionPath, value);
  };
  const handleExpirationDateChange = (value: Moment | null) => {
    if (!value) {
      return;
    }

    onChange(expirationDatePath, value.format("YYYY-MM-DD"));
  };

  const handleGrossWeightPerPackUnitChange = (
    value: string | number | null | undefined
  ) => {
    onChange(grossWeightPerPackUnitPath, toString(value));
  };
  const basePath = "HL_loop_item[0]";
  const [lotNumberId, grossWeightId, descriptionId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [
      `${basePath}.${lotNumberItemPath}`,
      `${basePath}.${grossWeightPerPackItemPath}`,
      `${basePath}.${descriptionItemPath}`,
    ],
  });

  return (
    <tr>
      <td>
        <div className="ant-row ant-form-item">{upcNumber}</div>
      </td>
      <td>
        <div className="ant-row ant-form-item">{sku}</div>
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
              onClick={() =>
                copyToAll(
                  `.HL_loop_item[0].${lotNumberItemPath}`,
                  safeValues.lotNumber
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
        <div className="ant-row ant-form-item">{shippedQtyString}</div>
      </td>
      <td>
        <div className="ant-row ant-form-item">{orderedQtyString}</div>
      </td>
      <td>
        <RJSFErrorWrapper
          fieldErrors={get(errorSchema, grossWeightPerPackPath)}
        >
          <CellWrapper>
            <InputNumber
              min={0}
              id={grossWeightId}
              precision={1}
              value={safeValues.grossWeightPerPack}
              onChange={handleGrossWeightPerPackChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.HL_loop_item[0].${grossWeightPerPackItemPath}`,
                  safeValues.grossWeightPerPack
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
        <RJSFErrorWrapper
          fieldErrors={get(errorSchema, grossWeightPerPackUnitPath)}
        >
          <CellWrapper>
            <StyledSelect
              options={weightUnitOptions}
              value={safeValues.grossWeightPerPackUnit}
              onChange={(newValue: string) =>
                handleGrossWeightPerPackUnitChange(newValue as string)
              }
              placeholder="Select Unit"
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.HL_loop_item[0].${grossWeightPerPackItemUnitPath}`,
                  safeValues.grossWeightPerPackUnit
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
        <RJSFErrorWrapper fieldErrors={get(errorSchema, descriptionPath)}>
          <CellWrapper>
            <StyledInput
              value={safeValues.description}
              id={descriptionId}
              onChange={(e) => handleDescriptionChange(e.target.value)}
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
        <RJSFErrorWrapper fieldErrors={get(errorSchema, expirationDatePath)}>
          <CellWrapper>
            <StyledDatePicker
              value={safeValues.expirationDate}
              onChange={handleExpirationDateChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.HL_loop_item[0].${expirationDateItemPath}`,
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
