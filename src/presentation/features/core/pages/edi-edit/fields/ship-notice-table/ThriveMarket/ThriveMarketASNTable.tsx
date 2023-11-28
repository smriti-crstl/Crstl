import { cloneDeep, get, set } from "lodash";
import { useEffect, useState } from "react";

import { FieldProps } from "@rjsf/utils";
import useFieldUtility from "../../common/useFieldUtility";

import { removeUserInput } from "../../../helpers";
import { getEditableItemPaths } from "./helpers";
import { TableContainer } from "./styles";
import { ThriveMarketASNTableRow } from "./ThriveMarketASNTableRow";
import { handleQuantityChangeFn, ThriveMarketASNHLLoopPack } from "./types";

export const ThriveMarketASNTable = ({
  formData,
  onChange,
  errorSchema,
  idSchema,
}: FieldProps) => {
  const [data, setData] = useState(formData);

  const { handleDeleteRow, handleValueChange, copyToAll } = useFieldUtility({
    formData,
    onChange,
  });

  const maxValues = data?.map((item: any) => {
    return get(
      item,
      "HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02",
      ""
    );
  });

  // TODO: remove this func. this is same as handleValueChange
  const handleQuantityCountChange: handleQuantityChangeFn = (
    propertyPath,
    newVal
  ) => {
    const deepClone = cloneDeep(formData);
    const newValue = set(deepClone, propertyPath, newVal);
    onChange(newValue);
  };
  /**
   * * Doing this because validation error was not getting thrown if the form was not touched and empty on load
   */
  useEffect(() => {
    let deepClone = cloneDeep(formData);
    deepClone?.forEach((dataItem: ThriveMarketASNHLLoopPack, index: number) => {
      const itemPathsObj = getEditableItemPaths(dataItem);

      Object.values(itemPathsObj).forEach((itemPath) => {
        const pathInParent = `[${index}].HL_loop_item[0].${itemPath}`;
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
                  <th>UPC</th>
                  <th>Lot number</th>
                  <th>Shipped quantity</th>
                  <th>Description</th>
                  <th>Expiration date</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {formData?.map(
                  (item: ThriveMarketASNHLLoopPack, index: number) => {
                    return (
                      <ThriveMarketASNTableRow
                        idSchema={idSchema}
                        key={index}
                        data={item}
                        onChange={handleValueChange}
                        rowIndex={index}
                        errorSchema={errorSchema}
                        onQuantityChange={handleQuantityCountChange}
                        maxQty={maxValues[index]}
                        handleDeleteRow={handleDeleteRow}
                        copyToAll={copyToAll}
                      />
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TableContainer>
  );
};

