import { InputNumber } from "antd";
import { codeToTextMapping } from "globals/configs";
import { get, toNumber } from "lodash";
import { Fragment } from "react";

import { handlePackCountChangeFn, HEBASNHLLoopPackItem } from "./types";

interface IProps {
  data: HEBASNHLLoopPackItem[];
  onPackCountChange: handlePackCountChangeFn;
  containerIds: string[];
}

export const HEBASNTableRow = ({
  data,
  onPackCountChange,
  containerIds,
}: IProps) => {
  const productId = get(
    data,
    "[0]item_identification_LIN.product_service_id_03",
    ""
  );

  const uomValue = get(
    data,
    "[0]item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03",
    ""
  );
  const uom = codeToTextMapping[uomValue] ?? uomValue;

  const packCount = containerIds.length;

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
      <td>{uom}</td>
    </tr>
  );
};

