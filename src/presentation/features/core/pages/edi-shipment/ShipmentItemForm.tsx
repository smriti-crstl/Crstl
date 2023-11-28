import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { CTT_355_OPTIONS } from "./data/CTT_355_options";
import { getTargetData } from "./data/getDataByPartner";
import { TD1_103_OPTIONS } from "./data/TD1_103_options";
import { createUniqueId, getSafeNumber } from "./helpers/createHierarchicalIds";
import { LIN_02_235_OPTIONS } from "./LIN_02_235_options";
import { LIN_04_235_OPTIONS } from "./LIN_04_235_options";
import {
  BorderedSubFormWrapper,
  SubFormRemoveButton,
} from "./ShipmentPage.styles";
import { SN1_03_355_OPTIONS } from "./SN1_03_355_options";
import { HLILoop } from "./types/sourceJson";

interface Props {
  parentId?: string;
  fields: any;
  actions: any;
  hierarchicalIds: Set<number | undefined>;
  packItems?: HLILoop[];
  getItemId: (fieldName: number) => number | undefined;
}

const LIN_02_235_OPTIONS_TARGET = getTargetData(
  LIN_02_235_OPTIONS,
  "detail.010_HL.020_LIN.02"
);

const LIN_04_235_OPTIONS_TARGET = getTargetData(
  LIN_04_235_OPTIONS,
  "detail.010_HL.020_LIN.04"
);

const SN1_03_355_OPTIONS_TARGET = SN1_03_355_OPTIONS;

