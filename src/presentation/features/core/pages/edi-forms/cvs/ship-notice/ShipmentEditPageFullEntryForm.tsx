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
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import {
  useListDocumentQuery,
  useResetDocument,
  useUpdateDocument856,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_SHIPMENT_EDIT_PAGE,
  CORE_EDI_SHIPMENT_VIEW_PAGE,
} from "globals/configs";
import { useFlags } from "launchdarkly-react-client-sdk";
import { cloneDeep, flatten, get, map, set } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
import React from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "models/v1/edi/EdiDocuments";
import { Spinner } from "components/atoms/loading";

import { ButtonsContainer } from "../../../edi-invoice/InvoiceEditPage.styles";
import FieldDescriptionPopover from "../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { BSN_1005_OPTIONS } from "./data/BSN_1005_options";
import { BSN_353_OPTIONS } from "./data/BSN_353_options";
import { BSN_640_OPTIONS } from "./data/BSN_640_options";
import { CTT_355_OPTIONS } from "./data/CTT_355_options";
import { DTM_1250_OPTIONS } from "./data/DTM_1250_options";
import { DTM_374_OPTIONS } from "./data/DTM_374_options";
import { DTM_623_OPTIONS } from "./data/DTM_623_options";
import { FOB_146_OPTIONS } from "./data/FOB_146_options";
import { FOB_309_OPTIONS } from "./data/FOB_309_options";
import { FOB_334_OPTIONS } from "./data/FOB_334_options";
import { FOB_335_OPTIONS } from "./data/FOB_335_options";
import { FOB_54_OPTIONS } from "./data/FOB_54_options";
import { getCvsData, getTargetData } from "./data/getDataByPartner";
import { HL_735_OPTIONS } from "./data/HL_735_options";
import { MAN_88_OPTIONS } from "./data/MAN_88_options";
import { N1_66_OPTIONS } from "./data/N1_66_options";
import { N1_706_OPTIONS } from "./data/N1_706_options";
import { N1_98_OPTIONS } from "./data/N1_98_options";
import { PID_324_OPTIONS } from "./data/PID_324_options";
import { PID_559_OPTIONS } from "./data/PID_559_options";
import { PID_750_OPTIONS } from "./data/PID_750_options";
import { PO4_187_OPTIONS } from "./data/PO4_187_options";
import { PRF_92_OPTIONS } from "./data/PRF_92_options";
import { REF_128_OPTIONS } from "./data/REF_128_options";
import { ST_143_OPTIONS } from "./data/ST_143_options";
import { TD1_103_OPTIONS } from "./data/TD1_103_options";
import { TD3_40_OPTIONS } from "./data/TD3_40_options";
import { TD5_133_OPTIONS } from "./data/TD5_133_options";
import { TD5_284_OPTIONS } from "./data/TD5_284_options";
import { TD5_365_OPTIONS } from "./data/TD5_368_options";
import { TD5_66_OPTIONS } from "./data/TD5_66_options";
import { TD5_91_OPTIONS } from "./data/TD5_91_options";
import { createSourceJson } from "./helpers";
import {
  createHierarchicalIds,
  createUniqueId,
} from "./helpers/createHierarchicalIds";
import { MergedSourceJSON } from "./helpers/createSourceJson";
import { ShipmentItemForm } from "./ShipmentItemForm";
import {
  BorderedSubFormWrapper,
  Container,
  ContainerBordered,
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
  SubFormRemoveButton,
  TextArea,
} from "./ShipmentPage.styles";
import { DashedHeading } from "./sub-components/DashedHeading";
import { ErrorMessage } from "./sub-components/ErrorMessage";
import { headingTemplate } from "./templates/headingTemplate";
import { itemTemplate } from "./templates/itemTemplate";
import { mainTemplate } from "./templates/newJediTemplate";
import { orderTemplate } from "./templates/orderTemplate";
import { packTemplate } from "./templates/packTemplate";
import { shipmentTemplate } from "./templates/shipmentTemplate";
import { summaryTemplate } from "./templates/summaryTemplate";
import { HLPLoop, SourceJSON } from "./types/sourceJson";

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

interface ShipmentEditPageFullEntryFormProps {
  form: FormInstance<any>;
}

