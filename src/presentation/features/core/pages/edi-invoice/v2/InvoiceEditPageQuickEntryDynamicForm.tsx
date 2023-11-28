import { Affix, Button } from "antd";
import clsx from "clsx";
import { TargetJSON } from "domain/entity/edi/models/TargetJson810";
import {
  useListDocumentQuery,
  useUpdateDocument810,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_INVOICE_EDIT_PAGE_V2,
  CORE_EDI_INVOICE_VIEW_PAGE,
} from "globals/configs";
import {
  BootStrapButtonStyles,
  BootStrapFormStyles,
} from "globals/themes/BootStrapStyles";
// import { schema } from "./data/810-schema";
import { cloneDeep, set } from "lodash";
import { RjsfErrorBoundary } from "presentation/features/common/components/ErrorBoundary/RjsfErrorBoundary";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
import React from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { DocumentUpdatedResponseModel } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { Spinner } from "@crstl/components/atoms/loading";

// import Form from "@rjsf/core";
import jediJson from "../data/listDocumentResponseWithAllData.json";
import {
  ButtonsContainer,
  ContainerBordered,
  DebugContainer,
  FormContainer,
  FormHeader,
  FormHeaderContainer,
  HighlightedButton,
  LoadingContainer,
  OutputContainer,
  PageWrapper,
  QuickLinkButton,
  QuickLinks,
  QuickLinksContainer,
  TextArea,
} from "../DynamicInvoiceEditPage.styles";
import { createSourceJson } from "../helpers/createSourceJson";
import { ErrorMessage } from "../sub-components/ErrorMessage";
import {
  baselineItemDataTemplate,
  extendedReferenceN9Template,
  headingRefTemplate,
  headingTemplate,
  mainTemplate,
  partyIdentificationN1Template,
  pidTemplate,
  sacTemplate,
  slnTemplate,
  summaryISSTemplate,
  summarySACTemplate,
  summaryTemplate,
} from "../templates";

// import { initialValues } from "./data/initialValues";

declare global {
  interface Window {
    JSONSchemaForm: {
      default: any;
    };
  }
}

const Form = window?.JSONSchemaForm?.default;

