import { AddressContainer, HeaderContainer } from "../ShipmentPage.styles";

const GenericShipmentViewPageTo = ({ data }: any) => {
  return (
    <HeaderContainer>
      <AddressContainer>
        <p>Ship To: </p>
        <p>
          <strong>Location Id:</strong>{" "}
          <strong>{data?.locationId ? data?.locationId : ""}</strong>
        </p>
        <p>{`${data?.address1 ? data?.address1 : ""} ${data?.address2 ? data?.address2 : ""
          } ${data?.city ? data?.city : ""} ${data?.postalCode ? data?.postalCode : ""
          } ${data?.provinceCode ? data?.provinceCode : ""} ${data?.countryCode ? data?.countryCode : ""
          }`}</p>
      </AddressContainer>
    </HeaderContainer>
  );
};

export default GenericShipmentViewPageTo;
