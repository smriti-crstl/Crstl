import React from "react";
import { DatePicker, Form, FormInstance, Input, Select } from "antd";
import { FormListFieldData } from "antd/lib/form/FormList";
import { getSafeNumber } from "../helpers/createHierarchicalIds";
import { CTT_355_OPTIONS } from "../data/CTT_355_options";

const uomMap: Record<string, string> = {
  CA: "Case",
  case_CA: "Case",
  EA: "Each",
  each_EA: "Each",
  DZ: "Dozen",
  PC: "Piece",
  SP: "Shelf Package",
  PK: "Package",
};

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

function PackRow(props: PackRowProps) {
  const { form, field, getProductDescription } = props;
  const [packCount, setPackCount] = React.useState(() =>
    getInitialPackCount(form, field)
  );

  const sku = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "LIN_07_234",
  ]);

  const shippedQuantity = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "SN1_02_382",
  ]);

  const shippedQuantityUnit = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "SN1_03_355",
  ]);

  const orderedQuantity = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "SN1_05_330",
  ]);

  const orderedQuantityUnit = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "SN1_06_355",
  ]);

  const containerIds = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "containerIds",
  ]) as string[];

  const description = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "PID_05_352",
  ]);

  const grossWeightPerPack = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "PO4_06_384",
  ]);

  const grossWeightUnitPerPack = form.getFieldValue([
    "HL_P_loop",
    field.name,
    "HL_I_Loop",
    0,
    "PO4_07_355",
  ]);

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

  return (
    <tr>
      <td>{upc}</td>
      <td>{sku}</td>
      <td>
        <Form.Item
          {...field}
          name={[field.name, "HL_I_Loop", 0, "LIN_13_234"]}
          rules={[
            {
              required: true,
              message: "Missing Lot number",
            },
          ]}
          noStyle
        >
          <Input />
        </Form.Item>
      </td>
      <td>
        {shippedQuantity} {uomMap[shippedQuantityUnit] ?? shippedQuantityUnit}
      </td>
      <td>
        {orderedQuantity} {uomMap[orderedQuantityUnit] ?? orderedQuantityUnit}
      </td>
      <td>
        <Form.Item
          {...field}
          name={[field.name, "HL_I_Loop", 0, "PO4_06_384"]}
          noStyle
        >
          <Input />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          {...field}
          name={[field.name, "HL_I_Loop", 0, "PO4_07_355"]}
          noStyle
        >
          <Select
            options={CTT_355_OPTIONS}
            optionFilterProp="label"
            showSearch
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          {...field}
          name={[field.name, "HL_I_Loop", 0, "PID_05_352"]}
          noStyle
        >
          <Input />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          {...field}
          name={[field.name, "HL_I_Loop", 0, "DTM_02_373"]}
          rules={[
            {
              required: true,
              message: "Missing Expiration date",
            },
          ]}
          noStyle
        >
          <DatePicker />
        </Form.Item>
      </td>
    </tr>
  );
}

export { PackRow };
