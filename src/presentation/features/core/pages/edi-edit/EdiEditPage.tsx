import { Affix } from "antd";
import clsx from "clsx";
import {
  useGetListDocumentSchema,
  useListDocumentQuery,
  useResetDocument,
  useUpdateDocument,
} from "domain/interactors/edi";
// import enhancedSchema from "./856-schema-mclane.json";
// import formUiSchema from "./856-uischema.json";
// import jedi from "./856-jedi-mclane.json";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_GROCERY_INVOICE_VIEW_PAGE,
  CORE_EDI_INVOICE_VIEW_PAGE,
  CORE_EDI_PO_ACK_VIEW_PAGE,
  CORE_EDI_PO_CHANGE_ACK_VIEW_PAGE,
  CORE_EDI_RTS_VIEW_PAGE,
  CORE_EDI_SHIPMENT_VIEW_PAGE,
} from "globals/configs";
import { useFlags } from "launchdarkly-react-client-sdk";
import { cloneDeep, get, set } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import {
  CORE_EDI_DOCUMENT_NAMES,
  CoreEDIDocumentNumber,
} from "presentation/texts-reservoir";
import { amplitude } from "presentation/utils";
import React from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { EyeOutlined } from "@ant-design/icons";
import { Spinner } from "components/atoms/loading";

import {
  ButtonsContainer,
  ContainerBordered,
  FormContainer,
  FormHeader,
  FormHeaderContainer,
  FormTitle,
  HighlightedButton,
  LoadingContainer,
  PageWrapper,
  QuickLinkButton,
  QuickLinks,
  QuickLinksContainer,
  StyledGhostButton,
  StyledPrimaryButton,
  StyledSecondaryButton,
} from "./EdiEditPage.styles";
import { EdiForm } from "./EdiForm";
import { ErrorMessage } from "./ErrorMessage";
import { customFields } from "./fields";
import { clean } from "./helpers";
// import {
//   BootStrapButtonStyles,
//   BootStrapFormStyles,
// } from "globals/themes/BootStrapStyles";
import { getTemplates } from "./templates";
import { customWidgets } from "./widgets";

// const formData = jedi?.interchanges[0].groups[0].transaction_sets[0];
declare global {
  interface Window {
    JSONSchemaForm: {
      default: any;
    };
  }
}

interface PageParams {
  orderId: string;
  id: string;
  customer?: string;
}

interface EdiEditPageProps {
  documentTypeId: string;
}

const viewDocumentURLMap: {
  [key in CoreEDIDocumentNumber]: string;
} = {
  [CoreEDIDocumentNumber.Invoice]: CORE_EDI_INVOICE_VIEW_PAGE,
  [CoreEDIDocumentNumber.Acknowledgement]: CORE_EDI_PO_ACK_VIEW_PAGE,
  [CoreEDIDocumentNumber.ShipNotice]: CORE_EDI_SHIPMENT_VIEW_PAGE,
  [CoreEDIDocumentNumber.RTS]: CORE_EDI_RTS_VIEW_PAGE,
  [CoreEDIDocumentNumber.GroceryInvoice]: CORE_EDI_GROCERY_INVOICE_VIEW_PAGE,
  [CoreEDIDocumentNumber.PurchaseOrderChangeAck]: CORE_EDI_PO_CHANGE_ACK_VIEW_PAGE,
};

