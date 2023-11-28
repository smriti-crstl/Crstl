import _, { get, isString, PropertyPath, values } from "lodash";
import moment from "moment";
import React from "react";

import { RJSFSchema } from "@rjsf/utils";

// proptery is a path to the property in the schema. This function converts the path to the corresponding id
const convertPropertyToId = (property?: string): string => {
  if (!property) return "";
  // Split the property string into an array of keys
  const keys = property.split(".");

  // Initialize an empty result string
  let result = "";

  for (const key of keys) {
    // Extract the key and index using regular expressions
    const match = key.match(/^(.*?)\[(\d+)]$/);

    if (match) {
      // If the key has an index, format it as [index]
      const [, keyName, index] = match;
      result += `_${keyName}_${index}`;
    } else {
      // If the key doesn't have an index, simply add it
      result += `_${key}`;
    }
  }

  // Remove the leading underscore and assign it to id
  let id = result.slice(1);

  // Replace the leading "_detail || _summary || _heading" with "root_"
  if (id.startsWith("_detail")) {
    id = id.replace("_detail", "root");
  } else if (id.startsWith("_heading")) {
    id = id.replace("_heading", "root");
  } else if (id.startsWith("_summary")) {
    id = id.replace("_summary", "root");
  }

  // Replace any double underscores with a single underscore
  id = id.replace(/__+/g, "_");

  return id;
};

interface ICustomTableIds {
  rowIndex: number;
  idSchema: any;
  properties: Array<string>;
}

/*
Example: get ids for properties in custom ui:fields
Input
- rowIndex: 0
- idSchema: {$id: "root_HL_loop_shipment_0_HL_loop_order_0_HL_loop_pack_HL_loop_item"}
- properties: ["HL_loop_item[0].item_identification_LIN.product_service_id_13"]
output 
- "root_HL_loop_shipment_0_HL_loop_order_0_HL_loop_pack_0_HL_loop_item_0_item_identification_LIN_product_service_id_13"
*/
const getIdsInCustomTables = ({
  rowIndex,
  idSchema,
  properties,
}: ICustomTableIds): Array<string> => {
  return properties.map((propertyPath) => {
    const propertyPathIdFornat = convertPropertyToId(propertyPath);
    let id = `${idSchema.$id}_${rowIndex}_${propertyPathIdFornat}`;
    id = id.replace(/__+/g, "_");
    return id;
  });
};

function clean(el: Record<string, unknown>, toCleanUserInputs = false) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function internalClean(el: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return _.transform(el, (result: any, value, key) => {
      const isCollection = _.isObject(value);
      const cleaned = isCollection ? internalClean(value) : value;

      if (isCollection && _.isEmpty(cleaned)) {
        return;
      }

      if (value === "") {
        return;
      }

      if (toCleanUserInputs && removeUserInput(value) === "") {
        return;
      }

      _.isArray(result) ? result.push(cleaned) : (result[key] = cleaned);
    });
  }

  return _.isObject(el) ? internalClean(el) : el;
}

function removeUserInput(fieldValue = "") {
  if (isString(fieldValue)) {
    return fieldValue?.replace("USER_INPUT", "")?.replace("U_I", "");
  }
  return fieldValue;
}

const useCallbackState = (initialValue: any) => {
  const [state, _setState] = React.useState(initialValue);
  const callbackQueue = React.useRef<any>([]);
  React.useEffect(() => {
    callbackQueue.current.forEach((cb: any) => cb(state));
    callbackQueue.current = [];
  }, [state]);
  const setState = (newValue: any, callback?: () => void) => {
    _setState(newValue);
    if (callback && typeof callback === "function") {
      callbackQueue.current.push(callback);
    }
  };
  return [state, setState];
};

/**
 *
 * @param param0 {
 *    @param schema : RJSF Schema Object for a particular component
 *    @param x12CodesPath : e.g. `items.properties.line_item_acknowledgment_ACK_loop.items.properties.line_item_acknowledgment_ACK.properties.line_item_status_code_01["x12-codes"]`
 * }
 * @returns an array of Select compatible options list
 */
const getStatusCodeOptions = ({
  schema,
  x12CodesPath,
}: {
  schema: RJSFSchema;
  x12CodesPath: PropertyPath;
}) => {
  const statusCodesObj = get(schema, x12CodesPath);
  const statusCodeOptions = values(statusCodesObj).map(
    ({ code, description }: { code: string; description: string }) => ({
      label: description ?? code, // adding the `?? code` as a fallback for label
      value: code,
    })
  );
  return statusCodeOptions;
};

function createTime(fieldValue?: string) {
  const cleanInput = removeUserInput(fieldValue);
  if (cleanInput?.toLocaleLowerCase() === "invalid date") {
    return null;
  }
  if (cleanInput === "") {
    return null;
  }

  const date = moment(cleanInput, "HH:mm");

  return date.isValid() ? date : null;
}

export {
  clean,
  removeUserInput,
  useCallbackState,
  createTime,
  getStatusCodeOptions,
  convertPropertyToId,
  getIdsInCustomTables,
};

