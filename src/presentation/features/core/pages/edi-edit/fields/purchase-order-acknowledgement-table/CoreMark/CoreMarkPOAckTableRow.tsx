import { InputNumber, Tooltip } from "antd";
import { get, toString } from "lodash";

import { ErrorSchema } from "@rjsf/utils";

import { RJSFErrorWrapper } from "../../../components";
import { getIdsInCustomTables, removeUserInput } from "../../../helpers";
import { ChangeHandlerFn } from "../../common";
import { StyledSelect } from "./styles";
import { ICoreMarkPOAckTableItem } from "./types";
import { CopyOutlined } from "@ant-design/icons";
import { CellWrapper } from "../../common/styles";

interface IProps {
  data: ICoreMarkPOAckTableItem;
  onChange: ChangeHandlerFn;
  rowIndex: number; // * Need this for using lodash to manipulate state
  statusCodeOptions: { label: string; value: string }[];
  errorSchema?: ErrorSchema;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const CoreMarkPOAckTableRow = ({
  data,
  onChange,
  rowIndex,
  statusCodeOptions,
  errorSchema,
  idSchema,
  copyToAll,
}: IProps) => {
  // TODO: support max functionality
  // const maxQuantityRef = useRef<number>();

  const product_service_id_07 = get(
    data,
    "baseline_item_data_PO1.product_service_id_07"
  );

  const line_item_acknowledgment_ACK = get(
    data,
    "line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK",
    {}
  );
  const {
    line_item_status_code_01,
    quantity_02,
  } = line_item_acknowledgment_ACK;

  const safeValues = {
    line_item_status_code_01: removeUserInput(line_item_status_code_01)
      ? line_item_status_code_01
      : undefined,
    quantity_02: removeUserInput(quantity_02) ? Number(quantity_02) : undefined,
  };

  /**
   * This useEffect is used to set the initial maxValue for the quantity
   * As it is tied to the state of the form, we capture it in a ref
   * and if a value is set, we don't change it again
   */
  /**
   * TODO: Enable the max quantity functionality after re-visiting logic here
   * useEffect(() => {
     if (
       maxQuantityRef.current ||
       isNull(quantity_02) ||
       isUndefined(quantity_02)
       ) {
         return;
        }
        
        maxQuantityRef.current = Number(quantity_02);
        // Disabling eslint because we intentionally need to just check if `data` is loaded or not
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data]);
   */
  const basePath =
    "line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK";
  const lineItemAckPath = `[${rowIndex}].${basePath}`;

  const [statusCodeId, quantityId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [
      `${basePath}.line_item_status_code_01`,
      `${basePath}.quantity_02`,
    ],
  });

  const handleStatusCodeChange = (value: string) => {
    const propertyPath = `${lineItemAckPath}.line_item_status_code_01`;
    onChange(propertyPath, value);
  };

  /**
   * * Note the "value: string" here. This is because the form expects the value to be string,
   * * and the InputNumber expects it to be a number
   */
  const handleQuantityChange = (value: string | number | null | undefined) => {
    const propertyPath = `${lineItemAckPath}.quantity_02`;
    onChange(propertyPath, toString(value));
  };

  return (
    <tr>
      <td>
        <div className="ant-row ant-form-item">{product_service_id_07}</div>
      </td>
      <td>
        <RJSFErrorWrapper
          fieldErrors={get(
            errorSchema,
            `${lineItemAckPath}.line_item_status_code_01`
          )}
        >
          <CellWrapper>
            <StyledSelect
              id={statusCodeId}
              options={statusCodeOptions}
              value={safeValues.line_item_status_code_01}
              onChange={(newValue) =>
                handleStatusCodeChange(newValue as string)
              }
              placeholder="Select Status Code"
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `${basePath}.line_item_status_code_01`,
                  safeValues.line_item_status_code_01
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
          fieldErrors={get(errorSchema, `${lineItemAckPath}.quantity_02`)}
        >
          <CellWrapper>
            <InputNumber
              id={quantityId}
              min={0}
              value={safeValues.quantity_02}
              onChange={handleQuantityChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.${basePath}.quantity_02`,
                  toString(safeValues.quantity_02)
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
    </tr>
  );
};
