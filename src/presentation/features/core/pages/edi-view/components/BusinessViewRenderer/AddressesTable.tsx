import { Table } from "antd";
import { ListDocumentSchema } from "domain/entity/edi/models";
import { cloneDeep, get, isArray, isEmpty, union, unset } from "lodash";
import styled from "styled-components";

import { EdiForm } from "../../../edi-edit/EdiForm";
import { getFallbackTextForCode } from "../../../edi/edi.utils";
import {
  getKeyEndingIn,
  getSortedKeysAlphaNumeric,
  getSortedKeysNumeric,
} from "../../helpers";
import { customTemplates } from "../../templates";
import { customWidgets } from "../../widgets";

interface Props {
  data: any[];
  listDocumentSchema?: ListDocumentSchema;
  schemaEntryPath: string;
  asnData?: any;
}

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  th.ant-table-cell {
    background-color: ${({ theme }) => theme.palette.colors.POLAR};
  }
  td.ant-table-cell {
    vertical-align: top;
  }
`;

const AsnDataAddressWrapper = styled.div`
  max-width: 300px;
  margin-top: 20px;
`;

const ADDITIONAL_ASN_SHIP_FROM_KEY = "additional_asn_data_ship_from";
const ADDITIONAL_ASN_SHIP_TO_KEY = "additional_asn_data_ship_to";

// this function is used to construct a single address line from an object
// goes through all the keys in the object, sorts them on the basis of _01, _02, ... and then joins them with a comma
const constructSingleAddressLine = (item: any): string => {
  if (isEmpty(item)) {
    return "";
  }

  const segmentItemKeys = Object.keys(item);
  const sortedSegmentItemKeys = getSortedKeysNumeric(segmentItemKeys);

  const addressLine: string[] = [];

  sortedSegmentItemKeys.forEach((segmentItemKey) => {
    addressLine.push(item[segmentItemKey]);
  });

  return addressLine.join(", ");
};

// this function is used to construct address lines from objects with _N1, _N2, _N3, _PER etc. keys
// goes through all keys, removes the keys to remove like N1, PER, and then calls constructSingleAddressLine on the remaining keys
const constructAddressLines = (
  n1LoopItem: any,
  keys: string[],
  keysToRemove: string[]
): string[] => {
  if (isEmpty(keys)) {
    return [];
  }

  // remove first key which is the name_N1 or party_identification_N1
  keys = keys.filter((key) => !keysToRemove.includes(key));

  const addressLines: string[] = [];

  keys.forEach((key) => {
    const segment = n1LoopItem?.[key];
    if (!segment) {
      return;
    }
    if (isArray(segment)) {
      n1LoopItem[key].forEach((item: any) => {
        addressLines.push(constructSingleAddressLine(item));
      });
    } else {
      addressLines.push(constructSingleAddressLine(segment));
    }
  });

  return addressLines;
};

// this function is used to get the entity_identifier_code_01 from an object
const getEntityIdentifierCode = (item: any): string => {
  const n1Key = getKeyEndingIn(item, "N1");

  return get(item, `${n1Key}.entity_identifier_code_01`, "");
};

export const AddressesTable: React.FC<Props> = ({
  data,
  listDocumentSchema,
  schemaEntryPath,
  asnData,
}) => {
  const { enhancedSchema } = listDocumentSchema ?? {};

  const n1Key = getKeyEndingIn(data?.[0], "N1");
  const perKey = getKeyEndingIn(data?.[0], "PER");

  const keys = union<string>(...data.map((item: any) => Object.keys(item)));
  const sortedKeys = getSortedKeysAlphaNumeric(keys);

  const additionalShipFromData = get(asnData, "data.shipFrom");
  const additionalShipToData = get(asnData, "data.shipTo");

  const getColumns = (items: any) => {
    const columnKeys: string[] = [];
    // toShowAdditionalData - shipFrom only if SF, shipTo only if ST - not present in listDoc for Shipment level keys
    const toShowAdditionalData =
      schemaEntryPath.endsWith(
        "HL_loop_shipment.items.properties.name_N1_loop.items"
      ) ||
      schemaEntryPath.endsWith(
        "HL_loop_shipment.items.properties.party_identification_N1_loop.items"
      );
    let toShowAdditionalDataShipFrom = toShowAdditionalData;
    let toShowAdditionalDataShipTo = toShowAdditionalData;

    items?.forEach((item: any) => {
      const keyToPush = getEntityIdentifierCode(item);

      if (keyToPush) {
        columnKeys.push(keyToPush);

        // if SF is present in listDoc for Shipment level keys - no need to show additionalAsnData
        if (keyToPush === "SF") {
          toShowAdditionalDataShipFrom = false;
        }
        // if ST is present in listDoc for Shipment level keys - no need to show additionalAsnData
        if (keyToPush === "ST") {
          toShowAdditionalDataShipTo = false;
        }
      }
    });

    const columnsToReturn = columnKeys?.map((columnKey) => {
      const codes = get(
        enhancedSchema,
        `${schemaEntryPath}.properties.${n1Key}.properties.entity_identifier_code_01["x12-codes"]`,
        {}
      );

      const shortValue = columnKey.split("_").pop() ?? "";
      const label =
        codes[columnKey]?.description ??
        codes[shortValue]?.description ??
        getFallbackTextForCode(columnKey);

      return {
        title: label,
        dataIndex: columnKey,
        render: function renderVal(value?: any) {
          const clonedValue = cloneDeep(value);
          const addressLines = constructAddressLines(clonedValue, sortedKeys, [
            n1Key, // exclude _n1 since its shown before the address lines
            perKey, // exclude _PER since its shown after the address lines
          ]);

          unset(clonedValue, `${n1Key}.entity_identifier_code_01`);

          return (
            <>
              <EdiForm
                schema={get(
                  enhancedSchema,
                  `${schemaEntryPath}.properties.${n1Key}`,
                  {}
                )}
                formData={get(clonedValue, n1Key, {})}
                widgets={customWidgets}
                {...customTemplates}
              />
              {addressLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <EdiForm
                schema={get(
                  enhancedSchema,
                  `${schemaEntryPath}.properties.${perKey}`,
                  {}
                )}
                formData={get(clonedValue, perKey, {})}
                widgets={customWidgets}
                {...customTemplates}
              />
            </>
          );
        },
      };
    });

    /**
     *  if shipment level n1 loop path
     *  check if shipFrom exists in additional asn data
     *    if SF avl in listDoc - do nothing
     *    else - add additional asn data shipFrom in UI
     */
    if (toShowAdditionalDataShipFrom && !isEmpty(additionalShipFromData)) {
      columnsToReturn.push({
        title: "Ship From",
        dataIndex: ADDITIONAL_ASN_SHIP_FROM_KEY,
        render: function renderVal(value?: any) {
          const locationId = get(value, "locationId", "");
          const address = get(value, "address", "");

          return (
            <AsnDataAddressWrapper>
              {locationId && (
                <div>
                  <span>Location Id:</span> <strong>{locationId}</strong>
                </div>
              )}
              <div>{address}</div>
            </AsnDataAddressWrapper>
          );
        },
      });
    }

    /**
     *  if shipment level n1 loop path
     *  check if shipTo exists in additional asn data
     *    if ST avl in listDoc - do nothing
     *    else - add additional asn data shipTo in UI
     */
    if (toShowAdditionalDataShipTo && !isEmpty(additionalShipToData)) {
      columnsToReturn.push({
        title: "Ship To",
        dataIndex: ADDITIONAL_ASN_SHIP_TO_KEY,
        render: function renderVal(value?: any) {
          const {
            address1,
            address2,
            city,
            provinceCode,
            postalCode,
            countryCode,
          } = value ?? {};

          return (
            <AsnDataAddressWrapper>
              <div>
                {address1}
                {address1 && ", "}
                {address2}
              </div>
              <div>
                {city}
                {city && ", "}
                {provinceCode} {postalCode}
                {(city || provinceCode || postalCode) && ", "}
                {countryCode}
              </div>
            </AsnDataAddressWrapper>
          );
        },
      });
    }

    return columnsToReturn;
  };

  const columns = getColumns(data);

  // construct an object with keys as entity_identifier_code_01 and value as the object
  // this is used to construct table headers and cells from the object
  const record = data?.reduce((acc: any, item: any) => {
    const key = getEntityIdentifierCode(item);

    if (key) {
      acc[key] = item;
    }

    return acc;
  }, {});

  if (!isEmpty(additionalShipFromData)) {
    record[ADDITIONAL_ASN_SHIP_FROM_KEY] = additionalShipFromData;
  }

  if (!isEmpty(additionalShipToData)) {
    record[ADDITIONAL_ASN_SHIP_TO_KEY] = additionalShipToData;
  }

  if (
    isEmpty(record) ||
    isEmpty(get(enhancedSchema, schemaEntryPath)) ||
    isEmpty(columns)
  ) {
    return null;
  }

  return (
    <TableContainer>
      <Table
        dataSource={[record]}
        columns={columns}
        pagination={false}
        bordered
      />
    </TableContainer>
  );
};

