import { cloneDeep, set } from "lodash";
import { FieldProps } from "@rjsf/utils";
import { handleDeleteRowFn, ChangeHandlerFn } from "./types";

const useFieldUtility = ({ formData, onChange }: any) => {
  const handleValueChange: ChangeHandlerFn = (propertyPath, value) => {
    const deepClone = cloneDeep(formData);
    const newValue = set(deepClone, propertyPath, value);
    onChange(newValue);
  };

  const copyToAll = (basePath: string, value: any) => {
    const deepClone = cloneDeep(formData);
    deepClone.forEach((item: any, index: number) => {
      set(deepClone, `[${index}]${basePath}`, value);
    });
    onChange(deepClone);
  };
  const handleDeleteRow: handleDeleteRowFn = (rowIndex) => {
    const deepClone = cloneDeep(formData);
    deepClone.splice(rowIndex, 1);
    onChange(deepClone);
  };

  return {
    handleValueChange,
    copyToAll,
    handleDeleteRow,
  };
};

export default useFieldUtility;
