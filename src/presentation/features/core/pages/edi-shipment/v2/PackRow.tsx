import React from "react";
import { getSafeNumber } from "@crstl/app/src/presentation/utils/common";
import { HLLoopPackWithContainerIds } from "./PackTableTypes";
import { InputNumber } from "antd";
import { take } from "lodash";

interface PackRowProps {
  data: Partial<HLLoopPackWithContainerIds>;
  description?: string;
}

function ContainerIds({ data = [] }: { data?: string[] }) {
  if (data.length === 0) {
    return null;
  }

  if (data?.length < 3) {
    return (
      <>
        {data?.map((containerId) => (
          <React.Fragment key={containerId}>
            {containerId}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  }

  const firstId = data.at(0);
  const lastId = data.at(-1);

  return (
    <>
      {firstId}
      <br />-
      <br />
      {lastId}
    </>
  );
}

function PackRow({ data, description }: PackRowProps) {
  const [packCount, setPackCount] = React.useState(() =>
    getSafeNumber(data.packCount, 0)
  );

  const { containerIds } = data;

  const [item] = data.HL_loop_item ?? [];

  const [MAN] = data?.marks_and_numbers_information_MAN ?? [];
  const LIN = item?.item_identification_LIN;
  const SN1 = item?.item_detail_shipment_SN1;
  const PO4 = item?.item_physical_details_PO4;

  const packQty = PO4?.pack_01;
  const innerPack = PO4?.inner_pack_14;
  const unitsShipped = getSafeNumber(SN1.number_of_units_shipped_02);

  const key = `${MAN.marks_and_numbers_02}-${LIN.product_service_id_03}`;

  const totalQuantityShipped = packCount * unitsShipped;

  function onPackCountChange(value: string | number | null | undefined) {
    const parsedValue = getSafeNumber(value?.toString(), 0);
    setPackCount(parsedValue);
  }

  return (
    <tr key={key}>
      <td>
        {description && (
          <>
            <strong>Product: </strong> {description}
          </>
        )}
        {packQty && (
          <>
            <strong>Pack Qty: </strong>
            {packQty}
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
      <td>
        <ContainerIds data={take(data.containerIds, packCount)} />
      </td>
      <td>{LIN?.product_service_id_03}</td>
      <td>{LIN?.product_service_id_05}</td>
      <td>
        <InputNumber
          min={0}
          max={containerIds?.length ?? 0}
          value={packCount}
          onChange={onPackCountChange}
        />
      </td>
      <td>{unitsShipped}</td>
      <td>{totalQuantityShipped}</td>
    </tr>
  );
}

export { PackRow };

