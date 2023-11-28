import { cloneDeep, concat, take } from "lodash";
import { useState } from "react";

import { FieldProps } from "@rjsf/utils";

import { getGroupedRecords } from "./helpers";
import { TableContainer } from "./styles";
import { handlePackCountChangeFn, WegmansASNHLLoopPackItem } from "./types";
import { WegmansASNTableRow } from "./WegmansASNTableRow";

export const WegmansASNTable = ({ formData, onChange }: FieldProps) => {
  // * originalFormData is to keep a copy of all the containerIds even after they are removed
  const [originalFormData] = useState<WegmansASNHLLoopPackItem[]>(
    formData // * initial value never changed after the first render
  );

  const originalTableDataMap = getGroupedRecords(originalFormData);
  const dirtyTableDataMap = getGroupedRecords(formData);

  const handlePackCountChange: handlePackCountChangeFn = (
    productId,
    newCount
  ) => {
    const clonedDirtyMap = cloneDeep(dirtyTableDataMap);
    clonedDirtyMap[productId] = take(originalTableDataMap[productId], newCount);
    const nestedArrays = Object.values(clonedDirtyMap);
    const newFlatArray = concat([], ...nestedArrays);
    onChange(newFlatArray);
  };

  return (
    <TableContainer>
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th>Product</th>
                  <th>Quantity Shipped</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {Object.keys(originalTableDataMap).map(
                  (productId: string, index: number) => {
                    const rowData = originalTableDataMap[productId];

                    return (
                      <WegmansASNTableRow
                        key={index}
                        data={rowData}
                        onPackCountChange={handlePackCountChange}
                        quantity={dirtyTableDataMap[productId]?.length ?? 0}
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

