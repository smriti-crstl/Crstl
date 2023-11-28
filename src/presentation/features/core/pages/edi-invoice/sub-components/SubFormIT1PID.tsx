import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { ELEMENT_349_OPTIONS } from "../data/Element_349_options";
import { ELEMENT_750_OPTIONS } from "../data/Element_750_options";
import { getTargetData } from "../data/getDataByPartner";
import { PID_559_03_OPTIONS } from "../data/PID_559_03_options";
import { PID_752_06_OPTIONS } from "../data/PID_752_06_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

const ELEMENT_349_OPTIONS_TARGET = getTargetData(
  ELEMENT_349_OPTIONS,
  "detail.010_IT1.060_PID.060_PID.01"
);

const ELEMENT_750_OPTIONS_TARGET = getTargetData(
  ELEMENT_750_OPTIONS,
  "detail.010_IT1.060_PID.060_PID.02"
);

const PID_559_03_OPTIONS_TARGET = PID_559_03_OPTIONS;

function SubFormIT1PID(props: { name: Array<string | number> }) {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          return (
            <Form.Item>
              <Button onClick={() => add()}>Add Product (PID)</Button>
            </Form.Item>
          );
        }
        return (
          <Container>
            {fields.map((field) => {
              return (
                <SubFormContainer key={field.key}>
                  <h4>
                    PID
                    <FieldDescriptionPopover
                      shortCode="PID"
                      segment={true}
                      glossaryKey={
                        EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                      }
                    />
                  </h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_349_01"]}
                        label={
                          <div className="form-label">
                            Item Description Type
                            <FieldDescriptionPopover
                              shortCode="PID_01"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(PID_349_01)</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Item Description Type is required",
                          },
                        ]}
                      >
                        <Select
                          options={ELEMENT_349_OPTIONS_TARGET}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_750_02"]}
                        label={
                          <div className="form-label">
                            Product/Process Characteristic Code
                            <FieldDescriptionPopover
                              shortCode="PID_02"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(PID_750_02)</span>
                          </div>
                        }
                      >
                        <Select
                          options={ELEMENT_750_OPTIONS_TARGET}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_559_03"]}
                        label={
                          <div className="form-label">
                            Agency Qualifier Code
                            <FieldDescriptionPopover
                              shortCode="PID_03"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(PID_559_03)</span>
                          </div>
                        }
                      >
                        <Select
                          options={PID_559_03_OPTIONS_TARGET}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_751_04"]}
                        label={
                          <div className="form-label">
                            Product Description Code
                            <FieldDescriptionPopover
                              shortCode="PID_04"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(PID_751_04)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_352_05"]}
                        label={
                          <div className="form-label">
                            Description
                            <FieldDescriptionPopover
                              shortCode="PID_05"
                              glossaryKey={
                                EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY
                              }
                            />
                            <span className="form-sub-label">(PID_352_05)</span>
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
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_752_06"]}
                        label={
                          <div className="form-label">
                            Surface/Layer/Position Code
                            <span className="form-sub-label">(PID_752_06)</span>
                          </div>
                        }
                      >
                        <Select
                          options={PID_752_06_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_822_07"]}
                        label={
                          <div className="form-label">
                            Source Subqualifier
                            <span className="form-sub-label">(PID_822_07)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_1073_08"]}
                        label={
                          <div className="form-label">
                            Yes/No Condition or Response Code
                            <span className="form-sub-label">
                              (PID_1073_08)
                            </span>
                          </div>
                        }
                      >
                        <Select>
                          <Select.Option value="N">No</Select.Option>
                          <Select.Option value="U">Unknown</Select.Option>
                          <Select.Option value="W">
                            Not Applicable
                          </Select.Option>
                          <Select.Option value="Y">Yes</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PID_819_09"]}
                        label={
                          <div className="form-label">
                            Language Code
                            <span className="form-sub-label">(PID_819_09)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <MinusCircleOutlined
                    className="remove-btn"
                    onClick={() => remove(field.name)}
                  />
                </SubFormContainer>
              );
            })}
            <Form.Item>
              <Button onClick={() => add()}>Add Product (PID)</Button>
            </Form.Item>
          </Container>
        );
      }}
    </Form.List>
  );
}

export { SubFormIT1PID };
