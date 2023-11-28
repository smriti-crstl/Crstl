import { cloneDeep, get, set } from "lodash";
import { useEffect } from "react";

import { FieldProps } from "@rjsf/utils";

import { getStatusCodeOptions, removeUserInput } from "../../../helpers";
import { ChangeHandlerFn } from "../../common";
import { CVSASNTableRow } from "./CVSASNTableRow";
import { getEditableItemPaths } from "./helpers";
import { TableContainer } from "./styles";
import { CVSASNHLLoopPack, handleDeleteRowFn } from "./types";
import useFieldUtility from "../../common/useFieldUtility";

export const CVSASNTable = ({
  formData,
  schema,
  onChange,
  errorSchema,
  idSchema,
}: FieldProps) => {
  const { handleDeleteRow, handleValueChange, copyToAll } = useFieldUtility({
    formData,
    onChange,
  });

  const weightUnitOptions = getStatusCodeOptions({
    schema,
    x12CodesPath: `items.properties.HL_loop_item.items.properties.item_physical_details_PO4.properties.unit_or_basis_for_measurement_code_07["x12-codes"]`,
  });

  /**
   * * Doing this because validation error was not getting thrown if the form was not touched and empty on load
   */
  useEffect(() => {
    let deepClone = cloneDeep(formData);
    deepClone?.forEach((dataItem: CVSASNHLLoopPack, index: number) => {
      const itemPathsObj = getEditableItemPaths(dataItem);

      Object.values(itemPathsObj).forEach((itemPath) => {
        const pathInParent = `[${index}].${itemPath}`;
        const itemValue = get(deepClone, pathInParent);
        deepClone = set(deepClone, pathInParent, removeUserInput(itemValue));
      });
    });
    onChange(deepClone);
  }, []);

  return (
    <TableContainer>
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th>UPC number</th>
                  <th>SKU</th>
                  <th>Lot number</th>
                  <th>Shipped quantity</th>
                  <th>Ordered quantity</th>
                  <th>Gross Weight per Pack</th>
                  <th>Unit</th>
                  <th>Description</th>
                  <th>Expiration date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {formData?.map((item: CVSASNHLLoopPack, index: number) => {
                  return (
                    <CVSASNTableRow
                      key={index}
                      data={item}
                      onChange={handleValueChange}
                      rowIndex={index}
                      errorSchema={errorSchema}
                      weightUnitOptions={weightUnitOptions}
                      handleDeleteRow={handleDeleteRow}
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