function ShipmentItemForm({
  parentId,
  fields,
  actions,
  hierarchicalIds,
  packItems,
  getItemId,
}: Props) {
  const { add, remove } = actions;
  return (
    <div>
      {fields.map((field: any, itemFieldIndex: number) => {
        const itemId = getItemId(field.name);

        return (
          <BorderedSubFormWrapper key={field.fieldKey}>
            <SubFormRemoveButton>
              <MinusCircleOutlined
                style={{ fontSize: "20px" }}
                onClick={() => {
                  hierarchicalIds.delete(itemId);
                  remove(field.name);
                }}
              />
            </SubFormRemoveButton>
            <h4>
              Hierarchical Level (HL)
              <FieldDescriptionPopover
                shortCode="HL"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
              />
            </h4>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "HL_01_628"]}
                  label={
                    <div className="form-label">
                      Item ID
                      <FieldDescriptionPopover
                        shortCode="HL_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(HL_01_628)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Missing Item ID Number",
                    },
                  ]}
                  initialValue={itemId?.toString()}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(HL_02_734)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Missing Parent ID Number",
                    },
                  ]}
                  initialValue={parentId}
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
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(HL_03_735)</span>
                    </div>
                  }
                  name={[field.name, "HL_03_735"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing Hierarchical Level Code",
                    },
                  ]}
                  initialValue="I"
                >
                  <Select
                    options={[
                      {
                        value: "O",
                        label: "Order",
                      },
                      {
                        value: "S",
                        label: "Shipment",
                      },
                      {
                        value: "P",
                        label: "Pack",
                      },
                      {
                        value: "I",
                        label: "Item",
                      },
                    ]}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <h4>
              Item Identification (LIN)
              <FieldDescriptionPopover
                shortCode="LIN"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
              />
            </h4>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_01_350"]}
                  label={
                    <div className="form-label">
                      Assigned Identification
                      <FieldDescriptionPopover
                        shortCode="LIN_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_01_350)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_02_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <FieldDescriptionPopover
                        shortCode="LIN_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_02_235)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Missing Product/Service ID Qualifier",
                    },
                  ]}
                >
                  <Select
                    options={LIN_02_235_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_03_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <FieldDescriptionPopover
                        shortCode="LIN_03"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_03_234)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Missing Product/Service ID",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_04_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <FieldDescriptionPopover
                        shortCode="LIN_04"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_04_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_05_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <FieldDescriptionPopover
                        shortCode="LIN_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_05_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_06_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <FieldDescriptionPopover
                        shortCode="LIN_06"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_06_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_07_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <FieldDescriptionPopover
                        shortCode="LIN_07"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(LIN_07_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              {/* <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_08_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_08_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_09_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_09_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_10_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_10_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_11_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_11_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_12_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_12_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_13_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_13_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_14_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_14_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_15_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_15_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_16_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_16_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_17_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_17_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_18_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_18_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_19_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_19_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_20_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_20_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_21_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_21_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_22_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_22_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_23_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_23_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_24_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_24_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_25_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_25_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_26_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_26_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_27_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_27_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_28_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_28_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_29_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_29_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_30_235"]}
                  label={
                    <div className="form-label">
                      Product/Service ID Qualifier
                      <span className="form-sub-label">(LIN_30_235)</span>
                    </div>
                  }
                >
                  <Select
                    options={LIN_04_235_OPTIONS}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "LIN_31_234"]}
                  label={
                    <div className="form-label">
                      Product/Service ID
                      <span className="form-sub-label">(LIN_31_234)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col> */}
            </Row>
            <h4>
              Item Detail - Shipment (SN1)
              <FieldDescriptionPopover
                shortCode="SN1"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
              />
            </h4>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "SN1_01_350"]}
                  label={
                    <div className="form-label">
                      Assigned Identification
                      <FieldDescriptionPopover
                        shortCode="SN1_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(SN1_01_350)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "SN1_02_382"]}
                  label={
                    <div className="form-label">
                      Number of units shipped
                      <FieldDescriptionPopover
                        shortCode="SN1_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(SN1_02_382)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter number of units shipped",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "SN1_03_355"]}
                  label={
                    <div className="form-label">
                      Unit or Basis for Measurement Code
                      <FieldDescriptionPopover
                        shortCode="SN1_03"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(SN1_03_355)</span>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter Unit or Basis for Measurement Code",
                    },
                  ]}
                >
                  <Select
                    options={SN1_03_355_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col>
              {/* <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "SN1_05_330"]}
                  label={
                    <div className="form-label">
                      Quantity Ordered
                      <FieldDescriptionPopover
                        shortCode="SN1_05"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(SN1_05_330)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "SN1_06_355"]}
                  label={
                    <div className="form-label">
                      Unit or Basis for Measurement Code
                      <FieldDescriptionPopover
                        shortCode="SN1_06"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(SN1_06_355)</span>
                    </div>
                  }
                >
                  <Select
                    options={SN1_03_355_OPTIONS_TARGET}
                    optionFilterProp="label"
                    showSearch
                  />
                </Form.Item>
              </Col> */}
            </Row>
            <h4>
              Item Physical Details (PO4)
              <FieldDescriptionPopover
                shortCode="PO4"
                segment={true}
                glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY}
              />
            </h4>
            <Row gutter={16}>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "PO4_01_356"]}
                  label={
                    <div className="form-label">
                      Pack
                      <FieldDescriptionPopover
                        shortCode="PO4_01"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_01_356)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "PO4_02_357"]}
                  label={
                    <div className="form-label">
                      Size
                      <FieldDescriptionPopover
                        shortCode="PO4_02"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_02_357)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "PO4_03_355"]}
                  label={
                    <div className="form-label">
                      Unit or Basis for Measurement Code
                      <FieldDescriptionPopover
                        shortCode="PO4_03"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_03_355)</span>
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
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "PO4_04_103"]}
                  label={
                    <div className="form-label">
                      Packaging Code
                      <FieldDescriptionPopover
                        shortCode="PO4_04"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_04_103)</span>
                    </div>
                  }
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
                  {...field}
                  name={[field.name, "PO4_08_385"]}
                  label={
                    <div className="form-label">
                      Gross Volume per Pack
                      <FieldDescriptionPopover
                        shortCode="PO4_08"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_08_385)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "PO4_09_355"]}
                  label={
                    <div className="form-label">
                      Unit or Basis for Measurement Code
                      <FieldDescriptionPopover
                        shortCode="PO4_09"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_09_355)</span>
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
              {/* <Col sm={24} lg={8}>
                <Form.Item
                  {...field}
                  name={[field.name, "PO4_16_350"]}
                  label={
                    <div className="form-label">
                      Assigned Identification
                      <FieldDescriptionPopover
                        shortCode="PO4_16"
                        glossaryKey={
                          EDI_GLOSSARY_KEYS.TARGET_NON_DVS_856_EDI_GLOSSARY
                        }
                      />
                      <span className="form-sub-label">(PO4_16_350)</span>
                    </div>
                  }
                >
                  <Input />
                </Form.Item>
              </Col> */}
            </Row>
          </BorderedSubFormWrapper>
        );
      })}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => {
            const newId = createUniqueId(hierarchicalIds);
            hierarchicalIds.add(newId);
            add({ HL_01_628: newId });
          }}
          block
          icon={<PlusOutlined />}
        >
          Add Item
        </Button>
      </Form.Item>
    </div>
  );
}

export { ShipmentItemForm };
