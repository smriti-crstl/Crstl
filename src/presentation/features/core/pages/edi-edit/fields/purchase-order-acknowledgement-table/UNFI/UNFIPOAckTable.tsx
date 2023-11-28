import { cloneDeep, get, set } from "lodash";
import { useEffect } from "react";

import { FieldProps } from "@rjsf/utils";

import { getStatusCodeOptions, removeUserInput } from "../../../helpers";
import { ChangeHandlerFn } from "../../common";
import { TableContainer } from "./styles";
import { IUNFIPOAckTableItem } from "./types";
import { UNFIPOAckTableRow } from "./UNFIPOAckTableRow";
import useFieldUtility from "../../common/useFieldUtility";

export const UNFIPOAckTable = ({
  formData,
  schema,
  onChange,
  errorSchema,
  idSchema,
}: FieldProps) => {
  const { handleValueChange, copyToAll } = useFieldUtility({
    formData,
    onChange,
  });

  const statusCodeOptions = getStatusCodeOptions({
    schema,
    x12CodesPath: `items.properties.line_item_acknowledgment_ACK_loop.items.properties.line_item_acknowledgment_ACK.properties.line_item_status_code_01["x12-codes"]`,
  });

  /**
   * * NOTE: This useEffect removes "USER_INPUT" from the quantity_02
   * * Doing this because validation error was not getting thrown if the form was not touched and empty on load
   */
  useEffect(() => {
    let deepClone = cloneDeep(formData);
    deepClone.forEach((_: unknown, index: number) => {
      const quantity_02_path = `[${index}].line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK.quantity_02`;
      const quantity_02_value = get(deepClone, quantity_02_path);
      deepClone = set(
        deepClone,
        quantity_02_path,
        removeUserInput(quantity_02_value)
      );
      onChange(deepClone);
    });
  }, []);

  return (
    <TableContainer>
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th>Product / Service ID</th>
                  <th>Quantity Ordered</th>
                  <th>Line Item Status Code</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Current scheduled ship date</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {formData.map((data: IUNFIPOAckTableItem, index: number) => {
                  return (
                    <UNFIPOAckTableRow
                      key={index}
                      data={data}
                      onChange={handleValueChange}
                      rowIndex={index}
                      errorSchema={errorSchema}
                      statusCodeOptions={statusCodeOptions}
                      idSchema={idSchema}
                      copyToAll={copyToAll}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TableContainer>
  );
};
