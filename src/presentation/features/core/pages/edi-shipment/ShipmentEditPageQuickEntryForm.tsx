import {
  Affix,
  Alert,
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Select,
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
import React, { useCallback, useEffect } from "react";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { EditOutlined, EyeOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { DocumentUpdatedResponseModel } from "@crstl/api/src/apis/models/v1/edi/EdiDocuments";
import { Spinner } from "@crstl/components/atoms/loading";

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
  HighlightedButton,
  LoadingContainer,
  OutputContainer,
  PageWrapper,
  QuickLinkButton,
  QuickLinks,
  QuickLinksContainer,
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
  const { resetDocBtn } = useFlags();
  const { form } = props;
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

  const sourceJson = createSourceJson(listDocumentData as TargetJSON);
  const initialValues = mergeDuplicatePacks(sourceJson);

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
                          `EDI Quick Entry Form: Ship Notice: Save and Send`,
                          pageParams
                        );
                        submitForm(true);
                      }}
                      loading={isLoading && sendAfterSaveBool}
                    >
                      Save and Send
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      disabled={isResettingDocument}
                      onClick={onDoneClick}
                    >
                      <EyeOutlined /> View
                    </Button>
                  </ButtonsContainer>
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
            {/* <h4>
              Bill of Lading Number (REF - BM)
              <FieldDescriptionPopover
                shortCode="REF"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
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
                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
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
              {`Reference Number`}
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
                            EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
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
                <UserInputFieldContainer showBorder={showBorderOn_TD5_S_03_67}>
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
                </UserInputFieldContainer>
              </Col>
              <Col sm={24} lg={8}>
                <UserInputFieldContainer showBorder={showBorderOn_TD5_S_04_91}>
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
                </UserInputFieldContainer>
              </Col>
              <Col sm={24} lg={8}>
                <UserInputFieldContainer showBorder={showBorderOn_TD5_S_05_387}>
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
                </UserInputFieldContainer>
              </Col>
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
                                <th>Description</th>
                                <th>Container ID</th>
                                <th>SKU</th>
                                <th>UPC</th>
                                <th>Pack Count</th>
                                <th>Quantity per Pack</th>
                                <th>Quantity Shipped</th>
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
