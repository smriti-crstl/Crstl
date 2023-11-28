import { HeaderContainer } from "../ShipmentPage.styles";

const ShipmentViewPageFrom = ({
  data,
  asnData,
}: {
  data: unknown;
  asnData: any;
}) => {
  const shipFrom = asnData?.data?.shipFrom;

  return (
    <HeaderContainer>
      <div>
        <p>Ship From: </p>
        <div>
          <strong>Location Id:</strong>
          {shipFrom?.locationId}
        </div>
        <div>{shipFrom?.address}</div>
      </div>
    </HeaderContainer>
  );
};

export default ShipmentViewPageFrom;

