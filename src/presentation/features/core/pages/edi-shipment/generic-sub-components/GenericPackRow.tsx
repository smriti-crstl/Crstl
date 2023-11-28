import { Form, FormInstance, InputNumber } from "antd";
import { FormListFieldData } from "antd/lib/form/FormList";
import { take } from "lodash";
import React from "react";

import { getSafeNumber } from "../helpers/createHierarchicalIds";

interface PackRowProps {
  form: FormInstance<any>;
  field: FormListFieldData;
  getProductDescription: (sku: string) => string;
}

function getInitialPackCount(
  form: FormInstance<any>,
  field: FormListFieldData
) {
  const value = form.getFieldValue(["HL_P_loop", field.name, "packCount"]);
  return getSafeNumber(value, 0);
}

function GenericPackRow(props: PackRowProps) {
  const { form, field, getProductDescription } = props;
  const [packCount, setPackCount] = React.useState(() =>
    getInitialPackCount(form, field)
  );

  const sku = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "LIN_05_234",
  ]);

  const packQty = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "PO4_01_356",
  ]);

  const innerPack = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "PO4_14_810",
  ]);

  const containerIds = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "containerIds",
  ]) as string[];

  const description = getProductDescription(sku);

  const upc = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "LIN_03_234",
  ]);

  // SN1_02_382
  const unitsShipped = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "SN1_02_382",
  ]);

  const parsedUnitsShipped = getSafeNumber(unitsShipped, 0);

  // const totalQuantityShipped = form.getFieldValue([
  //   "HL_P_loop",
  //   field.name,
  //   "totalQuantityShipped",
  // ]);

  const totalQuantityShipped = packCount * parsedUnitsShipped;

  function onPackCountChange(value: string | number | null | undefined) {
    const parsedValue = getSafeNumber(value?.toString(), 0);
    setPackCount(parsedValue);
  }

  const getContainerIds = (containerIds: string[]) => {
    if (containerIds.length < 3) {
      return (
        <>
          {containerIds.map((containerId) => (
            <React.Fragment key={containerId}>
              {containerId}
              <br />
            </React.Fragment>
          ))}
        </>
      );
    } else {
      return (
        <React.Fragment>
          {containerIds[0]}
          <br />-
          <br />
          {containerIds[containerIds.length - 1]}
        </React.Fragment>
      );
    }
  };

  return (
    <tr>
      <td>
        {description && (
          <>
            <strong>Product: </strong>
            {description}
          </>
        )}
        {packQty && (
          <>
            <br />
            <strong>Pack Qty: </strong> {packQty}
          </>
        )}
        {innerPack && (
          <>
            <br />
            <strong>Inner Pack: </strong>
            {innerPack}
          </>
        )}
      </td>
      <td>{getContainerIds(take(containerIds, packCount))}</td>
      <td>{sku}</td>
      <td>{upc}</td>
      <td>
        <Form.Item
          {...field}
          name={[field.name, "packCount"]}
          initialValue={containerIds.length}
          rules={[
            {
              required: true,
              message: "Missing packCount",
            },
            {
              type: "number",
              message: "Please enter a valid number",
            },
          ]}
          noStyle
        >
          <InputNumber
            min={0}
            max={containerIds.length}
            onChange={onPackCountChange}
          />
        </Form.Item>
      </td>
      <td>{parsedUnitsShipped}</td>
      <td>{totalQuantityShipped}</td>
    </tr>
  );
}

export { GenericPackRow };
