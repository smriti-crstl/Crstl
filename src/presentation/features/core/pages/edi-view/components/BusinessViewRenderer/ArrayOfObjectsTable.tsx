import { Table } from "antd";
import { ListDocumentSchema } from "domain/entity/edi/models";
import {
  cloneDeep,
  get,
  isArray,
  isEmpty,
  padStart,
  startCase,
  toNumber,
  union,
  unset,
} from "lodash";
import moment from "moment";
import styled from "styled-components";

import { createTime, removeUserInput } from "../../../edi-edit/helpers";
import { timePatterns } from "../../../edi-edit/widgets/TextWidget";
import { getFallbackTextForCode } from "../../../edi/edi.utils";
import { getKeyEndingIn, getSortedKeysNumeric } from "../../helpers";

interface Props {
  data: any | any[];
  listDocumentSchema?: ListDocumentSchema;
  schemaEntryPath: string;
}

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  th.ant-table-cell {
    background-color: ${({ theme }) => theme.palette.colors.POLAR};
  }
`;

// this function goes over the data and replaces the values with formatted values like time, date, select x12-codes, etc.
// it also replaces codes with descriptions, and appends UOM to previous key
const updateData = ({
  data,
  enhancedSchema,
  schemaEntryPath,
}: {
  data: any[];
  enhancedSchema: any;
  schemaEntryPath: string;
}) => {
  let clonedData: any[] = cloneDeep(data);

  clonedData = clonedData?.map((item: any) => {
    const newObject: any = {};

    const keys = Object.keys(item);
    const sortedKeys = getSortedKeysNumeric(keys);

    // replace date and time values with formatted values
    for (const key of sortedKeys) {
      const currentValue = item[key];
      // check if date
      const format = get(
        enhancedSchema,
        `${schemaEntryPath}.properties.${key}.format`,
        ""
      );
      const isDate = format === "date";
      if (isDate) {
        const safeValue = removeUserInput(currentValue);

        const date = moment(safeValue);
        const isValidDate = currentValue ? date.isValid() : false;
        const value = isValidDate ? date : null;

        newObject[key] = value?.format("YYYY-MM-DD");
        continue;
      }

      // check if time
      const x12Format = get(
        enhancedSchema,
        `${schemaEntryPath}.properties.${key}["x12-format"]`,
        ""
      );
      const pattern = get(
        enhancedSchema,
        `${schemaEntryPath}.properties.${key}.pattern`,
        ""
      );
      let timeFormat;
      if (pattern) {
        timeFormat = timePatterns[pattern];
      }
      const isTime = x12Format === "HHMM" || !!timeFormat;

      if (isTime) {
        const value = createTime(currentValue);
        newObject[key] = value?.format("HH:mm:ss");
        continue;
      }

      newObject[key] = currentValue;
    }

    // replace codes with descriptions first
    for (const key of sortedKeys) {
      const codes = get(
        enhancedSchema,
        `${schemaEntryPath}.properties.${key}["x12-codes"]`,
        {}
      );

      const currentValue = newObject?.[key];

      const shortValue =
        typeof currentValue === "string"
          ? currentValue?.split("_")?.pop() ?? ""
          : "";
      let newValue =
        codes?.[currentValue]?.description ??
        codes?.[shortValue]?.description ??
        currentValue;

      if (typeof newValue === "string" && newValue.includes("_")) {
        newValue = getFallbackTextForCode(newValue);
      }

      newObject[key] = newValue;
    }

    // append UOM to previous key unit_or_basis_for_measurement_code_08
    for (const key of sortedKeys) {
      if (key.includes("unit_or_basis_for_measurement_code")) {
        const keyNum = toNumber(key.substring(key.length - 2, key.length));

        const keyNumToAppend = padStart((keyNum - 1).toString(), 2, "0");

        const keyToAppend = getKeyEndingIn(item, keyNumToAppend);

        if (newObject?.[keyToAppend]) {
          newObject[
            keyToAppend
          ] = `${newObject[keyToAppend]} ${newObject[key]}`;

          unset(newObject, key);
        }
      }
    }

    // when qualifier - make new key with "value" of next key and delete both _qualifier and the next key (since new one is created)
    for (const key of sortedKeys) {
      if (key.includes("qualifier")) {
        const keyNum = toNumber(key.substring(key.length - 2, key.length));

        const keyNumToReplace = padStart((keyNum + 1).toString(), 2, "0");

        const keyToReplace = getKeyEndingIn(item, keyNumToReplace);

        if (newObject?.[keyToReplace]) {
          const newKey = newObject[key];
          newObject[newKey] = newObject[keyToReplace];

          unset(newObject, keyToReplace);
          unset(newObject, key);
        }
      }
    }

    return newObject;
  });

  return clonedData;
};

const getColumns = (items: any) => {
  const keys = union<string>(...items.map((item: any) => Object.keys(item)));

  const sortedKeys = getSortedKeysNumeric(keys);

  return sortedKeys.map((key) => {
    let label = "";

    if (key.includes("_")) {
      const labelArr = key.split("_");
      labelArr.pop();
      label = getFallbackTextForCode(labelArr.join(" "));
    } else {
      label = startCase(key);
    }

    return {
      title: label,
      dataIndex: key,
    };
  });
};

export const ArrayOfObjectsTable: React.FC<Props> = ({
  data,
  listDocumentSchema,
  schemaEntryPath,
}) => {
  if (isEmpty(data)) {
    return null;
  }

  const { enhancedSchema } = listDocumentSchema ?? {};

  const cleanedData = updateData({
    data: isArray(data) ? data : [data],
    enhancedSchema,
    schemaEntryPath,
  });

  const columns = getColumns(cleanedData);

  return (
    <TableContainer>
      <Table
        dataSource={cleanedData}
        columns={columns}
        pagination={false}
        bordered
      />
    </TableContainer>
  );
};

