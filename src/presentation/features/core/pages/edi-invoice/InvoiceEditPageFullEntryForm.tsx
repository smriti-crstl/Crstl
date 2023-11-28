import {
  Affix,
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  TimePicker,
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

import {
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { Spinner } from "@crstl/components/atoms/loading";

import FieldDescriptionPopover from "../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { BIG_640_07_OPTIONS } from "./data/BIG_640_07_options";
import { CAD_128_07_OPTIONS } from "./data/CAD_128_07_options";
import { CAD_91_01_OPTIONS } from "./data/CAD_91_01_options";
import { CTT_355_OPTIONS } from "./data/CTT_355_options";
import { DTM_374_01_OPTIONS } from "./data/DTM_374_01_options";
import { ELEMENT_1250_OPTIONS } from "./data/Element_1250_options";
import { ELEMENT_143_OPTIONS } from "./data/Element_143_options";
import { ELEMENT_363_OPTIONS } from "./data/Element_363_options";
import { getTargetData } from "./data/getDataByPartner";
// import { initialValues } from "./data/initialValues";
import { ITD_333_02_OPTIONS } from "./data/ITD_333_02_options";
import { ITD_336_01_OPTIONS } from "./data/ITD_336_01_options";
import jediJson from "./data/listDocumentResponseWithAllData.json";
import { createSourceJson } from "./helpers/createSourceJson";
import {
  ButtonsContainer,
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
import { SubFormIT1 } from "./sub-components/SubFormIT1";
import {
  Container as SubFormTableContainer,
  SubFormContainer,
} from "./sub-components/SubFormTable.styles";
import { SubFormTableISS } from "./sub-components/SubFormTableISS";
import { SubFormTableN1 } from "./sub-components/SubFormTableN1";
import { SubFormTableN9 } from "./sub-components/SubFormTableN9";
import { SubFormTableREF } from "./sub-components/SubFormTableREF";
import { SubFormTableSAC } from "./sub-components/SubFormTableSAC";
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

// import { initialValues } from "./data/initialValues";

async function runAsync(promiseFn: () => Promise<any>) {
  try {
    const result = await promiseFn();
    return [result, null];
  } catch (ex) {
    return [null, ex];
  }
}

const BIG_640_07_OPTIONS_TARGET = getTargetData(
  BIG_640_07_OPTIONS,
  "heading.020_BIG.07"
);

const CAD_128_07_OPTIONS_TARGET = getTargetData(
  CAD_128_07_OPTIONS,
  "summary.030_CAD.07"
);

const CAD_91_01_OPTIONS_TARGET = getTargetData(
  CAD_91_01_OPTIONS,
  "summary.030_CAD.01"
);

const DTM_374_01_OPTIONS_TARGET = getTargetData(
  DTM_374_01_OPTIONS,
  "heading.140_DTM.01"
);

const ELEMENT_1250_OPTIONS_TARGET = ELEMENT_1250_OPTIONS;

const ELEMENT_143_OPTIONS_TARGET = ELEMENT_143_OPTIONS;

const ELEMENT_363_OPTIONS_TARGET = getTargetData(
  ELEMENT_363_OPTIONS,
  "heading.030_NTE.01"
);

const ITD_333_02_OPTIONS_TARGET = getTargetData(
  ITD_333_02_OPTIONS,
  "heading.130_ITD.02"
);

const ITD_336_01_OPTIONS_TARGET = getTargetData(
  ITD_336_01_OPTIONS,
  "heading.130_ITD.01"
);

interface InvoiceEditPageProps {
  form: FormInstance<any>;
}

function InvoiceEditPage(props: InvoiceEditPageProps) {
  const { resetDocBtn } = useFlags();
  const { form } = props;
  const [partialFormData, setPartialFormData] = React.useState<any>({});
  const [isFormChanged, setFormChanged] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  const [nteSubFormVisible, setNteSubFormVisibility] = React.useState(false);
  // const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<string>("");
  const [jediData, setJediData] = React.useState<TargetJSON | null>(null);
  const pageParams = useParams<{
    orderId: string;
    id: string;
  }>();
  const { id, orderId } = pageParams;
  const [sendAfterSaveBool, setSendAfterSaveBool] = React.useState<boolean>(
    false
  );
  const history = useHistory();
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

  const {
    mutate: mutateResetDocument,
    isLoading: isResettingDocument,
  } = useResetDocument();

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

  if (isFetching) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  const quickEntryUrl = generatePath(CORE_EDI_INVOICE_EDIT_PAGE, {
    id,
    orderId,
  });

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
                <QuickLinkButton
                  to={quickEntryUrl}
                  replace
                  onClick={(e) => {
                    amplitude.logClickEvent(`EDI Invoice Quick Entry Form`);
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
                  <h2>New Invoice - Full Entry Form</h2>
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
                      onClick={() => {
                        amplitude.logClickEvent(
                          `EDI Full Entry Form: Invoice: Save`,
                          { id, orderId }
                        );
                        submitForm();
                      }}
                      disabled={isResettingDocument}
                      loading={isLoading && !sendAfterSaveBool}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        amplitude.logClickEvent(
                          `EDI Full Entry Form: Invoice: Save and Send`,
                          { id, orderId }
                        );
                        submitForm(true);
                      }}
                      disabled={isResettingDocument}
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
            <DashedHeading>Heading</DashedHeading>
            <h3>
              Beginning Segment of Invoice (BIG)
              <FieldDescriptionPopover
                segment={true}
                shortCode="BIG"
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <FullWidthFormControl>
                  <Form.Item
                    name="BIG_373_01"
                    label={
                      <div className="form-label">
                        Date
                        <FieldDescriptionPopover
                          shortCode="BIG_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(BIG_373_01)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter Date",
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </FullWidthFormControl>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="BIG_76_02"
                  label={
                    <div className="form-label">
                      Invoice Number
                      <FieldDescriptionPopover
                        shortCode="BIG_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
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
              <Col sm={24} lg={6}>
                <FullWidthFormControl>
                  <Form.Item
                    name="BIG_373_03"
                    label={
                      <div className="form-label">
                        Purchase Order Date
                        <FieldDescriptionPopover
                          shortCode="BIG_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(BIG_373_03)</span>
                      </div>
                    }
                  >
                    <DatePicker />
                  </Form.Item>
                </FullWidthFormControl>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="BIG_324_04"
                  label={
                    <div className="form-label">
                      Purchase Order Number
                      <FieldDescriptionPopover
                        shortCode="BIG_04"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BIG_324_04)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter Purchase Order Number",
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
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="BIG_640_07"
                  label={
                    <div className="form-label">
                      Transaction Type Code
                      <FieldDescriptionPopover
                        shortCode="BIG_07"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BIG_640_07)</span>
                    </div>
                  }
                  rules={[
                    {
                      min: 2,
                      message: "Must have at least 2 characters",
                    },
                    {
                      max: 2,
                      message: "Can have at most 2 characters",
                    },
                  ]}
                >
                  <Select
                    options={BIG_640_07_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
            </Row>

            <h3>
              Note/Special Instruction (NTE)
              <FieldDescriptionPopover
                shortCode="NTE"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            {nteSubFormVisible ? (
              <SubFormTableContainer>
                <SubFormContainer>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        name="NTE_363_01"
                        label={
                          <div className="form-label">
                            Note Reference Code
                            <FieldDescriptionPopover
                              shortCode="NTE_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(NTE_363_01)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_363_OPTIONS_TARGET}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        name="NTE_352_02"
                        label={
                          <div className="form-label">
                            Description
                            <FieldDescriptionPopover
                              shortCode="NTE_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(NTE_352_02)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Description is required",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <MinusCircleOutlined
                    className="remove-btn"
                    onClick={() => setNteSubFormVisibility(false)}
                  />
                </SubFormContainer>
              </SubFormTableContainer>
            ) : (
              <Form.Item>
                <Button onClick={() => setNteSubFormVisibility(true)}>
                  Add NTE
                </Button>
              </Form.Item>
            )}

            <h3>
              Reference Identification (REF)
              <FieldDescriptionPopover
                shortCode="REF"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormTableREF name="heading_REF" />
            <h3>
              Name (N1)
              <FieldDescriptionPopover
                shortCode="N1"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormTableN1 name="heading_N1" />
            <h3>
              Terms of Sale/Deferred Terms of Sale (ITD)
              <FieldDescriptionPopover
                shortCode="ITD"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_336_01"
                  label={
                    <div className="form-label">
                      Terms Type Code
                      <FieldDescriptionPopover
                        shortCode="ITD_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_336_01)</span>
                    </div>
                  }
                  rules={[
                    { required: true, message: "Terms Type Code is required" },
                  ]}
                >
                  <Select
                    options={ITD_336_01_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_333_02"
                  label={
                    <div className="form-label">
                      Terms Basis Date Code
                      <FieldDescriptionPopover
                        shortCode="ITD_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_333_02)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Terms Basis Date Code is required",
                    },
                  ]}
                >
                  <Select
                    options={ITD_333_02_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_338_03"
                  label={
                    <div className="form-label">
                      Terms Discount Percent
                      <FieldDescriptionPopover
                        shortCode="ITD_03"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_338_03)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <FullWidthFormControl>
                  <Form.Item
                    name="ITD_370_04"
                    label={
                      <div className="form-label">
                        Terms Discount Due Date
                        <FieldDescriptionPopover
                          shortCode="ITD_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(ITD_370_04)</span>
                      </div>
                    }
                  >
                    <DatePicker />
                  </Form.Item>
                </FullWidthFormControl>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_351_05"
                  label={
                    <div className="form-label">
                      Terms Discount Days Due
                      <FieldDescriptionPopover
                        shortCode="ITD_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_351_05)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <FullWidthFormControl>
                  <Form.Item
                    name="ITD_446_06"
                    label={
                      <div className="form-label">
                        Terms Net Due Date
                        <FieldDescriptionPopover
                          shortCode="ITD_06"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(ITD_446_06)</span>
                      </div>
                    }
                  >
                    <DatePicker />
                  </Form.Item>
                </FullWidthFormControl>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_386_07"
                  label={
                    <div className="form-label">
                      Terms Net Days
                      <FieldDescriptionPopover
                        shortCode="ITD_07"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_386_07)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_362_08"
                  label={
                    <div className="form-label">
                      Terms Discount Amount
                      <FieldDescriptionPopover
                        shortCode="ITD_08"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_362_08)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_389_10"
                  label={
                    <div className="form-label">
                      Deferred Amount Due
                      <FieldDescriptionPopover
                        shortCode="ITD_10"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_389_10)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_342_11"
                  label={
                    <div className="form-label">
                      Percent of Invoice Payable
                      <FieldDescriptionPopover
                        shortCode="ITD_11"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_342_11)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="ITD_765_13"
                  label={
                    <div className="form-label">
                      Day of Month
                      <FieldDescriptionPopover
                        shortCode="ITD_13"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(ITD_765_13)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col> */}
            </Row>
            <h3>
              Date/Time Reference (DTM)
              <FieldDescriptionPopover
                shortCode="DTM"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
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
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
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
                  {/* <Col sm={12}>
                    <FullWidthFormControl>
                      <Form.Item
                        name="DTM_337_03"
                        label={
                          <div className="form-label">
                            Time
                            <FieldDescriptionPopover
                              shortCode="DTM_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(DTM_337_03)</span>
                          </div>
                        }
                      >
                        <TimePicker />
                      </Form.Item>
                    </FullWidthFormControl>
                  </Col> */}
                </Row>
              </Col>
              {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="DTM_1250_05"
                  label={
                    <div className="form-label">
                      Date Time Period Format Qualifier
                      <FieldDescriptionPopover
                        shortCode="DTM_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(DTM_1250_05)</span>
                    </div>
                  }
                >
                  <Select
                    options={ELEMENT_1250_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col> */}
              {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="DTM_1251_06"
                  label={
                    <div className="form-label">
                      Date Time Period
                      <FieldDescriptionPopover
                        shortCode="DTM_06"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(DTM_1251_06)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col> */}
            </Row>
            <h3>
              Reference Identification (N9)
              <FieldDescriptionPopover
                shortCode="N9"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormTableN9 name="heading_N9" />
            <DashedHeading>Detail</DashedHeading>
            <h3>
              Baseline Item Data (IT1)
              <FieldDescriptionPopover
                shortCode="IT1"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormIT1 name="IT1_loop" />
            <DashedHeading>Summary</DashedHeading>
            <h3>
              Total Monetary Value Summary (TDS)
              <FieldDescriptionPopover
                shortCode="TDS"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="TDS_610_01"
                  label={
                    <div className="form-label">
                      Amount
                      <FieldDescriptionPopover
                        shortCode="TDS_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(TDS_610_01)</span>
                    </div>
                  }
                  rules={[{ required: true, message: "Amount is required" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="TDS_610_02"
                  label={
                    <div className="form-label">
                      Amount
                      <FieldDescriptionPopover
                        shortCode="TDS_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(TDS_610_02)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <h3>
              Carrier Detail (CAD)
              <FieldDescriptionPopover
                shortCode="CAD"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
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
                  name="CAD_206_02"
                  label={
                    <div className="form-label">
                      Equipment Initial
                      <FieldDescriptionPopover
                        shortCode="CAD_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_206_02)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="CAD_207_03"
                  label={
                    <div className="form-label">
                      Equipment Number
                      <FieldDescriptionPopover
                        shortCode="CAD_03"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_207_03)</span>
                    </div>
                  }
                >
                  <Input />
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
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
                  name="CAD_387_05"
                  label={
                    <div className="form-label">
                      Routing
                      <FieldDescriptionPopover
                        shortCode="CAD_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_387_05)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="CAD_368_06"
                  label={
                    <div className="form-label">
                      Shipment/Order Status Code
                      <FieldDescriptionPopover
                        shortCode="CAD_06"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_368_06)</span>
                    </div>
                  }
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CAD_128_07)</span>
                    </div>
                  }
                >
                  <Select
                    options={CAD_128_07_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
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
            </Row>
            <h3>
              Service, Promotion, Allowance, or Charge Information (SAC)
              <FieldDescriptionPopover
                shortCode="SAC"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormTableSAC name="summary_SAC" />
            <h3>
              Invoice Shipment Summary (ISS)
              <FieldDescriptionPopover
                shortCode="ISS"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <SubFormTableISS name="summary_ISS" />

            <div hidden>
              <h3>ST</h3>
              <Row gutter={16}>
                <Col sm={24} lg={6}>
                  <Form.Item
                    name="ST_143_01"
                    label={
                      <div className="form-label">
                        Transaction Set Identifier Code
                        <span className="form-sub-label">(ST_143_01)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Transaction Set Identifier Code is required",
                      },
                    ]}
                  >
                    <Select
                      options={ELEMENT_143_OPTIONS_TARGET}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={6}>
                  <Form.Item
                    name="ST_329_02"
                    label={
                      <div className="form-label">
                        Transaction Set Control Number
                        <span className="form-sub-label">(ST_329_02)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Transaction Set Control Number is required",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* <h3>
              Transaction Totals (CTT)
              <FieldDescriptionPopover
                shortCode="CTT"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="CTT_354_01"
                  label="Number of Line Items (CTT_354_01)"
                  rules={[
                    {
                      required: true,
                      message: "Number of Line Items is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col> */}
            {/* <Col sm={24} lg={6}>
              <Form.Item
                name="CTT_81_03"
                label={
                  <div className="form-label">
                    Weight
                    <FieldDescriptionPopover
                      shortCode="CTT_01"
                      glossaryKey={
                        EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                      }
                    />
                    <span className="form-sub-label">(CTT_81_03)</span>
                  </div>
                }
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={6}>
              <Form.Item
                name="CTT_355_04"
                label={
                  <div className="form-label">
                    Unit or Basis for Measurement Code
                    <span className="form-sub-label">(CTT_355_04)</span>
                  </div>
                }
              >
                <Select
                  options={CTT_355_OPTIONS}
                  optionFilterProp="label"
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col sm={24} lg={6}>
              <Form.Item
                name="CTT_183_05"
                label={
                  <div className="form-label">
                    Volume
                    <span className="form-sub-label">(CTT_183_05)</span>
                  </div>
                }
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={6}>
              <Form.Item
                name="CTT_355_06"
                label={
                  <div className="form-label">
                    Unit or Basis for Measurement Code
                    <span className="form-sub-label">(CTT_355_06)</span>
                  </div>
                }
              >
                <Select
                  options={CTT_355_OPTIONS}
                  optionFilterProp="label"
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col sm={24} lg={6}>
              <Form.Item
                name="CTT_352_07"
                label={
                  <div className="form-label">
                    Description
                    <span className="form-sub-label">(CTT_352_07)</span>
                  </div>
                }
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>  */}
            {/* <h3>SE</h3>
            <Row gutter={16}>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="SE_96_01"
                  label="Number of Included Segments (SE_96_01)"
                  rules={[
                    {
                      required: true,
                      message: "Number of Included Segments is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={6}>
                <Form.Item
                  name="SE_329_02"
                  label="Enter Number of Included Segments (SE_329_02)"
                  rules={[
                    {
                      required: true,
                      message: "Enter Number of Included Segments is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row> */}
            {/* 
            ADDED NOTIFICATION FOR THIS 
            {isSuccess && (
              <AlertContainer>
                <Alert message="Changes saved" type="success" closable />
              </AlertContainer>
            )}
            */}
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

export { InvoiceEditPage as default };

