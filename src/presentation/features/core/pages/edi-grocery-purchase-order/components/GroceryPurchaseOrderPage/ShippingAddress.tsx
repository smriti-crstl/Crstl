import { codeToTextMapping } from "globals/configs";
import { get } from "lodash";

import { GroceryShippingAddress } from "./types";

interface PublicProps {
  data: GroceryShippingAddress;
}

export const ShippingAddress: React.FC<PublicProps> = ({ data }) => {
  const titleCode = get(data, "name_N1.entity_identifier_code_01");
  const title = codeToTextMapping[titleCode];

  const locationId = get(data, "name_N1.identification_code_04");

  const storeNameValue = get(data, "name_N1.name_02");

  const addressLine1Value = get(
    data,
    "address_information_N3[0].address_information_01"
  );
  const addressLine2Value = get(
    data,
    "address_information_N3[0].address_information_02"
  );

  const geographicLocationInfo = get(data, "geographic_location_N4");

  const storeName = storeNameValue ? (
    <>
      <br />
      {storeNameValue}
    </>
  ) : null;

  const addressLine1 = addressLine1Value ? (
    <>
      <br />
      {addressLine1Value}
    </>
  ) : null;

  const addressLine2 = addressLine2Value ? (
    <>
      <br />
      {addressLine2Value}
    </>
  ) : null;

  const geographicLocation = geographicLocationInfo ? (
    <>
      <br />
      {geographicLocationInfo?.city_name_01},{" "}
      {geographicLocationInfo?.state_or_province_code_02}{" "}
      {geographicLocationInfo?.postal_code_03}
    </>
  ) : null;

  return (
    <div>
      <p>
        <strong>{title}</strong>
      </p>
      <p>
        Location ID: {locationId}
        {storeName}
        {addressLine1}
        {addressLine2}
        {geographicLocation}
      </p>
    </div>
  );
};

