import { cloneDeep, get, set } from "lodash";
import { useEffect, useState } from "react";

import { FieldProps } from "@rjsf/utils";
import { ShopbopWarehouseASNTableRow } from "./ShopbopWarehouseASNTableRow";
import { getEditableItemPaths } from "./helpers";
import { TableContainer } from "./styles";
import {
  ShopbopWarehouseASNHLLoopPack,
  handleDeleteRowFn,
  handleQuantityChangeFn,
} from "./types";
import { removeUserInput } from "../../../helpers";
import useFieldUtility from "../../common/useFieldUtility";

export const ShopbopWarehouseASNTable = ({
  formData,
  schema,
  onChange,
  errorSchema,
  idSchema,
}: FieldProps) => {
  const [data, setData] = useState(formData);

  const { handleDeleteRow, copyToAll } = useFieldUtility({
    formData,
    onChange,
  });

  const maxValues = data.map((item: any) => {
    return get(
      item,
      "HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02",
      ""
    );
  });

  const handleQuantityCountChange: handleQuantityChangeFn = (
    propertyPath,
    newVal
  ) => {
    const deepClone = cloneDeep(formData);
    const newValue = set(deepClone, propertyPath, newVal);
    onChange(newValue);
  };

  useEffect(() => {
    let deepClone = cloneDeep(formData);
    deepClone?.forEach(
      (dataItem: ShopbopWarehouseASNHLLoopPack, index: number) => {
        const itemPathsObj = getEditableItemPaths(dataItem);

        Object.values(itemPathsObj).forEach((itemPath) => {
          const pathInParent = `[${index}].${itemPath}`;
          const itemValue = get(deepClone, pathInParent);
          deepClone = set(deepClone, pathInParent, removeUserInput(itemValue));
        });
      }
    );
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
                  <th>Shipped quantity</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {formData?.map(
                  (item: ShopbopWarehouseASNHLLoopPack, index: number) => {
                    return (
                      <ShopbopWarehouseASNTableRow
                        key={index}
                        data={item}
                        rowIndex={index}
                        onQuantityChange={handleQuantityCountChange}
                        maxQty={maxValues[index]}
                        errorSchema={errorSchema}
                        handleDeleteRow={handleDeleteRow}
                        idSchema={idSchema}
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
