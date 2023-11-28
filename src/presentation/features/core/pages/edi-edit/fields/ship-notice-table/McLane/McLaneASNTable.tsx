/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldProps } from "@rjsf/utils";
import { useGetAdditionalASNDataQuery } from "domain/interactors/edi";
import { groupBy, take } from "lodash";
import { useParams } from "react-router-dom";
import { HLLoopPackWithContainerIds, HLLoopPack } from "./PackTableTypes";
import React from "react";
import { PackRow } from "./PackRow";
import styled from "styled-components";

const PackTableContainer = styled.div`
  padding-top: 20px;
  overflow: auto;
`;

interface PageParams {
  documentType: string;
  documentId: string;
  purchaseOrderId: string;
  id: string;
}

function McLaneASNTable({
  formData,
  onChange,
  value,
  idSchema,
  errorSchema,
}: FieldProps) {
  const [packs] = React.useState<HLLoopPack[]>(() => {
    return formData;
  });

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

  function selectContainerIds(containerIds: string[], sku: string) {
    const packContainsSku = packs.find((pack) => {
      const [item] = pack.HL_loop_item;
      const LIN = item.item_identification_LIN;
      const itemSku = LIN.product_service_id_03;
      return sku === itemSku;
    });

    if (!packContainsSku) {
      return packs;
    }

    const updatedPacks = packs.filter((pack) => {
      const [MAN] = pack?.marks_and_numbers_information_MAN ?? [];
      const containerId = MAN?.marks_and_numbers_02;
      return containerIds.includes(containerId);
    });

    onChange(updatedPacks);
  }

  return (
    <PackTableContainer>
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
                  const itemSku = LIN.product_service_id_03;

                  const details = productDetails?.find(
                    ({ sku }) => sku === itemSku
                  );

                  const key = `${MAN.marks_and_numbers_02}-${itemSku}`;

                  function onPackRowCountChange({ count }: { count: number }) {
                    const containerIdsToTake = take(pack.containerIds, count);
                    selectContainerIds(containerIdsToTake, itemSku);
                  }

                  return (
                    <PackRow
                      key={key}
                      data={pack}
                      description={details?.productDescription}
                      onChange={onPackRowCountChange}
                      idSchema={idSchema}
                      errorSchema={errorSchema}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PackTableContainer>
  );
}

export { McLaneASNTable };

