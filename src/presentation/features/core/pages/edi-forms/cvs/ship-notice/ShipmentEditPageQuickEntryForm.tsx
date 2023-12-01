import {
  Affix,
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
} from "antd";
import clsx from "clsx";
import { GetASNAdditionalDataResponseModel } from "domain/entity/edi/models";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import {
  useGetAdditionalASNDataQuery,
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
import { cloneDeep, curry, flatten, get, map, set } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
import React, { useEffect } from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "models/v1/edi/EdiDocuments";
import { Spinner } from "components/atoms/loading";

// import styled from "styled-components";
// import { MinusCircleOutlined } from "@ant-design/icons";
import { ButtonsContainer } from "../../../edi-invoice/InvoiceEditPage.styles";
import FieldDescriptionPopover from "../../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { CTT_355_OPTIONS } from "./data/CTT_355_options";
import { DTM_374_OPTIONS } from "./data/DTM_374_options";
import { getTargetData } from "./data/getDataByPartner";
// import FormSelectionModal from "../edi/FormSelectionModal/FormSelectionModal";
import { MAN_88_OPTIONS } from "./data/MAN_88_options";
import { PO4_187_OPTIONS } from "./data/PO4_187_options";
import { REF_128_OPTIONS } from "./data/REF_128_options";
import { TD1_103_OPTIONS } from "./data/TD1_103_options";
import { TD5_133_OPTIONS } from "./data/TD5_133_options";
import { TD5_66_OPTIONS } from "./data/TD5_66_options";
import { TD5_91_OPTIONS } from "./data/TD5_91_options";
import { createSourceJson } from "./helpers";
import { createHierarchicalIds } from "./helpers/createHierarchicalIds";
import {
  dedupePacks,
  MergedSourceJSON,
  mergeDuplicatePacks,
} from "./helpers/createSourceJson";
import {
  AlertContainer,
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
  RequiredColumnHeading,
  RequiredColumnHeadingAsterix,
  TextArea,
  UserInputFieldContainer,
} from "./ShipmentPage.styles";
import { ErrorMessage } from "./sub-components/ErrorMessage";
import { PackRow } from "./sub-components/PackRow";
import { headingTemplate } from "./templates/headingTemplate";
import { itemTemplate } from "./templates/itemTemplate";
import { mainTemplate } from "./templates/newJediTemplate";
import { orderTemplate } from "./templates/orderTemplate";
import { packTemplate } from "./templates/packTemplate";
import { shipmentTemplate } from "./templates/shipmentTemplate";
import { summaryTemplate } from "./templates/summaryTemplate";
import { HLPLoop, SourceJSON } from "./types/sourceJson";

interface PageParams {
  orderId: string;
  id: string;
}

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

const MAN_88_OPTIONS_TARGET = getTargetData(
  MAN_88_OPTIONS,
  "detail.010_HL.190_MAN.01"
);

const TD5_91_OPTIONS_TARGET = getTargetData(
  TD5_91_OPTIONS,
  "detail.010_HL.120_TD5.04"
);

const DTM_374_OPTIONS_TARGET = getTargetData(
  DTM_374_OPTIONS,
  "detail.010_HL.200_DTM.01"
);

const TD5_133_OPTIONS_TARGET = getTargetData(
  TD5_133_OPTIONS,
  "detail.010_HL.120_TD5.01"
);

const TD5_66_OPTIONS_TARGET = getTargetData(
  TD5_66_OPTIONS,
  "detail.010_HL.120_TD5.02"
);

function getFullEntryFormUrl({
  pageParams,
  searchParams,
}: {
  pageParams: PageParams;
  searchParams: URLSearchParams;
}) {
  const url = generatePath(CORE_EDI_SHIPMENT_EDIT_PAGE, pageParams);
  searchParams.set("fullEntryForm", "true");
  const urlWithSearchParams = `${url}?${searchParams.toString()}`;
  return urlWithSearchParams;
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

const getProductDescriptionBySku = curry(
  (asnData: GetASNAdditionalDataResponseModel | null = null, sku: string) => {
    if (asnData?.data?.productDetails?.length === 0) {
      return "";
    }

    const { productDetails } = asnData?.data ?? { productDetails: [] };

    const detailsForSku = productDetails.find((item) => item.sku === sku);

    return detailsForSku?.productDescription ?? "";
  },
  2
);

const { confirm } = Modal;

interface ShipmentEditPageQuickEntryFormProps {
  form: FormInstance<any>;
}

function ShipmentEditPageQuickEntryForm(
  props: ShipmentEditPageQuickEntryFormProps
) {
  const { form } = props;
  const { resetDocBtn } = useFlags();
  const [partialFormData, setPartialFormData] = React.useState<any>({});
  const [isFormChanged, setFormChanged] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  // const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<string>("");
  const [jediData, setJediData] = React.useState<TargetJSON | null>(null);
  const [
    showFormSelectionModal,
    setShowFormSelectionModal,
  ] = React.useState<boolean>(false);
  const [sendAfterSaveBool, setSendAfterSaveBool] = React.useState<boolean>(
    false
  );
  const pageParams = useParams<PageParams>();
  const history = useHistory();
  const location = useLocation();
  const searchParams = useSearchParams();
  const isDebug = searchParams.get("debug") ? true : false;

  useEffect(() => {
    setShowFormSelectionModal(true);
  }, []);

  const { data: listDocumentData, isFetching } = useListDocumentQuery(
    "856",
    pageParams.id
  );

  const {
    data: additionalAsnData,
    isLoading: isAdditionalDataLoading,
  } = useGetAdditionalASNDataQuery(pageParams.id);

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

  const shipmentViewPagePath = generatePath(
    CORE_EDI_SHIPMENT_VIEW_PAGE,
    pageParams
  );

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

  const fullEntryFormUrl = getFullEntryFormUrl({ pageParams, searchParams });

  const sourceJson = createSourceJson(listDocumentData as TargetJSON);
  const initialValues = mergeDuplicatePacks(sourceJson);

  const onFinish = (values: unknown) => null;

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

    const mergedFormData = {
      ...initialValues,
      ...(formData as SourceJSON),
    } as MergedSourceJSON;

    const completeFormData = dedupePacks(mergedFormData);

    const lineItems = get(formData, "detail_HL", []);
    const lineItemsCount = lineItems.length;

    const formDataWithTransformedKeys = transformFormKeys(completeFormData);

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
        documentId: pageParams.id,
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
    const url = generatePath(CORE_EDI_SHIPMENT_VIEW_PAGE, pageParams);
    history.push(url);
  };

  if (isFetching || isAdditionalDataLoading) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }

  const getProductDescription = getProductDescriptionBySku(additionalAsnData);
  setTimeout(async () => {
    const [fieldsValue, error] = await runAsync(() => form.getFieldsValue());
    identifyFieldsToShowYellowBorder(form, fieldsValue);
  }, 0);

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
                pinHeader(affixed ?? false);
              }}
              className={clsx({ "pinned-header": isHeaderPinned })}
            >
              <FormHeaderContainer>
                <FormHeader>
                  <h2>New Ship Notice - Quick Entry Form</h2>
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
                          `EDI Quick Entry Form: Ship Notice: Save`,
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
                          `EDI Quick Entry Form: Ship Notice: Save and Send`,
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
                      <span className="form-sub-label">(REF_BM_S_01_128)</span>
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
                      <span className="form-sub-label">(REF_BM_S_02_127)</span>
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

            {/* <h4>
              Bill of Lading Number (REF - BM)
              <FieldDescriptionPopover
                shortCode="REF"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
              />
            </h4> */}
            {/* <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  label={
                    <div className="form-label">
                      Reference Identification Qualifier
                      <FieldDescriptionPopover
                        shortCode="REF_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(REF_BM_S_01_128)</span>
                    </div>
                  }
                  name="REF_BM_S_01_128"
                  rules={[
                    {
                      required: true,
                      message: "Missing Reference Identification Qualifier",
                    },
                  ]}
                  initialValue="BM"
                >
                  <Select options={REF_128_OPTIONS} />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <UserInputFieldContainer
                  showBorder={showBorderOn_REF_BM_S_02_127}
                >
                  <Form.Item
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
                    name="REF_BM_S_02_127"
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </UserInputFieldContainer>
              </Col>
            </Row> */}
            <h4>
              {"Carrier's Reference Number (PRO/Invoice)"}
              <FieldDescriptionPopover
                shortCode="REF"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY}
              />
            </h4>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  label={
                    <div className="form-label">
                      Reference Identification Qualifier
                      <FieldDescriptionPopover
                        shortCode="REF_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.CVS_SOPI_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(REF_CN_S_01_128)</span>
                    </div>
                  }
                  name="REF_CN_S_01_128"
                  rules={[
                    {
                      required: true,
                      message: "Missing Reference Identification Qualifier",
                    },
                  ]}
                >
                  <Select options={REF_128_OPTIONS} />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <UserInputFieldContainer
                  showBorder={showBorderOn_REF_CN_S_02_127}
                >
                  <Form.Item
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
                    name="REF_CN_S_02_127"
                    rules={[
                      {
                        required: true,
                        message: "Missing Reference Identification",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </UserInputFieldContainer>
              </Col>
            </Row>

            <h4>Date Time Reference - Shipment level</h4>
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
                            <span className="form-sub-label">(DTM_02_373)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Missing date",
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
                            <span className="form-sub-label">(DTM_03_337)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Missing time",
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

            <h4>Date Time Reference - Shipment level</h4>
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
                            <span className="form-sub-label">(DTM_02_373)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Missing date",
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
                            <span className="form-sub-label">(DTM_03_337)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Missing time",
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

            <h3>Shipment</h3>

            {/* <h4>Carrier Details - Quantity and Weight (TD1)</h4>
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
                      <span className="form-sub-label">(HL_S_TD1_01_103)</span>
                    </div>
                  }
                  name="HL_S_TD1_01_103"
                >
                  <Select
                    options={TD1_103_OPTIONS}
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
                      <span className="form-sub-label">(HL_S_TD1_06_187)</span>
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
                      <span className="form-sub-label">(HL_S_TD1_08_355)</span>
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
                      <span className="form-sub-label">(HL_S_TD1_09_183)</span>
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
                      <span className="form-sub-label">(HL_S_TD1_10_355)</span>
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
            </Row> */}

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

            <BorderedSubFormWrapper>
              <h3>Packs</h3>
              <Form.List name="HL_P_loop">
                {(fields, { add, remove }) => {
                  return (
                    <div className="ant-table">
                      <div className="ant-table-container">
                        <div className="ant-table-content">
                          <table>
                            <thead className="ant-table-thead">
                              <tr>
                                <th>UPC number</th>
                                <th>SKU</th>
                                <th>
                                  <RequiredColumnHeading>
                                    <RequiredColumnHeadingAsterix>
                                      *
                                    </RequiredColumnHeadingAsterix>
                                    Lot number
                                  </RequiredColumnHeading>
                                </th>
                                <th>Shipped quantity</th>
                                <th>Ordered quantity</th>
                                <th>
                                  <RequiredColumnHeading>
                                    <RequiredColumnHeadingAsterix>
                                      *
                                    </RequiredColumnHeadingAsterix>
                                    Gross Weight per Pack
                                  </RequiredColumnHeading>
                                </th>
                                <th>
                                  <RequiredColumnHeading>
                                    <RequiredColumnHeadingAsterix>
                                      *
                                    </RequiredColumnHeadingAsterix>
                                    Unit
                                  </RequiredColumnHeading>
                                </th>
                                <th>
                                  <RequiredColumnHeading>
                                    <RequiredColumnHeadingAsterix>
                                      *
                                    </RequiredColumnHeadingAsterix>
                                    Description
                                  </RequiredColumnHeading>
                                </th>
                                <th>
                                  <RequiredColumnHeading>
                                    <RequiredColumnHeadingAsterix>
                                      *
                                    </RequiredColumnHeadingAsterix>
                                    Expiration date
                                  </RequiredColumnHeading>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="ant-table-tbody">
                              {fields.map((field, index) => {
                                return (
                                  <PackRow
                                    key={index}
                                    field={field}
                                    form={form}
                                    getProductDescription={
                                      getProductDescription
                                    }
                                  />
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Form.List>
            </BorderedSubFormWrapper>

            {isError && (
              <AlertContainer>
                <Alert
                  message="Something went wrong, please try again"
                  type="error"
                  closable
                />
              </AlertContainer>
            )}
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

let showBorderOn_REF_BM_S_02_127 = false;
let showBorderOn_REF_CN_S_02_127 = false;
let showBorderOn_TD5_S_03_67 = false;
let showBorderOn_TD5_S_04_91 = false;
const showBorderOn_TD5_S_05_387 = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function identifyFieldsToShowYellowBorder(form: any, fieldsValue: any): void {
  const is_REF_BM_S_02_127_touched = form.isFieldTouched("REF_BM_S_02_127");
  const fieldValueIsEmpty_REF_BM_S_02_127 =
    !get(fieldsValue, "REF_BM_S_02_127") ||
    (get(fieldsValue, "REF_BM_S_02_127") &&
      get(fieldsValue, "REF_BM_S_02_127") === "");

  showBorderOn_REF_BM_S_02_127 = is_REF_BM_S_02_127_touched
    ? false
    : fieldValueIsEmpty_REF_BM_S_02_127;

  const is_REF_CN_S_02_127_touched = form.isFieldTouched("REF_CN_S_02_127");
  const fieldValueIsEmpty_REF_CN_S_02_127 =
    !get(fieldsValue, "REF_CN_S_02_127") ||
    (get(fieldsValue, "REF_CN_S_02_127") &&
      get(fieldsValue, "REF_CN_S_02_127") === "");

  showBorderOn_REF_CN_S_02_127 = is_REF_CN_S_02_127_touched
    ? false
    : fieldValueIsEmpty_REF_CN_S_02_127;

  const is_TD5_S_03_67_touched = form.isFieldTouched("TD5_S_03_67");
  const fieldValueIsEmpty_TD5_S_03_67 =
    !get(fieldsValue, "TD5_S_03_67") ||
    (get(fieldsValue, "TD5_S_03_67") && get(fieldsValue, "TD5_S_03_67") === "");

  showBorderOn_TD5_S_03_67 = is_TD5_S_03_67_touched
    ? false
    : fieldValueIsEmpty_TD5_S_03_67;

  const is_TD5_S_04_91_touched = form.isFieldTouched("TD5_S_04_91");
  const fieldValueIsEmpty_TD5_S_04_91 =
    !get(fieldsValue, "TD5_S_04_91") ||
    (get(fieldsValue, "TD5_S_04_91") && get(fieldsValue, "TD5_S_04_91") === "");

  showBorderOn_TD5_S_04_91 = is_TD5_S_04_91_touched
    ? false
    : fieldValueIsEmpty_TD5_S_04_91;

  // const is_TD5_S_05_387_touched = form.isFieldTouched("TD5_S_05_387");
  // const fieldValueIsEmpty_TD5_S_05_387 =
  //   !get(fieldsValue, "TD5_S_05_387") ||
  //   (get(fieldsValue, "TD5_S_05_387") &&
  //     get(fieldsValue, "TD5_S_05_387") === "");

  // showBorderOn_TD5_S_05_387 = is_TD5_S_05_387_touched
  //   ? false
  //   : fieldValueIsEmpty_TD5_S_05_387;
}

export { ShipmentEditPageQuickEntryForm };
