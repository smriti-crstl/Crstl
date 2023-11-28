import { Affix, Button } from "antd";
import clsx from "clsx";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import {
  useListDocumentQuery,
  useUpdateDocument856,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_SHIPMENT_EDIT_PAGE_V2,
  CORE_EDI_SHIPMENT_VIEW_PAGE,
} from "globals/configs";
import {
  BootStrapButtonStyles,
  BootStrapFormStyles,
} from "globals/themes/BootStrapStyles";
import { cloneDeep, flatten, get, map, set } from "lodash";
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

import { ButtonsContainer } from "../../edi-invoice/InvoiceEditPage.styles";
import { BSN_1005_OPTIONS } from "../data/BSN_1005_options";
import { BSN_353_OPTIONS } from "../data/BSN_353_options";
import { DTM_374_OPTIONS } from "../data/DTM_374_options";
import { getTargetData } from "../data/getDataByPartner";
import { MAN_88_OPTIONS } from "../data/MAN_88_options";
import { N1_66_OPTIONS } from "../data/N1_66_options";
import { N1_98_OPTIONS } from "../data/N1_98_options";
import { PID_324_OPTIONS } from "../data/PID_324_options";
import { PID_559_OPTIONS } from "../data/PID_559_options";
import { ST_143_OPTIONS } from "../data/ST_143_options";
import { TD1_103_OPTIONS } from "../data/TD1_103_options";
import { TD5_133_OPTIONS } from "../data/TD5_133_options";
import { TD5_66_OPTIONS } from "../data/TD5_66_options";
import { TD5_91_OPTIONS } from "../data/TD5_91_options";
import {
  Container,
  ContainerBordered,
  DynamicFormContainer,
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
} from "../DynamicShipmentPage.styles";
import { createSourceJson } from "../helpers";
import { createHierarchicalIds } from "../helpers/createHierarchicalIds";
import { ErrorMessage } from "../sub-components/ErrorMessage";
import { headingTemplate } from "../templates/headingTemplate";
import { itemTemplate } from "../templates/itemTemplate";
import { mainTemplate } from "../templates/newJediTemplate";
import { orderTemplate } from "../templates/orderTemplate";
import { packTemplate } from "../templates/packTemplate";
import { shipmentTemplate } from "../templates/shipmentTemplate";
import { summaryTemplate } from "../templates/summaryTemplate";
import { HLPLoop, SourceJSON } from "../types/sourceJson";

declare global {
  interface Window {
    JSONSchemaForm: {
      default: any;
    };
  }
}

const Form = window?.JSONSchemaForm?.default;

const ST_143_OPTIONS_TARGET = getTargetData(
  ST_143_OPTIONS,
  "heading.010_ST.01"
);

const BSN_1005_OPTIONS_TARGET = getTargetData(
  BSN_1005_OPTIONS,
  "heading.020_BSN.05"
);

const BSN_353_OPTIONS_TARGET = getTargetData(
  BSN_353_OPTIONS,
  "heading.020_BSN.01"
);

const TD5_133_OPTIONS_TARGET = getTargetData(
  TD5_133_OPTIONS,
  "detail.010_HL.120_TD5.01"
);

const TD5_66_OPTIONS_TARGET = getTargetData(
  TD5_66_OPTIONS,
  "detail.010_HL.120_TD5.02"
);

const TD5_91_OPTIONS_TARGET = getTargetData(
  TD5_91_OPTIONS,
  "detail.010_HL.120_TD5.04"
);

const N1_98_OPTIONS_TARGET = getTargetData(
  N1_98_OPTIONS,
  "detail.010_HL.220_N1.220_N1.01"
);

const N1_66_OPTIONS_TARGET = getTargetData(
  N1_66_OPTIONS,
  "detail.010_HL.220_N1.220_N1.03"
);

const PID_324_OPTIONS_TARGET = getTargetData(
  PID_324_OPTIONS,
  "detail.010_HL.070_PID.01"
);

