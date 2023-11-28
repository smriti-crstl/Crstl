import { useListDocumentQuery } from "domain/interactors/edi";
import { get } from "lodash";
import { forwardRef } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import { firstTransactionSet } from "../../constants";
import {
  AddressContainer,
  HeaderContainer,
  OrderContainer,
} from "../../styles";
import { FreightInformation } from "./freight-information";
import { HeaderSummary } from "./HeaderSummary";
import { OrderBasicInfo } from "./OrderBasicInfo";
import { ProductList } from "./product-list";
import { ShippingAddress } from "./ShippingAddress";
import { GroceryShippingAddress } from "./types";

const GroceryPurchaseOrderPage = (_: any, downloadRef: any) => {
  const { id, version } = useParams<{ id: string; version: string }>();

  const { data: listDocumentData, isLoading, isError } = useListDocumentQuery(
    "875",
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
    <Spinner spinning={isLoading}>
      <OrderContainer ref={downloadRef}>
        <h2>Grocery Order</h2>
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
  );
};

const GroceryPurchaseOrderPageWithRef = forwardRef(GroceryPurchaseOrderPage);

export { GroceryPurchaseOrderPageWithRef as GroceryPurchaseOrderPage };

