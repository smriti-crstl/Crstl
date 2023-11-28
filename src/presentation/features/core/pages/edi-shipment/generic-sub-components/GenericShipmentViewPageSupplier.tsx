import { AddressContainer, HeaderContainer } from "../ShipmentPage.styles";

const GenericShipmentViewPageSupplier = ({ data }: { data: unknown; }) => {
  return (
    <HeaderContainer>
      <AddressContainer>
        <p>Supplier:</p>
      </AddressContainer>
    </HeaderContainer>
  );
};

export default GenericShipmentViewPageSupplier;
