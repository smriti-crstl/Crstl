import { InputNumber, Tooltip } from "antd";
import { codeToTextMapping } from "globals/configs";
import { get, toString } from "lodash";
import moment, { Moment } from "moment";

import { ErrorSchema } from "@rjsf/utils";

import { RJSFErrorWrapper } from "../../../components";
import { ChangeHandlerFn } from "../../common";
import { StyledDatePicker, StyledSelect } from "./styles";
import { IUNFIPOAckTableItem } from "./types";
import { CellWrapper } from "../../common/styles";
import { CopyOutlined } from "@ant-design/icons";
import { getIdsInCustomTables, removeUserInput } from "../../../helpers";

interface IProps {
  data: IUNFIPOAckTableItem;
  onChange: ChangeHandlerFn;
  rowIndex: number; // * Need this for using lodash to manipulate state
  statusCodeOptions: { label: string; value: string }[];
  errorSchema?: ErrorSchema;
  idSchema: any;
  copyToAll: (basePath: string, value: any) => void;
}

export const UNFIPOAckTableRow = ({
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

  const line_item_acknowledgment_ACK = get(
    data,
    "line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK",
    {}
  );
  const date_time_reference_DTM = get(
    data,
    "line_item_acknowledgment_ACK_loop[0].date_time_reference_DTM",
    {}
  );

  const {
    product_service_id_08,
    line_item_status_code_01,
    quantity_02,
    date_05,
  } = line_item_acknowledgment_ACK;
  const { date_02 } = date_time_reference_DTM;

  const safeValues = {
    line_item_status_code_01: removeUserInput(line_item_status_code_01)
      ? line_item_status_code_01
      : undefined,
    quantity_02: removeUserInput(quantity_02) ? Number(quantity_02) : undefined,
    date_05: removeUserInput(date_05) ? moment(date_05) : undefined,
    date_02: removeUserInput(date_02) ? moment(date_02) : undefined,
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

  const quantity_ordered_02 = get(
    data,
    "baseline_item_data_PO1.quantity_ordered_02"
  );
  const unit_or_basis_for_measurement_code_03 = get(
    data,
    "baseline_item_data_PO1.unit_or_basis_for_measurement_code_03"
  );

  const unitOfMeasurement =
    codeToTextMapping[unit_or_basis_for_measurement_code_03] ??
    unit_or_basis_for_measurement_code_03;

  const lineItemAckPath = `[${rowIndex}].line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK`;
  const dateTimeRefPath = `[${rowIndex}].line_item_acknowledgment_ACK_loop[0].date_time_reference_DTM`;

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

  const handleDateChange = (value: Moment | null) => {
    if (!value) {
      return;
    }

    const propertyPath = `${lineItemAckPath}.date_05`;
    onChange(propertyPath, value.format("YYYY-MM-DD"));
  };

  const handleScheduledShipDateChange = (value: Moment | null) => {
    if (!value) {
      return;
    }

    const propertyPath = `${dateTimeRefPath}.date_02`;
    onChange(propertyPath, value.format("YYYY-MM-DD"));
  };

  const basePath =
    ".line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK";
  const [statusCodeId, quantityId, dateId] = getIdsInCustomTables({
    rowIndex,
    idSchema,
    properties: [
      `${basePath}.line_item_status_code_01`,
      `${basePath}.quantity_02`,
      `${basePath}.date_05`,
    ],
  });

  return (
    <tr>
      <td>
        <div className="ant-row ant-form-item">{product_service_id_08}</div>
      </td>
      <td>
        <div className="ant-row ant-form-item">{`${quantity_ordered_02} ${unitOfMeasurement}`}</div>
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
              max={parseInt(quantity_ordered_02)}
              value={safeValues.quantity_02}
              onChange={handleQuantityChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(`${basePath}.quantity_02`, safeValues.quantity_02)
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
          fieldErrors={get(errorSchema, `${lineItemAckPath}.date_05`)}
        >
          <CellWrapper>
            <StyledDatePicker
              id={dateId}
              value={safeValues.date_05}
              onChange={handleDateChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `${basePath}.date_05`,
                  safeValues.date_05?.format("YYYY-MM-DD")
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
          fieldErrors={get(errorSchema, `${dateTimeRefPath}.date_02`)}
        >
          <CellWrapper>
            <StyledDatePicker
              value={safeValues.date_02}
              onChange={handleScheduledShipDateChange}
            />
            <div
              className="copy-button-box"
              onClick={() =>
                copyToAll(
                  `.line_item_acknowledgment_ACK_loop[0].date_time_reference_DTM.date_02`,
                  safeValues.date_02?.format("YYYY-MM-DD")
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
