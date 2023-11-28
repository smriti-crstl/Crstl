import { AddressContainer, HeaderContainer } from "../ShipmentPage.styles";

const GenericShipmentViewPageFrom = ({
  data,
  asnData,
}: {
  data: unknown;
  asnData: any;
}) => {
  const shipFrom = asnData?.data?.shipFrom;

  return (
    <HeaderContainer>
      <AddressContainer>
        <p>Ship From: </p>
        <div>
          <strong>Location Id:</strong>
          {shipFrom?.locationId}
        </div>
        <div>{shipFrom?.address}</div>
      </AddressContainer>
    </HeaderContainer>
  );
};

export default GenericShipmentViewPageFrom;
