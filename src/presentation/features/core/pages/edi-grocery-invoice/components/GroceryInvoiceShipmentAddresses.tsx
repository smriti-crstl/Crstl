import { get } from "lodash";

import { ShippingAddress } from "../../edi-grocery-purchase-order/components/GroceryPurchaseOrderPage/ShippingAddress";
import { GroceryShippingAddress } from "../../edi-grocery-purchase-order/components/GroceryPurchaseOrderPage/types";
import { firstTransactionSet } from "../constants";
import { AddressContainer } from "../styles";

interface PublicProps {
  data: any;
}

export const GroceryInvoiceShipmentAddresses: React.FC<PublicProps> = ({
  data,
}) => {
  const nameN1Loop = get(
    data,
    `${firstTransactionSet}.heading.name_N1_loop`,
    []
  );

  return (
    <AddressContainer>
      {nameN1Loop?.map((data: GroceryShippingAddress, idx: number) => (
        <ShippingAddress data={data} key={idx} />
      ))}
    </AddressContainer>
  );
};

