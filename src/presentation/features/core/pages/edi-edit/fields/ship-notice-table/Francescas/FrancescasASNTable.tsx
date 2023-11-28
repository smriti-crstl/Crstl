import { cloneDeep, concat, get, take } from "lodash";
import { useState } from "react";

import { FieldProps } from "@rjsf/utils";

import { FrancescasASNTableRow } from "./FrancescasASNTableRow";
import { getGroupedRecords } from "./helpers";
import { TableContainer } from "./styles";
import { FrancescasASNHLLoopPackItem, handlePackCountChangeFn } from "./types";

export const FrancescasASNTable = ({ formData, onChange }: FieldProps) => {
  // * originalFormData is to keep a copy of all the containerIds even after they are removed
  const [originalFormData] = useState<FrancescasASNHLLoopPackItem[]>(
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
                  <th>Product identifier</th>
                  <th>Container ID</th>
                  <th>Pack Count</th>
                  <th>Quantity per Pack</th>
                  <th>Quantity Shipped</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {Object.keys(originalTableDataMap).map(
                  (productId: string, index: number) => {
                    const rowData = originalTableDataMap[productId];
                    const containerIds =
                      dirtyTableDataMap[productId]?.map((item) =>
                        get(
                          item,
                          "marks_and_numbers_MAN[0].marks_and_numbers_02",
                          ""
                        )
                      ) ?? [];

                    return (
                      <FrancescasASNTableRow
                        key={index}
                        data={rowData}
                        onPackCountChange={handlePackCountChange}
                        containerIds={containerIds}
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

