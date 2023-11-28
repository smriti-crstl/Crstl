import { FieldProps } from "@rjsf/utils";
import { cloneDeep, concat, get, take } from "lodash";
import { useState } from "react";
import { TableContainer } from "./styles";
import { handlePackCountChangeFn, TargetASNHLLoopPackItem } from "./types";
import { TargetASNTableRow } from "./TargetASNTableRow";
import { getGroupedRecords } from "./helpers";

export const TargetASNTable = ({ formData, onChange }: FieldProps) => {
  // * originalFormData is to keep a copy of all the containerIds even after they are removed
  const [originalFormData] = useState<TargetASNHLLoopPackItem[]>(
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
                      <TargetASNTableRow
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
