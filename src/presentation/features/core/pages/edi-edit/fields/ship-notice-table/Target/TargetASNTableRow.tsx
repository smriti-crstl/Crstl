import { InputNumber } from "antd";
import { get, toNumber } from "lodash";
import { Fragment } from "react";

import { handlePackCountChangeFn, TargetASNHLLoopPackItem } from "./types";

interface IProps {
  data: TargetASNHLLoopPackItem[];
  onPackCountChange: handlePackCountChangeFn;
  containerIds: string[];
}

export const TargetASNTableRow = ({
  data,
  onPackCountChange,
  containerIds,
}: IProps) => {
  const productId = get(
    data,
    "[0].HL_loop_item[0].item_identification_LIN.product_service_id_03",
    ""
  );
  const packCount = containerIds.length;
  const quantityPerPack = get(
    data,
    "[0].HL_loop_item[0].item_detail_shipment_SN1.number_of_units_shipped_02",
    ""
  );
  const quantityShipped = toNumber(quantityPerPack) * packCount;

  const getContainerIds = () => {
    if (containerIds.length < 3) {
      return (
        <>
          {containerIds.map((containerId, idx) => (
            <Fragment key={idx}>
              {containerId}
              <br />
            </Fragment>
          ))}
        </>
      );
    }
    return (
      <Fragment>
        {containerIds[0]}
        <br />-
        <br />
        {containerIds[containerIds.length - 1]}
      </Fragment>
    );
  };

  return (
    <tr>
      <td>{productId}</td>
      <td>{getContainerIds()}</td>
      <td>
        <InputNumber
          min={0}
          max={data.length}
          value={packCount}
          onChange={(newCount) =>
            onPackCountChange(productId, toNumber(newCount))
          }
        />
      </td>
      <td>{quantityPerPack}</td>
      <td>{quantityShipped}</td>
    </tr>
  );
};