async function runAsync(promiseFn: () => Promise<any>) {
  try {
    const result = await promiseFn();
    return [result, null];
  } catch (ex) {
    return [null, ex];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const schema: any = {
//   title: "Todo",
//   type: "object",
//   required: ["title"],
//   properties: {
//     title: { type: "string", title: "Title", default: "A new task" },
//     done: { type: "boolean", title: "Done?", default: false },
//   },
// };

// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require("../data/810-schema.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jedi = require("../data/810-jedi.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uiSchema = require("../data/quick-form/810-uischema.json");

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function setDefaultsInSchema(schema: any, jedi: any) {
  const ts = jedi.interchanges[0].groups[0].transaction_sets[0];
  const heading = ts.heading;
  const summary = ts.summary;
  const detail = ts.detail;

  for (const key in heading) {
    // transaction_set_header_ST
    if (key in schema.properties.heading.properties) {
      if ("properties" in schema.properties.heading.properties[key]) {
        for (const nestedKey in heading[key]) {
          if (
            nestedKey in schema.properties.heading.properties[key].properties
          ) {
            schema.properties.heading.properties[key].properties[
              nestedKey
            ].default = heading[key][nestedKey];
          }
        }
      }
    }
  }
}

// setDefaultsInSchema(schema, jedi);

function InvoiceEditPage() {
  const [isFormChanged, setFormChanged] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  const [nteSubFormVisible, setNteSubFormVisibility] = React.useState(false);
  //   const [form] = Form.useForm();
  const form = React.useRef<HTMLFormElement>(null);
  const [formData, setFormData] = React.useState<string>("");
  const [jediData, setJediData] = React.useState<TargetJSON | null>(null);
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const [sendAfterSaveBool, setSendAfterSaveBool] = React.useState<boolean>(
    false
  );
  const history = useHistory();
  const pageParams = useParams<PageParams>();
  const searchParams = useSearchParams();
  const isDebug = searchParams.get("debug") ? true : false;

  const result = useListDocumentQuery("810", id);
  const { data: listDocumentData, isFetching } =
    id !== "test" ? result : { isFetching: false, data: jediJson };

  const {
    mutate,
    data: updateResponse,
    isError,
    error: updateDocumentErrorResponse,
    isLoading,
  } = useUpdateDocument810();

  const switchToViewMode = () => {
    const path = generatePath(CORE_EDI_INVOICE_VIEW_PAGE, {
      id: id,
      orderId: orderId,
    });
    history.push(path);
  };

  const location = useLocation();
  const submitForm = async (sendAfterSave = false) => {
    setSendAfterSaveBool(sendAfterSave);
    const [formData, error] = await runAsync(() => form.validateFields());

    if (error) {
      return;
    }

    const party_identification_N1_loop = formData?.heading_N1
      ?.map((data: Record<string, string>) =>
        partyIdentificationN1Template({ data })
      )
      .join(",");

    const extended_reference_information_N9_loop = formData?.heading_N9
      ?.map((data: Record<string, string>) => {
        return extendedReferenceN9Template({ data });
      })
      .join(",");

    const reference_identification_REF = formData?.heading_REF
      ?.map((data: Record<string, string>) => {
        return headingRefTemplate({ data });
      })
      .join(",");

    const headingData = {
      ...formData,
      party_identification_N1_loop,
      extended_reference_information_N9_loop,
      reference_identification_REF,
    };

    const heading = headingTemplate({
      data: headingData,
    });

    const baselineItem = formData.IT1_loop?.map(
      (it1LoopData: Record<string, unknown>) => {
        const PID_loop = it1LoopData.PID_loop as Array<Record<string, unknown>>;
        const PID_data = PID_loop?.map((data) => pidTemplate({ data })).join(
          ","
        );

        const SAC_loop = it1LoopData.SAC_loop as Array<Record<string, unknown>>;
        const SAC_data = SAC_loop?.map((data) => sacTemplate({ data })).join(
          ","
        );

        const SLN_loop = it1LoopData.SLN_loop as Array<Record<string, unknown>>;
        const SLN_data = SLN_loop?.map((data) => slnTemplate({ data })).join(
          ","
        );

        const PO4_loop = it1LoopData.PO4_loop as Array<Record<string, unknown>>;

        const [PO4_data] = PO4_loop?.length ? PO4_loop : [{}];

        const data = {
          ...it1LoopData,
          ...PO4_data,
          PID_data,
          SAC_data,
          SLN_data,
        };

        return baselineItemDataTemplate({
          data,
        });
      }
    ).join(", ");

    const service_promotion_allowance_or_charge_information_SAC_loop = formData?.summary_SAC
      ?.map((data: Record<string, unknown>) => {
        return summarySACTemplate({ data });
      })
      .join(",");

    const invoice_shipment_summary_ISS_loop = formData?.summary_ISS
      ?.map((data: Record<string, unknown>) => {
        return summaryISSTemplate({ data });
      })
      .join(",");

    const summaryTemplateData = {
      ...formData,
      service_promotion_allowance_or_charge_information_SAC_loop,
      invoice_shipment_summary_ISS_loop,
    };

    const summary = summaryTemplate({
      data: summaryTemplateData,
    });

    const jedi = mainTemplate({
      heading,
      baselineItemLoop: baselineItem,
      summary,
      sendAfterSave: sendAfterSave,
    });

    const parsedJedi = JSON.parse(jedi) as TargetJSON;

    const clonedListDocument = cloneDeep(listDocumentData) as TargetJSON;

    set(
      clonedListDocument,
      "data.file.json_edi.interchanges[0].groups[0].transaction_sets",
      parsedJedi.data.file.json_edi.interchanges[0].groups[0].transaction_sets
    );

    setJediData(clonedListDocument);

    const json = JSON.stringify(formData, null, 2);
    setFormData(json);

    mutate(
      {
        documentId: id,
        file: clonedListDocument.data.file,
        documentType: "810",
        sendAfterSave: sendAfterSave,
      },
      {
        onSuccess: (data) => {
          setNotification({
            type: "success",
            moduleName: "",
            description: data.data.message || "Changes Saved",
          });
          searchParams.set("refreshWorkflow", "true");
          const search = searchParams.toString();

          history.push(`${location.pathname}?${search}`);
        },
      }
    );

    return null;
  };

  const initialValues = createSourceJson(listDocumentData as TargetJSON);

  const targetJsonValue = JSON.stringify(jediData, null, 2);

  const errorResponse = updateDocumentErrorResponse as DocumentUpdatedResponseModel;

  const errorOrSuccessResponse = updateResponse || errorResponse;

  const translateJson = errorOrSuccessResponse?.data ?? "";
  const translateJsonValue = JSON.stringify(translateJson, null, 2);

  const onDoneClick = () => {
    const url = generatePath(CORE_EDI_INVOICE_VIEW_PAGE, { id, orderId });
    history.push(url);
  };
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
    const url = generatePath(CORE_EDI_INVOICE_EDIT_PAGE_V2, pageParams);
    searchParams.set("fullEntryForm", "true");
    const urlWithSearchParams = `${url}?${searchParams.toString()}`;
    return urlWithSearchParams;
  }

  if (isFetching) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  const fullEntryFormUrl = getFullEntryFormUrl({ pageParams, searchParams });

  function submitAsDraft() {
    console.log("draft submission: ", form.current);
    const { formData } = (form.current as any).state;

    const clonedListDocument = cloneDeep(listDocumentData) as TargetJSON;

    set(
      clonedListDocument,
      "data.file.json_edi.interchanges[0].groups[0].transaction_sets[0]",
      formData
    );

    setJediData(clonedListDocument);

    const json = JSON.stringify(formData, null, 2);
    setFormData(json);

    mutate(
      {
        documentId: id,
        file: clonedListDocument.data.file,
        documentType: "810",
        sendAfterSave: false,
      },
      {
        onSuccess: (data) => {
          setNotification({
            type: "success",
            moduleName: "",
            description: data.data.message || "Changes Saved",
          });
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
                  amplitude.logClickEvent(`EDI Invoice Quick Entry Form`);
                }}
              >
                Full Entry Form
              </QuickLinkButton>
            </QuickLinks>
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
                <h2>New Invoice - Quick Entry Form</h2>
                <ButtonsContainer>
                  <Button
                    onClick={() => {
                      amplitude.logClickEvent(
                        `EDI Quick Entry Form: Invoice: Save`,
                        pageParams
                      );
                      submitAsDraft();
                    }}
                    loading={isLoading && !sendAfterSaveBool}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      amplitude.logClickEvent(
                        `EDI Quick Entry Form: Invoice: Save and Send`,
                        pageParams
                      );
                      submitAndSend();
                    }}
                    loading={isLoading && sendAfterSaveBool}
                  >
                    Save and Send
                  </Button>
                </ButtonsContainer>
              </FormHeader>
              {isError && <ErrorMessage data={errorResponse?.data} />}
            </FormHeaderContainer>
          </Affix>
          <BootStrapFormStyles>
            <BootStrapButtonStyles>
              <RjsfErrorBoundary isError={!Form}>
                <Form
                  schema={schema}
                  columns={3}
                  // liveValidate={true}
                  uiSchema={uiSchema}
                  onChange={log("changed")}
                  onSubmit={onSubmit}
                  onError={log("errors")}
                  formData={jedi.interchanges[0].groups[0].transaction_sets[0]}
                  ref={form}
                />
              </RjsfErrorBoundary>
            </BootStrapButtonStyles>
          </BootStrapFormStyles>
        </FormContainer>
      </ContainerBordered>
      {isDebug && (
        <DebugContainer>
          <OutputContainer>
            <h2>Source json</h2>
            <TextArea value={formData} readOnly />
          </OutputContainer>
          <OutputContainer>
            <h2>Target json</h2>
            <TextArea value={targetJsonValue} readOnly />
          </OutputContainer>
          <OutputContainer>
            <h2>Document</h2>
            <TextArea value={translateJsonValue} readOnly />
          </OutputContainer>
        </DebugContainer>
      )}
    </PageWrapper>
  );
}

const log = (type: string) => {
  console.log("434");
  console.log(type);
  return undefined;
};

const onSubmit = ({ formData }, e) => console.log("Data submitted: ", formData);

export { InvoiceEditPage as default };

