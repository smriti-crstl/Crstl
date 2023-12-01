import {
  Affix,
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from "antd";
import clsx from "clsx";
import { TargetJSON } from "domain/entity/edi/models/TargetJson810";
import {
  useListDocumentQuery,
  useResetDocument,
  useUpdateDocument810,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_INVOICE_EDIT_PAGE,
  CORE_EDI_INVOICE_VIEW_PAGE,
} from "globals/configs";
import { useFlags } from "launchdarkly-react-client-sdk";
import { cloneDeep, set } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
import React from "react";
import {
  generatePath,
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "models/v1/edi/EdiDocuments";
import { Spinner } from "components/atoms/loading";

import FieldDescriptionPopover from "../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { CAD_128_07_OPTIONS } from "./data/CAD_128_07_options";
import { CAD_91_01_OPTIONS } from "./data/CAD_91_01_options";
import { DTM_374_01_OPTIONS } from "./data/DTM_374_01_options";
import { getTargetData } from "./data/getDataByPartner";
import { createSourceJson } from "./helpers/createSourceJson";
import {
  AlertContainer,
  ButtonsContainer,
  Container,
  ContainerBordered,
  DebugContainer,
  FormContainer,
  FormHeader,
  FormHeaderContainer,
  FullWidthFormControl,
  HighlightedButton,
  LoadingContainer,
  OutputContainer,
  PageWrapper,
  QuickLinkButton,
  QuickLinks,
  QuickLinksContainer,
  TextArea,
} from "./InvoiceEditPage.styles";
import { DashedHeading } from "./sub-components/DashedHeading";
import { ErrorMessage } from "./sub-components/ErrorMessage";
import { SubFormTableN1 } from "./sub-components/SubFormTableN1";
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
} from "./templates";
import { DTM_374_01_OPTIONS_TARGET } from "./InvoiceEditPageFullEntryForm";

interface PageParams {
  orderId: string;
  id: string;
}

const CAD_91_01_OPTIONS_TARGET = getTargetData(
  CAD_91_01_OPTIONS,
  "summary.030_CAD.01"
);

async function runAsync(promiseFn: () => Promise<any>) {
  try {
    const result = await promiseFn();
    return [result, null];
  } catch (ex) {
    return [null, ex];
  }
}

function getFullEntryFormUrl({
  pageParams,
  searchParams,
}: {
  pageParams: PageParams;
  searchParams: URLSearchParams;
}) {
  const url = generatePath(CORE_EDI_INVOICE_EDIT_PAGE, pageParams);
  searchParams.set("fullEntryForm", "true");
  const urlWithSearchParams = `${url}?${searchParams.toString()}`;
  return urlWithSearchParams;
}

interface InvoiceEditPageQuickEntryFormProps {
  form: FormInstance<any>;
}

function InvoiceEditPageQuickEntryForm(
  props: InvoiceEditPageQuickEntryFormProps
) {
  const { resetDocBtn } = useFlags();
  const { form } = props;
  const [partialFormData, setPartialFormData] = React.useState<any>({});
  const [isFormChanged, setFormChanged] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  // const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<string>("");
  const [jediData, setJediData] = React.useState<TargetJSON | null>(null);
  const [sendAfterSaveBool, setSendAfterSaveBool] = React.useState<boolean>(
    false
  );
  const pageParams = useParams<PageParams>();
  const history = useHistory();
  const location = useLocation();
  const searchParams = useSearchParams();
  const isDebug = searchParams.get("debug") ? true : false;

  const { data: listDocumentData, isFetching } = useListDocumentQuery(
    "810",
    pageParams.id
  );

  const {
    mutate,
    data: updateResponse,
    isError,
    error: updateDocumentErrorResponse,
    isLoading,
  } = useUpdateDocument810();

  const {
    mutate: mutateResetDocument,
    isLoading: isResettingDocument,
  } = useResetDocument();

  const invoiceViewPagePath = generatePath(
    CORE_EDI_INVOICE_VIEW_PAGE,
    pageParams
  );

  function onResetDocumentClick() {
    mutateResetDocument(
      { queryKey: [pageParams.id, "810", pageParams.id] },
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
      }
    );
  }

  const fullEntryFormUrl = getFullEntryFormUrl({ pageParams, searchParams });

  const initialValues = createSourceJson(listDocumentData as TargetJSON);

  const submitForm = async (sendAfterSave = false) => {
    if (!listDocumentData) {
      return null;
    }

    setSendAfterSaveBool(sendAfterSave);

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

    formData = {
      ...initialValues,
      ...formData,
    };

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

        const data = {
          ...it1LoopData,
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
        documentId: pageParams.id,
        file: clonedListDocument.data.file,
        documentType: "810",
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
          searchParams.delete("fullEntryForm");
          searchParams.set("refreshWorkflow", "true");
          const search = searchParams.toString();

          history.push(`${location.pathname}?${search}`);
        },
      }
    );
  };

  const targetJsonValue = JSON.stringify(jediData, null, 2);

  const errorResponse = updateDocumentErrorResponse as DocumentUpdatedResponseModel;

  const errorOrSuccessResponse = updateResponse || errorResponse;

  const translateJson = errorOrSuccessResponse?.data ?? "";
  const translateJsonValue = JSON.stringify(translateJson, null, 2);

  const onDoneClick = () => {
    const url = generatePath(CORE_EDI_INVOICE_VIEW_PAGE, pageParams);
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

  return (
    <PageWrapper>
      <ContainerBordered>
        <FormContainer>
          <Form
            form={form}
            name="edit_invoice"
            autoComplete="off"
            layout="vertical"
            // initialValues={initialValues}
            className="edi-webform"
            onValuesChange={(changedValues, values) => {
              setPartialFormData(values);
              setFormChanged(true);
            }}
          >
            <QuickLinksContainer>
              <QuickLinks>
                <HighlightedButton>Quick Entry Form</HighlightedButton>
                <QuickLinkButton
                  to={fullEntryFormUrl}
                  replace
                  onClick={(e) => {
                    amplitude.logClickEvent(`EDI Invoice Full Entry Form`);
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
                  <h2>New Invoice - Quick Entry Form CVS</h2>
                  <ButtonsContainer>
                    {resetDocBtn ? (
                      <Button
                        loading={isResettingDocument}
                        onClick={onResetDocumentClick}
                      >
                        Reset to Original
                      </Button>
                    ) : null}
                    <Button
                      htmlType="submit"
                      onClick={() => {
                        amplitude.logClickEvent(
                          `EDI Quick Entry Form: Invoice: Save`,
                          pageParams
                        );
                        submitForm();
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
                        submitForm(true);
                      }}
                      loading={isLoading && sendAfterSaveBool}
                    >
                      Save and Send
                    </Button>
                    <Button type="primary" ghost onClick={onDoneClick}>
                      <EyeOutlined /> View
                    </Button>
                  </ButtonsContainer>
                </FormHeader>
                {isError && <ErrorMessage data={errorResponse?.data} />}
              </FormHeaderContainer>
            </Affix>
            <h3>
              Beginning Segment of Invoice (BIG)
              <FieldDescriptionPopover
                shortCode="BIG"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="BIG_76_02"
                  label={
                    <div className="form-label">
                      Invoice Number
                      <FieldDescriptionPopover
                        shortCode="BIG_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BIG_76_02)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter Invoice Number",
                    },
                    {
                      min: 1,
                      message: "Must have at least 1 character",
                    },
                    {
                      max: 22,
                      message: "Can have at most 22 characters",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <h3>
              Date/Time Reference (DTM)
              <FieldDescriptionPopover
                shortCode="DTM"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="DTM_374_01"
                  label={
                    <div className="form-label">
                      Date/Time Qualifier
                      <FieldDescriptionPopover
                        shortCode="DTM_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(DTM_374_01)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Date/Time Qualifier is required",
                    },
                  ]}
                >
                  <Select
                    options={DTM_374_01_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={12}>
                <Row gutter={16}>
                  <Col sm={12}>
                    <FullWidthFormControl>
                      <Form.Item
                        name="DTM_373_02"
                        label={
                          <div className="form-label">
                            Date
                            <FieldDescriptionPopover
                              shortCode="DTM_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(DTM_373_02)</span>
                          </div>
                        }
                        rules={[
                          { required: true, message: "Date is required" },
                        ]}
                      >
                        <DatePicker />
                      </Form.Item>
                    </FullWidthFormControl>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* <h3>
              Carrier Detail (CAD){" "}
              <FieldDescriptionPopover
                shortCode="CAD"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="CAD_91_01"
                  label={
                    <div className="form-label">
                      Transportation Method/Type Code
                      <FieldDescriptionPopover
                        shortCode="CAD_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_91_01)</span>
                    </div>
                  }
                >
                  <Select
                    options={CAD_91_01_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="CAD_140_04"
                  label={
                    <div className="form-label">
                      Standard Carrier Alpha Code
                      <FieldDescriptionPopover
                        shortCode="CAD_04"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_140_04)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Standard Carrier Alpha Code is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="CAD_128_07"
                  label={
                    <div className="form-label">
                      Reference Identification Qualifier
                      <FieldDescriptionPopover
                        shortCode="CAD_07"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_128_07)</span>
                    </div>
                  }
                >
                  <Select
                    options={CAD_128_07_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="CAD_127_08"
                  label={
                    <div className="form-label">
                      Reference Identification
                      <FieldDescriptionPopover
                        shortCode="CAD_08"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_127_08)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Reference Identification is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row> */}

            {/* <h3>
              Name (N1)
              <FieldDescriptionPopover
                shortCode="N1"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormTableN1 name="heading_N1" /> */}
          </Form>
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

export { InvoiceEditPageQuickEntryForm };
