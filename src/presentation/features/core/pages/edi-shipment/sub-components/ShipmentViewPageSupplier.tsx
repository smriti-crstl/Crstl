import { AddressContainer, HeaderContainer } from "../ShipmentPage.styles";

const ShipmentViewPageSupplier = ({ data }: { data: unknown; }) => {
  return (
    <HeaderContainer>
      <AddressContainer>
        <p>Supplier:</p>
      </AddressContainer>
    </HeaderContainer>
  );
};

export default ShipmentViewPageSupplier;
