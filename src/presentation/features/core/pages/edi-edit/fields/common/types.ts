import { PropertyPath } from "lodash";

export type ChangeHandlerFn = (
  propertyPath: PropertyPath,
  value: string | number
) => void;

export type handleDeleteRowFn = (rowIndex: number) => void;