function ShipmentEditPageFullEntryForm(
  props: ShipmentEditPageFullEntryFormProps
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

  const {
    mutate: mutateResetDocument,
    isLoading: isResettingDocument,
  } = useResetDocument();

  function onResetDocumentClick() {
    mutateResetDocument(
      { queryKey: [pageParams.id, "856", pageParams.id] },
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

  const onFinish = (values: unknown) => null;

  const location = useLocation();

  const initialValues = createSourceJson(listDocumentData as TargetJSON);

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

    const mergedFormData = {
      ...initialValues,
      ...(formData as SourceJSON),
    } as MergedSourceJSON;

    const lineItems = get(mergedFormData, "detail_HL", []);
    const lineItemsCount = lineItems.length;

    const formDataWithTransformedKeys = transformFormKeys(mergedFormData);

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

  const quickEntryUrl = generatePath(CORE_EDI_SHIPMENT_EDIT_PAGE, {
    id,
    orderId,
  });

  return (
    <PageWrapper>
      <ContainerBordered>
        <FormContainer>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            // initialValues={initialValues}
            className="edi-webform"
            onValuesChange={(changedValues, values) => {
              setPartialFormData(values);
              setFormChanged(true);
            }}
            // initialValues={testData}
          >
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
                  <h2>New Ship Notice - Full Entry Form - CVS</h2>
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
                          `EDI Full Entry Form: Ship Notice: Save`,
                          { id, orderId }
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
                          `EDI Full Entry Form: Ship Notice: Save and Send`,
                          { id, orderId }
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
            <DashedHeading>Heading</DashedHeading>
            {/* <div>
              <h3>ST</h3>
              <Row gutter={16}>
                <Col sm={24} lg={6}>
                  <Form.Item
                    name="ST_01_143"
                    label="Transaction Set Identifier Code (ST_01_143)"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Transaction Set Identifier Code",
                      },
                      {
                        min: 3,
                        message: "Must have at least 3 characters",
                      },
                      {
                        max: 3,
                        message: "Can have at most 3 characters",
                      },
                    ]}
                    initialValue="856"
                  >
                    <Select disabled options={ST_143_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={6}>
                  <Form.Item
                    name="ST_02_329"
                    label="Transaction Set Control Number (ST_02_329)"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Transaction Set Control Number",
                      },
                      {
                        min: 4,
                        message: "Must have at least 4 characters",
                      },
                      {
                        max: 9,
                        message: "Can have at most 9 characters",
                      },
                    ]}
                  >
                    <Input maxLength={9} />
                  </Form.Item>
                </Col>
              </Row>
            </div> */}

            <h3>
              Beginning Segment for Ship Notice (BSN)
              <FieldDescriptionPopover
                shortCode="BSN"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  name="BSN_01_353"
                  label={
                    <div className="form-label">
                      Transaction Set Purpose Code
                      <FieldDescriptionPopover
                        shortCode="BSN_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BSN_01_353)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter Transaction Set Purpose Code",
                    },
                  ]}
                >
                  <Select options={BSN_353_OPTIONS_TARGET} />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  name="BSN_02_396"
                  label={
                    <div className="form-label">
                      Shipment Identification
                      <FieldDescriptionPopover
                        shortCode="BSN_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BSN_02_396)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter Shipment Identification",
                    },
                    {
                      min: 2,
                      message: "Must have at least 2 characters",
                    },
                    {
                      max: 30,
                      message: "Can have at most 30 characters",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              {/* <Col sm={24} lg={12}>
                <Row gutter={16}>
                  <Col sm={12}>
                    <FullWidthFormControl>
                      <Form.Item
                        name="BSN_03_373"
                        label="Date (BSN_03_373)"
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
                  <Col sm={12}>
                    <FullWidthFormControl>
                      <Form.Item
                        name="BSN_04_337"
                        label="Time (BSN_04_337)"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Time in HHMMSS",
                          },
                        ]}
                      >
                        <TimePicker />
                      </Form.Item>
                    </FullWidthFormControl>
                  </Col>
                </Row>
              </Col> */}
              <Col sm={24} lg={8}>
                <Form.Item
                  name="BSN_05_1005"
                  label={
                    <div className="form-label">
                      Hierarchical Structure Code
                      <FieldDescriptionPopover
                        shortCode="BSN_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BSN_05_1005)</span>
                    </div>
                  }
                  rules={[
                    {
                      min: 4,
                      message: "Must have at least 4 characters",
                    },
                    {
                      max: 4,
                      message: "Can have at most 4 characters",
                    },
                  ]}
                >
                  <Select options={BSN_1005_OPTIONS_TARGET} />
                </Form.Item>
              </Col>
              {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="BSN_06_640"
                  label={
                    <div className="form-label">
                      Transaction Type Code
                      <FieldDescriptionPopover
                        shortCode="BSN_06"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(BSN_06_640)</span>
                    </div>
                  }
                >
                  <Select
                    options={BSN_640_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col> */}
            </Row>
            <DashedHeading>Detail</DashedHeading>
            <BorderedSubFormWrapper>
              <h3>Shipment</h3>
              <h4>
                Hierarchical Level (HL)
                <FieldDescriptionPopover
                  shortCode="HL"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="HL_S_01_628"
                    label={
                      <div className="form-label">
                        Shipping ID / Hierarchical ID Number
                        <FieldDescriptionPopover
                          shortCode="HL_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(HL_S_01_628)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Shipping ID Number",
                      },
                    ]}
                    initialValue="1"
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="HL_S_03_735"
                    label={
                      <div className="form-label">
                        Hierarchical Level Code
                        <FieldDescriptionPopover
                          shortCode="HL_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(HL_S_03_735)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Hierarchical Level Code",
                      },
                    ]}
                    initialValue="S"
                  >
                    <Select options={HL_735_OPTIONS} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <h4>
                Date Time Reference - Shipment level
                <FieldDescriptionPopover
                  shortCode="DTM"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="DTM_S_DATE_SHIPPED_01_374"
                    label={
                      <div className="form-label">
                        Date/Time Qualifier
                        <FieldDescriptionPopover
                          shortCode="DTM_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(DTM_01_374)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Date/Time Qualifier",
                      },
                    ]}
                  >
                    <Select disabled options={DTM_374_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={16}>
                  <Row gutter={16}>
                    <Col sm={12}>
                      <FullWidthFormControl>
                        <Form.Item
                          name="DTM_S_DATE_SHIPPED_02_373"
                          label={
                            <div className="form-label">
                              Date
                              <FieldDescriptionPopover
                                shortCode="DTM_02"
                                glossaryKey={
                                  EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                }
                              />
                              <span className="form-sub-label">
                                (DTM_02_373)
                              </span>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Missing Date",
                            },
                          ]}
                        >
                          <DatePicker />
                        </Form.Item>
                      </FullWidthFormControl>
                    </Col>
                    <Col sm={12}>
                      <FullWidthFormControl>
                        <Form.Item
                          name={"DTM_S_DATE_SHIPPED_03_337"}
                          label={
                            <div className="form-label">
                              Time
                              <FieldDescriptionPopover
                                shortCode="DTM_03"
                                glossaryKey={
                                  EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                }
                              />
                              <span className="form-sub-label">
                                (DTM_03_337)
                              </span>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Missing Time",
                            },
                          ]}
                        >
                          <TimePicker />
                        </Form.Item>
                      </FullWidthFormControl>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <h4>
                Date Time Reference - Shipment level
                <FieldDescriptionPopover
                  shortCode="DTM"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="DTM_S_DELIVERY_01_374"
                    label={
                      <div className="form-label">
                        Date/Time Qualifier
                        <FieldDescriptionPopover
                          shortCode="DTM_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(DTM_01_374)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Date/Time Qualifier",
                      },
                    ]}
                  >
                    <Select disabled options={DTM_374_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={16}>
                  <Row gutter={16}>
                    <Col sm={12}>
                      <FullWidthFormControl>
                        <Form.Item
                          name="DTM_S_DELIVERY_02_373"
                          label={
                            <div className="form-label">
                              Date
                              <FieldDescriptionPopover
                                shortCode="DTM_02"
                                glossaryKey={
                                  EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                }
                              />
                              <span className="form-sub-label">
                                (DTM_02_373)
                              </span>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Missing Date",
                            },
                          ]}
                        >
                          <DatePicker />
                        </Form.Item>
                      </FullWidthFormControl>
                    </Col>
                    <Col sm={12}>
                      <FullWidthFormControl>
                        <Form.Item
                          name={"DTM_S_DELIVERY_03_337"}
                          label={
                            <div className="form-label">
                              Time
                              <FieldDescriptionPopover
                                shortCode="DTM_03"
                                glossaryKey={
                                  EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                }
                              />
                              <span className="form-sub-label">
                                (DTM_03_337)
                              </span>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Missing Time",
                            },
                          ]}
                        >
                          <TimePicker />
                        </Form.Item>
                      </FullWidthFormControl>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <h4>
                Carrier Details - Quantity and Weight (TD1)
                <FieldDescriptionPopover
                  shortCode="TD1"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Packaging Code
                        <FieldDescriptionPopover
                          shortCode="TD1_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (HL_S_TD1_01_103)
                        </span>
                      </div>
                    }
                    name="HL_S_TD1_01_103"
                  >
                    <Select
                      options={TD1_103_OPTIONS_TARGET}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Lading Quantity
                        <FieldDescriptionPopover
                          shortCode="TD1_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(HL_S_TD1_02_80)</span>
                      </div>
                    }
                    name="HL_S_TD1_02_80"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Weight Qualifier
                        <FieldDescriptionPopover
                          shortCode="TD1_06"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (HL_S_TD1_06_187)
                        </span>
                      </div>
                    }
                    name="HL_S_TD1_06_187"
                  >
                    <Select
                      options={PO4_187_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Weight
                        <FieldDescriptionPopover
                          shortCode="TD1_07"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(HL_S_TD1_07_81)</span>
                      </div>
                    }
                    name="HL_S_TD1_07_81"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Unit or Basis for Measurement Code
                        <FieldDescriptionPopover
                          shortCode="TD1_08"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (HL_S_TD1_08_355)
                        </span>
                      </div>
                    }
                    name="HL_S_TD1_08_355"
                  >
                    <Select
                      options={CTT_355_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Volume
                        <FieldDescriptionPopover
                          shortCode="TD1_09"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (HL_S_TD1_09_183)
                        </span>
                      </div>
                    }
                    name="HL_S_TD1_09_183"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Unit or Basis for Measurement Code
                        <FieldDescriptionPopover
                          shortCode="TD1_10"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (HL_S_TD1_10_355)
                        </span>
                      </div>
                    }
                    name="HL_S_TD1_10_355"
                  >
                    <Select
                      options={CTT_355_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
              </Row>

              <h4>
                Carrier Details (Equipment) (TD3)
                <FieldDescriptionPopover
                  segment={true}
                  shortCode="TD3"
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Equipment Description Code
                        <FieldDescriptionPopover
                          shortCode="TD3_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(HL_S_TD3_01_40)</span>
                      </div>
                    }
                    name="HL_S_TD3_01_40"
                  >
                    <Select
                      options={TD3_40_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    label={
                      <div className="form-label">
                        Trailer Number / Air Bill Number
                        <FieldDescriptionPopover
                          shortCode="TD3_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (HL_S_TD3_03_207)
                        </span>
                      </div>
                    }
                    name="HL_S_TD3_03_207"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* TD5 */}
              <h4>
                Carrier Details - Routing Sequence/Transit Time (TD5)
                <FieldDescriptionPopover
                  shortCode="TD5"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_01_133"
                    label={
                      <div className="form-label">
                        Routing Sequence Code
                        <FieldDescriptionPopover
                          shortCode="TD5_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_01_133)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Routing Sequence Code",
                      },
                    ]}
                  >
                    <Select options={TD5_133_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_02_66"
                    label={
                      <div className="form-label">
                        Identification Code Qualifier
                        <FieldDescriptionPopover
                          shortCode="TD5_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_02_66)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Identification Code Qualifier",
                      },
                    ]}
                  >
                    <Select options={TD5_66_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_03_67"
                    label={
                      <div className="form-label">
                        Identification Code
                        <FieldDescriptionPopover
                          shortCode="TD5_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_03_67)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Identification Code",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_04_91"
                    label={
                      <div className="form-label">
                        Transportation Method/Type Code
                        <FieldDescriptionPopover
                          shortCode="TD5_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_04_91)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Transportation Method/Type Code",
                      },
                    ]}
                  >
                    <Select options={TD5_91_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_05_387"
                    label={
                      <div className="form-label">
                        Routing
                        <FieldDescriptionPopover
                          shortCode="TD5_05"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_05_387)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Routing",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* 
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_06_368"
                    label={
                      <div className="form-label">
                        Shipment/Order Status Code
                        <FieldDescriptionPopover
                          shortCode="TD5_06"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_06_368)</span>
                      </div>
                    }
                  >
                    <Select
                      options={TD5_365_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_08_310"
                    label={
                      <div className="form-label">
                        Location Identifier
                        <FieldDescriptionPopover
                          shortCode="TD5_08"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_08_310)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_11_733"
                    label={
                      <div className="form-label">
                        Transit Time
                        <FieldDescriptionPopover
                          shortCode="TD5_11"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_11_733)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_12_284"
                    label={
                      <div className="form-label">
                        Service Level Code
                        <FieldDescriptionPopover
                          shortCode="TD5_12"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_12_284)</span>
                      </div>
                    }
                  >
                    <Select
                      options={TD5_284_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="TD5_S_13_284"
                    label={
                      <div className="form-label">
                        Service Level Code
                        <FieldDescriptionPopover
                          shortCode="TD5_13"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(TD5_S_13_284)</span>
                      </div>
                    }
                  >
                    <Select
                      options={TD5_284_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* REF - BM */}
              <h4>
                Bill of Lading Number (REF - BM)
                <FieldDescriptionPopover
                  shortCode="REF"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_BM_S_01_128"
                    label={
                      <div className="form-label">
                        Reference Identification Qualifier
                        <FieldDescriptionPopover
                          shortCode="REF_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_BM_S_01_128)
                        </span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification Qualifier",
                      },
                    ]}
                    initialValue="BM"
                  >
                    <Select options={REF_128_OPTIONS} disabled />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_BM_S_02_127"
                    label={
                      <div className="form-label">
                        Reference Identification
                        <FieldDescriptionPopover
                          shortCode="REF_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_BM_S_02_127)
                        </span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_BM_S_03_352"
                    label={
                      <div className="form-label">
                        Description
                        <FieldDescriptionPopover
                          shortCode="REF_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_BM_S_03_352)
                        </span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* REF - CN */}
              <h4>
                {`Carrier's Reference Number - PRO/Invoice (REF - CN)`}
                <FieldDescriptionPopover
                  shortCode="REF"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_CN_S_01_128"
                    label={
                      <div className="form-label">
                        Reference Identification Qualifier
                        <FieldDescriptionPopover
                          shortCode="REF_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_CN_S_01_128)
                        </span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification Qualifier",
                      },
                    ]}
                  >
                    <Select options={REF_128_OPTIONS} disabled />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_CN_S_02_127"
                    label={
                      <div className="form-label">
                        Reference Identification
                        <FieldDescriptionPopover
                          shortCode="REF_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_CN_S_02_127)
                        </span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_CN_S_03_352"
                    label={
                      <div className="form-label">
                        Description
                        <FieldDescriptionPopover
                          shortCode="REF_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_CN_S_03_352)
                        </span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* REF - Shipment */}
              {/* <h4>REF - Shipment</h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_S_01_128"
                    label={
                      <div className="form-label">
                        Reference Identification Qualifier
                        <FieldDescriptionPopover
                          shortCode="REF_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(REF_S_01_128)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification Qualifier",
                      },
                    ]}
                    initialValue="BM"
                  >
                    <Select options={REF_128_OPTIONS} disabled />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_S_02_127"
                    label={
                      <div className="form-label">
                        Reference Identification
                        <FieldDescriptionPopover
                          shortCode="REF_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(REF_S_02_127)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: false,
                        message: "Missing Reference Identification",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_S_03_352"
                    label={
                      <div className="form-label">
                        Description
                        <FieldDescriptionPopover
                          shortCode="REF_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(REF_S_03_352)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row> */}

              <h4>
                FOB F.O.B Related Instructions
                <FieldDescriptionPopover
                  segment={true}
                  shortCode="FOB"
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_01_146"
                    label={
                      <div className="form-label">
                        Shipment Method of Payment
                        <FieldDescriptionPopover
                          shortCode="FOB_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(FOB_S_01_146)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Shipment Method of Payment",
                      },
                    ]}
                  >
                    <Select
                      options={FOB_146_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_02_309"
                    label={
                      <div className="form-label">
                        Location Qualifier
                        <FieldDescriptionPopover
                          shortCode="FOB_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(FOB_S_02_309)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_309_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_03_352"
                    label={
                      <div className="form-label">
                        Description
                        <FieldDescriptionPopover
                          shortCode="FOB_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(FOB_S_03_352)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_04_334"
                    label={
                      <div className="form-label">
                        Transportation Terms Qualifier Code
                        <FieldDescriptionPopover
                          shortCode="FOB_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(FOB_S_04_334)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_334_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_05_335"
                    label={
                      <div className="form-label">
                        Transportation Terms Code
                        <FieldDescriptionPopover
                          shortCode="FOB_05"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(FOB_S_05_335)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_335_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_06_309"
                    label={
                      <div className="form-label">
                        Location Qualifier
                        <span className="form-sub-label">(FOB_S_06_309)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_309_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col> */}
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_07_352"
                    label={
                      <div className="form-label">
                        Description
                        <span className="form-sub-label">(FOB_S_07_352)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_08_54"
                    label={
                      <div className="form-label">
                        Risk of Loss Code
                        <span className="form-sub-label">(FOB_S_08_54)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_54_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col> */}
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="FOB_S_09_352"
                    label={
                      <div className="form-label">
                        Description
                        <span className="form-sub-label">(FOB_S_09_352)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              <h4>
                Name (N1) - Ship From
                <FieldDescriptionPopover
                  shortCode="N1"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_SF_01_98"
                    label={
                      <div className="form-label">
                        Entity Identifier Code
                        <FieldDescriptionPopover
                          shortCode="N1_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_SF_01_98)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Entity Identifier Code",
                      },
                    ]}
                  >
                    <Select options={N1_98_OPTIONS_TARGET} disabled />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_SF_02_93"
                    label={
                      <div className="form-label">
                        Name
                        <FieldDescriptionPopover
                          shortCode="N1_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_SF_02_93)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_SF_03_66"
                    label={
                      <div className="form-label">
                        Identification Code Qualifier
                        <FieldDescriptionPopover
                          shortCode="N1_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_SF_03_66)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Identification Code Qualifier",
                      },
                    ]}
                  >
                    <Select options={N1_66_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_SF_04_67"
                    label={
                      <div className="form-label">
                        Identification Code
                        <FieldDescriptionPopover
                          shortCode="N1_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_SF_04_67)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Identification Code",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_SF_05_706"
                    label={
                      <div className="form-label">
                        Entity Relationship Code
                        <FieldDescriptionPopover
                          shortCode="N1_05"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_SF_05_706)</span>
                      </div>
                    }
                  >
                    <Select options={N1_706_OPTIONS} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_SF_06_98"
                    label={
                      <div className="form-label">
                        Entity Identifier Code
                        <FieldDescriptionPopover
                          shortCode="N1_06"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_SF_06_98)</span>
                      </div>
                    }
                  >
                    <Select options={N1_98_OPTIONS} />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* N3 */}
              <h4>
                Address Information (N3) - Ship From
                <FieldDescriptionPopover
                  shortCode="N3"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N3_S_SF_01_166"
                    label={
                      <div className="form-label">
                        Address Information
                        <FieldDescriptionPopover
                          shortCode="N3_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N3_S_SF_01_166)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Address Information",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N3_S_SF_02_166"
                    label={
                      <div className="form-label">
                        Address Information
                        <FieldDescriptionPopover
                          shortCode="N3_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N3_S_SF_02_166)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: false,
                        message: "Missing Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* N4 */}
              <h4>
                Geographic Location (N4) - Ship From
                <FieldDescriptionPopover
                  segment={true}
                  shortCode="N4"
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_SF_01_19"
                    label={
                      <div className="form-label">
                        City Name
                        <FieldDescriptionPopover
                          shortCode="N4_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_SF_01_19)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_SF_02_156"
                    label={
                      <div className="form-label">
                        State or Province Code
                        <FieldDescriptionPopover
                          shortCode="N4_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_SF_02_156)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_SF_03_116"
                    label={
                      <div className="form-label">
                        Postal Code
                        <FieldDescriptionPopover
                          shortCode="N4_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_SF_03_116)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_SF_04_26"
                    label={
                      <div className="form-label">
                        Country Code
                        <FieldDescriptionPopover
                          shortCode="N4_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_SF_04_26)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_SF_05_309"
                    label={
                      <div className="form-label">
                        Location Qualifier
                        <FieldDescriptionPopover
                          shortCode="N4_05"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_SF_05_309)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_309_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* N1 */}
              <h4>
                Name (N1) - Ship To
                <FieldDescriptionPopover
                  shortCode="N1"
                  segment={true}
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_ST_01_98"
                    label={
                      <div className="form-label">
                        Entity Identifier Code
                        <FieldDescriptionPopover
                          shortCode="N1_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_ST_01_98)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Entity Identifier Code",
                      },
                    ]}
                  >
                    <Select options={N1_98_OPTIONS_TARGET} disabled />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_ST_02_93"
                    label={
                      <div className="form-label">
                        Name
                        <FieldDescriptionPopover
                          shortCode="N1_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_ST_02_93)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_ST_03_66"
                    label={
                      <div className="form-label">
                        Identification Code Qualifier
                        <FieldDescriptionPopover
                          shortCode="N1_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_ST_03_66)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Identification Code Qualifier",
                      },
                    ]}
                  >
                    <Select options={N1_66_OPTIONS_TARGET} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_ST_04_67"
                    label={
                      <div className="form-label">
                        Identification Code
                        <FieldDescriptionPopover
                          shortCode="N1_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_ST_04_67)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Identification Code",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_ST_05_706"
                    label={
                      <div className="form-label">
                        Entity Relationship Code
                        <FieldDescriptionPopover
                          shortCode="N1_05"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_ST_05_706)</span>
                      </div>
                    }
                  >
                    <Select options={N1_706_OPTIONS} />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N1_S_ST_06_98"
                    label={
                      <div className="form-label">
                        Entity Identifier Code
                        <FieldDescriptionPopover
                          shortCode="N1_06"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N1_S_ST_06_98)</span>
                      </div>
                    }
                  >
                    <Select options={N1_98_OPTIONS} />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* N3 */}
              <h4>
                Address Information (N3) - Ship To
                <FieldDescriptionPopover
                  segment={true}
                  shortCode="N3"
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N3_S_ST_01_166"
                    label={
                      <div className="form-label">
                        Address Information
                        <FieldDescriptionPopover
                          shortCode="N3_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N3_S_ST_01_166)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Missing Address Information",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N3_S_ST_02_166"
                    label={
                      <div className="form-label">
                        Address Information
                        <FieldDescriptionPopover
                          shortCode="N3_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N3_S_ST_02_166)</span>
                      </div>
                    }
                    rules={[
                      {
                        required: false,
                        message: "Missing Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* N4 */}
              <h4>
                Geographic Location (N4) - Ship To
                <FieldDescriptionPopover
                  segment={true}
                  shortCode="N4"
                  glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                />
              </h4>
              <Row gutter={16}>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_ST_01_19"
                    label={
                      <div className="form-label">
                        City Name
                        <FieldDescriptionPopover
                          shortCode="N4_01"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_ST_01_19)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_ST_02_156"
                    label={
                      <div className="form-label">
                        State or Province Code
                        <FieldDescriptionPopover
                          shortCode="N4_02"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_ST_02_156)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_ST_03_116"
                    label={
                      <div className="form-label">
                        Postal Code
                        <FieldDescriptionPopover
                          shortCode="N4_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_ST_03_116)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_ST_04_26"
                    label={
                      <div className="form-label">
                        Country Code
                        <FieldDescriptionPopover
                          shortCode="N4_04"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_ST_04_26)</span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="N4_S_ST_05_309"
                    label={
                      <div className="form-label">
                        Location Qualifier
                        <FieldDescriptionPopover
                          shortCode="N4_05"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">(N4_S_ST_05_309)</span>
                      </div>
                    }
                  >
                    <Select
                      options={FOB_309_OPTIONS}
                      optionFilterProp="label"
                      showSearch
                    />
                  </Form.Item>
                </Col> */}
              </Row>

              <BorderedSubFormWrapper>
                <h3>Order</h3>

                <h4>
                  Hierarchical Level (HL)
                  <FieldDescriptionPopover
                    shortCode="HL"
                    segment={true}
                    glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                  />
                </h4>
                <Row gutter={16}>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_01_628"
                      label={
                        <div className="form-label">
                          Order ID
                          <FieldDescriptionPopover
                            shortCode="HL_01"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">(HL_O_01_628)</span>
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Missing Order ID Number",
                        },
                      ]}
                      initialValue="2"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_02_734"
                      label={
                        <div className="form-label">
                          Parent ID
                          <FieldDescriptionPopover
                            shortCode="HL_02"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">(HL_O_02_734)</span>
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Missing Parent ID Number",
                        },
                      ]}
                      initialValue="1"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      label={
                        <div className="form-label">
                          Hierarchical Level Code
                          <FieldDescriptionPopover
                            shortCode="HL_03"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">(HL_O_03_735)</span>
                        </div>
                      }
                      name="HL_O_03_735"
                      rules={[
                        {
                          required: true,
                          message: "Missing Hierarchical Level Code",
                        },
                      ]}
                      initialValue="O"
                    >
                      <Select options={HL_735_OPTIONS} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <h4>
                  Purchase Order Reference (PRF)
                  <FieldDescriptionPopover
                    shortCode="PRF"
                    segment={true}
                    glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                  />
                </h4>
                <Row gutter={16}>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      label={
                        <div className="form-label">
                          Purchase Order Number
                          <FieldDescriptionPopover
                            shortCode="PRF_01"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_PRF_01_324)
                          </span>
                        </div>
                      }
                      name="HL_O_PRF_01_324"
                      rules={[
                        {
                          required: true,
                          message: "Missing Purchase Order Number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      label={
                        <div className="form-label">
                          Release Number
                          <FieldDescriptionPopover
                            shortCode="PRF_02"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_PRF_02_328)
                          </span>
                        </div>
                      }
                      name="HL_O_PRF_02_328"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <FullWidthFormControl>
                      <Form.Item
                        label={
                          <div className="form-label">
                            Date
                            <FieldDescriptionPopover
                              shortCode="PRF_04"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">
                              (HL_O_PRF_04_373)
                            </span>
                          </div>
                        }
                        name="HL_O_PRF_04_373"
                      >
                        <DatePicker />
                      </Form.Item>
                    </FullWidthFormControl>
                  </Col>
                </Row>

                {/* <h4>
                  Name (N1)
                  <FieldDescriptionPopover
                    shortCode="N1"
                    segment={true}
                    glossaryKey={
                      EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                    }
                  />
                </h4>
                <Row gutter={16}>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_N1_01_98"
                      label={
                        <div className="form-label">
                          Entity Identifier Code
                          <FieldDescriptionPopover
                            shortCode="N1_01"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_N1_01_98)
                          </span>
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Missing Entity Identifier Code",
                        },
                      ]}
                    >
                      <Select
                        options={N1_98_OPTIONS_TARGET}
                        optionFilterProp="label"
                        showSearch
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_N1_02_93"
                      label={
                        <div className="form-label">
                          Name
                          <FieldDescriptionPopover
                            shortCode="N1_02"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_N1_02_93)
                          </span>
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Missing Name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_N1_03_66"
                      label={
                        <div className="form-label">
                          Identification Code Qualifier
                          <FieldDescriptionPopover
                            shortCode="N1_03"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_N1_03_66)
                          </span>
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Missing Identification Code Qualifier",
                        },
                      ]}
                    >
                      <Select options={N1_66_OPTIONS_TARGET} />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_N1_04_67"
                      label={
                        <div className="form-label">
                          Identification Code
                          <FieldDescriptionPopover
                            shortCode="N1_04"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_N1_04_67)
                          </span>
                        </div>
                      }
                      rules={[
                        {
                          required: false,
                          message: "Missing Identification Code",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_N1_05_706"
                      label={
                        <div className="form-label">
                          Entity Relationship Code
                          <FieldDescriptionPopover
                            shortCode="N1_05"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_N1_05_706)
                          </span>
                        </div>
                      }
                    >
                      <Select options={N1_706_OPTIONS} />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="HL_O_N1_06_98"
                      label={
                        <div className="form-label">
                          Entity Identifier Code
                          <FieldDescriptionPopover
                            shortCode="N1_06"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">
                            (HL_O_N1_06_98)
                          </span>
                        </div>
                      }
                    >
                      <Select options={N1_98_OPTIONS} />
                    </Form.Item>
                  </Col>
                </Row> */}

                {/* REF - Order */}
                <h4>
                  REF - Order
                  <FieldDescriptionPopover
                    segment={true}
                    shortCode="REF"
                    glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                  />
                </h4>
                <Row gutter={16}>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="REF_O_01_128"
                      label={
                        <div className="form-label">
                          Reference Identification Qualifier
                          <FieldDescriptionPopover
                            shortCode="REF_01"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">(REF_O_01_128)</span>
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Missing Reference Identification Qualifier",
                        },
                      ]}
                    >
                      <Select options={REF_128_OPTIONS} disabled />
                    </Form.Item>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Form.Item
                      name="REF_O_02_127"
                      label={
                        <div className="form-label">
                          Reference Identification
                          <FieldDescriptionPopover
                            shortCode="REF_02"
                            glossaryKey={
                              EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                            }
                          />
                          <span className="form-sub-label">(REF_O_02_127)</span>
                        </div>
                      }
                      rules={[
                        {
                          required: false,
                          message: "Missing Reference Identification",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {/* <Col sm={24} lg={8}>
                  <Form.Item
                    name="REF_S_03_352"
                    label={
                      <div className="form-label">
                        Description
                        <FieldDescriptionPopover
                          shortCode="REF_03"
                          glossaryKey={
                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                          }
                        />
                        <span className="form-sub-label">
                          (REF_S_03_352)
                        </span>
                      </div>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
                </Row>

                <h4>Packs</h4>
                <Form.List name="HL_P_loop">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field, index) => {
                          const packData = getPackData(initialValues, index);
                          const packId = form.getFieldValue([
                            "HL_P_loop",
                            field.name,
                            "HL_01_628",
                          ]);

                          return (
                            <BorderedSubFormWrapper key={field.fieldKey}>
                              <SubFormRemoveButton>
                                <MinusCircleOutlined
                                  style={{ fontSize: "20px" }}
                                  onClick={() => {
                                    hierarchicalIds.delete(packId);
                                    remove(field.name);
                                  }}
                                />
                              </SubFormRemoveButton>
                              <h4>
                                Hierarchical Level (HL)
                                <FieldDescriptionPopover
                                  shortCode="HL"
                                  segment={true}
                                  glossaryKey={
                                    EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                  }
                                />
                              </h4>
                              <Row gutter={16}>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "HL_01_628"]}
                                    label={
                                      <div className="form-label">
                                        Pack ID
                                        <FieldDescriptionPopover
                                          shortCode="HL_01"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (HL_01_628)
                                        </span>
                                      </div>
                                    }
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Pack ID Number",
                                      },
                                    ]}
                                    initialValue={packId?.toString()}
                                  >
                                    <Input disabled />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "HL_02_734"]}
                                    label={
                                      <div className="form-label">
                                        Parent ID
                                        <FieldDescriptionPopover
                                          shortCode="HL_02"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (HL_02_734)
                                        </span>
                                      </div>
                                    }
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Parent ID Number",
                                      },
                                    ]}
                                    initialValue="2"
                                  >
                                    <Input disabled />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    label={
                                      <div className="form-label">
                                        Hierarchical Level Code
                                        <FieldDescriptionPopover
                                          shortCode="HL_03"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (HL_03_735)
                                        </span>
                                      </div>
                                    }
                                    name={[field.name, "HL_03_735"]}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Missing Hierarchical Level Code",
                                      },
                                    ]}
                                    initialValue="P"
                                  >
                                    <Select options={HL_735_OPTIONS} disabled />
                                  </Form.Item>
                                </Col>
                              </Row>
                              {/* <h4>
                                Item Physical Details (PO4)
                                <FieldDescriptionPopover
                                  shortCode="PO4"
                                  segment={true}
                                  glossaryKey={
                                    EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                  }
                                />
                              </h4>
                              <Row gutter={16}>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "P04_01_356"]}
                                    label={
                                      <div className="form-label">
                                        Pack
                                        <FieldDescriptionPopover
                                          shortCode="PO4_01"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (P04_01_356)
                                        </span>
                                      </div>
                                    }
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Pack",
                                      },
                                    ]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </Row> */}
                              <h4>
                                Marks and Numbers Information (MAN)
                                <FieldDescriptionPopover
                                  shortCode="MAN"
                                  segment={true}
                                  glossaryKey={
                                    EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                  }
                                />
                              </h4>
                              <Row gutter={16}>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "MAN_01_88"]}
                                    label={
                                      <div className="form-label">
                                        Marks and number qualifier
                                        <FieldDescriptionPopover
                                          shortCode="MAN_01"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_01_88)
                                        </span>
                                      </div>
                                    }
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Missing Marks and number qualifier",
                                      },
                                    ]}
                                  >
                                    <Select options={MAN_88_OPTIONS_TARGET} />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "MAN_02_87"]}
                                    label={
                                      <div className="form-label">
                                        Marks and Numbers
                                        <FieldDescriptionPopover
                                          shortCode="MAN_02"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_02_87)
                                        </span>
                                      </div>
                                    }
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Marks and number",
                                      },
                                    ]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                {/* <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "MAN_03_87"]}
                                    label={
                                      <div className="form-label">
                                        Marks and Numbers
                                        <FieldDescriptionPopover
                                          shortCode="MAN_03"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_03_87)
                                        </span>
                                      </div>
                                    }
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "MAN_04_88"]}
                                    label={
                                      <div className="form-label">
                                        Marks and number qualifier
                                        <FieldDescriptionPopover
                                          shortCode="MAN_04"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_04_88)
                                        </span>
                                      </div>
                                    }
                                  >
                                    <Select
                                      options={MAN_88_OPTIONS}
                                      optionFilterProp="label"
                                      showSearch
                                    />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "MAN_05_87"]}
                                    label={
                                      <div className="form-label">
                                        Marks and Numbers
                                        <FieldDescriptionPopover
                                          shortCode="MAN_05"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_05_87)
                                        </span>
                                      </div>
                                    }
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "MAN_06_87"]}
                                    label={
                                      <div className="form-label">
                                        Marks and Numbers
                                        <FieldDescriptionPopover
                                          shortCode="MAN_06"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_06_87)
                                        </span>
                                      </div>
                                    }
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col> */}
                              </Row>

                              <h4>Items</h4>
                              <Form.List
                                {...field}
                                name={[field.name, "HL_I_Loop"]}
                              >
                                {(itemFields, itemFieldsActions) => {
                                  return (
                                    <ShipmentItemForm
                                      parentId={packId?.toString()}
                                      fields={itemFields}
                                      actions={itemFieldsActions}
                                      packItems={packData?.HL_I_Loop}
                                      hierarchicalIds={hierarchicalIds}
                                      getItemId={(fieldName) => {
                                        return form.getFieldValue([
                                          "HL_P_loop",
                                          field.name,
                                          "HL_I_Loop",
                                          fieldName,
                                          "HL_01_628",
                                        ]);
                                      }}
                                    />
                                  );
                                }}
                              </Form.List>
                            </BorderedSubFormWrapper>
                          );
                        })}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              if (validationErrorVisible) {
                                setValidationErrorVisibility(false);
                              }
                              const newId = createUniqueId(hierarchicalIds);
                              hierarchicalIds.add(newId);
                              add({ HL_01_628: newId });
                            }}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Pack
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
              </BorderedSubFormWrapper>
            </BorderedSubFormWrapper>

            {/* <DashedHeading>Summary</DashedHeading>
            <h3>
              Transaction Totals (CTT)
              <FieldDescriptionPopover
                shortCode="CTT"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
              />
            </h3> */}
            {/* <Row gutter={16}> */}
            {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="CTT_01_354"
                  label="Number of Line Items (CTT_01_354)"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Number of Line Items",
                    },
                  ]}
                  initialValue="1"
                >
                  <Input disabled />
                </Form.Item>
              </Col> */}

            {/* <Col sm={24} lg={6}>
                <Form.Item
                  name="CTT_03_81"
                  label={
                    <div className="form-label">
                      Weight
                      <FieldDescriptionPopover
                        shortCode="CTT_03"
                        glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
                      />
                      <span className="form-sub-label">(CTT_03_81)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col sm={24} lg={6}>
                <Form.Item
                  name="CTT_04_355"
                  label={
                    <div className="form-label">
                      Unit or Basis for Measurement Code
                      <FieldDescriptionPopover
                        shortCode="CTT_04"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CTT_04_355)</span>
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
                  name="CTT_05_183"
                  label={
                    <div className="form-label">
                      Volume
                      <FieldDescriptionPopover
                        shortCode="CTT_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CTT_05_183)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col sm={24} lg={6}>
                <Form.Item
                  name="CTT_06_355"
                  label={
                    <div className="form-label">
                      Unit or Basis for Measurement Code
                      <FieldDescriptionPopover
                        shortCode="CTT_06"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(CTT_06_355)</span>
                    </div>
                  }
                >
                  <Select
                    options={CTT_355_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col> */}
            {/* </Row> */}
            {/* <div>
              <h3>SE</h3>
              <Row gutter={16}>
                <Col sm={24} lg={6}>
                  <Form.Item
                    name="SE_01_96"
                    label="Number Of Included Segments (SE_01_96)"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Number Of Included Segments",
                      },
                      {
                        min: 1,
                        message: "Must have at least 1 character",
                      },
                      {
                        max: 10,
                        message: "Can have at most 10 characters",
                      },
                    ]}
                  >
                    <Input disabled maxLength={10} />
                  </Form.Item>
                </Col>

                <Col sm={24} lg={6}>
                  <Form.Item
                    name="SE_02_329"
                    label="Transaction Set Control Number (SE_02_329)"
                    rules={[
                      {
                        required: false,
                        message: "Please enter Transaction Set Control Number",
                      },
                      {
                        min: 4,
                        message: "Must have at least 4 character",
                      },
                      {
                        max: 9,
                        message: "Can have at most 9 characters",
                      },
                    ]}
                  >
                    <Input disabled maxLength={9} />
                  </Form.Item>
                </Col>
              </Row>
            </div> */}
          </Form>
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

export default ShipmentEditPageFullEntryForm;