const PID_559_OPTIONS_TARGET = getTargetData(
  PID_559_OPTIONS,
  "detail.010_HL.070_PID.03"
);

const MAN_88_OPTIONS_TARGET = getTargetData(
  MAN_88_OPTIONS,
  "detail.010_HL.190_MAN.01"
);

const TD1_103_OPTIONS_TARGET = TD1_103_OPTIONS;

const DTM_374_OPTIONS_TARGET = getTargetData(
  DTM_374_OPTIONS,
  "detail.010_HL.200_DTM.01"
);

function getPackData(
  formValues: SourceJSON,
  index: number
): HLPLoop | undefined {
  const pack = formValues?.HL_P_loop?.[index];
  return pack;
}

async function runAsync(promiseFn: () => Promise<any>) {
  try {
    const result = await promiseFn();
    return [result, null];
  } catch (ex) {
    return [null, ex];
  }
}

function transformFormKeys(data: Record<string, unknown>) {
  const entries = Object.entries(data);

  const transformedEntries = entries.map(([key, value]) => {
    const keyStartsWithNumber = /^\d/.test(key);

    const transformedKey = keyStartsWithNumber ? `m_${key}` : key;

    return [transformedKey, value];
  });

  return Object.fromEntries(transformedEntries);
}

const log = (type: string) => {
  console.log("434");
  console.log(type);
  return undefined;
};
const onSubmit = ({ formData }, e) => console.log("Data submitted: ", formData);

