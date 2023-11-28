type ElementType =
  | "object"
  | "addresses"
  | "arrayOfObjects"
  | "nestedArrayOfObjects";

type Row = Col[];

interface Col {
  width?: string;
  items: Section[];
}

interface Section {
  title?: string;
  schemaPath: string;
  formDataPath: string;
  elementType: ElementType;
}

/**
 * the BusinessViewConfig is an array of Rows
 * each Row is an array of Cols
 * each Col is an array of Sections, with optional width
 * each Section has a title, schemaPath, formDataPath, and elementType
 * elementType can be one of the following:
 * - object: a single object
 * - addresses: an array of objects - e.g. N1 loop
 * - arrayOfObjects: an array of objects - e.g. ITD
 * - nestedArrayOfObjects: an array of objects, nested within another object - e.g. baseline_item_data
 */
export type BusinessViewConfig = Row[];

