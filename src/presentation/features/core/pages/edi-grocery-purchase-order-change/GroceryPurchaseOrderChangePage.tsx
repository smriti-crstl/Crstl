import { useListDocumentQuery } from "domain/interactors/edi";
import { get } from "lodash";
import { forwardRef } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import { ShippingAddress } from "../edi-grocery-purchase-order/components/GroceryPurchaseOrderPage/ShippingAddress";
import { GroceryShippingAddress } from "../edi-grocery-purchase-order/components/GroceryPurchaseOrderPage/types";
import { firstTransactionSet } from "./constants";
import { FreightInformation } from "./freight-information";
import { HeaderSummary } from "./HeaderSummary";
import { OrderBasicInfo } from "./OrderBasicInfo";
import { POChangePanel } from "./POChangePanel";
import { ProductList } from "./product-list";
import { AddressContainer, HeaderContainer, OrderContainer } from "./styles";

const GroceryPurchaseOrderChangePage = (_: any, downloadRef: any) => {
  const { id, version } = useParams<{ id: string; version: string }>();
  const { data: listDocumentData, isLoading, isError } = useListDocumentQuery(
    "876",
    id,
    undefined,
    version
  );

  const nameN1Loop = get(
    listDocumentData,
    `${firstTransactionSet}.heading.name_N1_loop`,
    []
  );

  const partnerName = get(
    listDocumentData,
    "data.metadata.trading_partner_name"
  )?.toLowerCase();

  const partnerFlavorName = get(
    listDocumentData,
    "data.metadata.trading_partner_flavor"
  )?.toLowerCase();

  if (isError) {
    return null;
  }

  return (
    <>
      <POChangePanel documentType="876" sourceDocumentType="875" />
      <Spinner spinning={isLoading}>
        <OrderContainer ref={downloadRef}>
          <h2>Grocery Order Change</h2>
          <HeaderContainer>
            <OrderBasicInfo data={listDocumentData} />
            <HeaderSummary data={listDocumentData} />
          </HeaderContainer>
          <AddressContainer>
            {nameN1Loop?.map((data: GroceryShippingAddress, idx: number) => (
              <ShippingAddress data={data} key={idx} />
            ))}
          </AddressContainer>
          <FreightInformation
            data={listDocumentData}
            partnerName={partnerName}
            partnerFlavorName={partnerFlavorName}
          />
          <ProductList
            data={listDocumentData}
            partnerName={partnerName}
            partnerFlavorName={partnerFlavorName}
          />
        </OrderContainer>
      </Spinner>
    </>
  );
};

const GroceryPurchaseOrderChangePageWithRef = forwardRef(
  GroceryPurchaseOrderChangePage
);

export { GroceryPurchaseOrderChangePageWithRef as GroceryPurchaseOrderChangePage };

