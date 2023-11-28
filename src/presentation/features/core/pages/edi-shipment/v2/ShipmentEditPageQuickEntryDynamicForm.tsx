import { Affix, Button, Input, Select } from "antd";
import clsx from "clsx";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import {
  useListDocumentQuery,
  useUpdateDocument856,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import { CORE_EDI_SHIPMENT_EDIT_PAGE_V2 } from "globals/configs";
import {
  BootStrapButtonStyles,
  BootStrapFormStyles,
} from "globals/themes/BootStrapStyles";
import { cloneDeep, set } from "lodash";
import { RjsfErrorBoundary } from "presentation/features/common/components/ErrorBoundary/RjsfErrorBoundary";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { Spinner } from "@crstl/components/atoms/loading";

import { ButtonsContainer } from "../../edi-invoice/InvoiceEditPage.styles";
import FieldDescriptionPopover from "../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import jedi from "../data/856-jedi-mclane.json";
import schema from "../data/856-schema-mclane.json";
import uiSchema from "../data/quick-form/856-uischema-mclane.json";
import {
  ContainerBordered,
  DynamicFormContainer,
  FormContainer,
  HighlightedButton,
  LoadingContainer,
  PageWrapper,
  QuickLinkButton,
  QuickLinks,
  QuickLinksContainer,
} from "../DynamicShipmentPage.styles";
import {
  BorderedSubFormWrapper,
  FormHeader,
  FormHeaderContainer,
  SubFormRemoveButton,
} from "../ShipmentPage.styles";
import { ErrorMessage } from "../sub-components/ErrorMessage";
import { PackTable } from "./PackTable";

declare global {
  interface Window {
    JSONSchemaForm: {
      default: any;
    };
  }
}

const Form = window?.JSONSchemaForm?.default;

interface PageParams {
  orderId: string;
  id: string;
}

function getFullEntryFormUrl({
  pageParams,
  searchParams,
}: {
  pageParams: PageParams;
  searchParams: URLSearchParams;
}) {
  const url = generatePath(CORE_EDI_SHIPMENT_EDIT_PAGE_V2, pageParams);
  searchParams.set("fullEntryForm", "true");
  const urlWithSearchParams = `${url}?${searchParams.toString()}`;
  return urlWithSearchParams;
}

const customTemplates = {
  ArrayFieldTemplate: function ArrayFieldTemplate(props: any) {
    const { title } = props;
    return (
      <div>
        <legend>{title}</legend>
        {props.items.map((element: any) => {
          return (
            <BorderedSubFormWrapper key={element.key}>
              {element.hasRemove && (
                <SubFormRemoveButton>
                  <MinusCircleOutlined
                    style={{ fontSize: "20px" }}
                    onClick={element.onDropIndexClick(element.index)}
                  />
                </SubFormRemoveButton>
              )}
              {element.children}
            </BorderedSubFormWrapper>
          );
        })}
        {props.canAdd && (
          <Button
            type="dashed"
            htmlType="button"
            onClick={props.onAddClick}
            block
            icon={<PlusOutlined />}
          >
            Add {title}
          </Button>
        )}
      </div>
    );
  },
};

const customWidgets = {
  TextWidget: function CustomTextWidget(props: any) {
    const {
      value,
      id,
      label,
      schema,
      onChange: onChangeProp,
      required,
    } = props;

    function onChange(e: any) {
      onChangeProp(e.target.value);
    }

    return (
      <div className="ant-form ant-form-vertical edi-webform">
        <div className="ant-row ant-form-item">
          <div className="ant-col ant-form-item-label">
            <label
              htmlFor={id}
              className={clsx({ "ant-form-item-required": required })}
            >
              <div className="form-label">
                {label}
                {schema?.description ? (
                  <FieldDescriptionPopover
                    hideTitle
                    shortCode="BSN_02"
                    content={schema.description}
                    glossaryKey={
                      EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                    }
                  />
                ) : null}
              </div>
            </label>
          </div>
          <div className="ant-col ant-form-item-control">
            <div className="ant-form-item-control-input">
              <Input id={id} name={id} value={value} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  SelectWidget: function CustomSelectWidget(props: any) {
    const {
      id,
      label,
      value,
      schema,
      onChange: onChangeProp,
      required,
    } = props;

    const { ["x12-codes"]: codes } = schema;

    function onChange(e: any) {
      onChangeProp(e);
    }

    const options = codes ? Object.values(codes) : [];

    if (options.length === 0) {
      console.log("NO OPTIONS");
      return null;
    }

    return (
      <div className="ant-form ant-form-vertical edi-webform">
        <div className="ant-row ant-form-item">
          <div className="ant-col ant-form-item-label">
            <label
              htmlFor={id}
              className={clsx({ "ant-form-item-required": required })}
            >
              <div className="form-label">
                {label}
                {schema?.description ? (
                  <FieldDescriptionPopover
                    hideTitle
                    shortCode="BSN_02"
                    content={schema.description}
                    glossaryKey={
                      EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                    }
                  />
                ) : null}
              </div>
            </label>
          </div>
          <div className="ant-col ant-form-item-control">
            <div className="ant-form-item-control-input">
              <Select id={id} defaultValue={value} onChange={onChange}>
                {options?.map((option: any) => {
                  return (
                    <Select.Option key={option.code} value={option.code}>
                      {option.description}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  },

  customMclanePackTable: PackTable,
};

function ShipmentEditPageQuickEntryDynamicForm() {
  const [isHeaderPinned] = React.useState(false);
  const form = React.useRef<HTMLFormElement>(null);
  const pageParams = useParams<PageParams>();
  const history = useHistory();
  const location = useLocation();
  const searchParams = useSearchParams();

  const { data: listDocumentData, isFetching } = useListDocumentQuery(
    "856",
    pageParams.id
  );

  const {
    mutate,
    isError,
    error: updateDocumentErrorResponse,
    isLoading,
  } = useUpdateDocument856();

  const fullEntryFormUrl = getFullEntryFormUrl({ pageParams, searchParams });

  const errorResponse = updateDocumentErrorResponse as DocumentUpdatedResponseModel;

  if (isFetching) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  function submitAsDraft() {
    const { formData } = (form.current as any).state;

    const clonedListDocument = cloneDeep(listDocumentData) as TargetJSON;

    set(
      clonedListDocument,
      "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]",
      formData
    );

    mutate(
      {
        documentId: pageParams.id,
        documentType: "856",
        file: clonedListDocument.data.file,
        sendAfterSave: false,
      },
      {
        onSuccess: (data) => {
          const description = "Draft saved successfully";

          setNotification({
            type: "success",
            moduleName: "",
            description,
          });
          searchParams.delete("fullEntryForm");
          searchParams.set("refreshWorkflow", "true");
          const search = searchParams.toString();

          history.push(`${location.pathname}?${search}`);
        },
      }
    );
  }

  function submitAndSend() {
    if (form.current?.formElement) {
      form.current?.formElement.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }

  return (
    <PageWrapper>
      <ContainerBordered>
        <FormContainer>
          <QuickLinksContainer>
            <QuickLinks>
              <HighlightedButton>Quick Entry Form</HighlightedButton>
              <QuickLinkButton
                to={fullEntryFormUrl}
                replace
                onClick={(e) => {
                  amplitude.logClickEvent(`EDI ASN Full Entry Form`);
                }}
              >
                Full Entry Form
              </QuickLinkButton>
            </QuickLinks>
          </QuickLinksContainer>
          <Affix
            offsetTop={0}
            onChange={(affixed) => {
              // pinHeader(affixed ?? false);
            }}
            className={clsx({ "pinned-header": isHeaderPinned })}
          >
            <FormHeaderContainer>
              <FormHeader>
                <h2>New Ship Notice - Quick Entry Form</h2>
                <ButtonsContainer>
                  <Button
                    onClick={() => {
                      amplitude.logClickEvent(
                        `EDI Quick Entry Form: Ship Notice: Save`,
                        pageParams
                      );
                      submitAsDraft();
                    }}
                    loading={isLoading}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      amplitude.logClickEvent(
                        `EDI Quick Entry Form: Ship Notice: Save and Send`,
                        pageParams
                      );
                      submitAndSend();
                    }}
                    loading={isLoading}
                  >
                    Save and Send
                  </Button>
                </ButtonsContainer>
              </FormHeader>
              {isError && <ErrorMessage data={errorResponse?.data} />}
            </FormHeaderContainer>
          </Affix>
          <DynamicFormContainer>
            <BootStrapFormStyles>
              <BootStrapButtonStyles>
                <RjsfErrorBoundary isError={!Form}>
                  <Form
                    schema={schema}
                    columns={3}
                    // liveValidate={true}
                    uiSchema={uiSchema}
                    // onChange={log("changed")}
                    // onSubmit={onSubmit}
                    // onError={log("errors")}
                    formData={
                      jedi.interchanges[0].groups[0].transaction_sets[0]
                    }
                    ref={form}
                    // fields={customFields}
                    widgets={customWidgets}
                    {...customTemplates}
                  >
                    {/* <button ref={submitButtonRef} type="submit">
                    Submit
                  </button> */}
                  </Form>
                </RjsfErrorBoundary>
              </BootStrapButtonStyles>
            </BootStrapFormStyles>
          </DynamicFormContainer>
        </FormContainer>
      </ContainerBordered>
    </PageWrapper>
  );
}

export default ShipmentEditPageQuickEntryDynamicForm;

