import { get, toNumber } from "lodash";

import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { ErrorSchema } from "@rjsf/utils";

import { getEditableItemPaths } from "./helpers";
import { RemoveButtonWrapper } from "./styles";
import {
  TargetDotComDvsASNHLLoopItem,
  handleDeleteRowFn,
  handleQuantityChangeFn,
  handleTrackingNumberChangeFn,
} from "./types";
import { InputNumber, Tooltip } from "antd";
import { RJSFErrorWrapper } from "../../../components";
import { StyledInput } from "../CVS/styles";
import { getLineItemsFromObject } from "presentation/features/core/pages/edi/edi.utils";
import { getIdsInCustomTables } from "../../../helpers";
import { CellWrapper } from "../../common/styles";

interface IProps {
  data: TargetDotComDvsASNHLLoopItem;
  rowIndex: number;
  errorSchema?: ErrorSchema;
  onQuantityChange: handleQuantityChangeFn;
  maxQty: number;
  onTrackingNumberChange: handleTrackingNumberChangeFn;
  handleDeleteRow: handleDeleteRowFn;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const TargetDotComDVSASNTableRow = ({
  data,
  rowIndex,
  errorSchema,
  onQuantityChange,
  maxQty,
  onTrackingNumberChange,
  handleDeleteRow,
  idSchema,
  copyToAll,
}: IProps) => {
  const { upc, sku } = getLineItemsFromObject(data.item_identification_LIN);
  const { shippedQtyItemPath, trackingNumberItemPath } = getEditableItemPaths(
    data
  );

  const shippedQty = get(data, `${shippedQtyItemPath}`);

  const unit = get(
    data,
    `item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03`
  );

  // As tracking number is user input it won't be present in autofill but can be picked up from draft
  const trackingNumber = get(data, `${trackingNumberItemPath}`, "");

  const shippedQtyPath = `[${rowIndex}].${shippedQtyItemPath}`;
  const trackingNumberPath = `[${rowIndex}].${trackingNumberItemPath}`;

  const [shippedQtyId, trackingNumberId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [shippedQtyItemPath, trackingNumberItemPath],
  });

  return (
    <tr>
      <td>
        <div className="ant-row ant-form-item">{upc}</div>
      </td>
      <td>
        <div className="ant-row ant-form-item">{sku}</div>
      </td>
      <td>
        <RJSFErrorWrapper fieldErrors={get(errorSchema, shippedQtyPath)}>
          <CellWrapper>
            <InputNumber
              id={shippedQtyId}
              min={0}
              max={maxQty}
              value={toNumber(shippedQty)}
              onChange={(newCount) =>
                onQuantityChange(shippedQtyPath, newCount?.toString())
              }
            />
            <div
              className="copy-button-box"
              onClick={() => copyToAll(`.${shippedQtyItemPath}`, shippedQty)}
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
          {unit === "EA" ? "Each(es)" : ""}
        </div>
      </td>
      <td>
        <RJSFErrorWrapper fieldErrors={get(errorSchema, trackingNumberPath)}>
          <StyledInput
            id={trackingNumberId}
            value={trackingNumber}
            onChange={(e) =>
              onTrackingNumberChange(trackingNumberPath, e.target.value)
            }
          />
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
