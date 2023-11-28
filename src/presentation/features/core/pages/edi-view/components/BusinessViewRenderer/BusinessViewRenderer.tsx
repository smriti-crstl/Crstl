import { get, isEmpty } from "lodash";
import {
  CORE_EDI_DOCUMENT_NAMES,
  CoreEDIDocumentNumber,
} from "presentation/texts-reservoir";
import { currencyUSDFormatter } from "presentation/utils";
import { CSSProperties } from "react";

import { EdiForm } from "../../../edi-edit/EdiForm";
import { EdiViewPageProps } from "../../EdiPOView";
import { customTemplates } from "../../templates";
import { customWidgets } from "../../widgets";
import { AddressesTable } from "./AddressesTable";
import { ArrayOfObjectsTable } from "./ArrayOfObjectsTable";
import { NestedArrayOfObjectsTable } from "./NestedArrayOfObjectsTable";
import { PageTitle } from "./PageTitle";
import {
  AmountContainer,
  CurrencyImageContainer,
  TitleContainer,
  ViewRow,
} from "./styles";
import { TradingPartnerName } from "./TradingPartnerName";
import { BusinessViewConfig } from "./types";

type Props = {
  config: BusinessViewConfig;
  listDocData: any;
  listDocSchema: any;
  asnData?: any;
  invoiceData?: any;
} & EdiViewPageProps;

export const BusinessViewRenderer: React.FC<Props> = ({
  documentTypeId,
  config,
  listDocData,
  listDocSchema,
  asnData,
  invoiceData,
}) => {
  const formData = get(
    listDocData,
    "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]"
  );

  const numericOrderTotal = get(
    listDocData,
    "data.metadata.order_total_numeric"
  );

  const { enhancedSchema } = listDocSchema ?? {};

  const title =
    CORE_EDI_DOCUMENT_NAMES[documentTypeId as CoreEDIDocumentNumber];

  return (
    <>
      <TitleContainer>
        <div>
          <PageTitle title={title} />
          <TradingPartnerName listDocData={listDocData} />
        </div>
        {!!numericOrderTotal && (
          <AmountContainer>
            <CurrencyImageContainer>
              <span role="img" aria-label="money">
                💵
              </span>
            </CurrencyImageContainer>
            <span>
              {currencyUSDFormatter(
                listDocData.data.metadata.order_total_numeric
              )}
            </span>
          </AmountContainer>
        )}
      </TitleContainer>
      {/*
        go over the "... edi-view/components/BusinessViewRenderer/samples/config850.ts" file for more details on the structure of the config 
        checkout the "... edi-view/components/BusinessViewRenderer/types.ts" file for more details on the types - this defines the structure of the config
      */}
      {config?.map((row, rowIdx) => {
        return (
          <ViewRow key={rowIdx}>
            {row?.map((col, colIdx) => {
              const style: CSSProperties = {};
              if (col?.width) {
                style.width = col.width;
              }

              return (
                <div key={colIdx} style={style}>
                  {col?.items?.map(
                    ({ elementType, formDataPath, schemaPath, title }) => {
                      const formDataToRender = get(formData, formDataPath);
                      const toShowTitle = !isEmpty(formDataToRender);
                      return (
                        <>
                          {title && toShowTitle && <strong>{title}</strong>}
                          {elementType === "object" ? (
                            // ! DOC_NOTE: used when we want to render an object/array of any shape - uses the default RJSF renderer
                            <EdiForm
                              schema={get(enhancedSchema, schemaPath, {})}
                              formData={get(formData, formDataPath)}
                              widgets={customWidgets}
                              {...customTemplates}
                              formContext={{ schemaPath }} // ! DOC_NOTE: used to pass schemaPath to custom widgets
                            />
                          ) : elementType === "addresses" ? (
                            // ! DOC_NOTE: used to render addresses from name_n1_loop, party_identification_n1_loop
                            <AddressesTable
                              data={get(formData, formDataPath, [])}
                              listDocumentSchema={listDocSchema}
                              schemaEntryPath={schemaPath}
                              asnData={asnData} // ! pass this to get shipFrom from additional ASN data
                            />
                          ) : elementType === "arrayOfObjects" ? (
                            // ! DOC_NOTE: used to render an array of objects, mainly of the shape [{key1: value1, key2: value2, ...}, {key1: value1, key2: value2, ...}, ...] - general usage pattern so far is the ITD segment
                            // ! DOC_NOTE: also supports a single flat object like {key1: value1, key2: value2, ...} - but not being used anywhere so far, tried with the SAC loop but not using it production
                            <ArrayOfObjectsTable
                              data={get(formData, formDataPath)}
                              listDocumentSchema={listDocSchema}
                              schemaEntryPath={schemaPath}
                            />
                          ) : elementType === "nestedArrayOfObjects" ? (
                            // ! DOC_NOTE: used to render a nested array of objects, mainly of the shape like the baseline_item_loop and it has multiple objects inside each object
                            // ! DOC_NOTE: keys at root level become the table headers, and the values, which are complex objects, are rendered as cells and rows
                            <NestedArrayOfObjectsTable
                              data={get(formData, formDataPath, [])}
                              listDocumentSchema={listDocSchema}
                              schemaEntryPath={schemaPath}
                              invoiceData={invoiceData} // ! pass this to get product descriptions from additional invoice data
                            />
                          ) : null}
                        </>
                      );
                    }
                  )}
                </div>
              );
            })}
          </ViewRow>
        );
      })}
    </>
  );
};

