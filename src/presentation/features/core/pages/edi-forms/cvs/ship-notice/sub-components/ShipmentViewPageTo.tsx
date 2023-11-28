import { HeaderContainer } from "../ShipmentPage.styles";

const ShipmentViewPageTo = ({ data }: any) => {
  return (
    <HeaderContainer>
      <div>
        <p>Ship To: </p>
        <p>
          Location Id: <strong>{data?.locationId}</strong>
        </p>
        <p>{`${data?.address1 ?? ""} ${data?.address2 ?? ""} ${
          data?.city ?? ""
        } ${data?.postalCode ?? ""} ${data?.provinceCode ?? ""} ${
          data?.countryCode ?? ""
        }`}</p>
      </div>
    </HeaderContainer>
  );
};

export default ShipmentViewPageTo;
