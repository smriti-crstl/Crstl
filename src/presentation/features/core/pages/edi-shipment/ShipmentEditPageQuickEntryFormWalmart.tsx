import {
  Affix,
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import clsx from "clsx";
import { TargetJSON } from "domain/entity/edi/models/TargetJson856";
import {
  useListDocumentQuery,
  useUpdateDocument856,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import {
  CORE_EDI_SHIPMENT_EDIT_PAGE,
  CORE_EDI_SHIPMENT_VIEW_PAGE,
} from "globals/configs";
import { cloneDeep, flatten, get, map, set } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import { amplitude } from "presentation/utils";
import React, { useEffect } from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "models/v1/edi/EdiDocuments";
import { Spinner } from "components/atoms/loading";

// import styled from "styled-components";
// import { MinusCircleOutlined } from "@ant-design/icons";
import { ButtonsContainer } from "../edi-invoice/InvoiceEditPage.styles";
import FieldDescriptionPopover from "../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { getTargetData } from "./data/getDataByPartner";
// import FormSelectionModal from "../edi/FormSelectionModal/FormSelectionModal";
import { MAN_88_OPTIONS } from "./data/MAN_88_options";
import { REF_128_OPTIONS } from "./data/REF_128_options";
import { TD5_66_OPTIONS } from "./data/TD5_66_options";
import { TD5_91_OPTIONS } from "./data/TD5_91_options";
import { createSourceJson } from "./helpers";
import { createHierarchicalIds } from "./helpers/createHierarchicalIds";
import {
  AlertContainer,
  BorderedSubFormWrapper,
  Container,
  ContainerBordered,
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
} from "./ShipmentPage.styles";
import { ErrorMessage } from "./sub-components/ErrorMessage";
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

const { confirm } = Modal;

function ShipmentEditPageQuickEntryFormWalmart() {
  const [isFormChanged, setFormChanged] = React.useState(false);
  const [isHeaderPinned, pinHeader] = React.useState(false);
  const [form] = Form.useForm();
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
    mutate,
    data: updateResponse,
    isError,
    error: updateDocumentErrorResponse,
    isLoading,
  } = useUpdateDocument856();

  const shipmentViewPagePath = generatePath(
    CORE_EDI_SHIPMENT_VIEW_PAGE,
    pageParams
  );

  const fullEntryFormUrl = getFullEntryFormUrl({ pageParams, searchParams });

  const initialValues = createSourceJson(listDocumentData as TargetJSON);
  const hierarchicalIds = createHierarchicalIds(initialValues);

  const onFinish = (values: unknown) => null;

  const submitForm = async (sendAfterSave = false) => {
    setSendAfterSaveBool(sendAfterSave);
    const [formData, error] = await runAsync(() => form.validateFields());
    console.log({ formData, error });

    if (error) {
      return;
    }

    const completeFormData = {
      ...initialValues,
      ...formData,
    };

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
          setNotification({
            type: "success",
            moduleName: "",
            description: data.data.message || "Changes Saved",
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
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            initialValues={initialValues}
            className="edi-webform"
            onValuesChange={(changedValues, values) => setFormChanged(true)}
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
                  <h2>New Ship Notice - Quick Entry Form - Walmart</h2>
                  {isFormChanged ? (
                    <ButtonsContainer>
                      <Button
                        htmlType="submit"
                        onClick={() => {
                          amplitude.logClickEvent(
                            `EDI Quick Entry Form: Ship Notice: Save`,
                            pageParams
                          );
                          submitForm();
                        }}
                        loading={isLoading && !sendAfterSaveBool}
                      >
                        Save
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
                    </ButtonsContainer>
                  ) : (
                    <Button type="primary" ghost onClick={onDoneClick}>
                      <EditOutlined /> Done
                    </Button>
                  )}
                </FormHeader>
                {isError && <ErrorMessage data={errorResponse?.data} />}
              </FormHeaderContainer>
            </Affix>
            <h3>
              Beginning Segment for Ship Notice (BSN)
              <FieldDescriptionPopover
                shortCode="BSN"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
              />
            </h3>
            <Row gutter={16}>
              <Col sm={24} lg={12}>
                <Form.Item
                  name="BSN_02_396"
                  label={
                    <div className="form-label">
                      Shipment Identification
                      <FieldDescriptionPopover
                        hideTitle
                        shortCode="BSN_02_396"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
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
            </Row>
            <h4>
              Carrier Details - Routing Sequence/Transit Time (TD5)
              <FieldDescriptionPopover
                shortCode="TD5"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
              />
            </h4>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  label={
                    <div className="form-label">
                      Identification Code Qualifier
                      <FieldDescriptionPopover
                        shortCode="TD5_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(TD5_S_02_66)</span>
                    </div>
                  }
                  name="TD5_S_02_66"
                >
                  <Select options={TD5_66_OPTIONS} disabled />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  label={
                    <div className="form-label">
                      Identification Code
                      <FieldDescriptionPopover
                        shortCode="TD5_03"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(TD5_S_03_67)</span>
                    </div>
                  }
                  name="TD5_S_03_67"
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
                  label={
                    <div className="form-label">
                      Transportation Method/Type Code
                      <FieldDescriptionPopover
                        shortCode="TD5_04"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(TD5_S_04_91)</span>
                    </div>
                  }
                  name="TD5_S_04_91"
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
                  label={
                    <div className="form-label">
                      Routing
                      <FieldDescriptionPopover
                        shortCode="TD5_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(TD5_S_05_387)</span>
                    </div>
                  }
                  name="TD5_S_05_387"
                  rules={[
                    {
                      required: false,
                      message: "Missing Routing",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <h4>
              Bill of Lading Number (REF - BM)
              <FieldDescriptionPopover
                shortCode="REF"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(REF_BM_S_01_128)</span>
                    </div>
                  }
                  name="REF_BM_S_01_128"
                  initialValue="BM"
                >
                  <Select options={REF_128_OPTIONS} disabled />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  label={
                    <div className="form-label">
                      Reference Identification
                      <FieldDescriptionPopover
                        shortCode="REF_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(REF_BM_S_02_127)</span>
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
              </Col>
            </Row>
            <h4>
              {`Carrier's Reference Number - PRO/Invoice (REF - CN)`}
              <FieldDescriptionPopover
                shortCode="REF"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(REF_CN_S_01_128)</span>
                    </div>
                  }
                  name="REF_CN_S_01_128"
                >
                  <Select options={REF_128_OPTIONS} disabled />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  label={
                    <div className="form-label">
                      Reference Identification
                      <FieldDescriptionPopover
                        shortCode="REF_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(REF_CN_S_02_127)</span>
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
              </Col>
            </Row>
            <BorderedSubFormWrapper>
              <h3>Shipment</h3>
              <h4>
                Hierarchical Level (HL)
                <FieldDescriptionPopover
                  shortCode="HL"
                  segment={true}
                  glossaryKey={
                    EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                  }
                />
              </h4>
              <BorderedSubFormWrapper>
                <h3>Order</h3>
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
                              <h4>
                                Hierarchical Level (HL)
                                <FieldDescriptionPopover
                                  shortCode="HL"
                                  segment={true}
                                  glossaryKey={
                                    EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
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
                                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
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
                              </Row>
                              <h4>
                                Marks and Numbers (MAN)
                                <FieldDescriptionPopover
                                  shortCode="MAN"
                                  segment={true}
                                  glossaryKey={
                                    EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                                  }
                                />
                              </h4>
                              <Row gutter={16}>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    label={
                                      <div className="form-label">
                                        Marks and numbers qualifier
                                        <FieldDescriptionPopover
                                          shortCode="MAN_01"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_01_88)
                                        </span>
                                      </div>
                                    }
                                    name={[field.name, "MAN_01_88"]}
                                  >
                                    <Select
                                      options={MAN_88_OPTIONS_TARGET}
                                      disabled
                                    />
                                  </Form.Item>
                                </Col>
                                <Col sm={24} lg={8}>
                                  <Form.Item
                                    {...field}
                                    label={
                                      <div className="form-label">
                                        Marks and Numbers
                                        <FieldDescriptionPopover
                                          shortCode="MAN_02"
                                          glossaryKey={
                                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                                          }
                                        />
                                        <span className="form-sub-label">
                                          (MAN_02_87)
                                        </span>
                                      </div>
                                    }
                                    name={[field.name, "MAN_02_87"]}
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
                              </Row>
                            </BorderedSubFormWrapper>
                          );
                        })}
                      </div>
                    );
                  }}
                </Form.List>
              </BorderedSubFormWrapper>
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

export { ShipmentEditPageQuickEntryFormWalmart };
