import { InputNumber } from "antd";
import { codeToTextMapping } from "globals/configs";
import { get, toNumber } from "lodash";

import { handlePackCountChangeFn, WegmansASNHLLoopPackItem } from "./types";

interface IProps {
  data: WegmansASNHLLoopPackItem[];
  onPackCountChange: handlePackCountChangeFn;
  quantity: number;
}

export const WegmansASNTableRow = ({
  data,
  onPackCountChange,
  quantity,
}: IProps) => {
  const productId = get(
    data,
    "[0]item_identification_LIN.product_service_id_05",
    ""
  );

  const uomValue = get(
    data,
    "[0]item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03",
    ""
  );
  const uom = codeToTextMapping[uomValue] ?? uomValue;

  return (
    <tr>
      <td>{productId}</td>
      <td>
        <InputNumber
          min={0}
          max={data.length}
          value={quantity}
          onChange={(newCount) =>
            onPackCountChange(productId, toNumber(newCount))
          }
        />
      </td>
      <td>{uom}</td>
    </tr>
  );
};

