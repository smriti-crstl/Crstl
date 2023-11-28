import { Button, Col, Form, Input, Row, Select } from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";

import FieldDescriptionPopover from "../../edi/FieldDescriptionPopover";
import { EDI_GLOSSARY_KEYS } from "../../edi/FieldDescriptionPopover/ShortCodeGlossary.config";
import { IT3_355_02_OPTIONS } from "../data/IT3_355_02_options";
import { PO4_103_04_OPTIONS } from "../data/PO4_103_04_options";
import { PO4_752_15_OPTIONS } from "../data/PO4_752_15_options";
import { Container, SubFormContainer } from "./SubFormTable.styles";

function SubFormPO4(props: { name: Array<string | number> }) {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => {
        if (fields.length === 0) {
          return (
            <Form.Item>
              <Button onClick={() => add()}>
                Add Item Physical Details (PO4)
              </Button>
            </Form.Item>
          );
        }
        return (
          <Container>
            {fields.map((field) => {
              return (
                <SubFormContainer key={field.key}>
                  <h4>PO4 - Item Physical Details
                    <FieldDescriptionPopover
                      shortCode="PO4"
                      segment={true}
                      glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                    /> </h4>
                  <Row gutter={16}>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_356_01"]}
                        label={
                          <div className="form-label">
                            Pack
                            <FieldDescriptionPopover
                              shortCode="PO4_01"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_356_01)</span>
                          </div>
                        }
                        rules={[
                          { required: true, message: "Pack is required" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_357_02"]}
                        label={
                          <div className="form-label">
                            Size
                            <FieldDescriptionPopover
                              shortCode="PO4_02"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />

                            <span className="form-sub-label">(PO4_357_02)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_355_03"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="PO4_03"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_355_03)</span>
                          </div>
                        }
                      >
                        <Select
                          options={IT3_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_103_04"]}
                        label={
                          <div className="form-label">
                            Packaging code
                            <FieldDescriptionPopover
                              shortCode="PO4_04"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_103_04)</span>
                          </div>
                        }
                      >
                        <Select
                          options={PO4_103_04_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_384_06"]}
                        label={
                          <div className="form-label">
                            Gross Weight per Pack
                            <FieldDescriptionPopover
                              shortCode="PO4_06"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_384_06)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_355_07"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="PO4_07"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_355_07)</span>
                          </div>
                        }
                      >
                        <Select
                          options={IT3_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_385_08"]}
                        label={
                          <div className="form-label">
                            Gross Volume per Pack
                            <FieldDescriptionPopover
                              shortCode="PO4_08"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_385_08)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_355_09"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="PO4_09"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_355_09)</span>
                          </div>
                        }
                      >
                        <Select
                          options={IT3_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_82_10"]}
                        label={
                          <div className="form-label">
                            Length
                            <FieldDescriptionPopover
                              shortCode="PO4_10"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_82_10)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_189_11"]}
                        label={
                          <div className="form-label">
                            Width
                            <FieldDescriptionPopover
                              shortCode="PO4_11"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_189_11)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_65_12"]}
                        label={
                          <div className="form-label">
                            Height
                            <FieldDescriptionPopover
                              shortCode="PO4_12"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_65_12)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_355_13"]}
                        label={
                          <div className="form-label">
                            Unit or Basis for Measurement Code
                            <FieldDescriptionPopover
                              shortCode="PO4_13"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_355_13)</span>
                          </div>
                        }
                      >
                        <Select
                          options={IT3_355_02_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_810_14"]}
                        label={
                          <div className="form-label">
                            Inner Pack
                            <FieldDescriptionPopover
                              shortCode="PO4_14"
                              glossaryKey={EDI_GLOSSARY_KEYS.TARGET_NON_DVS_810_EDI_GLOSSARY}
                            />
                            <span className="form-sub-label">(PO4_810_14)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_752_15"]}
                        label={
                          <div className="form-label">
                            Surface/Layer/Position Code
                            <span className="form-sub-label">(PO4_752_15)</span>
                          </div>
                        }
                      >
                        <Select
                          options={PO4_752_15_OPTIONS}
                          optionFilterProp="label"
                          showSearch
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_350_16"]}
                        label={
                          <div className="form-label">
                            Assigned Identification
                            <span className="form-sub-label">(PO4_350_16)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_350_17"]}
                        label={
                          <div className="form-label">
                            Assigned Identification
                            <span className="form-sub-label">(PO4_350_17)</span>
                          </div>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={6}>
                      <Form.Item
                        {...field}
                        name={[field.name, "PO4_1470_18"]}
                        label={
                          <div className="form-label">
                            Number
                            <span className="form-sub-label">
                              (PO4_1470_18)
                            </span>
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
          </Container>
        );
      }}
    </Form.List>
  );
}

export { SubFormPO4 };
