import { get } from "lodash";

export const filterVisibleErrors = (
  errors: Array<{ property: string }>,
  schema?: Record<string, any>
) => {
  return errors?.filter(({ property }) => {
    const cleanPath = "properties" + property.replace(/\[\d+\]/g, ".items"); // replaces [0], [1], etc. with .items as seen in the schema

    const classNames = get(schema, `${cleanPath}.classNames`, "");
    if (classNames?.includes("no-display")) {
      return false;
    }

    // it is possible that the no-display class is not present in the classNames, but it can be present at parent levels' classNames
    return checkParentVisibility(cleanPath, schema);
  });
};

const checkParentVisibility = (
  propertyPath: string,
  schema?: Record<string, any>
) => {
  const pathChunks = propertyPath.split(".");

  for (let i = 0; i < pathChunks.length; i++) {
    const subPropertyPath = pathChunks.slice(0, i + 1).join(".");
    const subClassNames = get(schema, `${subPropertyPath}.classNames`, "");
    if (subClassNames?.includes("no-display")) {
      return false;
    }
  }

  return true;
};

