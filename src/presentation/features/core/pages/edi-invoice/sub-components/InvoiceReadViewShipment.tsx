import { find, get } from "lodash";

import { ShipToContainer } from "../InvoiceReadView.styles";

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

function getShippingInformation(data: unknown) {
  const nameN1Loop = get(data, `${firstTransactionSet}.heading.name_N1_loop`);

  const partyIdentificationN1Loop = get(
    data,
    `${firstTransactionSet}.heading.party_identification_N1_loop`
  );

  const identificationLoop = nameN1Loop || partyIdentificationN1Loop || [];
  const shipToReference =
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "ship_to_ST" },
    }) ||
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "ST" },
    });

  const billTopReference =
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "bill_to_party_BT" },
    }) ||
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "BT" },
    });

  const buyingPartyReference =
    find(identificationLoop, (item) => {
      const nameNode = item?.name_N1 ?? item?.party_identification_N1;
      const identifierCode = nameNode?.entity_identifier_code_01;
      const result = identifierCode === "buying_party_purchaser_BY";
      return result;
    }) ||
    find(identificationLoop, (item) => {
      const nameNode = item?.name_N1 ?? item?.party_identification_N1;
      const identifierCode = nameNode?.entity_identifier_code_01;
      const result = identifierCode === "BY";
      return result;
    });

  const supplierReference =
    find(identificationLoop, (item) => {
      const nameNode = item?.name_N1 ?? item?.party_identification_N1;
      const identifierCode = nameNode?.entity_identifier_code_01;
      const result = identifierCode === "supplier_manufacturer_SU";
      return result;
    }) ||
    find(identificationLoop, (item) => {
      const nameNode = item?.name_N1 ?? item?.party_identification_N1;
      const identifierCode = nameNode?.entity_identifier_code_01;
      const result = identifierCode === "SU";
      return result;
    });

  return {
    shipToReference,
    billTopReference,
    buyingPartyReference,
    supplierReference,
  };
}

function ShippingAddress({ title, data }: { title: string; data: unknown; }) {
  const partyIdentificationNq = get(data, "party_identification_N1");
  const nameN1 = get(data, "name_N1") ?? partyIdentificationNq;

  const partyLocationN3 = get(
    data,
    "party_location_N3[0].address_information_01"
  );
  const addressInformationN3 =
    get(data, "address_information_N3[0].address_information_01") ??
    partyLocationN3;

  const locationId = get(nameN1, "identification_code_04");
  const storeNameValue = get(nameN1, "name_02");

  const geographicLocationInfo = get(
    data,
    "geographic_location_N4[0]"
  ) as Record<string, string>;

  const storeName = storeNameValue ? (
    <>
      <br />
      {storeNameValue}
    </>
  ) : null;

  const addressLine1 = addressInformationN3 ? (
    <>
      <br />
      {addressInformationN3}
    </>
  ) : null;

  const geographicLocation = geographicLocationInfo ? (
    <>
      <br />
      {geographicLocationInfo.city_name_01},{" "}
      {geographicLocationInfo.state_or_province_code_02}{" "}
      {geographicLocationInfo.postal_code_03}{" "}
      {geographicLocationInfo.country_code_04}
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
        {geographicLocation}
      </p>
    </div>
  );
}

function InvoiceReadViewShipment({ data }: { data: unknown; }) {
  const shippingInfo = getShippingInformation(data);
  return (
    <ShipToContainer>
      {shippingInfo.buyingPartyReference ? (
        <ShippingAddress
          title="Bill to:"
          data={shippingInfo.buyingPartyReference}
        />
      ) : null}
    </ShipToContainer>
  );
}

export { InvoiceReadViewShipment };