function ShipmentEditPageFullEntryDynamicForm() {
  const [partialFormData, setPartialFormData] = React.useState<any>({});
  const [isFormChanged, setFormChanged] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  // const [form] = Form.useForm();
  const form = React.useRef<HTMLFormElement>(null);
  const [formData, setFormData] = React.useState<string>("");
  const [jediData, setJediData] = React.useState<TargetJSON | null>(null);
  const [sendAfterSaveBool, setSendAfterSaveBool] = React.useState<boolean>(
    false
  );
  const [
    validationErrorVisible,
    setValidationErrorVisibility,
  ] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const isDebug = searchParams.get("debug") ? true : false;

  const pageParams = useParams<{
    orderId: string;
    id: string;
  }>();

  const { id, orderId } = pageParams;

  const history = useHistory();
  const result = useListDocumentQuery("856", id);

  const { data: listDocumentData, isFetching } = id
    ? result
    : { isFetching: false, data: [] };

  const {
    mutate,
    data: updateResponse,
    isError,
    error: updateDocumentErrorResponse,
    isLoading,
  } = useUpdateDocument856();

  const onFinish = (values: unknown) => null;

  const location = useLocation();

  const initialValues = createSourceJson(listDocumentData as TargetJSON);

  console.log(initialValues);

  const submitForm = async (sendAfterSave = false) => {
    setSendAfterSaveBool(sendAfterSave);
    setValidationErrorVisibility(false);

    let formData = partialFormData;

    if (sendAfterSave) {
      const [validatedFormData, error] = await runAsync(() =>
        form.validateFields()
      );

      if (error) {
        return;
      }

      formData = validatedFormData;
    }

    const lineItems = get(formData, "detail_HL", []);
    const lineItemsCount = lineItems.length;

    const formDataWithTransformedKeys = transformFormKeys(formData);

    const heading = headingTemplate({ data: formDataWithTransformedKeys });

    const shipment = shipmentTemplate({ data: formDataWithTransformedKeys });

    const order = orderTemplate({ data: formDataWithTransformedKeys });

    const packsLoop = get(formDataWithTransformedKeys, "HL_P_loop", []);
    const packs = packsLoop
      .map((data: unknown) => packTemplate({ data }))
      .join(",");

    const itemsLoop = flatten(map(packsLoop, "HL_I_Loop"));
    const items = itemsLoop
      .map((data: unknown) => itemTemplate({ data }))
      .join(",");

    const summary = summaryTemplate({
      data: {
        m_354_CTT_01: lineItemsCount.toString(),
        ...formDataWithTransformedKeys,
      },
    });

    const jedi = mainTemplate({
      heading,
      shipment,
      order,
      packs,
      items,
      summary,
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
        documentType: "856",
        file: clonedListDocument.data.file,
        sendAfterSave: sendAfterSave,
      },
      {
        onSuccess: (data) => {
          const defaultMessage = data.data.message || "Changes Saved";
          const description = sendAfterSave
            ? defaultMessage
            : "Draft saved successfully";

          setNotification({
            type: "success",
            moduleName: "",
            description,
          });
          searchParams.set("refreshWorkflow", "true");
          const search = searchParams.toString();

          history.push(`${location.pathname}?${search}`);
        },
      }
    );
  };

  const switchToViewMode = () => {
    const path = generatePath(CORE_EDI_SHIPMENT_VIEW_PAGE, {
      id: id,
      orderId: orderId,
    });
    history.push(path);
  };

  const hierarchicalIds = createHierarchicalIds(initialValues);

  const targetJson = jediData; // postSourceJsonResponse?.data ?? "";

  const targetJsonValue = JSON.stringify(targetJson, null, 2);

  const errorResponse = updateDocumentErrorResponse as DocumentUpdatedResponseModel;

  const errorOrSuccessResponse = updateResponse || errorResponse;
  const translateJson = errorOrSuccessResponse?.data ?? "";
  const translateJsonValue = JSON.stringify(translateJson, null, 2);

  const onDoneClick = () => {
    const url = generatePath(CORE_EDI_SHIPMENT_VIEW_PAGE, { id, orderId });
    history.push(url);
  };

  if (isFetching) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  const quickEntryUrl = generatePath(CORE_EDI_SHIPMENT_EDIT_PAGE_V2, {
    id,
    orderId,
  });

  function submitAsDraft() {
    console.log("draft submission: ", form.current);
  }

  function submitAndSend() {
    if (form.current?.formElement) {
      form.current?.formElement.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const schema = require("../data/856-schema.json");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const jedi = require("../data/856-jedi.json");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const uiSchema = require("../data/full-form/856-uischema.json");

  return (
    <PageWrapper>
      <ContainerBordered>
        <FormContainer>
          <QuickLinksContainer>
            <QuickLinks>
              <QuickLinkButton
                to={quickEntryUrl}
                replace
                onClick={(e) => {
                  amplitude.logClickEvent(`EDI ASN Quick Entry`);
                }}
              >
                Quick Entry Form
              </QuickLinkButton>
              <HighlightedButton>Full Entry Form</HighlightedButton>
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
                    loading={isLoading && !sendAfterSaveBool}
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
                    loading={isLoading && sendAfterSaveBool}
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
                    onChange={log("changed")}
                    onSubmit={onSubmit}
                    onError={log("errors")}
                    formData={
                      jedi.interchanges[0].groups[0].transaction_sets[0]
                    }
                    ref={form}
                  >
                    <button type="submit">Submit</button>
                    {/* <div style={{ display: "none" }}>
                  </div> */}
                  </Form>
                </RjsfErrorBoundary>
              </BootStrapButtonStyles>
            </BootStrapFormStyles>
          </DynamicFormContainer>
        </FormContainer>
      </ContainerBordered>
      {isDebug && (
        <Container>
          <OutputContainer>
            <h2>Source json</h2>
            <TextArea value={formData} />
          </OutputContainer>
          <OutputContainer>
            <h2>Target json</h2>
            <TextArea value={targetJsonValue} />
          </OutputContainer>
          <OutputContainer>
            <h2>Document</h2>
            <TextArea value={translateJsonValue} />
          </OutputContainer>
        </Container>
      )}
    </PageWrapper>
  );
}

export default ShipmentEditPageFullEntryDynamicForm;

