import { cloneDeep, set } from "lodash";

import { FieldProps } from "@rjsf/utils";

import { ChangeHandlerFn } from "../../common";
import { MeijerASNTableRow } from "./MeijerASNTableRow";
import { TableContainer } from "./styles";
import { handleDeleteRowFn, MeijerASNHLLoopPack } from "./types";
import useFieldUtility from "../../common/useFieldUtility";

export const MeijerASNTable = ({
  formData,
  onChange,
  errorSchema,
  formContext,
  idSchema,
}: FieldProps) => {
  const { handleDeleteRow, handleValueChange, copyToAll } = useFieldUtility({
    formData,
    onChange,
  });

  const isViewMode = formContext?.isViewMode;

  return (
    <TableContainer>
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th>Product UPC number</th>
                  <th>Container Id</th>
                  <th>Gross weight per pack</th>
                  <th>Weight unit</th>
                  <th>Quantity shipped</th>
                  <th>Quantity unit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {formData?.map((item: MeijerASNHLLoopPack, index: number) => {
                  return (
                    <MeijerASNTableRow
                      key={index}
                      rowIndex={index}
                      data={item}
                      onChange={handleValueChange}
                      errorSchema={errorSchema}
                      isViewMode={isViewMode}
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
