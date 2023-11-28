import { cloneDeep, get, set } from "lodash";
import { useEffect, useState } from "react";
import { FieldProps } from "@rjsf/utils";

import { removeUserInput } from "../../../helpers";

import { TargetDotComDVSASNTableRow } from "./TargetDotComDVSASNTableRow";
import { getEditableItemPaths } from "./helpers";
import { TableContainer } from "./styles";
import {
  TargetDotComDvsASNHLLoopItem,
  handleDeleteRowFn,
  handleQuantityChangeFn,
  handleTrackingNumberChangeFn,
} from "./types";
import useFieldUtility from "../../common/useFieldUtility";

export const TargetDotComDVSASNTable = ({
  formData,
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
    return get(item, "item_detail_shipment_SN1.number_of_units_shipped_02", "");
  });

  const handleQuantityCountChange: handleQuantityChangeFn = (
    propertyPath,
    newVal
  ) => {
    const deepClone = cloneDeep(formData);
    const newValue = set(deepClone, propertyPath, newVal);
    onChange(newValue);
  };

  const handleTrackingNumberChange: handleTrackingNumberChangeFn = (
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
      (dataItem: TargetDotComDvsASNHLLoopItem, index: number) => {
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
                  <th>SKU</th>
                  <th>Shipped Quantity</th>
                  <th>Unit</th>
                  <th>Tracking Number</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {formData?.map(
                  (item: TargetDotComDvsASNHLLoopItem, index: number) => {
                    return (
                      <TargetDotComDVSASNTableRow
                        key={index}
                        data={item}
                        rowIndex={index}
                        errorSchema={errorSchema}
                        onQuantityChange={handleQuantityCountChange}
                        maxQty={maxValues[index]}
                        onTrackingNumberChange={handleTrackingNumberChange}
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