function EdiEditPage({ documentTypeId }: EdiEditPageProps) {
  const { resetDocBtn } = useFlags();
  const form = React.useRef<HTMLFormElement>(null);
  const [liveValidate, setLiveValidate] = React.useState(false);
  const [isSavingAsDraft, setIsSavingAsDraft] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  const [isQuickEntry, setIsQuickEntry] = React.useState(true);

  const errorTemplateRef = React.useRef<any>(null);

  const history = useHistory();
  const location = useLocation();
  const params = useParams<PageParams>();
  const searchParams = useSearchParams();
  const { id: documentId, orderId } = params;

  const { data, isFetching } = useListDocumentQuery(
    documentTypeId,
    documentId,
    undefined,
    undefined,
    {
      select: (data: any) => clean(data, true),
    }
  );

  const {
    mutate: mutateResetDocument,
    isLoading: isResettingDocument,
  } = useResetDocument();

  const {
    data: schemaData,
    isFetching: isFetchingSchemaData,
  } = useGetListDocumentSchema(documentTypeId, documentId);

  const {
    mutate,
    isError,
    error: updateDocumentErrorResponse,
    isLoading: isUpdatingDocument,
  } = useUpdateDocument(documentTypeId);

  function toggleQuickEntry() {
    return setIsQuickEntry((v) => !v);
  }

  const scrollToErrorBox = () => {
    if (errorTemplateRef.current) {
      errorTemplateRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function triggerSubmit() {
    if (form.current?.formElement) {
      form.current?.formElement.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
      setLiveValidate(true);
    }
  }

  const { enhancedSchema, quickEntryUISchema, fullEntryUISchema } =
    schemaData ?? {};

  const formUiSchema = isQuickEntry
    ? quickEntryUISchema?.properties
    : fullEntryUISchema?.properties;

  function resetButtons() {
    setIsSavingAsDraft(false);
    setIsSaving(false);
  }

  function submitForm(sendAfterSave = false) {
    const { formData } = (form.current as any).state;
    const clonedListDocument = cloneDeep(data?.data) as any;
    const cleanFormData = clean(formData);

    set(
      clonedListDocument,
      "file.json_edi.interchanges[0].groups[0].transaction_sets[0]",
      cleanFormData
    );

    mutate(
      {
        documentId,
        documentType: documentTypeId,
        file: clonedListDocument.file,
        sendAfterSave: sendAfterSave,
      },
      {
        onSuccess: (data) => {
          const defaultMessage = data?.data.message || "Changes Saved";
          const description = sendAfterSave
            ? defaultMessage
            : "Draft saved successfully";

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
        onError: (error) => {
          const data = error?.data;

          const description =
            data?.message ?? "Something went wrong, please try again";

          setNotification({
            type: "error",
            moduleName: "",
            description,
          });
        },
        onSettled: resetButtons,
      }
    );
  }

  const onDoneClick = () => {
    const type = isQuickEntry ? "Quick Entry" : "Full Entry";
    amplitude.logClickEvent(`RJSF EDI ${title}: ${type} Form: View`, params);

    const path = viewDocumentURLMap[documentTypeId as CoreEDIDocumentNumber];

    const url = generatePath(path, { id: documentId, orderId });

    // * note: adding for the time being to keep memory of "source-document-type"
    const search = searchParams.toString();

    history.push(`${url}?${search}`);
  };

  function onResetDocumentClick() {
    const type = isQuickEntry ? "Quick Entry" : "Full Entry";
    amplitude.logClickEvent(`RJSF EDI ${title}: ${type} Form: Reset`, params);
    mutateResetDocument(
      { queryKey: [params.id, documentTypeId, params.id] },
      {
        onSuccess: (...args) => {
          setNotification({
            type: "success",
            moduleName: "",
            description: "Successfully reset to original version",
          });
        },
        onError: () => {
          setNotification({
            type: "error",
            moduleName: "",
            description:
              "Failed to reset to original version, please try again later",
          });
        },
        onSettled: resetButtons,
      }
    );
  }

  if (isFetching || isFetchingSchemaData) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  if (!enhancedSchema) {
    return null;
  }

  const formData = get(
    data,
    "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]"
  );

  const title =
    CORE_EDI_DOCUMENT_NAMES[documentTypeId as CoreEDIDocumentNumber];

  const isBusy = isResettingDocument || isUpdatingDocument;

  const customTemplates = getTemplates({ quickEntryForm: isQuickEntry });

  return (
    <PageWrapper>
      <ContainerBordered>
        <FormContainer>
          <QuickLinksContainer ref={errorTemplateRef}>
            {isQuickEntry ? (
              <QuickLinks>
                <HighlightedButton>Quick Entry Form</HighlightedButton>
                <QuickLinkButton
                  to="/"
                  replace
                  onClick={(e) => {
                    e.preventDefault();
                    if (isBusy) {
                      return;
                    }
                    toggleQuickEntry();
                    amplitude.logClickEvent(
                      `RJSF EDI ${title}: Full Entry Form`
                    );
                  }}
                >
                  Full Entry Form
                </QuickLinkButton>
              </QuickLinks>
            ) : (
              <QuickLinks>
                <QuickLinkButton
                  to="/"
                  replace
                  onClick={(e) => {
                    e.preventDefault();
                    if (isBusy) {
                      return;
                    }
                    toggleQuickEntry();
                    amplitude.logClickEvent(
                      `RJSF EDI ${title}: Quick Entry Form`
                    );
                  }}
                >
                  Quick Entry Form
                </QuickLinkButton>
                <HighlightedButton>Full Entry Form</HighlightedButton>
              </QuickLinks>
            )}
          </QuickLinksContainer>
          <Affix
            offsetTop={0}
            onChange={(affixed) => {
              pinHeader(affixed ?? false);
            }}
            className={clsx({ "pinned-header": isHeaderPinned })}
          >
            <FormHeaderContainer>
              <FormHeader>
                <FormTitle>
                  New {title} - {isQuickEntry ? "Quick Entry" : "Full Entry"}{" "}
                  Form
                </FormTitle>
                <ButtonsContainer>
                  {resetDocBtn ? (
                    <StyledSecondaryButton
                      loading={isResettingDocument}
                      onClick={onResetDocumentClick}
                      disabled={isBusy}
                    >
                      Reset to Original
                    </StyledSecondaryButton>
                  ) : null}
                  <StyledSecondaryButton
                    disabled={isBusy}
                    onClick={() => {
                      const type = isQuickEntry ? "Quick Entry" : "Full Entry";
                      amplitude.logClickEvent(
                        `RJSF EDI ${title}: ${type} Form: Save`,
                        params
                      );
                      submitForm(false);
                      setIsSavingAsDraft(true);
                    }}
                    loading={isSavingAsDraft}
                  >
                    Save as Draft
                  </StyledSecondaryButton>
                  <StyledPrimaryButton
                    disabled={isBusy}
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      const type = isQuickEntry ? "Quick Entry" : "Full Entry";
                      amplitude.logClickEvent(
                        `RJSF EDI ${title}: ${type} Form: Save and Send`,
                        params
                      );

                      // submitForm(true);
                      triggerSubmit();
                    }}
                    loading={isSaving}
                  >
                    Save and Send
                  </StyledPrimaryButton>
                  <StyledGhostButton
                    type="primary"
                    disabled={isBusy}
                    ghost
                    onClick={onDoneClick}
                  >
                    <EyeOutlined /> View
                  </StyledGhostButton>
                </ButtonsContainer>
              </FormHeader>
              {isError && (
                <ErrorMessage data={updateDocumentErrorResponse?.data} />
              )}
            </FormHeaderContainer>
          </Affix>
          <EdiForm
            schema={enhancedSchema}
            uiSchema={formUiSchema}
            formData={formData}
            ref={form}
            widgets={customWidgets}
            fields={customFields}
            onSubmit={(e) => {
              submitForm(true);
              setIsSaving(true);
            }}
            onError={() => {
              scrollToErrorBox();
            }}
            liveValidate={liveValidate}
            {...customTemplates}
          />
          {/* {isUpdatingDocument || isResettingDocument ? (
            <Spinner />
          ) : (
            <DynamicFormContainer>
              <BootStrapFormStyles>
                <BootStrapButtonStyles>
                  <Form
                    schema={enhancedSchema}
                    columns={3}
                    uiSchema={formUiSchema}
                    formData={formData}
                    ref={form}
                    widgets={customWidgets}
                    noValidate
                    {...customTemplates}
                  ></Form>
                </BootStrapButtonStyles>
              </BootStrapFormStyles>
            </DynamicFormContainer>
          )} */}
        </FormContainer>
      </ContainerBordered>
    </PageWrapper>
  );
}

export { EdiEditPage as default };

