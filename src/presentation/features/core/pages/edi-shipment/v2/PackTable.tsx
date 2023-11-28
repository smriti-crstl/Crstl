/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAdditionalASNDataQuery } from "domain/interactors/edi";
import { groupBy } from "lodash";
import { useParams } from "react-router-dom";
import { HLLoopPackWithContainerIds, Tare } from "./PackTableTypes";
import React from "react";
import { PackRow } from "./PackRow";

interface PageParams {
  orderId: string;
  id: string;
}

function PackTable(props: any) {
  const tareList = props.value as Tare[];

  const packs = tareList.flatMap(({ HL_loop_pack }) => HL_loop_pack);

  const pageParams = useParams<PageParams>();

  const { data, isLoading } = useGetAdditionalASNDataQuery(pageParams.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const productDetails = data?.data?.productDetails ?? [];

  const packsGroupedBySku = groupBy(packs, (pack) => {
    const [item] = pack.HL_loop_item ?? [];
    const LIN = item.item_identification_LIN;
    const itemSku = LIN.product_service_id_03;
    return itemSku;
  });

  const mergedPacks = Object.values(packsGroupedBySku).map((packs) => {
    const containerIds = packs.map((pack) => {
      const [MAN] = pack?.marks_and_numbers_information_MAN ?? [];
      return MAN?.marks_and_numbers_02;
    });

    const initial: Partial<HLLoopPackWithContainerIds> = {
      containerIds,
      packCount: containerIds.length,
    };

    const mergedPack = packs.reduce((acc, current) => {
      return { ...acc, ...current };
    }, initial);

    return mergedPack;
  });

  return (
    <div className="ant-table">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th>Description</th>
                <th>Container ID</th>
                <th>SKU</th>
                <th>UPC</th>
                <th>Pack Count</th>
                <th>Quantity per Pack</th>
                <th>Quantity Shipped</th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {mergedPacks?.map((pack) => {
                const [item] = pack.HL_loop_item ?? [];
                const [MAN] = pack?.marks_and_numbers_information_MAN ?? [];
                const LIN = item?.item_identification_LIN;

                const details = productDetails?.find(
                  ({ sku }) => sku === LIN.product_service_id_03
                );

                const key = `${MAN.marks_and_numbers_02}-${LIN.product_service_id_03}`;

                return (
                  <PackRow
                    key={key}
                    data={pack}
                    description={details?.productDescription}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { PackTable };
